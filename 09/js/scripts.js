const hamburgerIcon = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

hamburgerIcon.addEventListener("click", () => {
    hamburgerIcon.classList.toggle("hamburger--active");
    menu.classList.toggle("menu--open");
});

document.addEventListener("click", e => {
    const className = e.target.className;

    if (!(className.includes("hamburger") || className.includes("menu"))) {
        hamburgerIcon.classList.remove("hamburger--active");
        menu.classList.remove("menu--open");
    }
});