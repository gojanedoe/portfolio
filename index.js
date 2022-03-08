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
