"use strict"
const personajesList = document.querySelector(".js-charac")


let character =[]
fetch('https://breakingbadapi.com/api/characters')
 .then((response) => response.json())
 .then((charactersList) => {
    character= charactersList

    console.log(charactersList)
    PaintCharacter ()
})

function PaintCharacter (){
    let html ='';

    for(const actor of character){
        html+=`<li class="listRender"><article><div><img class="imgActor" src="${actor.img}"></div><h2>${actor.name}</h2><h3>${actor.status}</h3></article></li>`;
    }

    personajesList.innerHTML= html;

}
