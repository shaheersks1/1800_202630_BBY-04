import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/style.css';
import { onAuthReady, logoutUser } from "/src/authentication.js";

function showName() {   
    onAuthReady(function(user) {
        if (user) {
            const name = user.displayName || user.email;
            const nameEl = document.getElementById("name-goes-here");
            if (nameEl) {
                nameEl.textContent = name;
            }
        } else {
            location.href = "index.html";
        }
    });
}

document.getElementById("logoutBtn")?.addEventListener("click", async (e) => {
    e.preventDefault();
    await logoutUser();
});

showName();

// Added this new line for bottom navbar icons
// import 'bootstrap-icons/font/bootstrap-icons.css'; 

// If you have custom global styles, import them as well:
import '../styles/style.css';
import { onAuthReady } from "/src/authentication.js";

function sayHello() {
    console.log("BLABLA")
}
function showName() {
    // Pass a CALLBACK function to run when Firebase finishes checking login status
    onAuthReady(function(user) {  // Firebase passes the user object (or null)
        if (user) {
            // User is logged in
            const name = user.displayName || user.email;  // Use email if name is missing
            document.getElementById("name-goes-here").textContent = name;
        } else {
            // User is NOT logged in
            location.href = "index.html";  // Redirect to login page
        }
    });
}
// document.addEventListener('DOMContentLoaded', sayHello);
showName();
sayHello()
