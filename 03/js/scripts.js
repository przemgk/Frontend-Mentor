const form = document.querySelector("form");
const formInputs = form.querySelectorAll(".form__input");
const regex = /^[a-z0-9._-]+@\w+\.(\w{2,4}(\.\w{2,4})?)$/i;

form.onsubmit = function (e) {
    e.preventDefault();
    let validationStatuses = [];

    formInputs.forEach(function (formInput) {
        const input = formInput.querySelector(".input__box input");
        const icon = formInput.querySelector(".input__box .input__icon");
        const message = formInput.querySelector(".form__message");

        if (input.type === "text" || input.type === "password") {
            if (!(input.value.length > 0)) {
                //set error message
                message.classList.add("message--error");
                message.textContent = input.getAttribute("placeholder") + " cannot be empty";

                //icon class
                icon.classList.remove("icon--success");
                icon.classList.add("icon--error");

                //input class
                input.classList.remove("input--success");
                input.classList.add("input--error");

                //set error status
                validationStatuses.push(false);
            } else {
                //remove error message
                message.classList.remove("message--error");
                message.textContent = "";

                //icon class
                icon.classList.add("icon--success");
                icon.classList.remove("icon--error");

                //input class
                input.classList.remove("input--error");
                input.classList.add("input--success");
            }
        } else if (input.type === "email") {
            if (!(regex.test(input.value) === true)) {
                //set error message
                message.classList.add("message--error");
                message.textContent = "Looks like this is not an email";

                //input class
                input.classList.remove("input--success");
                input.classList.add("input--error");

                //input class
                input.classList.remove("input--success");
                input.classList.add("input--error");

                //set error status
                validationStatuses.push(false);
            } else {
                //remove error message
                message.classList.remove("message--error");
                message.textContent = "";

                //icon class
                icon.classList.add("icon--success");
                icon.classList.remove("icon--error");

                //input class
                input.classList.remove("input--error");
                input.classList.add("input--success");
            }
        }
    });

    if (validationStatuses.length === 0) {
        form.querySelector(".form__submit").setAttribute("disabled", "disabled");
        form.querySelector(".form__submit").textContent = "Success!";
    }
};