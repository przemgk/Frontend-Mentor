const hamburger = document.querySelector(".hamburger");
const header = document.querySelector(".header");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("hamburger--active");
    header.classList.toggle("header--opened");
});