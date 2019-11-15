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
            paintMixForSelectedOption(data[0])



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
        <input class="form-check-input js-mix-check" type="checkbox" value="" id="">
        <input type="number" class="" id="selectQuantity"value= 1 />
        <label for="selectQuantity" class="sr-only">Cantidad</label>
       <label class="form-check-label" for="">
       <div>
           <p>${ingredient.product}<p>
           <p>${ingredient.brand}<p>
           <span>${ingredient.quantity}</span>
           </div>
       </label>
       <p class="">${ingredient.price} ${currency}</p>
       `
        const newItem = document.createElement("div");
        newItem.setAttribute("class", "form-check flex-row justify-content-center align-items-center");
        newItem.innerHTML = html;
        mixIngredientsList.appendChild(newItem)
    })
}

// Init 
getRecipes()


// function getRecipes() {
//     return fetch(recipesPath)
//         .then(resp => resp.json())
//         .then(data => {
//             console.log(data)
//             for (let recipe in data) {
//                 availableRecipes.push(data[recipe])
//             }
//             return availableRecipes
//         })
//         //.then(next => console.log(next))
//         .catch(err => console.log(err));

// }
// function paintMixforEachRecipe(recipes) {
//     console.log(recipes)
//     //     debugger;
//     //     for(let recipe in recipes) {
//     //         console.log(recipe)
//     //     }
// }

// getRecipes();
// if (availableRecipes.length > 0) {
//     paintMixforEachRecipe(availableRecipes)
// }
// //.then(res => paintMixforEachRecipe(res));

