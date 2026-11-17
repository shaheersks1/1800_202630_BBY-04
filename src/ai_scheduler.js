import { GoogleGenerativeAI } from "@google/generative-ai";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "/src/firebaseConfig.js";
import { onAuthReady, logoutUser } from "/src/authentication.js";
import { renderScheduleUI } from "./ui_renderer.js";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const primaryModel = genAI.getGenerativeModel({ 
  model: "gemini-3.5-flash-lite",
  generationConfig: { responseMimeType: "application/json" } 
});

const authLoading = document.getElementById("auth-loading");
const appContent = document.getElementById("app-content");
const userGreeting = document.getElementById("user-greeting");
const logoutBtn = document.getElementById("logout-btn");

const generateBtn = document.getElementById("generate-btn");
const goalInput = document.getElementById("goal-input");
const fileUpload = document.getElementById("file-upload");
const scheduleContainer = document.getElementById("scheduleContainer");

let currentUser = null;

// Save checkbox progress back to Firestore
async function saveTaskProgress(updatedSchedule) {
  if (!currentUser) return;
  try {
    await setDoc(
      doc(db, "users", currentUser.uid),
      { schedule: updatedSchedule },
      { merge: true }
    );
  } catch (err) {
    console.error("Failed to save task progress:", err);
  }
}

// Check login state & load existing schedule from Firestore
onAuthReady(async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  currentUser = user;
  authLoading.style.display = "none";
  appContent.style.display = "block";
  userGreeting.textContent = `Signed in as ${user.displayName || user.email}`;

  try {
    const userSnap = await getDoc(doc(db, "users", user.uid));
    if (userSnap.exists() && userSnap.data().schedule) {
      const data = userSnap.data();
      goalInput.value = data.goal || "";
      renderScheduleUI(
        { goal: data.goal || "Saved Schedule", schedule: data.schedule },
        scheduleContainer,
        saveTaskProgress
      );
    }
  } catch (err) {
    console.error("Error loading schedule from Firestore:", err);
  }
});

logoutBtn?.addEventListener("click", async () => {
  await logoutUser();
});

async function processFileForGemini(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (file.type.startsWith("image/")) {
        resolve({
          inlineData: { data: reader.result.split(",")[1], mimeType: file.type }
        });
      } else {
        resolve({ text: reader.result });
      }
    };
    reader.onerror = reject;
    file.type.startsWith("image/") ? reader.readAsDataURL(file) : reader.readAsText(file);
  });
}

async function generateWithRetry(model, promptParts, retries = 5, baseDelay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await model.generateContent(promptParts);
    } catch (error) {
      const isOverloaded = error.message.includes("503") || error.message.includes("429");
      if (i === retries - 1 || !isOverloaded) throw error;
      
      const waitTime = baseDelay * Math.pow(2, i);
      console.warn("Server busy. Retrying in " + (waitTime/1000) + "s...");
      scheduleContainer.innerHTML = "<p>Server is crowded. Retrying in " + (waitTime/1000) + " seconds...</p>";
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
}

generateBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }
  
  const userGoal = goalInput.value.trim();
  const file = fileUpload.files[0];
  
  if (!file || !userGoal) {
    scheduleContainer.innerHTML = "<p style='color: red;'>Error: Please provide a goal and upload a file.</p>";
    return;
  }

  generateBtn.disabled = true;
  scheduleContainer.innerHTML = "<p>Building and saving your optimized calendar...</p>";

  try {
    const fileData = await processFileForGemini(file);
    
    const promptText = "You are an expert scheduler.\n" +
      "User goal: \"" + userGoal + "\"\n\n" +
      "Analyze the attached schedule data and generate a new optimized schedule.\n" +
      "Rule 1: Use exact day names (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday).\n" +
      "Rule 2: Use 24-hour time format (e.g., 09:00, 14:30).\n" +
      "Rule 3: Ensure existing School and Work tasks are kept in the schedule and categorized properly.\n" +
      "You must reply with a valid JSON object using exactly this structure:\n" +
      "{\n" +
      "  \"goal\": \"Brief summary of goal\",\n" +
      "  \"schedule\": [\n" +
      "    { \"day\": \"Monday\", \"time\": \"14:00\", \"task\": \"String\", \"category\": \"School\" }\n" +
      "  ]\n" +
      "}";

    const promptParts = fileData.inlineData 
      ? [promptText, fileData] 
      : [promptText + "\n\nSchedule Data:\n" + fileData.text];

    const result = await generateWithRetry(primaryModel, promptParts);
    const parsedData = JSON.parse(result.response.text());

    // Add default completed state to each task
    parsedData.schedule = parsedData.schedule.map(item => ({
      ...item,
      completed: false
    }));

    // Write goal + schedule into users/{uid} in Firestore
    await setDoc(
      doc(db, "users", currentUser.uid),
      {
        goal: parsedData.goal,
        schedule: parsedData.schedule
      },
      { merge: true }
    );
    console.log("Schedule saved to Firestore for UID:", currentUser.uid);
    
    renderScheduleUI(parsedData, scheduleContainer, saveTaskProgress);

  } catch (fatalError) {
    console.error("Critical failure:", fatalError);
    scheduleContainer.innerHTML = "<p style='color: red;'>Error: <br><small>" + fatalError.message + "</small></p>";
  } finally {
    generateBtn.disabled = false;
  }
});