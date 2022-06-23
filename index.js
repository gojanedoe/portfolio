const projects = document.getElementsByClassName("filter-option");
const filterButtons =
  document.getElementsByClassName("filters-list")[0].children;
const filterAnnounce = document.getElementById("filter-announce");
let firstFilterClick = true;

// Show/hide projects based on current filter
let filterProjects = (event) => {
  let chosenFilter;
  let chosenButton = null;

  // Get filter depending on which element triggered
  if (event === "start") {
    chosenFilter = "code";
  } else if (event.target.tagName == "SPAN") {
    chosenButton = event.target.parentElement.parentElement;
    chosenFilter = chosenButton.dataset.filter; // clickable element is nested twice, but has higher z-index making it the target == reason for the two parentElement props
  } else if ((event.target.tagName = "BUTTON")) {
    chosenButton = event.target;
    chosenFilter = chosenButton.dataset.filter;
  }

  for (const project of projects) {
    project.dataset.filter.includes(chosenFilter)
      ? project.classList.remove("hidden")
      : project.classList.add("hidden");
  }

  if (event !== "start") {
    // Highlight selected option
    let selectedOption = document.getElementsByClassName("selected");
    selectedOption[0].className = selectedOption[0].className.replace(
      " selected",
      ""
    );

    event.target.tagName === "SPAN"
      ? (event.target.parentElement.className += " selected")
      : (event.target.className += " selected");

    // Turn on aria live
    if (firstFilterClick) {
      filterAnnounce.setAttribute("aria-live", "polite");
      firstFilterClick = false;
    }
  }

  // Accessibility
  // Announce filter with aria-live paragraph
  let announceText = chosenFilter;
  switch (chosenFilter) {
    case "code":
      announceText = "coding";
      break;
    case "game":
      announceText = "game and play";
      break;
    case "art":
      announceText = "visual design";
      break;
  }
  filterAnnounce.innerText = `Now showing ${announceText} projects`;

  // Change aria-current
  if (chosenButton) {
    for (const button of filterButtons) {
      if (button == chosenButton) {
        button.setAttribute("aria-current", "true");
      } else {
        button.setAttribute("aria-current", "false");
      }
    }
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
