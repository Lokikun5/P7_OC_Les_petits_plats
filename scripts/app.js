import {recipes} from "./recipes.js";
import {recipeFactory} from "./recipeFactory.js";



let listOfRecipes = [...recipes];
let appliances = [];
let ingredients = [];
let ustensils = [];
let ingredientTags = [];
let applianceTags = [];
let ustensilTags = [];

// let reaserchListRecipes = [];
//init list appliances/recipes/ingredients
loadElements(recipes);
const searchBar = document.getElementById('searchBar');

searchBar.addEventListener('input',(event) => {algo()})
//  ingredients dropdown triger  
const ingredientsInput = document.getElementById('ingredientsInput');
const ingredientsSearch = document.getElementById('ingredientsSearch');
const largeDropdownInput = document.getElementById('largeDropdownInput');
// Search ingredients
ingredientsSearch.addEventListener('input', (event) => {filterButtonList(event, 'ingredient')});
largeDropdownInput.addEventListener('input', (event) => {filterButtonList(event, 'ingredient')});

//  ustensils dropdown triger 
const ustensilsInput = document.getElementById('ustensilsInput');
const ustensilsSearch = document.getElementById('ustensilsSearch');
const largeDropdownInputU = document.getElementById('largeDropdownInputU');

// search ustensils
ustensilsSearch.addEventListener('input', (event) => {filterButtonList(event, 'ustensil')});
largeDropdownInputU.addEventListener('input', (event) => {filterButtonList(event, 'ustensil')});

// appliances dropdown triger
const appliancesSearch = document.getElementById('appliancesSearch');
const appliancesInput = document.getElementById('appliancesInput');
const largeDropdownInputA = document.getElementById('largeDropdownInputA');

// search appliances
appliancesSearch.addEventListener('input', (event) => {filterButtonList(event, 'appliance')});
largeDropdownInputA.addEventListener('input', (event) => {filterButtonList(event, 'appliance')});

// small and big dropdown
const newDropdown = document.querySelector('.dropdown');
const largedropdown = document.querySelector('.largedropdown');


// small and big dropdown for ustensils
const newDropdown2 = document.querySelector('.dropdown2');
const largedropdown2 = document.querySelector('.largedropdown2');

// small and big dropdown for appliances
const newDropdown3 = document.querySelector('.dropdown3');
const largedropdown3 = document.querySelector('.largedropdown3');


const filterResult = document.getElementsByClassName('filterResult')[0];


function loadElements(recipes){
 appliances = [];
 ingredients = [];
 ustensils = [];

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
function addToDOM(recipes){
    const searchOuput = document.getElementById('searchResult');
    searchOuput.innerHTML = '';

    if(recipes.length == 0 ){
        const noFound = document.createElement('p');
        noFound.innerHTML = 'Aucun resultat';
        noFound.setAttribute('class','noResult');
        searchOuput.appendChild(noFound);
    }else{
        const result = document.createElement('div');
        result.setAttribute('id', 'result');
        recipes.forEach(recipe => {
            const recipeModel = recipeFactory(recipe);
            const recipeCard = recipeModel.getRecipeCardDom();
            result.appendChild(recipeCard);
        });
        searchOuput.appendChild(result);
    }
        
} addToDOM(listOfRecipes)

// load list of element (for ingredients)
function getSmallFilter(input, newDropdown, type, listOfElement) {
  input.value = "";
  const listElements = document.createElement("div");
  listElements.setAttribute("class", "dropdown");

  // Check if elements already exist, if not, then just create the elements
  if (newDropdown.childElementCount === 0) {
    newDropdown.appendChild(listElements);

    listElements.setAttribute("class", "smallListButtons");

    for (let i = 0; i < listOfElement.length; i++) {
      const element = document.createElement("p");
      element.setAttribute("tag", type);
      element.setAttribute("name", listOfElement[i]);
      element.setAttribute("hide", "false");
      element.addEventListener("click", function () {
        addATag(listOfElement[i], type, newDropdown, listElements, input);
      });
      element.innerText = listOfElement[i];
      listElements.appendChild(element);
    }
  }
}
// load list of element (for ingredients in large dropdown)
function getFilter(input, largedropdown, type, listOfElement){

    input.value = '';
    const listElements = document.createElement('div');
    listElements.setAttribute('class','dropdown');
    largedropdown.appendChild(listElements);
    listElements.setAttribute('class','smallListButtons');
    listElements.style.display = "flex";
    listElements.style.flexWrap = "wrap";
    listElements.style.marginTop = "41px";

    

    for (let i =0; i < listOfElement.length; i++){
        const element = document.createElement('p');
        element.setAttribute('tag', type);
        element.setAttribute('name', listOfElement[i]);
        element.setAttribute('hide', 'false');
        element.addEventListener('click', function(){addATag(listOfElement[i],type,largedropdown,listElements,input)});
        element.innerText = listOfElement[i];
        listElements.appendChild(element);
    } 
}
// load list of element function (for ustensiles)
function getSmallFilterU(input, newDropdown2, type, listOfElement) {
  input.value = "";
  const listElements = document.createElement("div");
  listElements.setAttribute("class", "dropdown");
  // Check if elements already exist, if not, then just create the elements
  if (newDropdown2.childElementCount === 0) {
    newDropdown2.appendChild(listElements);
    listElements.setAttribute("class", "smallListButtons");

    for (let i = 0; i < listOfElement.length; i++) {
      const element = document.createElement("p");
      element.setAttribute("tag", type);
      element.setAttribute("name", listOfElement[i]);
      element.setAttribute("hide", "false");
      element.addEventListener("click", function () {
        addATag(listOfElement[i], type, newDropdown2, listElements, input);
      });
      element.innerText = listOfElement[i];
      listElements.appendChild(element);
    }
  }
}
// load list of element (for ustensiles in large dropdown)
function getFilterU(input, largedropdown2, type, listOfElement){

    input.value = '';
    const listElements = document.createElement('div');
    listElements.setAttribute('class','dropdown');
    largedropdown2.appendChild(listElements);
    listElements.setAttribute('class','smallListButtons');
    listElements.style.display = "flex";
    listElements.style.flexWrap = "wrap";
    listElements.style.marginTop = "41px";
    for (let i =0; i < listOfElement.length; i++){
        const element = document.createElement('p');
        element.setAttribute('tag', type);
        element.setAttribute('name', listOfElement[i]);
        element.setAttribute('hide', 'false');
        element.addEventListener('click', function(){addATag(listOfElement[i],type,largedropdown2,listElements,input)});
        element.innerText = listOfElement[i];
        listElements.appendChild(element);
    } 
}

// load list of element function (for appliances)
function getSmallFilterA(input, newDropdown3, type, listOfElement) {
  input.value = "";
  const listElements = document.createElement("div");
  listElements.setAttribute("class", "dropdown");
  if (newDropdown3.childElementCount === 0){
    newDropdown3.appendChild(listElements);
  listElements.setAttribute("class", "smallListButtons");

  listElements.innerHTML = ""; // Vide le contenu HTML de la div

  for (let i = 0; i < listOfElement.length; i++) {
    const element = document.createElement("p");
    element.setAttribute("tag", type);
    element.setAttribute("name", listOfElement[i]);
    element.setAttribute("hide", "false");
    element.addEventListener("click", function () {
      addATag(listOfElement[i], type, newDropdown3, listElements, input);
    });
    element.innerText = listOfElement[i];
    listElements.appendChild(element);
  }
  }
  
}
// load list of element function (for appliances large dropdown)
function getFilterA(input, largedropdown3, type, listOfElement){

    input.value = '';
    const listElements = document.createElement('div');
    listElements.setAttribute('class','dropdown');
    largedropdown3.appendChild(listElements);
    listElements.setAttribute('class','smallListButtons');
    listElements.style.display = "flex";
    listElements.style.flexWrap = "wrap";
    listElements.style.marginTop = "41px";
    for (let i =0; i < listOfElement.length; i++){
        const element = document.createElement('p');
        element.setAttribute('tag', type);
        element.setAttribute('name', listOfElement[i]);
        element.setAttribute('hide', 'false');
        element.addEventListener('click', function(){addATag(listOfElement[i],type,largedropdown3,listElements,input)});
        element.innerText = listOfElement[i];
        listElements.appendChild(element);
    } 
}

// ingredients dropdown function
ingredientsSearch.addEventListener('click', function(){
    
    newDropdown.style.display = "block";
    largedropdown.style.display = "none";
    
    newDropdown2.style.display = "none";
    largedropdown2.style.display = "none";

    newDropdown3.style.display = "none";
    largedropdown3.style.display = "none";

    document.querySelector('.appliancesDiv').style.display = "block";

    getSmallFilter(ingredientsInput, newDropdown, 'ingredient', ingredients)
    

});
// document.addEventListener('click', function(event) {
//     // Check if the clicked element is within the dropdown
//     if (!newDropdown.contains(event.target) && !largedropdown.contains(event.target)) {
//       // If the clicked element is not within the dropdown, close the dropdown
//       newDropdown.style.display = "none";
//       largedropdown.style.display = "none";
//     }
//   });
ingredientsInput.addEventListener('click', function(){
    
    largedropdown.style.display = "block";
    newDropdown.style.display = "none";
    document.querySelector('.ingredientsDiv').style.display = "none";
    document.querySelector('.appliancesDiv').style.display = "block";
    newDropdown2.style.display = "none";
    largedropdown2.style.display = "none";

    newDropdown3.style.display = "none";
    largedropdown3.style.display = "none";

    getFilter(ingredientsInput, largedropdown, 'ingredient', ingredients)

});

// ustensils dropdown function
ustensilsSearch.addEventListener('click', function(){
    
    newDropdown2.style.display = "block";
    largedropdown2.style.display = "none";

    newDropdown.style.display = "none";
    largedropdown.style.display = "none";

    newDropdown3.style.display = "none";
    largedropdown3.style.display = "none";

    document.querySelector('.ingredientsDiv').style.display = "block";
    document.querySelector('.appliancesDiv').style.display = "block";

    getSmallFilterU(ustensilsInput, newDropdown2, 'ustensil', ustensils)


});

ustensilsInput.addEventListener('click', function(){
    
    largedropdown2.style.display = "block";
    newDropdown2.style.display = "none";
    document.querySelector('.ustensilsDiv').style.display = "none";
    
    newDropdown.style.display = "none";
    largedropdown.style.display = "none";

    newDropdown3.style.display = "none";
    largedropdown3.style.display = "none";

    
    getFilterU(ustensilsInput, largedropdown2, 'ustensil', ustensils);
    document.querySelector('.ingredientsDiv').style.display = "block";
    document.querySelector('.appliancesDiv').style.display = "block";

});


// appliance dropdown function
appliancesSearch.addEventListener('click', function(){
    
    newDropdown3.style.display = "block";
    largedropdown3.style.display = "none";

    largedropdown2.style.display = "none";
    newDropdown2.style.display = "none";

    newDropdown.style.display = "none";
    largedropdown.style.display = "none";
    document.querySelector('.ustensilsDiv').style.display = "block";
    document.querySelector('.ingredientsDiv').style.display = "block";
    document.querySelector('.appliancesDiv').style.display = "block";
    getSmallFilterA(appliancesInput, newDropdown3, 'appliance', appliances);

});

appliancesInput.addEventListener('click', function(){
    
    largedropdown3.style.display = "block";
    newDropdown3.style.display = "none";
    document.querySelector('.appliancesDiv').style.display = "none";

    largedropdown2.style.display = "none";
    newDropdown2.style.display = "none";

    newDropdown.style.display = "none";
    largedropdown.style.display = "none";

    document.querySelector('.ustensilsDiv').style.display = "block";
    document.querySelector('.ingredientsDiv').style.display = "block";
    getFilterA(ustensilsInput, largedropdown3, 'appliance', appliances)

});


function addATag(elementName, type, div, listElements, input){
    
    
    const tag = document.createElement('div');
    tag.setAttribute('class', 'filter');
    tag.setAttribute('class', 'tagSet');
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
           
            if (!applianceTags.includes(elementName)){
                color = '#68D9A4';
                inputText = 'Appareils';
                applianceTags.push(elementName);
                
            }

            break;
        case 'ustensil':
            if(!ustensilTags.includes(elementName)){
                color = '#ED6454';
                inputText = 'Ustensiles';
                ustensilTags.push(elementName);
            }
            
            break;
        
        case 'ingredient':
            if(!ingredientTags.includes(elementName)){
                color = '#3282F7';
                inputText = 'Ingredient';
                ingredientTags.push(elementName);
            }
            
            break;
    }
    tag.dataset.type = inputText;
    tag.style.backgroundColor = color;
    filterResult.appendChild(tag);
    div.removeChild(listElements);
    newDropdown.style.display = "none";
    largedropdown.style.display = "none";
    newDropdown2.style.display = "none";
    largedropdown2.style.display = "none";
    newDropdown3.style.display = "none";
    largedropdown3.style.display = "none";
    document.querySelector('.ingredientsDiv').style.display = "block";
    document.querySelector('.ustensilsDiv').style.display = "block";
    document.querySelector('.appliancesDiv').style.display = "block";
    input.value = inputText;

    algo()
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
    algo()
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

function algo(){
   const txt = searchBar.value;
   console.log(txt);
   const tags = filterResult.querySelectorAll(".tagSet");

   const tagsArray = [];

   tags.forEach(tag => {
    tagsArray.push({
        name: tag.innerText,
        type: tag.dataset.type,
    }) 
   })
   
    //    pour chaque recette 
    const recipesFilter = []
    listOfRecipes.forEach(rec => {
        let isTagMatch = true;
        // etape 1 : veriffier dans la recette, si on a un tag Ingrédients de coché et si la recette l'a aussi
        
        const ingredientsTags = tagsArray.filter((tag) => tag.type === "Ingredient");
        
        const ingredientsArray = [];

        rec.ingredients.forEach(ing => {
            ingredientsArray.push(ing.ingredient.toLowerCase())
        })
        ingredientsTags.forEach((tag) => {
         
          
        if (!ingredientsArray.includes(tag.name.toLowerCase())) {
            isTagMatch = false;
            
        }
        });
        
        // etape 2 : veriffier dans la recette, si on a un tag ustencil de coché et si la recette l'a aussi 
        const ustensilsTags = tagsArray.filter((tag) => tag.type === "Ustensiles");
        const usentilsArrey = rec.ustensils.map(item => item.toLowerCase());

        ustensilsTags.forEach((tag) => {
        if (!usentilsArrey.includes(tag.name.toLowerCase())) {
            isTagMatch = false;
        }
        });

        // Étape 3 : Vérifier si les tags appareils sélectionnés sont dans la recette
        const appliancesTags = tagsArray.filter((tag) => tag.type === "Appareils");

        appliancesTags.forEach((tag) => {
        if (rec.appliance.toLowerCase() !== tag.name.toLowerCase()) {
            isTagMatch = false;
            console.log(isTagMatch)
        }
        });

        // Étape 4 : Vérifier si le texte recherché est présent dans la recette
        if (txt.length >= 3) {
            const searchRegex = new RegExp(txt, "i");
  
        if (
          !searchRegex.test(rec.name) &&
          !searchRegex.test(rec.description) &&
          !rec.ingredients.some((ingredient) => searchRegex.test(ingredient.ingredient))
        ) {
          isTagMatch = false;
        }
      }
        console.log(isTagMatch);
        // Étape 5 : Si toutes les vérifications sont passées, ajouter la recette à la liste filtrée
        if (isTagMatch) {
            recipesFilter.push(rec);
        }
    })
    
    // Étape 6 : Charger les éléments filtrés
    console.log(recipesFilter);
    loadElements(recipesFilter);
    addToDOM(recipesFilter);
}
