import { auth, db } from "./firebaseConfig.js";
import { onAuthReady } from "./authentication.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

// The fields we store in Firestore (email comes from Auth, not from here)
const fields = ["name", "country", "school", "bio"];
let currentUser = null;
let favourites = [];      // used in Part 3
let originalValues = {};

onAuthReady(async function (user) {
    if (!user) {
        location.href = "index.html";
    } else {
        currentUser = user;

        // 1. Read the document
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const data = userDoc.data() || {};
        favourites = data.favourites || [];

        // 2. Header: avatar initial, name, email
        showHeader(data.name || user.displayName || user.email, user.email);

        // 3. Pre-populate each input (empty string if the field doesn't exist yet)
        fields.forEach(field => {
            const val = data[field] || "";
            document.getElementById(field + "Input").value = val;
            originalValues[field] = val;
        });
    }
});

// Fill the header: first letter in the circle, name, email
function showHeader(name, email) {
    const displayName = name || email || "User";
    document.getElementById("avatar").textContent = displayName.charAt(0).toUpperCase();
    document.getElementById("profileName").textContent = displayName;
    document.getElementById("profileEmail").textContent = email;
}

// ---- Edit mode ----
function enableEdit() {
    fields.forEach(field => {
        const input = document.getElementById(field + "Input");
        originalValues[field] = input.value;
        input.disabled = false;
    });

    document.getElementById("saveBtn").disabled = false;
    document.getElementById("cancelBtn").classList.remove("d-none");
    document.getElementById("editBtn").classList.add("d-none");
    document.getElementById("nameInput").focus();
}

// ---- Cancel edit ----
function cancelEdit() {
    fields.forEach(field => {
        const input = document.getElementById(field + "Input");
        input.value = originalValues[field] ?? "";
        input.disabled = true;
    });

    document.getElementById("saveBtn").disabled = true;
    document.getElementById("cancelBtn").classList.add("d-none");
    document.getElementById("editBtn").classList.remove("d-none");
}

document.getElementById("editBtn").addEventListener("click", enableEdit);
document.getElementById("cancelBtn").addEventListener("click", cancelEdit);

// ---- Save profile ----
async function saveProfile(event) {
    event.preventDefault();

    const updates = {};
    fields.forEach(field => {
        updates[field] = document.getElementById(field + "Input").value;
    });

    try {
        await updateDoc(doc(db, "users", currentUser.uid), updates);

        fields.forEach(field => {
            originalValues[field] = updates[field];
            document.getElementById(field + "Input").disabled = true;
        });

        document.getElementById("saveBtn").disabled = true;
        document.getElementById("cancelBtn").classList.add("d-none");
        document.getElementById("editBtn").classList.remove("d-none");

        showHeader(updates.name, currentUser.email);
        const alertBox = document.getElementById("profileAlert");
        alertBox.textContent = "Profile saved!";
        alertBox.classList.remove("d-none");
    } catch (error) {
        alert(`Error saving profile:\n${error.code || ""}\n${error.message || error}`);
    }
}

document.getElementById("profileForm").addEventListener("submit", saveProfile);

// ---- Sign out ----
async function handleLogout() {
    try {
        await signOut(auth);
        location.href = "index.html";
    } catch (error) {
        alert(`Error signing out:\n${error.code || ""}\n${error.message || error}`);
    }
}

document.getElementById("logoutBtn").addEventListener("click", handleLogout);