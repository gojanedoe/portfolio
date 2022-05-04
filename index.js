const projects = document.getElementsByClassName("filter-option");

// Show/hide projects based on current filter
let filterProjects = (event) => {
  let chosenFilter = event.target.parentElement.parentElement.dataset.filter; // clickable element is nested twice == reason for the two parentElement props
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
  event.target.parentElement.className += " selected";
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
    star.onclick = toggleRainbow;

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

const toggleRainbow = (event) => {
  console.log("event.target class: ", event.target.className);

  // Toggle rainbow
  // if rainbow class exists, remove
  // if rainbow class doesn't, add
  if (event.target.className.includes("rainbow")) {
    // remove rainbow
    console.log("Removing rainbow!");

    event.target.classList.remove("rainbow");
  } else {
    console.log("Adding rainbow!");

    // add rainbow
    event.target.classList.add("rainbow");
  }

  /* 
  project.dataset.filter.includes(chosenFilter)
      ? project.classList.remove("hidden")
      : project.classList.add("hidden");

  selectedOption[0].className = selectedOption[0].className.replace(
    " selected",
    ""
  );
  */
};

window.onload = createStars;
