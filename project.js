let currentSlide = 0;
let currentFocus = -1; // Default is modal focus
let preModalFocus = document.body;

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
  preModalFocus = e.target;
  document.body.style.overflow = "hidden"; // prevents background scrolling
  nonModalContent.setAttribute("aria-hidden", "true");

  let clickedThumbnail =
    e.target.tagName == "BUTTON" ? e.target : e.target.parentElement;

  // Find index of image
  currentSlide = thumbnailButtons.indexOf(clickedThumbnail);

  // Show correct image
  modalImages[currentSlide].style.display = "flex";
  modal.style.display = "flex";

  updateSlideNum(currentSlide);

  // Setup focus on whole modal
  changeFocus(0);
};

const closeModal = () => {
  document.body.style.overflow = "auto";
  modal.style.display = "none";
  modalImages[currentSlide].style.display = "none";
  nonModalContent.setAttribute("aria-hidden", "false");

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
  preModalFocus.focus();
};

// Change slides
const changeSlide = (n) => {
  // Close last current slide image
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

  modalImages[currentSlide].style.display = "flex";

  updateSlideNum(currentSlide);
};

const updateSlideNum = (n) => {
  // Error handle
  if (slideNum == null) {
    console.log("Error handling: Missing slide number");

    // Create element on modal
    slideNum = document.createElement("p");
    slideNum.id = "slide-num";
    slideNum.ariaLive = "polite";
    slideNum.className = "screenreader-text";
    modal.appendChild(slideNum);
  }

  // Update slide number
  slideNum.innerText = `Slide ${n + 1} of ${modalImages.length}`;
};

const nonModalContent = document.getElementById("main-page");
let slideNum = document.getElementById("slide-num");

// Event Listeners
const thumbnailButtons = Object.values(
  document.getElementsByClassName("zoomable")
);
thumbnailButtons.forEach((button) => {
  button.addEventListener("click", openModal);
});

const modal = document.getElementsByClassName("modal")[0];
modal.addEventListener("keydown", handleModalKeys);

const modalImages = document.getElementsByClassName("slide");

const leftArrow = document.getElementsByClassName("left-arrow")[0];
const rightArrow = document.getElementsByClassName("right-arrow")[0];
leftArrow.addEventListener("click", () => changeSlide(-1));
rightArrow.addEventListener("click", () => changeSlide(1));

const close = document.getElementsByClassName("close")[0];
close.addEventListener("click", closeModal);

// Elements that can be tabbed through
const focusableElements = [close, leftArrow, rightArrow];
