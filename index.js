const projects = document.getElementsByClassName("filter-option");
let colorIndex = 0;

// Show/hide projects based on current filter
let filterProjects = (event) => {
  let chosenFilter = event.target.dataset.filter;
  for (const project of projects) {
    project.dataset.filter.includes(chosenFilter)
      ? project.classList.remove("hidden")
      : project.classList.add("hidden");
  }

  // Highlight selected option
  let selectedOption = document.getElementsByClassName("selected");
  selectedOption[0].className = selectedOption[0].className.replace(
    " selected",
    ""
  );
  event.target.className += " selected";
};

// Add filterProjects event to each option
const filterList = document.getElementsByClassName("filters-list");
const filterOptions = filterList[0].querySelectorAll("a");
filterOptions.forEach((filterOption) => {
  filterOption.addEventListener("click", filterProjects);
});

// Add stars
const createStars = () => {
  for (let i = 0; i < 30; i++) {
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
    star.ariaHidden = "true";

    // get random color
    let randomNum = Math.floor(Math.random() * colors.length);
    let color = colors[randomNum];
    star.setAttribute("class", `${color} star`);

    // make position random
    let browserWidth = document.documentElement.clientWidth;
    let browserHeight = document.documentElement.scrollHeight;
    let xPos = Math.floor(Math.random() * (browserWidth - 10) + 10);
    let yPos = Math.floor(Math.random() * (browserHeight - 10) + 10);

    star.style.left = `${xPos}px`;
    star.style.top = `${yPos}px`;

    document.body.appendChild(star);
  }
};

const hoverEffect = (event) => {
  // hover effect
  // const colors = ["pink", "red", "yellow", "green", "blue"];
  const colors = ["#e225e5", "#c90d0d", "#ffd84d", "#57a4ff", "#0dc941"];

  if (colorIndex == colors.length - 1) {
    colorIndex = 0;
  } else {
    colorIndex++;
  }

  // console.log(event.target);

  // get random color
  // let randomNum = Math.floor(Math.random() * colors.length);
  // let color = colors[randomNum];
  // console.log("color: ", color);
  // event.target.style.borderColor = color;
  let color = colors[colorIndex];
  event.target.style.borderColor = color;
};

const removeHoverEffect = (event) => {
  event.target.style.borderColor = "#080808";
};

for (const project of projects) {
  project.addEventListener("mouseover", hoverEffect);
  project.addEventListener("mouseout", removeHoverEffect);
}

window.onload = createStars;
