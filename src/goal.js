import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { db } from "./firebaseConfig";
import { doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "/src/firebaseConfig.js";
import '/styles/style.css';
const new_goal = document.getElementById("form")

new_goal.addEventListener("change", (goal) => {
    const val = goal.target.value;
    console.log(val)
    onAuthStateChanged(auth, (user) => {
        updateDoc(doc(db, "users", user.uid), { goal: val })
        console.log(goal);
    })
});