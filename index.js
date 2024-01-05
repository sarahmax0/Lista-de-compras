import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-abb76-default-rtdb.firebaseio.com/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)

    ClearInputField()
    getDataFromInput(inputValue)
    
})

function ClearInputField() {
    inputFieldEl.value = " "
}

function getDataFromInput(getInputValueFromTopFunction) {
    shoppingListEl.innerHTML += `<li>${getInputValueFromTopFunction}</li>`
}