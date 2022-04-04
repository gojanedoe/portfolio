// TODO
// Add modal handling

const scrollToTop = () => {
  // Scroll to top
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

//When image is clicked, open modal
const openModal = () => {
  document.body.style.overflow = "hidden";
  modal.style.display = "flex"; //"initial"; // initial is block
};

//When x is clicked, close modal
const closeModal = () => {
  document.body.style.overflow = "auto";
  modal.style.display = "none";
};

let modal = document.getElementsByClassName("modal")[0];

// Add clickable event to every "zoomable" image
let zoomableImages = document.getElementsByClassName("zoomable");
Object.values(zoomableImages).forEach((image) => {
  image.addEventListener("click", openModal);
});

// Add clickable event to close
let close = document.getElementsByClassName("close");
close[0].addEventListener("click", closeModal);
