const projects = document.getElementsByClassName("filter-option");

// Show/hide projects based on current filter
let filterProjects = (event) => {
  let chosenFilter;

  if (event === "start") {
    chosenFilter = "code";
  } else if (event.target.tagName == "SPAN") {
    chosenFilter = event.target.parentElement.parentElement.dataset.filter; // clickable element is nested twice, but has higher z-index making it the target == reason for the two parentElement props
  } else if ((event.target.tagName = "BUTTON")) {
    chosenFilter = event.target.dataset.filter;
  }

  for (const project of projects) {
    project.dataset.filter.includes(chosenFilter)
      ? project.classList.remove("hidden")
      : project.classList.add("hidden");
  }

  // Highlight selected option
  if (event !== "start") {
    let selectedOption = document.getElementsByClassName("selected");
    selectedOption[0].className = selectedOption[0].className.replace(
      " selected",
      ""
    );

    event.target.tagName === "SPAN"
      ? (event.target.parentElement.className += " selected")
      : (event.target.className += " selected");
  }
};

// Add filterProjects event to each option
const filterList = document.getElementsByClassName("filters-list");
const filterOptions = filterList[0].querySelectorAll("button");
filterOptions.forEach((filterOption) => {
  filterOption.addEventListener("click", filterProjects);
});

// Add stars
const createStars = () => {
  for (let i = 0; i < 30; i++) {
    const colors = ["pink", "red", "yellow", "green", "blue"];

    let star = document.createElement("div");
    star.innerHTML = "*";
    star.ariaHidden = "true";
    star.onclick = toggleRainbow;

    // get random color
    let randomNum = Math.floor(Math.random() * colors.length);
    let color = colors[randomNum];
    star.setAttribute("class", `${color} star paused`);

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

const toggleRainbow = (event) => {
  event.target.className.includes("paused")
    ? event.target.classList.remove("paused")
    : event.target.classList.add("paused");
};

window.onload = filterProjects("start");
