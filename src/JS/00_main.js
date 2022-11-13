"use strict"
const personajesList = document.querySelector(".js-charac")
const btnSearch = document.querySelector(".js-btnSearch")
const input = document.querySelector(".js-inputSearch")

let character =[]

//Petición al servidor para obtener lista de personajes
fetch('https://breakingbadapi.com/api/characters')
 .then((response) => response.json())
 .then((charactersList) => {
    character= charactersList

    console.log(charactersList)
    PaintCharacter ()
})


//Función para que pinte personajes según los reciba
function PaintCharacter (){
    let html ='';

    for(const actor of character){
        html+=`<li class="listRender"><article><div><img class="imgActor" src="${actor.img}" alt="Imagen actor/actriz"></div><h2>${actor.name}</h2><h3>${actor.status}</h3></article></li>`;
    }

    personajesList.innerHTML= html;

}

function handlerClick(){
    const inputValue = input.value.toLowerCase()
    const filterList = character.filter((character) =>character.name.toLowerCase().includes(inputValue) )
    console.log(filterList)
    console.log("hola")
}

btnSearch.addEventListener("click",handlerClick)