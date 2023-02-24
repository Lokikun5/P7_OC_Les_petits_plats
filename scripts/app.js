import {recipes} from "./recipes.js";
import {recipeFactory} from "./recipeFactory.js";





let listOfRecipes = [...recipes];
let appliances = [];
let ingredients = [];
let ustensils = [];

//init list appliances/recipes/ingredients
loadElements(recipes);

// open dropdown
const ingredientsInput = document.getElementById('ingredientsInput');
const ingredientsDiv = document.getElementById('ingredientsDiv');
const ustensilsInput = document.getElementById('ustensilsInput');
const ustensilsDiv = document.getElementById('ustensilsDiv');
const appliancesInput = document.getElementById('appliancesInput');
const appliancesDiv = document.getElementById('appliancesDiv');
ingredientsInput.addEventListener('click', function(){getFilter(ingredientsInput, ingredientsDiv, 'ingredient', ingredients)});

function loadElements(recipes){
 appliances = [];
 ingredients = [];
 ustensils = [];
 console.log(appliances)
 console.log(ingredients)
 console.log(ustensils)
 recipes.forEach(recipie =>
    {   
        //get appliance
        let applianceToLowerCase = recipie.appliance.toLowerCase();
        if(!appliances.includes(applianceToLowerCase)){
            appliances.push(applianceToLowerCase);
        }


        //get ingredients
        let listIngredients = recipie.ingredients;
        for( let i=0 ; i < listIngredients.length  ; i++){
            let ingredient = listIngredients[i].ingredient;
            let ingredientToLowerCase = ingredient.toLowerCase();
            
            if(!ingredients.includes(ingredientToLowerCase)){
                ingredients.push(ingredientToLowerCase); 
            }
        }

        //get usentils
        let listUstensils = recipie.ustensils;
        for( let i=0 ; i < listUstensils.length  ; i++){
            let ustensil = listUstensils[i];
            let ustensilToLowerCase = ustensil.toLowerCase();
            
            if(!ustensils.includes(ustensilToLowerCase)){
                ustensils.push(ustensilToLowerCase); 
            }
        }
    });

    

}

function addToDOM(){
    const searchOuput = document.getElementById('searchResult');
    searchOuput.innerHTML = '';

    if(listOfRecipes.length == 0 ){
        const noFound = document.createElement('p');
        noFound.innerHTML = 'Aucun resultat';
        noFound.setAttribute('class','noResult');
        searchOuput.appendChild(noFound);
    }else{
        const result = document.createElement('div');
        result.setAttribute('id', 'result');
        listOfRecipes.forEach(recipe => {
            const recipeModel = recipeFactory(recipe);
            const recipeCard = recipeModel.getRecipeCardDom();
            result.appendChild(recipeCard);
        });
        searchOuput.appendChild(result);
    }
        
} addToDOM()

function getFilter(input, div, type, listOfElement){
    let open = div.getAttribute('open');
    if(open === 'false'){
        div.setAttribute('open','true');
        div.style.animation = '1s increaseSize forwards';
        input.value = '';
        const listElements = document.createElement('div');
        div.appendChild(listElements);
        listElements.setAttribute('class','listButtons');
        for (let i =0; i < listOfElement.length; i++){
            const element = document.createElement('p');
            element.setAttribute('tag', type);
            element.setAttribute('name', listOfElement[i]);
            element.setAttribute('hide', 'false');
            element.addEventListener('click', function(){addATag(listOfElement[i],type,div,listElements,input)})
            element.innerText = listOfElement[i];
            listElements.appendChild(element);
        }
    }
    
}