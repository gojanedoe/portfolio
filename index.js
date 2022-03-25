const projects = document.getElementsByClassName("filter-option");

// Show/hide projects based on current filter
let filterProjects = (event) => {
  let chosenFilter = event.target.dataset.filter;
  for (const project of projects) {
    project.dataset.filter.includes(chosenFilter)
      ? project.classList.remove("hidden")
      : project.classList.add("hidden");
  }
};

// Add filterProjects event to each option
const filterList = document.getElementsByClassName("filters-list");
const filterOptions = filterList[0].querySelectorAll("a");
filterOptions.forEach((filterOption) => {
  filterOption.addEventListener("click", filterProjects);
});

// Add stars
const placeStars = () => {
  createStars("top");
  createStars("bottom");
  createStars("left");
  createStars("right");
};

const createStars = (placement) => {
  for (let i = 0; i < 9; i++) {
    /*
    left: 280px;
    right: 280px;
    top: 200px;
    bottom: 40px;
    */
    // if I don't want stars behind text, subtract element's height and width from areas used for randomness

    const colors = ["pink", "red", "yellow", "green", "blue"];

    let star = document.createElement("div");
    star.innerHTML = "*";

    // get random color
    let randomNum = Math.floor(Math.random() * colors.length);
    let color = colors[randomNum];
    star.setAttribute("class", `${color} star`);

    // make position random
    let browserWidth = document.documentElement.clientWidth;
    let browserHeight = document.documentElement.scrollHeight;
    // let xPos = Math.floor(Math.random() * (browserWidth - 10) + 10);
    // let yPos = Math.floor(Math.random() * (browserHeight - 10) + 10);

    if (placement == "left") {
      let xPos = Math.floor(Math.random() * (280 - 10) + 10);
      let yPos = Math.floor(Math.random() * (browserHeight - 10) + 10);

      star.style.left = `${xPos}px`;
      star.style.top = `${yPos}px`;
    } else if (placement == "right") {
      let xPos = Math.floor(Math.random() * (280 - 10) + 10);
      let yPos = Math.floor(Math.random() * (browserHeight - 10) + 10);

      star.style.right = `${xPos}px`; // this changed
      star.style.top = `${yPos}px`;
    } else if (placement == "top") {
      let xPos = Math.floor(Math.random() * (browserWidth - 10) + 10);
      let yPos = Math.floor(Math.random() * (200 - 10) + 10);

      star.style.left = `${xPos}px`;
      star.style.top = `${yPos}px`;
    } else if (placement == "bottom") {
      let xPos = Math.floor(Math.random() * (browserWidth - 10) + 10);
      let yPos = Math.floor(Math.random() * (40 - 10) + 10);

      star.style.left = `${xPos}px`;
      star.style.bottom = `${yPos}px`;
    }

    document.body.appendChild(star);
  }
};

window.onload = placeStars;
