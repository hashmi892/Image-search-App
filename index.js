// use you own unsplash key here
const accessKey = "J-apcoS0fl9CDeaUQsH9mkEWWNP9gqaur9wJLjF0wAQ";
const SearchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector("#searchInput");
const searchResults = document.querySelector(".searchResults");
const ShowMoreBtn = document.querySelector(".show-more-btn");

let inputData = "";
let page = 1;

// Search Images Function
async function searchImages() {
  // Get search input value
  inputData = searchInput.value;
  if (inputData === "") {
    alert("Please enter your keyword");
  } else {
    // Construct API URL
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    // Fetch data from API
    const response = await fetch(url);
    const data = await response.json();
    // Get results from API response
    const results = data.results;

    // Display message for no results found
    if (results.length === 0) {
      const errorMessage = document.createElement("h1");
      errorMessage.textContent = "Please enter correct keyword";
      errorMessage.classList.add("focus-in-contract-bck");
      searchResults.innerHTML = ""; // Clear previous content
      searchResults.appendChild(errorMessage);
      ShowMoreBtn.style.display = "none";
    } else {
      // If page is 1, clear previous search results
      if (page === 1) {
        searchResults.innerHTML = "";
      }
      // Loop through results and create card elements
      results.forEach((result) => {
        // Create main card container
        const child = document.createElement("div");
        child.classList.add("mb-4", "col-lg-4", "col-md-5", "col-12");

        // Create card element
        const sonOfChild = document.createElement("div");
        sonOfChild.classList.add("card");
        sonOfChild.style.width = "100%";
        child.appendChild(sonOfChild);

        // Create card image container
        const CardImage = document.createElement("div");
        CardImage.classList.add("card-img");

        // Create and set image element
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        image.classList.add("card-img-top", "img-fluid", "img-thumbnail");
        CardImage.appendChild(image);
        sonOfChild.appendChild(CardImage);

        // Create card body
        const childOfSonOfChild = document.createElement("div");
        childOfSonOfChild.classList.add("card-body");

        // Create and set anchor element
        const anchor = document.createElement("a");
        anchor.href = result.links.html;
        anchor.target = "_blank";
        anchor.textContent = result.alt_description;
        anchor.classList.add("card-text", "fw-bold", "text-capitalize");
        childOfSonOfChild.appendChild(anchor);
        sonOfChild.appendChild(childOfSonOfChild);

        // Append the card to search results
        searchResults.appendChild(child);
      });

      // Increment the page counter
      page++;
    }
  }
}

// Auto functionality on page load if searchInput value is "nature"
document.addEventListener("DOMContentLoaded", (e) => {
  if (searchInput.value === "nature") {
    searchImages();
  }
});

// Event listener for Search button
SearchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchImages();
  page = 1;
});

// Event listener for Show More button
ShowMoreBtn.addEventListener("click", (e) => {
  searchImages();
});
