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
const carouselTabs = document.querySelectorAll(".carousel__radio");
const carouselWrapper = document.querySelector(".carousel__wrapper");
const carouselItem = carouselWrapper.querySelector(".carousel__item");
let timeout, itemMarginRight, scrollWidth, carouselScroll;

carouselTabs.forEach((tab, index) => {
  tab.addEventListener("change", () => {
    itemMarginRight = Number.parseInt(
      getComputedStyle(carouselItem).marginRight
    );
    scrollWidth = carouselWrapper.offsetWidth + itemMarginRight;

    carouselWrapper.scrollTo(index * scrollWidth, 0);
  });
});

carouselWrapper.addEventListener("scroll", () => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    itemMarginRight = Number.parseInt(
      getComputedStyle(carouselItem).marginRight
    );
    scrollWidth = carouselWrapper.offsetWidth + itemMarginRight;

    carouselScroll = Math.floor(carouselWrapper.scrollLeft);

    for (let i = 0; i < carouselTabs.length; i++) {
      if (carouselScroll === scrollWidth * i) {
        carouselTabs[i].checked = true;
      }
    }
  }, 30);
});

// FAQ Accordion
const questions = document.querySelectorAll(".questions__item");

window.addEventListener("load", () => {
  questions.forEach(elem => {
    const label = elem.querySelector(".questions__label");
    const checkbox = elem.querySelector(".questions__checkbox");
    let labelHeight = `${label.offsetHeight}px`;
    let maxHeight = `${elem.offsetHeight}px`;

    elem.style.maxHeight = labelHeight;

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        elem.style.maxHeight = maxHeight;
      } else {
        elem.style.maxHeight = labelHeight;
      }
    });
  });
});

// Form Validation
(function() {
  const form = document.querySelector(".form");
  const inputBox = form.querySelector(".form__input-box");
  const emailInput = form.querySelector(".form__input[type='email']");
  const message = form.querySelector(".form__message");
  const buttonSubmit = form.querySelector("button[type='submit'");
  const regexp = /^[a-z0-9_\-.]+@\w+\.\w{2,4}((\.\w{2,4})?)$/gi;

  form.addEventListener("submit", e => {
    e.preventDefault();

    if (regexp.test(emailInput.value)) {
      inputBox.classList.remove("form__input-box--error");
      message.style.transform = "scaleY(0)";

      buttonSubmit.classList.remove("button--form-active-message");
      buttonSubmit.setAttribute("disabled", "disabled");
      buttonSubmit.textContent = "Success!";
    } else {
      inputBox.classList.add("form__input-box--error");
      message.style.transform = "scaleY(1)";

      buttonSubmit.classList.add("button--form-active-message");
    }
  });
})();
