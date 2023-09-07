// search mode to determine search button clicked
let searchMode = "none";

// DOM elements for functions --------------------------------------------------------
const myResultElement = document.getElementById("myResult");

const myFirstLetterInput = document.getElementById("firstLetterInput");
const myFirstLetterSearchButton = document.getElementById("firstLetterSearch");

myFirstLetterSearchButton.addEventListener("click", () => {
  searchMode = "firstLetterSearch";
  console.info(myFirstLetterInput.value);
  getRecipesByFirstLetter(); // Call the function without passing any arguments
});

const myNameInput = document.getElementById("nameInput");
const myNameSearchButton = document.getElementById("nameSearch");

myNameSearchButton.addEventListener("click", () => {
  searchMode = "nameSearch";
  console.info(myNameInput.value);
  getRecipesByName(myNameInput.value);
});

const myIdInput = document.getElementById("idInput");
const myIdSearchButton = document.getElementById("idSearch");

myIdSearchButton.addEventListener("click", () => {
  searchMode = "idSearch";
  console.info(myIdInput.value);
  getRecipesById(myIdInput.value); // Pass the input value as an argument
});

//-------------------------------------------------------------------------------------

// Fetch functions --------------------------------------------------------------------

// Fiken hjelp fra chatgpt ikke helt sikkert at jeg forstar det hille

function getRecipesByFirstLetter() {
  const firstLetter = myFirstLetterInput.value; // Access the value of the input field
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
      return response.json();
    })
    .then((myData) => {
      setupResultView(myData);
    })
    .catch((error) => {
      searchMode = "errorMessage";
      console.error("Error:", error);
    });
}

function getRecipesByName(myName) {
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${myName}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
      return response.json();
    })
    .then((myData) => {
      setupResultView(myData);
    })
    .catch((error) => {
      searchMode = "errorMessage";
      console.error("Error:", error);
    });
}

function getRecipesById(myId) {
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${myId}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
      return response.json();
    })
    .then((myData) => {
      setupResultView(myData);
    })
    .catch((error) => {
      searchMode = "errorMessage";
      console.error("Error:", error);
    });
}

// View code --------------------------------------------------------------------------

function setupResultView(myData) {
  switch (searchMode) {
    case "firstLetterSearch":
      console.log(myData);
      // Do view stuff with the data here
      break;

    case "nameSearch":
      console.log(myData.meals);
      let myText = "";

      myData.meals.map((myMeal) => {
        myText += myMeal.strMeal + ", ";
      });

      myResultElement.textContent = myText;
      break;

    case "idSearch":
      console.log(myData);
      // Do view stuff with the data here
      break;

    case "errorMessage":
      console.log(myData);
      // Handle error message
      break;

    default:
      console.warn("Oops, no data to show from setupResultView");
      break;
  }
}
