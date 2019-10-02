// Hamburger menu - test version

const hamburger = document.querySelector(".hamburger");
const navContainer = document.querySelector(".nav-container");
const logo = document.querySelector(".header .logo");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("hamburger--active");
    navContainer.classList.toggle("nav-container--opened");
    logo.classList.toggle("logo--white");
});

// Carousel