"use strict";
const personajesList = document.querySelector(".js-charac");
const btnSearch = document.querySelector(".js-btnSearch");
const input = document.querySelector(".js-inputSearch");
const favouritesList = document.querySelector(".js-select");
let character = [];
let favourites = [];

function listenCurrent() {
  const allCharacter = document.querySelectorAll(".js-clickCharacter");
 

  for (const oneArticle of allCharacter) {
    oneArticle.addEventListener("click", handleClickFav);
  }
}
function handleClickFav(event) {

 
  console.log(event.currentTarget.id);
  event.currentTarget.classList.toggle("selected");

 
  const selectedCha = character.find(
    (eachCha) => eachCha.char_id === parseInt(event.currentTarget.id)
  );
  const favouriteSelected = favourites.findIndex(
    (eachCha) => eachCha.char_id === parseInt(event.currentTarget.id)
  );

  if (favouriteSelected === -1) {
    favourites.push(selectedCha);
  } else {
    favourites.splice(favouriteSelected, 1);
  }

  
 localStorage.setItem("favourites", JSON.stringify( favourites));
 renderFavourites();
}

function renderFavourites() {
  let html = "";

  for (const fav of favourites) {
    html += paintCharacter(fav);
  }
  favouritesList.innerHTML = html;
}

//Función para que pinte personajes según los reciba
function paintCharacter(listCharacter) {
  let html = `<li class="listRender"><article id="${listCharacter.char_id}" class= "article js-clickCharacter"><img class="imgActor" src="${listCharacter.img}" alt="Imagen actor/actriz"><h2>${listCharacter.name}</h2><h3>${listCharacter.status}</h3></article></li>`;
  return html;
}

function renderSearch(searchList) {
  let html = "";
  for (let i = 0; i < searchList.length; i++) {
    html += paintCharacter(searchList[i]);
  }

  personajesList.innerHTML = html;
  listenCurrent();
}
//función para buscar nombre por el buscador
function handlerClick(event) {
  event.preventDefault();
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

  //pintar lo que hay guardado en localStorage
const savedFavourites = JSON.parse(localStorage.getItem("favourites"));

console.log(savedFavourites);
if(savedFavourites !== null){
  favourites = savedFavourites;
  renderFavourites();
}
