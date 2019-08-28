var form = document.querySelector(".section__notify"),
    emailInput = form.querySelector(".form__email"),
    emailSendButton = form.querySelector(".form__send"),
    errorMessageContainer = form.querySelector(".form__message--error"),
    regex = /^[a-z0-9._-]+@\w+\.(\w{2,4}(\.\w{2,4})?)$/i;

form.onsubmit = function (e) {
    e.preventDefault();

    if (regex.test(emailInput.value) === true) {
        emailInput.classList.remove("form__input--error");
        errorMessageContainer.style.display = "none";

        emailSendButton.setAttribute("disabled", "disabled");
        emailSendButton.value = "Success!";
    } else {
        emailInput.classList.add("form__input--error");
        errorMessageContainer.style.display = "block";
    }
};