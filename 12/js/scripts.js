// Hamburger Menu
const hamburgerIcon = document.querySelector(".hamburger");
const navigation = document.querySelector(".navigation");
const logo = document.querySelector(".logo");

hamburgerIcon.addEventListener("click", () => {
    hamburgerIcon.classList.toggle("hamburger--active");
    logo.classList.toggle("logo--white");
    navigation.classList.toggle("navigation--opened");
});

// Carousel
// const carouselTabs = document.querySelectorAll(".carousel__tab");
// const carouselWrapper = document.querySelector(".carousel__wrapper");
// const indicator = document.querySelector(".carousel__indicator");

// let tabsHeights = [];
// let currentIndex = 0;

// // Set indicator position
// function setIndicator(index, indicatorRef) {
//     let height = 0;

//     for(let i = 0; i <= index; i++) {
//         height += tabsHeights[i];
//     }

//     height -= indicatorRef.getBoundingClientRect().height + Number.parseInt(getComputedStyle(carouselTabs[index]).borderBottomWidth);
//     indicatorRef.style.transform = `translateY(${height}px)`;
// }

// // Calculate heights of tabs
// function calculateTabsHeights(tabs, tabsHeightsRef) {
//     const heights = [];
//     tabs.forEach( tab => heights.push(tab.getBoundingClientRect().height) );

//     return heights;
// }

// window.addEventListener("load", () => {
//     tabsHeights = calculateTabsHeights(carouselTabs);
//     setIndicator(currentIndex, indicator);
// });

// window.addEventListener("resize", () => {
//     tabsHeights = calculateTabsHeights(carouselTabs);
//     setIndicator(currentIndex, indicator);
// });

// carouselTabs.forEach( (tab, index) => tab.addEventListener("click", e => {
//     e.preventDefault();

//     if(currentIndex != index) {
//         // Change tabs styles
//         carouselTabs[currentIndex].classList.remove("carousel__tab--active");
//         tab.classList.add("carousel__tab--active");

//         // Move indicator
//         setIndicator(index, indicator);

//         // Move items
//         carouselWrapper.style.transform = `translateX(-${index * 100}%)`;

//         // Change current index
//         currentIndex = index;
//     }
// }));

// FAQ Accordion
const questions = document.querySelectorAll(".questions__item");

window.addEventListener("load", () => {

    questions.forEach( elem => {
        let label =  elem.querySelector(".questions__label");
        let labelHeight = `${label.getBoundingClientRect().height}px`;
        let maxHeight = `${elem.getBoundingClientRect().height}px`;

        elem.style.maxHeight = labelHeight;

        label.addEventListener("click", () => {
            elem.classList.toggle("questions__item--active");

            if(elem.classList.contains("questions__item--active")) {
                elem.style.maxHeight = maxHeight;
            } else {
                elem.style.maxHeight = labelHeight;
            }
        });
    });

});

// Form Validation
const form = document.querySelector(".form");
const inputBox = form.querySelector(".form__input-box");
const emailInput = form.querySelector(".form__input[type='email']");
const message = form.querySelector(".form__message");
const buttonSubmit = form.querySelector("button[type='submit'");
const regexp = /^[a-z0-9_\-.]+@\w+\.\w{2,4}((\.\w{2,4})?)$/gi;

buttonSubmit.style.transform = `translateY(-${Number.parseInt(getComputedStyle(message).height) + Number.parseInt(getComputedStyle(message).marginTop)}px)`;

form.addEventListener("submit", e => {

    e.preventDefault();
    message.style.transform = "scaleY(1)";
    buttonSubmit.style.transform = "none";

    if(regexp.test(emailInput.value)) {
        inputBox.classList.remove("form__input-box--error");
        message.style.transform = "scaleY(0)";

        buttonSubmit.style.transform = `translateY(-${Number.parseInt(getComputedStyle(message).height) + Number.parseInt(getComputedStyle(message).marginTop)}px)`;
        buttonSubmit.setAttribute("disabled", "disabled");
        buttonSubmit.textContent = "Success!";
    } else {
        inputBox.classList.add("form__input-box--error");
        message.style.transform = "scaleY(1)";
        buttonSubmit.style.transform = "none";
    }

} );