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
const questions = Array.from(document.querySelectorAll(".questions__label"));

questions.forEach( node => node.addEventListener("click", () => {

    const answer = document.querySelector(".questions__answer");

    node.parentNode.classList.toggle("questions__item--active");

    console.log(node.parentNode);

}) );