// TODO
// Accessibility
// Aria hidden for modal start
// Toggle aria hidden for modal
// Save last focused item (button clicked that opened modal? event in openmodal?)
// Toggle focus on close
// -1 tab index for all previous focusable elements
// Check keyboard focus for all lightbox event triggers (thumbnails)
// Add aria types to all images
// Add note about controlling the lightbox (arrow keys and escape)
// Add labels to all images
// Thumbnail Alt = View full size version of my screenshot of _____
// Lightbox Alt = Fuller description of image
// Meaningful link text / alt for arrow buttons

// Popup/warning if JS not available

let currentSlide = 0;

const scrollToTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

const keyboardHandler = (event) => {
  event = event || window.event; // if e is undefined, set to window.event
  console.log("keyboard triggered");
  console.log(event.key);

  // only if modal is open
  if (event.key == "Escape") {
    closeModal();
  } else if (event.key == "ArrowRight") {
    changeSlide(1);
  } else if (event.key == "ArrowLeft") {
    changeSlide(-1);
  }
};

const openModal = (e) => {
  document.body.style.overflow = "hidden"; // prevents from background scrolling
  // overscroll-behavior: contain may be another option

  // Find index of image
  currentSlide = zoomableImages.indexOf(e.target);
  console.log("Current slide: ", currentSlide);
  console.log("Slide index", zoomableImages.indexOf(e.target));

  // Show correct image
  modalImages[currentSlide].style.display = "flex";

  modal.style.display = "flex";
  // change slide to flex

  // For accessibility & keyboard access
  modal.focus();
};

const closeModal = () => {
  document.body.style.overflow = "auto";
  modal.style.display = "none";
  modalImages[currentSlide].style.display = "none";

  //TODO: remove/move focus
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
    console.log("Go to last slide");
  } else if (currentSlide === modalImages.length - 1 && n === 1) {
    // if going forward from last slide
    currentSlide = 0;
    console.log("Go to 0 slide");
  } else {
    currentSlide += n;
    console.log("Go to slide ", currentSlide);
  }

  // TODO
  // Change display according to slide number
  modalImages[currentSlide].style.display = "flex";

  // show current slide image
};

// Event Listeners
let zoomableImages = Object.values(document.getElementsByClassName("zoomable")); // Make into an array
zoomableImages.forEach((image) => {
  image.addEventListener("click", openModal);
});

let modal = document.getElementsByClassName("modal")[0];
modal.addEventListener("keydown", keyboardHandler);

let modalImages = document.getElementsByClassName("slide");

let leftArrow = document.getElementsByClassName("left-arrow");
let rightArrow = document.getElementsByClassName("right-arrow");
leftArrow[0].addEventListener("click", () => changeSlide(-1));
rightArrow[0].addEventListener("click", () => changeSlide(1));

let close = document.getElementsByClassName("close");
close[0].addEventListener("click", closeModal);
