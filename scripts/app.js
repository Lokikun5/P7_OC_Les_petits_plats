import {recipes} from "./recipes.js";
import {recipeFactory} from "./recipeFactory.js";



let listOfRecipes = [...recipes];
let appliances = [];
let ingredients = [];
let ustensils = [];
let ingredientTags = [];
let applianceTags = [];
let ustensilTags = [];

let reaserchListRecipes = [];
//init list appliances/recipes/ingredients
loadElements(recipes);

// open dropdown
const ingredientsInput = document.getElementById('ingredientsInput');
const ingredientsSearch = document.getElementById('ingredientsSearch');
const ingredientsDiv = document.getElementById('ingredientsDiv');

const ustensilsInput = document.getElementById('ustensilsInput');
const ustensilsDiv = document.getElementById('ustensilsDiv');
const ustensilsSearch = document.getElementById('ustensilsSearch');

const appliancesSearch = document.getElementById('appliancesSearch');
const appliancesInput = document.getElementById('appliancesInput');
const appliancesDiv = document.getElementById('appliancesDiv');

const filterResult = document.getElementsByClassName('filterResult')[0];
ingredientsInput.addEventListener('click', function(){getFilter(ingredientsInput, ingredientsDiv, 'ingredient', ingredients)});
ustensilsInput.addEventListener('click', function(){getFilter(ustensilsInput, ustensilsDiv, 'ustensil', ustensils)});

appliancesInput.addEventListener('click', function(){getFilter(appliancesInput, appliancesDiv, 'appliance', appliances)});
appliancesSearch.addEventListener('click', function(){getSmallFilter(appliancesInput, appliancesDiv, 'appliance', appliances)});

ingredientsSearch.addEventListener('input', (event) => {filterButtonList(event, 'ingredient')});
ingredientsSearch.addEventListener('click', function(){getSmallFilter(ingredientsInput, ingredientsDiv, 'ingredient', ingredients)});

ustensilsSearch.addEventListener('input', (event) => {filterButtonList(event, 'ustensil')});
ustensilsSearch.addEventListener('click', function(){getSmallFilter(ustensilsInput, ustensilsDiv, 'ustensil', ustensils)});

appliancesSearch.addEventListener('input', (event) => {filterButtonList(event, 'appliance')});


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


// load all Recipe card
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

// open dropdown function
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


function getSmallFilter(input, div, type, listOfElement){
    let open = div.getAttribute('open');
    if(open === 'false'){
        div.setAttribute('open','true');
        div.style.animation = '1s increaseSmallSize forwards';
        input.value = '';
        const listElements = document.createElement('div');
        div.appendChild(listElements);
        listElements.setAttribute('class','smallListButtons');
        for (let i =0; i < listOfElement.length; i++){
            const element = document.createElement('p');
            element.setAttribute('tag', type);
            element.setAttribute('name', listOfElement[i]);
            element.setAttribute('hide', 'false');
            element.addEventListener('click', function(){addATag(listOfElement[i],type,div,listElements,input)});
            element.innerText = listOfElement[i];
            listElements.appendChild(element);
        }
        
    }
   
}

function addATag(elementName, type, div, listElements, input){
    console.log('salut')
    
    const tag = document.createElement('div');
    tag.setAttribute('class', 'filter');
    tag.setAttribute('id', elementName);
    const text = document.createElement('p');
    text.innerText = elementName;
    text.setAttribute('class', 'text');
    tag.appendChild(text);
    const removeButton = document.createElement('img');
    removeButton.setAttribute('src', 'img/close.png');
    removeButton.setAttribute('class','downArrow');
    removeButton.addEventListener('click', function(){removeTag(elementName,type)})
    tag.appendChild(removeButton);
    let color;
    let inputText;
    switch (type){
        case 'appliance':
            color = '#68D9A4';
            inputText = 'Appareils';
            applianceTags.push(elementName);

            break;
        case 'ustensil':
            color = '#ED6454';
            inputText = 'Ustensiles';
            ustensilTags.push(elementName);
            break;
        
        case 'ingredient':
            color = '#3282F7';
            inputText = 'Ingredient';
            ingredientTags.push(elementName);
            break;
    }
    tag.style.backgroundColor = color;
    filterResult.appendChild(tag);
    div.removeChild(listElements);
    div.style.animation = '1s decreaseSize forwards';
    div.setAttribute('open','false');
    input.value = inputText;
}




function removeTag(elementName, type){
    let index;
    switch (type){
        case 'appliance':
            
            index = applianceTags.indexOf(elementName);
           
            applianceTags.splice(index, 1);
            break;
        
        case 'ustensil':
            index = ustensilTags.indexOf(elementName);
            ustensilTags.splice(index, 1);
            break;
        
        case 'ingredient':
            index = ingredientTags.indexOf(elementName);
            ingredientTags.splice(index, 1);
            break;
    }

   

   
    const elementToRemove = document.getElementById(elementName);
    filterResult.removeChild(elementToRemove);
}

function filterButtonList(event, type){
    let wordFind = event.target.value.toLowerCase();
    const elementsToHide = document.querySelectorAll('[tag="'+type+'"]');
    const regex = new RegExp('^'+wordFind)
    if(wordFind.length > 0){
        elementsToHide.forEach(element => {
            let name = element.getAttribute('name');
            if(!name.match(regex)){
                element.setAttribute('hide', 'true');
            }
        });
    }
    else{
        elementsToHide.forEach(element => {
            element.setAttribute('hide', 'false');
        });
    }
}