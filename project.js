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

  // only if modal is open
  if (event.key == "Escape") {
    console.log(event.key);
    closeModal();
  } else if (event.key == "ArrowRight") {
    // right arrow
  } else if (event.key == "ArrowLeft") {
    // left arrow
  }
};

const openModal = (e) => {
  console.log("open modal");
  document.body.style.overflow = "hidden"; // prevents from background scrolling
  // overscroll-behavior: contain may be another option

  // Find index of image
  currentSlide = zoomableImages.indexOf(e.target);
  console.log("Slide index", zoomableImages.indexOf(e.target));

  // Show correct image
  modalImages[currentSlide].style.display = "inline";

  modal.style.display = "flex";

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
const changeSlides = (n) => {
  // if it's negative, go to last slide
  // if it's positive, go to next slide
};

// Event Listeners

let zoomableImages = Object.values(document.getElementsByClassName("zoomable")); // Make into an array
zoomableImages.forEach((image) => {
  image.addEventListener("click", openModal);
});

let modal = document.getElementsByClassName("modal")[0];
modal.addEventListener("keydown", keyboardHandler);

let modalImages = document.getElementsByClassName("slide");

let close = document.getElementsByClassName("close");
close[0].addEventListener("click", closeModal);
