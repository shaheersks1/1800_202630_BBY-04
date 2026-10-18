const helpButton = document.getElementById("helpButton");

helpButton.addEventListener("click", () => {
    let loginInput = document.getElementById("loginEmail");

    loginInput.placeholder = "Email-is either your gmail, hotmail, yahoo or wtvr";

    let passWord = document.getElementById("loginPassword");
    passWord.placeholder = "Password-prolly is that password you use for email"

    let signUP = document.getElementById("toSignup");
    signUP.textContent = "Click me if first time here - Sign Up";
});

