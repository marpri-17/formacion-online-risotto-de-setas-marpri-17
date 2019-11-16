'use strict';


const recipesPath = "./assets/services/recipes.json"
const mixCheckboxes = document.querySelectorAll(".js-mix-check")
const mixIngredientsList = document.querySelector(".js-list")

let availableRecipes = [];
let partialItemsAndQuantity = []
let testValueSelectedRecipe = "recipe-01"

function getRecipes() {
    return fetch(recipesPath)
        .then(resp => resp.json())
        .then(data => {
            data = formatData(data);
            saveDatainRecipes(data);
            // renderOptionsForRecipes(data) // return select value matching item;
            paintMixForSelectedOption(data[0]);
            readCheckboxesItemsandQuantity() //data[0];



        })
        .catch(err => console.log(err))
}

function formatData(recipes) {
    let formatedRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
        recipes[i].id = `0${i}`;
        formatedRecipes.push(recipes[i])
    }
    console.log(formatedRecipes)
    return formatedRecipes
}
const saveDatainRecipes = (data) => availableRecipes = data;

function paintMixForSelectedOption(selectedRecipe) {
    const currency = selectedRecipe.currency;
    selectedRecipe.ingredients.map(ingredient => {
        const html = `
        <input class="form-check-input check js-mix-check" type="checkbox" value="" id="" checked>
        <input type="number" class="js-quantity" id="selectQuantity"value= 1 />
        <label for="selectQuantity" class="sr-only">Cantidad</label>
       <label class="form-check-label" for="">
       <div >
           <div >
           <div class="js-ingredient_name">${ingredient.product}</div>
           <div>${ingredient.brand}<div>
           <span>${ingredient.quantity}</span>
           </div>
       </label>
       <div class="js-price">${ingredient.price}<small> ${currency}</small></div>
       `
        const newItem = document.createElement("div");
        newItem.setAttribute("class", "form-check flex-row flex-nowrap justify-content-center align-items-center selecteditem js-ingredients");
        newItem.innerHTML = html;
        mixIngredientsList.appendChild(newItem)
    })
}

function readCheckboxesItemsandQuantity() {
    let partialItemsAndQuantity = []
    let ingredientsElement = document.querySelectorAll(".js-ingredients");
    for (let ingredient of ingredientsElement) {
        let isChecked = ingredient.querySelector(".js-mix-check").checked;
        if (isChecked) {
            let productName = ingredient.querySelector(".js-ingredient_name").textContent;
            let quantityInput = parseInt(ingredient.querySelector(".js-quantity").value);
            partialItemsAndQuantity.push({ [productName]: quantityInput })
        }

    }
    console.log(partialItemsAndQuantity)
}

// Init 
getRecipes()
