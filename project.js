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

const openModal = () => {
  document.body.style.overflow = "hidden"; // prevents from background scrolling
  // overscroll-behavior: contain may be another option
  modal.style.display = "flex";

  // For accessibility & keyboard access
  modal.focus();
};

const closeModal = () => {
  document.body.style.overflow = "auto";
  modal.style.display = "none";

  //TODO: remove/move focus
};

// let mainPage = document.getElementById("main-page");

// Event Listeners
let modal = document.getElementsByClassName("modal")[0];
modal.addEventListener("keydown", keyboardHandler);

let zoomableImages = document.getElementsByClassName("zoomable");
Object.values(zoomableImages).forEach((image) => {
  image.addEventListener("click", openModal);
});

let close = document.getElementsByClassName("close");
close[0].addEventListener("click", closeModal);
