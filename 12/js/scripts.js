// Hamburger menu
const hamburgerIcon = document.querySelector(".hamburger");
const navigation = document.querySelector(".navigation");
const logo = document.querySelector(".logo");

hamburgerIcon.addEventListener("click", () => {
    hamburgerIcon.classList.toggle("hamburger--active");
    logo.classList.toggle("logo--white");
    navigation.classList.toggle("navigation--opened");
});


// Carousel
const carouselTabs = document.querySelectorAll(".carousel__tab");
const carouselWrapper = document.querySelector(".carousel__wrapper");
const indicator = document.querySelector(".carousel__indicator");

let tabsHeights = [];
let currentIndex = 0;

// Set indicator position
function setIndicator(index, indicatorRef) {
    let height = 0;

    for(let i = 0; i <= index; i++) {
        height += tabsHeights[i];
    }

    height -= indicatorRef.getBoundingClientRect().height + Number.parseInt(getComputedStyle(carouselTabs[index]).borderBottomWidth);
    indicatorRef.style.transform = `translateY(${height}px)`;
}

// Calculate heights of tabs
function calculateTabsHeights(tabs, tabsHeightsRef) {
    const heights = [];
    tabs.forEach( tab => heights.push(tab.getBoundingClientRect().height) );

    return heights;
}

window.onload = () => {
    tabsHeights = calculateTabsHeights(carouselTabs);
    setIndicator(currentIndex, indicator);
};
window.onresize = () => {
    tabsHeights = calculateTabsHeights(carouselTabs);
};

carouselTabs.forEach( (tab, index) => tab.addEventListener("click", e => {
    e.preventDefault();

    if(currentIndex != index) {
        // Change tabs styles
        carouselTabs[currentIndex].classList.remove("carousel__tab--active");
        tab.classList.add("carousel__tab--active");

        // Move indicator
        setIndicator(index, indicator);

        // Move items
        carouselWrapper.style.transform = `translateX(-${index * 100}%)`;

        // Change current index
        currentIndex = index;
    }
}));

// FAQ Accordion
const questions = document.querySelectorAll(".questions__item");

questions.forEach( elem => {

    const label =  elem.querySelector(".questions__label");
    const maxHeight = getComputedStyle(elem).height;
    const transition = getComputedStyle(elem).transition;

    elem.style.maxHeight = getComputedStyle(label).height;

    label.addEventListener("click", () => {

        elem.classList.toggle("questions__item--active");

        if(elem.classList.contains("questions__item--active")) {
            elem.style.maxHeight = maxHeight;
        } else {
            elem.style.maxHeight = getComputedStyle(label).height;
        }

    });

} );