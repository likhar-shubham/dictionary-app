let inputWord = document.getElementById('word-input');
let contentDiv = document.getElementById('content');
let searchBtn = document.getElementById('search-btn');
let resetBtn = document.getElementById('reset-btn');
let word = '';
let wordObj = {
    partOfSpeech: {
        value: "", meaningsArray: []
    }
}
let meaningsData = {}

searchBtn.addEventListener('click', searchMeaning);
resetBtn.addEventListener('click', resetContent);

// Function for handling the click event and fetching the data
function searchMeaning(event) {
    contentDiv.innerText = "Loading..."
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord.value}`;
    fetch(url)
        .then(response => response.json())
        .then(result => filterData(result));
}

// Function for filtering data and setting it according to the DOM
function filterData(data) {
    // Condition check for the unavailable meaning
    meaningsData = data.title === "No Definitions Found" ? null : data[0].meanings;
    let html = `<h3>${inputWord.value}</h3>`
    contentDiv.innerHTML = html;
    if (meaningsData === null) {
        contentDiv.innerHTML = `<h4>Sorry, the meaning for "${inputWord.value}" cannot be found</h4>`
        inputWord.value = "";
    } else {
        meaningsData.forEach(element => {
            // Appending the HTML string for adding the elements to the DOM
            html += `<h4 class=prt-speech>Part of Speech : ${element.partOfSpeech}</h4> 
            <ol class="meaning-list">`;
            element.definitions.forEach(obj => {
                html += `<li>${obj.definition}</li>`
            })
            html += `</ol>`
        });
        inputWord.value = "";
        contentDiv.innerHTML = html;
    }
}

// Function for resetting the content data
function resetContent() {
    contentDiv.innerHTML = "";
}