const hamburgerIcon = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

hamburgerIcon.addEventListener("click", () => {
    hamburgerIcon.classList.toggle("hamburger--active");
    menu.classList.toggle("menu--open");
});