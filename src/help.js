const helpButton = document.getElementById("helpButton");

helpButton.addEventListener("click", () => {
    let loginInput = document.getElementById("loginEmail");

    loginInput.placeholder = "Enter your Gmail, Yahoo, etc.";

    let passWord = document.getElementById("loginPassword");
    passWord.placeholder = "Enter your Email Password"

    let signUP = document.getElementById("toSignup");
    signUP.textContent = "Click me if you are a new user - Sign Up";
});

