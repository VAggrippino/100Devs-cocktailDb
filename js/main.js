// The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM


function getCocktail() {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php`;
    const cocktailName = document.querySelector(`.cocktailName`);

    const params = {
        s: cocktailName.value,
    };

    fetch(url + `?` + new URLSearchParams(params))
        .then(response => response.json())
        .then(data => {
            const results = {
                query: cocktailName.value,
                drinks: data.drinks,
            };
            showResults(results);
        }
    );
};

function showResults(results) {
    console.log(results);

    const resultsBlock = document.querySelector(`.results`);

    const intro = document.createElement(`div`);
    intro.classList.add(`intro`);
    intro.innerText = `Showing ${results.drinks.length} results`;

    document.querySelector(`main`).classList.add(`showResults`);

    resultsBlock.appendChild(intro);

    results.drinks.forEach(drink => {
        // Create a block to show the drink information
        const drinkBlock = document.createElement(`div`);
        drinkBlock.classList.add(`drink`);

        // Create a block for the drink thumbnail
        const drinkThumbnail = document.createElement(`div`);
        drinkThumbnail.classList.add(`drink__thumbnail`);

        // Add the image to the thumbnail block
        const drinkImage = document.createElement(`img`);
        drinkImage.src = drink.strDrinkThumb;

        // Add the image to the thumbnail block
        drinkThumbnail.appendChild(drinkImage);

        // Add the thumbnail to the drink block
        drinkBlock.appendChild(drinkThumbnail);

        // Create a block for the drink name
        const drinkName = document.createElement(`div`);
        drinkName.classList.add(`drink__name`);
        drinkName.innerText = drink.strDrink;

        // Add the drink name to the drink block
        drinkBlock.appendChild(drinkName);

        // Create a block for the drink instructions
        const drinkInstructions = document.createElement(`div`);
        drinkInstructions.classList.add(`drink__instructions`);
        drinkInstructions.innerText = drink.strInstructions;

        // Add the instructions to the drink block
        drinkBlock.appendChild(drinkInstructions);

        resultsBlock.appendChild(drinkBlock);
    });
}

window.addEventListener(`load`, () => {
    const getCocktailButton = document.querySelector(`#getCocktail`);
    getCocktailButton.addEventListener(`click`, getCocktail);

    const cocktailQuery = document.querySelector(`.cocktailName`);
    cocktailQuery.addEventListener(`keyup`, (event) => {
        if (event.keyCode === 13) {
            getCocktail();
        }
    });
});