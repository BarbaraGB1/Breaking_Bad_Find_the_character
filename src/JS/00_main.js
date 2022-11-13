"use strict";
const personajesList = document.querySelector(".js-charac");
const btnSearch = document.querySelector(".js-btnSearch");
const input = document.querySelector(".js-inputSearch");

let character = [];
function searchCurrent (){

}


//Función para que pinte personajes según los reciba
function paintCharacter(listCharacter) {
 
  let html = `<li class="listRender"><article id="${listCharacter.char_id}" class= "arrayCharacter"><div><img class="imgActor" src="${listCharacter.img}" alt="Imagen actor/actriz"></div><h2>${listCharacter.name}</h2><h3>${listCharacter.status}</h3></article></li>`;
  return html;
}

function renderSearch(searchList) {

let html = "";
  for (let i = 0; i < searchList.length; i++) {
    html += paintCharacter(searchList[i]);
  }
 
  personajesList.innerHTML = html;
}
//función para buscar nombre por el buscador
function handlerClick(event) {
  event.preventDefault()
  const inputValue = input.value.toLowerCase();
  const filterList = character.filter((character) =>
    character.name.toLowerCase().includes(inputValue)
  );
 
  renderSearch(filterList);
}

//Petición al servidor para obtener lista de personajes
fetch("https://breakingbadapi.com/api/characters")
  .then((response) => response.json())
  .then((charactersList) => {
    character = charactersList;

   renderSearch(character);

  });
//evento click botón de buscar
btnSearch.addEventListener("click", handlerClick);
