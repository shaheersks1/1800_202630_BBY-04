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