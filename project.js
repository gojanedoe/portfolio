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

// Event Listeners
let modal = document.getElementsByClassName("modal")[0];
modal.addEventListener("keydown", keyboardHandler);

let zoomableImages = document.getElementsByClassName("zoomable");
Object.values(zoomableImages).forEach((image) => {
  image.addEventListener("click", openModal);
});

let close = document.getElementsByClassName("close");
close[0].addEventListener("click", closeModal);
