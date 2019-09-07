const form = document.querySelector(".main__form"),
    emailInput = form.querySelector(".form__email-input"),
    messageBox = form.querySelector(".form__message"),
    regex = /^[a-z0-9_.%]*@[a-z0-9]*(\.[a-z]{2,4}(\.[a-z]{2,4})?)$/i,
    errorIcon = form.querySelector(".form__message-icon");

form.onsubmit = e => {
    e.preventDefault();
    if (regex.test(emailInput.value)) {
        emailInput.classList.remove("error-data");

        messageBox.classList.remove("message--error");
        messageBox.classList.add("message--success");
        messageBox.textContent = "Your email addres has been saved!!";

        errorIcon.classList.remove("message-icon--error");

        form.querySelector(".form__submit").setAttribute("disabled", "disabled");
    } else {
        emailInput.classList.add("error-data");

        messageBox.classList.add("message--error");
        messageBox.classList.remove("message--success");
        messageBox.textContent = "Please provide a valid email";

        errorIcon.classList.add("message-icon--error");
    }
};