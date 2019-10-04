// Hamburger menu - test version
const hamburger = document.querySelector(".hamburger");
const navContainer = document.querySelector(".nav-container");
const logo = document.querySelector(".header .logo");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("hamburger--active");
    // navContainer.classList.toggle("nav-container--opened");
    // logo.classList.toggle("logo--white");
});

// Carousel

// FAQ Accordion
const questions = Array.from(document.querySelectorAll(".questions__item"));

questions.forEach( node => {

    const label =  node.querySelector(".questions__label");
    const maxHeight = getComputedStyle(node).height;
    const transition = getComputedStyle(node).transition;

    node.style.maxHeight = getComputedStyle(label).height;

    label.addEventListener("click", () => {

        node.classList.toggle("questions__item--active");

        if(node.classList.contains("questions__item--active")) {
            node.style.maxHeight = maxHeight;
        } else {
            node.style.maxHeight = getComputedStyle(label).height;
        }

    });

} );