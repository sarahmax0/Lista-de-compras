import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
    
})

onValue(shoppingListInDB, function(snapshot){

    if(snapshot.exists()) {

        let itemsArray = Object.entries(snapshot.val())
        clearshoppingListEl()

        for(let i = 0; i<itemsArray.length; i++){
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
    
    
            getDataFromInput(currentItem)
        
        }
    } else {
        shoppingListEl.innerHTML = "No items here yet"
    }

    
    
})

function clearshoppingListEl(){
    shoppingListEl.innerHTML = ""
}

function ClearInputField() {
    inputFieldEl.value = " "
}

function getDataFromInput(item) {

    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function(){
        
        let exactLocationOfStoryInDB = ref(database, `shoppingList/${itemID}`)

        remove(exactLocationOfStoryInDB)
    })

    shoppingListEl.append(newEl)
}