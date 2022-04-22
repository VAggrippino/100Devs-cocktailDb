// The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM


function getCocktail() {
    // TODO: Handle null results
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

function compileIngredients(drink) {
    const drinkIngredients = document.createElement(`div`);
    drinkIngredients.classList.add(`drink__ingredients`);

    const drinkList = document.createElement(`ul`);
    drinkList.classList.add(`drink__ingredients__list`);

    Object.keys(drink).forEach(key => {
        if (key.includes(`strIngredient`)) {
            if (drink[key] !== null && drink[key].trim() !== ``) {
                const measureKey = key.replace(`strIngredient`, `strMeasure`);
                const ingredientText = (drink[measureKey] ?? ``) + ` ${drink[key]}`;

                const drinkItem = document.createElement(`li`);
                drinkItem.innerText = ingredientText;
                drinkList.appendChild(drinkItem);
            }
        }
    });

    drinkIngredients.appendChild(drinkList);

    return drinkIngredients;
}

function showResults(results) {
    console.log(results);
    const resultsBlock = document.querySelector(`.results`);
    resultsBlock.innerHTML = ``;

    const intro = document.createElement(`div`);
    intro.classList.add(`results__intro`);
    intro.innerText = `Showing ${results.drinks.length} results`;

    document.querySelector(`body`).classList.add(`showResults`);

    resultsBlock.appendChild(intro);

    results.drinks.forEach(drink => {
        // Create a block to show the drink information
        const drinkBlock = document.createElement(`div`);
        drinkBlock.classList.add(`drink`);

        drinkBlock.addEventListener(`click`, (e) => {
            const selectedDrink = {
                image: document.querySelector(`.selectedDrink__image`),
                name: document.querySelector(`.selectedDrink__name`),
                tags: document.querySelector(`.selectedDrink__tags`),
                glass: document.querySelector(`.selectedDrink__glass`),
                ingredients: document.querySelector(`.selectedDrink__ingredients`),
                instructions: document.querySelector(`.selectedDrink__instructions`),
                video: document.querySelector(`.selectedDrink__video`),
            }

            // Set the image
            selectedDrink.image.querySelector(`img`).alt = drink.strDrink;
            selectedDrink.image.querySelector(`img`).src = drink.strDrinkThumb;

            // Set the name
            selectedDrink.name.querySelector(`h1`).innerText = drink.strDrink;

            // Set the tags
            selectedDrink.tags.innerHTML = `Tags: ${drink.strTags ?? ``}`;

            // Set the glass
            selectedDrink.glass.innerHTML = `Glass: ${drink.strGlass ?? ``}`;

            // Set the ingredients
            selectedDrink.ingredients.querySelector(`.content`).appendChild(compileIngredients(drink));

            // Set the instructions
            selectedDrink.instructions.querySelector(`.content`).innerText = drink.strInstructions;

            // Set the video
            if (drink.strVideo) {
                selectedDrink.video.innerHTML = `
                    <h2>Video</h2>
                    <iframe width="560" height="315" src="${drink.strVideo}" frameborder="0" allowfullscreen></iframe>
                `;
            } else {
                selectedDrink.video.innerHTML = ``;
            }

            document.querySelector(`.selectedDrink`).classList.add(`visible`);
            document.body.classList.add(`drinkSelected`);
        });

        // Create a block for the drink name
        const drinkName = document.createElement(`div`);
        drinkName.classList.add(`drink__name`);
        drinkName.innerText = drink.strDrink;

        // Add the drink name to the drink block
        drinkBlock.appendChild(drinkName);

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

        // Get the ingredients
        const drinkIngredients = compileIngredients(drink);
        drinkBlock.appendChild(drinkIngredients);

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
        if (event.keyCode === 13) getCocktail();
    });

    const selectedDrink__close = document.querySelector(`.selectedDrink__close`);
    selectedDrink__close.addEventListener(`click`, () => {
        const selectedDrink = document.querySelector(`.selectedDrink`);
        selectedDrink.classList.remove(`visible`);
        document.body.classList.remove(`drinkSelected`);
    });
});
