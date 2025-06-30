"use strict";

/**
 * Adds event listeners to multiple DOM elements
 * @param {NodeList | Element[]} elements - Collection of elements to attach listeners to
 * @param {string} eventType - The event type to listen for (e.g. 'click', 'mouseover')
 * @param {Function} callback - The function to execute when the event occurs
 * @example
 *
 * // Add click handler to multiple elements
 * addEventOnElem(document.querySelectorAll('.btn'), 'click', handleClick);
 */
const addEventOnElem = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

const $header = document.querySelector("[data-header]");
const $navbar = document.querySelector("[data-navbar]");
const $navToggler = document.querySelectorAll("[data-nav-toggler]");
const $overlay = document.querySelector("[data-overlay]");
const $dropdownToggler = document.querySelector("[data-dropdown-toggler]");
const $dropdown = document.querySelector("[data-dropdown]");
const $cartToggler = document.querySelector("[data-cart-toggler]");
const $cartModal = document.querySelector("[data-cart-modal]");

const toggleNavbar = function () {
  $navbar.classList.toggle("active");
  $overlay.classList.toggle("active");
  document.body.classList.toggle("active");
};

addEventOnElem($navToggler, "click", toggleNavbar);

/**
 * Toggles the active class on a given element
 * @param {Element} elem - The element to toggle the active class on
 * @example
 * // Toggle active class on element
 * toggleElem(document.querySelector(".element"));
 */
const toggleElem = function (elem) {
  elem.classList.toggle("active");
};

// toggle dropdown
$dropdownToggler.addEventListener("click", function () {
  toggleElem($dropdown);
});

// toggle cart
$cartToggler.addEventListener("click", function () {
  toggleElem($cartModal);
});

/**
 * Adds 'active' class to header when user scrolls past 50px from top of page
 * This creates a visual effect like a sticky header or scroll-based styling
 * @example
 * // Add scroll event listener to window
 * window.addEventListener("scroll", activeHeader);
 */
const activeHeader = function () {
  if (window.scrollY > 50) {
    $header.classList.add("active");
  } else {
    $header.classList.remove("active");
  }
};

window.addEventListener("scroll", activeHeader);

// custom slider
const $sliderContainers = document.querySelectorAll("[data-slider-container]");

/**
 * Initializes the slider functionality for a given slider container
 * @param {Element} $sliderContainer - The slider container element
 * @example
 * // Initialize slider for a specific container
 * sliderInitial(document.querySelector("[data-slider-container]"));
 */
const sliderInitial = function ($sliderContainer) {
  const $slider = $sliderContainer.querySelector("[data-slider]");
  const $prevBtn = $sliderContainer.querySelector("[data-prev-btn]");
  const $nextBtn = $sliderContainer.querySelector("[data-next-btn]");

  function nextSlide() {
    $slider.appendChild($slider.firstElementChild);
  }
  $nextBtn.addEventListener("click", nextSlide);

  function prevSlide() {
    $slider.prepend($slider.lastElementChild);
  }
  $prevBtn.addEventListener("click", prevSlide);

  let autoSlideIntervalId;

  function autoSlide() {
    autoSlideIntervalId = setInterval(function () {
      nextSlide();
    }, 3000);
  }

  autoSlide();

  function deleteAutoSliding() {
    clearInterval(autoSlideIntervalId);
  }

  // stop auto slide when mouseover
  $slider.addEventListener("mouseover", deleteAutoSliding);
  $prevBtn.addEventListener("mouseover", deleteAutoSliding);
  $nextBtn.addEventListener("mouseover", deleteAutoSliding);

  // start auto slide when mouseout
  $slider.addEventListener("mouseout", autoSlide);
  $prevBtn.addEventListener("mouseout", autoSlide);
  $nextBtn.addEventListener("mouseout", autoSlide);
};

for (let i = 0; i < $sliderContainers.length; i++) {
  sliderInitial($sliderContainers[i]);
}
