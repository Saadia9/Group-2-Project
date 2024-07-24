document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.querySelector('#search-form');
    const searchInput = document.querySelector('#search-input');

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const userInput = searchInput.value;
        console.log('user input: ', userInput);

        localStorage.setItem('searchQuery', userInput);

        window.location.href = 'results.html';
    });
});

function renderingredient (ingredientArray) {
    return ingredientArray.map(ingredient => {
        const quantity = ingredient.quantity ? ingredient.quantity : '';
        const unit = ingredient.unit ? ingredient.unit : '';
        return `${ingredient.name}${quantity ? `, ${quantity}` : ''}${unit ? ` ${unit}` : ''}`;
    }).join('. ')
}

document.addEventListener('DOMContentLoaded', function () {
    const query = localStorage.getItem('searchQuery');
    const resultsContainer = document.querySelector('#results-container');

    if (query) {
        console.log('Query:', query);

        const filteredRecipes = recipes.filter(recipe => {  //The filter method will process each recipe in the recipes array.
            return recipe.ingredients.some(ingredient => {  // The some method tests whether at least one element in the array passes the test implemented by the provided function.
                if (ingredient.name) {
                    return ingredient.name.toLowerCase().includes(query.toLowerCase()); // converts it to lowercase for case-insensitive matching.
                } else {
                    console.warn('Ingredient without a name found:', ingredient);
                    return false;
                }
            });
        });

        if (filteredRecipes.length > 0) { // if there are recipes that match the ingredient...
            filteredRecipes.forEach(recipe => { // run this function once for each element in the array
                const recipeCard = document.createElement('div'); // Create a div element for the recipe card
                recipeCard.classList.add('card', 'mb-3'); // Add classes to the recipe card
                recipeCard.innerHTML = `
                    <img src="${recipe.imageUrl}" width = "200px" alt="${recipe.name}"> 
                    <div class="card-body">
                        <h5 class="card-title">${recipe.name}</h5>
                        <p class="card-text">${renderingredient(recipe.ingredients)}</p>
                        <p class="card-text">${recipe.instructions}<p/>
                        <a href="#" class="btn btn-primary">View Recipe</a> 
                    </div>
                `; // JUSTIN PLEASE XPLAIN JUSTIN JUSTIN JUSTIN JUSTIN, HOW DO I ADD THE QUANTITIES AND UNITS IN BETWEEN EACH INGREDIENT?
                // The MAP method creates a new array populated with the results of calling a provided function on every element in the calling array. In this case, it takes each ingredient object in the ingredients array and returns its name property. The result is an array of ingredient names.
                resultsContainer.appendChild(recipeCard);
            });
        } else {
            resultsContainer.innerHTML = '<p>No recipes found for your search.</p>';
        }
    } else {
        resultsContainer.innerHTML = '<p>No search query found. Please go back and try again.</p>';
    }
});