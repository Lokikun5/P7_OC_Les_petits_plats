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

    appliances.sort();
    ingredients.sort();
    ustensils.sort();
}

function searchElement(event){

    let wordToFind = event.target.value.toLowerCase();
    
    //reset list
    let listRecipes = [];
    reaserchListRecipes = [];

    //if tags exist, the code will take the list of recipes coming from the filterTag function
    //else it will take the 50 ingrendients
    if(filteredRecipesByTags.length > 0){
        listRecipes = filteredRecipesByTags;
    }
    else {
        listRecipes = [...recipes];
    }
    
    // if the character length of the input is longer than 2, we start the resesarch
    if(wordToFind.length > 2){
        listRecipes.forEach(recipe =>
            {   
                let recipeFound = false;

                let recipieName = recipe.name.toLowerCase();
                if(recipieName.includes(wordToFind)){
                    if(!reaserchListRecipes.includes(recipe)){
                        reaserchListRecipes.push(recipe);
                        recipeFound = true;
                    }
                }

                if(!recipeFound){
                    let listIngredients = recipe.ingredients;
                    for(let i=0 ; i < listIngredients.length  ; i++){
                        let ingredient = listIngredients[i].ingredient.toLowerCase();
                        if(ingredient.includes(wordToFind)){
                            if(!reaserchListRecipes.includes(recipe)){
                                reaserchListRecipes.push(recipe); 
                            }
                            recipeFound = true;
                            break;
                        }
                    }
                }
                
                if(!recipeFound){
                    let description = recipe.description
                        if(description.includes(wordToFind)){
                        if(!reaserchListRecipes.includes(recipe)){
                            reaserchListRecipes.push(recipe); 
                        }
                    }
                }
            });
            

            //if the number of recipes is bigger than 0, we will refresh the list of appliances,ingredients,
            //ustensils with the new list of recipes and display the recipes
            loadElements(reaserchListRecipes);
            listOfRecipes = reaserchListRecipes;
            addToDOM();
    
            
    }

    //if the number of input characters is smaller than 2 then we refresh the list of appliances, ingredients...
    //and display the correct recipes
    else {
        filterByTag();
    }
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
    // filterByTag();
}

function filterByTag(){
    //refresh list
    let newListRecipes = [];
    let listRecipes = [];
    
    //if the length of the recipes coming from the researchList, we will take this list
    //else we take the 50 ingredients
    if(reaserchListRecipes.length > 0){
        listRecipes = reaserchListRecipes;
    }
    else {
        listRecipes = [...recipes];
    }
    
    //iterates through the list of recipes
    listRecipes.forEach(recipe =>
    { 
        let recipeToAdd = true;
        //check if applianceTags exists
        if(applianceTags.length > 0){
            // iniate the number of appliances to find
            let appliancesFound = 0;
            // iniate the number of appliances to get with the number of tags
            let appliancesToFound = applianceTags.length;
                let appliance = recipe.appliance.toLowerCase();
                for(let i=0; i < applianceTags.length; i++){
                    let applianceTag = applianceTags[i];
                    //if the appliance is found, increase the number of appliancesToFound by 1
                    if(appliance.includes(applianceTag)){
                        appliancesFound += 1;
                        break;
                    }    
                }
            
            //if the number of appliances found is not equal to the to the number of appliances to found
            // we will not add the recipes to the list.
            if(appliancesToFound != appliancesFound){
                recipeToAdd = false;
            }
        }
        

    
        //doing the same treatments than the appliances
        if (ingredientTags.length > 0) {
            let listIngredients = recipe.ingredients;
            let ingredientsFounds = 0;
            let ingredientsToFound = ingredientTags.length;
            for(let i=0 ; i < listIngredients.length; i++){
                let ingredient = listIngredients[i].ingredient.toLowerCase();
                for( let i=0; i < ingredientTags.length; i++){
                    let ingredientTag = ingredientTags[i];
                    if(ingredient.includes(ingredientTag)){
                        ingredientsFounds += 1;
                        break;
                    }    
                }
            }
            if(ingredientsToFound != ingredientsFounds){
                recipeToAdd = false;
            }
        }


        //doing the same treatments than the appliances
        if(ustensilTags.length > 0){
            let ustensilsFound = 0;
            let ustensilsToFound = ustensilTags.length;
            for(let i=0; i < recipe.ustensils.length; i++){
                let ustensil = recipe.ustensils[i].toLowerCase();
                for(let i=0; i < ustensilTags.length; i++){
                    let ustensilTag = ustensilTags[i];
                    if(ustensil.includes(ustensilTag)){
                        ustensilsFound += 1;
                        break;
                    }    
                }
            }
            if(ustensilsToFound != ustensilsFound){
                recipeToAdd = false;
            }
        }

        //if the recipe get all the tags, we will add it
        if(recipeToAdd == true){
            newListRecipes.push(recipe);
        }
    
    });

}


function removeTag(elementName, type){
    let index;
    switch (type){
        case 'appliance':
            //get the index of the element with the name of the element
            index = applianceTags.indexOf(elementName);
            //remove the element from the list
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

    //call the function to filter by tag
     filterByTag();

    //remove the element from the page
    const elementToRemove = document.getElementById(elementName);
    filterResult.removeChild(elementToRemove);
}

function filterButtonList(event, type){
    let wordToFind = event.target.value.toLowerCase();
    const elementsToHide = document.querySelectorAll('[tag="'+type+'"]');
    const regex = new RegExp('^'+wordToFind)
    if(wordToFind.length > 0){
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