'use strict';

const recipesPath = "./assets/services/recipes.json"
const mixCheckboxes = document.querySelectorAll(".js-mix-check")
const mixIngredientsList = document.querySelector(".js-list")

let availableRecipes = [];
let testValueSelectedRecipe = "00"

function getRecipes() {
    return fetch(recipesPath)
        .then(resp => resp.json())
        .then(data => {
            data = formatData(data);
            saveDatainRecipes(data);
            // renderOptionsForRecipes(data) // return select value matching item;
            paintMixForSelectedOption();
            readCheckboxesItemsandQuantity(data[0]) //data[0];



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

function paintMixForSelectedOption() {
    if (testValueSelectedRecipe) {
        let selectedRecipe = availableRecipes.find(recipe => recipe.id === testValueSelectedRecipe);
        const currency = selectedRecipe.currency;
        selectedRecipe.ingredients.map(ingredient => {
            const html = `
        <input class="form-check-input check js-mix-check results_list_checkboxes" type="checkbox" value="" id="" checked>
        <input type="number" class="js-quantity results_list_quantitySelect" id="selectQuantity"value= 1 />
        <label for="selectQuantity" class="sr-only">Cantidad</label>
       <label class="form-check-label results_list_labels" for="">
           <div class="js-ingredient_name">${ingredient.product}</div>
           <div>${ingredient.brand || "No disponible"}</div>
           <span>${ingredient.quantity}</span>
           <div class="js-price">${ingredient.price}<small> ${currency}</small>
       </label>
       `
            const newItem = document.createElement("div");
            newItem.setAttribute("class", "form-check flex-row flex-nowrap results__list_items js-ingredients");
            newItem.innerHTML = html;
            mixIngredientsList.appendChild(newItem)
        })
        addListenerToCheckboxes(selectedRecipe)
    }
}

function displayResults(ingredients, subtotal) {
    const showSubtotal = document.querySelector(".js-resultsubtotal");
    const showShippingCost = document.querySelector(".js-resultshipcost");
    const showTotal = document.querySelector(".js-resultstotal");
    const showCurrencyBoxes = document.querySelectorAll(".js-currency");
    subtotal = dosDecimales(subtotal)
    showSubtotal.innerHTML = `${subtotal}`;
    let calculateShipTaxes = 0;
    for (let recipe of availableRecipes) {
        if (recipe.id === ingredients.id) {
            showCurrencyBoxes.forEach(currencyBox => currencyBox.innerHTML = ` ${recipe.currency}`);
            calculateShipTaxes = recipe["shipping-cost"];
        }
    }
    debugger;
    showShippingCost.innerHTML = calculateShipTaxes;
    let total = dosDecimales(parseFloat(subtotal) + calculateShipTaxes);
    showTotal.innerHTML = total;

}

function calculatePrices(ingredients) {
    let accIngredientsPrice = 0;
    for (let recipe of availableRecipes) {
        if (recipe.id === ingredients.id) {
            recipe.ingredients.map(ingredient => {
                if (Object.keys(ingredients).includes(ingredient.product)) {
                    let addQuantity = ingredient.price * ingredients[ingredient.product];
                    accIngredientsPrice += addQuantity;
                }
            })
        }
    }
    return displayResults(ingredients, accIngredientsPrice);

}

function readCheckboxesItemsandQuantity() {
    if (testValueSelectedRecipe) {
        let recipe = availableRecipes.find(recipe => recipe.id === testValueSelectedRecipe);
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
        return calculatePrices(partialItemsAndQuantity)
    }
}

function handleCheckBoxes() {
    readCheckboxesItemsandQuantity(recipe)
}

function addListenerToCheckboxes(recipe) {
    const ingredientsCheckboxes = document.querySelectorAll(".js-mix-check");
    ingredientsCheckboxes.forEach(ingredientCheckbox => ingredientCheckbox.addEventListener("click", readCheckboxesItemsandQuantity))

}

function dosDecimales(n) {
    let t = n.toString();
    let regex = /(\d*.\d{0,2})/;
    return t.match(regex)[0];
}
// Init 
getRecipes()
