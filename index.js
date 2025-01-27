/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
    // Get the games container element where the game cards will be added
    const gamesContainer = document.getElementById('games-container');
    
    // Loop through each game in the 'games' array
    for (let i = 0; i < games.length; i++) {
        const game = games[i]; // Get the current game object
        
        // Create a new div for the game card
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card'); // Add the class 'game-card' to the div

        // Set the inner HTML of the game card using template literals
        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Backers:</strong> ${game.backers}</p>
        `;
        
        // Append the game card to the games container in the DOM
        gamesContainer.appendChild(gameCard);
    }
}

// Call the function with the GAMES_JSON to display all games on the page
addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element

// Use reduce to calculate the total number of individual contributions (backers)
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

// Update the contributionsCard element with the total number of contributions
const contributionsCard = document.getElementById('num-contributions');
contributionsCard.textContent = totalContributions;

// Call the function to display all games on the page
addGamesToPage(GAMES_JSON);

// Grab the total raised card element from the DOM
const raisedCard = document.getElementById("total-raised");

// Use reduce() to calculate the total amount raised across all games
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// Display the total amount raised in the raisedCard element, adding a dollar sign
raisedCard.textContent = `$${totalRaised.toLocaleString()}`;  // .toLocaleString() for formatting with commas

// set inner HTML using template literal


// grab number of games card and set its inner HTML
const numGamesCard = document.getElementById("num-games");

// Set its inner HTML to the total number of games
numGamesCard.innerHTML = GAMES_JSON.length;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // use the function we previously created to add funded games to the DOM
    addGamesToPage(fundedGames);
}


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");



// use filter or reduce to count the number of unfunded games
const unfundedCount = GAMES_JSON.reduce((count, game) => {
    return game.pledged < game.goal ? count + 1 : count;
}, 0);

console.log("Number of unfunded games:", unfundedCount);




// create a string that explains the number of unfunded games using the ternary operator


// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
});

// Use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...rest] = sortedGames;

// Create a new element for the top pledged game and append it to the firstGameContainer
const firstGameElement = document.createElement("p");
firstGameElement.textContent = `${firstGame.name}`;
firstGameContainer.appendChild(firstGameElement);

// Create a new element for the runner-up game and append it to the secondGameContainer
const secondGameElement = document.createElement("p");
secondGameElement.textContent = `${secondGame.name}`;
secondGameContainer.appendChild(secondGameElement);
 