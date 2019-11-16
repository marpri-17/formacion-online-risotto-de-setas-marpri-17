'use strict';


const recipesPath = "./assets/services/recipes.json"
const mixCheckboxes = document.querySelectorAll(".js-mix-check")
const mixIngredientsList = document.querySelector(".js-list")

let availableRecipes = [];
let testValueSelectedRecipe = "recipe-01"

function getRecipes() {
    return fetch(recipesPath)
        .then(resp => resp.json())
        .then(data => {
            data = formatData(data);
            saveDatainRecipes(data);
            // renderOptionsForRecipes(data) // return select value matching item;
            paintMixForSelectedOption(data[0]);
            readCheckboxesItemsandQuantity(data[0]) //data[0];
                ;



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

function displayResults(ingredients, subtotal) {
    const showSubtotal = document.querySelector(".js-resultsubtotal");
    const showShippingCost = document.querySelector(".js-resultshipcost");
    showSubtotal.innerHTML = `${subtotal}`;
    let calculateShipTaxes = 0;
    for (let recipe of availableRecipes) {
        if (recipe.id === ingredients.id) calculateShipTaxes = recipe["shipping-cost"]
    }
    showShippingCost.innerHTML = calculateShipTaxes
}

// Total seven : 22.83
function calculatePrices(ingredients) {
    let accIngredientsPrice = 0;
    for (let recipe of availableRecipes) {
        debugger;
        if (recipe.id === ingredients.id) {
            recipe.ingredients.map(ingredient => {
                if (Object.keys(ingredients).includes(ingredient.product)) {
                    let addQuantity = ingredient.price * ingredients[ingredient.product];
                    accIngredientsPrice += addQuantity;
                    // console.log(accIngredientsPrice)
                }
            })
        }
    }
    console.log(accIngredientsPrice)
    return displayResults(ingredients, accIngredientsPrice);

}

function readCheckboxesItemsandQuantity(recipe) {
    let partialItemsAndQuantity = new Object;
    let recipeId = recipe.id;
    partialItemsAndQuantity.id = recipeId;
    let ingredientsElement = document.querySelectorAll(".js-ingredients");
    for (let ingredient of ingredientsElement) {
        let isChecked = ingredient.querySelector(".js-mix-check").checked;
        if (isChecked) {
            let productName = ingredient.querySelector(".js-ingredient_name").textContent;
            let quantityInput = parseInt(ingredient.querySelector(".js-quantity").value);
            if (productName === "shipping-cost") {
                partialItemsAndQuantity[productName] = quantityInput;
            }
            partialItemsAndQuantity[productName] = quantityInput;
        }

    }
    console.log(partialItemsAndQuantity)
    return calculatePrices(partialItemsAndQuantity)
}


// Init 
getRecipes()
