let resultsContainer = document.getElementsByClassName("container")[0]


// Get the search input element
const searchInput = document.getElementById('searchInput');
// Initialize a timer variable
let timer;

// Function to handle debounce and perform search
function debounceSearch() {
    // Clear the previous timer
    clearTimeout(timer);
    // Set a new timer
    timer = setTimeout(function() {
      // Perform the search request
      const query = searchInput.value;
      //console.log("test1");
      generateResults(query);
    }, 3000); // Adjust the delay (in milliseconds) as needed
  }
  // Add event listener to the search input
  //searchInput.addEventListener('keyup', debounceSearch);


const validateInput = (el) => {
    if(el.value === ""){
        resultsContainer.innerHTML = "<p>Type something in the above search input</p>"
    }else{
        // Add event listener to the search input
        searchInput.addEventListener('keyup', debounceSearch);
    }
}



const generateResults = (searchValue) => {
    fetch(
        "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch="
        + searchValue
    )
    .then(response => response.json())
    .then(data => {
        let results = data.query.search
        let numberOfResults = data.query.search.length
        resultsContainer.innerHTML = ""
        for(let i=0; i < numberOfResults; i++) {
            let result = document.createElement("div")
            result.classList.add("results")
            result.innerHTML = `
            <div>
                <h3>${results[i].title}</h3>
                <p>${results[i].snippet}</p>
            </div>
            <a href="https://en.wikipedia.org/?curid=${results[i].pageid}" target="_blank">Read More</a>
            `
            resultsContainer.appendChild(result)
        }
        if(searchInput.value === ""){
            resultsContainer.innerHTML = "<p>Type something in the above search input</p>"
        }
    })

}