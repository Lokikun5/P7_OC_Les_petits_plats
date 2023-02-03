import {recipes} from "./recipes.js";
import {recipeFactory} from "./recipeFactory.js";


console.log (recipes)
console.log(recipeFactory)
// let listOfRecipes = [...recipes];

// loadElements(recipes);
// addToDOM();

// function addToDOM(){
//     const searchOuput = document.getElementById('searchResult');
//     searchOuput.innerHTML = '';

//     const result = document.createElement('div');
//     result.setAttribute('id', 'result');
//     listOfRecipes.forEach(recipe => {
//         const recipeModel = recipeFactory(recipe);
//         const recipeCard = recipeModel.getRecipeCardDom();
//         result.appendChild(recipeCard);
//     });
// }