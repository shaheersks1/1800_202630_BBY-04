import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "/src/firebaseConfig.js";
//--------------------------------------------------------------
// If you have custom global styles, import them as well:
//--------------------------------------------------------------
import '/styles/style.css';
import { db } from "./firebaseConfig";
import { doc, updateDoc } from 'firebase/firestore';

//--------------------------------------------------------------
// Custom global JS code (shared with all pages)can go here.
//--------------------------------------------------------------

// This is an example function. Replace it with your own logic.
function sayHello() {
  console.log("project up and running")
  // TODO: implement your logic here
}
document.addEventListener('DOMContentLoaded', sayHello);

const new_file = document.getElementById("myfile")
new_file.addEventListener("change", (p) => {
  const file = p.target.files[0];
  if (file) {
    Papa.parse(file, {
      header: true, // Converts rows into objects using the first row as keys
      skipEmptyLines: true,
      complete: function (results) {
        onAuthStateChanged(auth, (user) => {
          updateDoc(doc(db, "users", user.uid), { file: results.data })
          console.log("Parsed Data:", results.data);
        })
      },
      error: function (error) {
        console.error("Error parsing CSV:", error.message);
      }
    });
  }
})



