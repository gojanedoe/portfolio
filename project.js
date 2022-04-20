// TODO
// Accessibility
// Save last focused item (button clicked that opened modal? event in openmodal?)
// Toggle focus on close
// -1 tab index for all previous focusable elements
// restrain focus
// Check keyboard focus for all lightbox event triggers (thumbnails)
// Add aria types to all images
// Add screen-reader/off-screen note about controlling the lightbox (arrow keys and escape)
// Add labels to all images

// ***
// Thumbnail Alt = View full size version of my screenshot of _____
// Lightbox Alt = Fuller description of image
// Meaningful link text / alt for arrow buttons

// Popup/warning if JS not available

let currentSlide = 0;
let currentFocus = -1; // Default is modal focus
let previousFocus = document.body;
// let lastModalFocus = document.getElementById();

const scrollToTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

const handleModalKeys = (event) => {
  event = event || window.event; // if event is undefined, set to window.event

  if (event.key == "Escape") {
    closeModal();
  } else if (event.key == "ArrowRight") {
    changeSlide(1);
  } else if (event.key == "ArrowLeft") {
    changeSlide(-1);
  } else if (event.key == "Tab" && event.shiftKey) {
    event.preventDefault();
    changeFocus(-1);
  } else if (event.key == "Tab") {
    event.preventDefault();
    changeFocus(1);
  }
};

const openModal = (e) => {
  document.body.style.overflow = "hidden"; // prevents background scrolling
  // overscroll-behavior: contain may be another option

  // let target =
  //   e.target.tagName == "BUTTON" ? e.target.firstElementChild : e.target;
  // parentElement

  let target = e.target.tagName == "BUTTON" ? e.target : e.target.parentElement;
  console.log("target: ", target);

  // Find index of image
  // currentSlide = zoomableImages.indexOf(target);
  currentSlide = thumbnailButtons.indexOf(target);
  console.log("current slide: ", currentSlide);
  console.log("modal images: ", modalImages);

  // Show correct image
  modalImages[currentSlide].style.display = "flex";

  // Change slide to flex
  modal.style.display = "flex";

  // Setup focus on whole modal
  changeFocus(0);
};

const closeModal = () => {
  document.body.style.overflow = "auto";
  modal.style.display = "none";
  modalImages[currentSlide].style.display = "none";

  //TODO: remove/move focus
  releaseModalFocus();
};

// For accessibility & keyboard access
const changeFocus = (n) => {
  if (n === 0) {
    currentFocus = -1;
    modal.tabIndex = -1; // also: setAttribute("tabindex", "-1");
    modal.focus();
    return;
  } else if (n === 1) {
    // Go to next focusable element
    if (currentFocus === focusableElements.length - 1) {
      currentFocus = 0;
    } else {
      currentFocus++;
    }
  } else if (n === -1) {
    // Go to last focusable element
    if (currentFocus <= 0) {
      currentFocus = focusableElements.length - 1;
    } else {
      currentFocus--;
    }
  }
  focusableElements[currentFocus].focus();
};

const releaseModalFocus = () => {
  console.log("releasing modal focus");
};

// let mainPage = document.getElementById("main-page");

// Change slides
const changeSlide = (n) => {
  // close last current slide image
  modalImages[currentSlide].style.display = "none";

  // Change slide
  if (currentSlide === 0 && n === -1) {
    // if going back from first slide
    currentSlide = modalImages.length - 1;
  } else if (currentSlide === modalImages.length - 1 && n === 1) {
    // if going forward from last slide
    currentSlide = 0;
  } else {
    currentSlide += n;
  }

  // TODO
  // Change display according to slide number
  modalImages[currentSlide].style.display = "flex";

  // show current slide image
};

// Event Listeners
let thumbnailButtons = Object.values(
  document.getElementsByClassName("zoomable")
);
thumbnailButtons.forEach((button) => {
  button.addEventListener("click", openModal);
});

let modal = document.getElementsByClassName("modal")[0];
modal.addEventListener("keydown", handleModalKeys);

let modalImages = document.getElementsByClassName("slide");

let leftArrow = document.getElementsByClassName("left-arrow")[0];
let rightArrow = document.getElementsByClassName("right-arrow")[0];
leftArrow.addEventListener("click", () => changeSlide(-1));
rightArrow.addEventListener("click", () => changeSlide(1));

let close = document.getElementsByClassName("close")[0];
close.addEventListener("click", closeModal);

// Elements that can be tabbed through
let focusableElements = [close, leftArrow, rightArrow];
