'use strict';

const personajesList = document.querySelector('.js-charac');
const btnSearch = document.querySelector('.js-btnSearch');
const input = document.querySelector('.js-inputSearch');
const favouritesList = document.querySelector('.js-select');
const spoiler = document.querySelector('.js-modal');
const btnClose = document.querySelector('.js-btnClose');
const reset = document.querySelector('.js-reset');
const sectionFav = document.querySelector('.js-sectionFav');
let character = [];
let favourites = [];

//Función agregarle a cada artículo de personajes el evento de click
function listenCurrent() {
  const allCharacter = document.querySelectorAll('.js-clickCharacter');
  for (const oneArticle of allCharacter) {
    oneArticle.addEventListener('click', handleClickFav);
  }
}

//función detectar el click con el id del personaje y decirle que si no pertenece a favoritos lo meta y si no lo saque

function handleClickFav(event) {
  event.currentTarget.classList.toggle('selected');
  sectionFav.classList.remove('hidden');
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
  localStorage.setItem('favourites', JSON.stringify(favourites));
  renderFavourites();
}

//función para que pintar los favoritos

function renderFavourites() {
  let html = '';
  for (const fav of favourites) {
    html += paintFavourites(fav);
  }
  favouritesList.innerHTML = html;
  listenClickRemove();
}

//Función por la que pasa cada objeto de favoritos y mete los datos dentro del html creado

function paintFavourites(listFav) {
  let html = `<li class="listRenderFav"><article  class= "article js-clickFav "><img class="imgFav" src="${listFav.img}" alt="Imagen actor/actriz"><h2 class="nameFav">${listFav.name}</h2><h3 class="statusFav">${listFav.status}</h3 class="statusFav"><div class=containerBtnClose><button id="${listFav.char_id}" class="removeFav js-removeFav"><svg class="x"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></svg></i></button></div></article></li>`;
  return html;
}

//Función para que pinte personajes según los reciba, además de que si es un elegido como elegido le de la clase de favorito

function paintCharacter(listCharacter) {
  const favouriteSelected = favourites.findIndex(
    (eachCha) => eachCha.char_id === parseInt(listCharacter.char_id));
  let classFav = '';
  if (favouriteSelected === -1) {
    classFav = '';
  } else {
    classFav = 'selected';
  }
  let html = `<li class="listRender"><article id="${listCharacter.char_id}" class= "article ${classFav} js-clickCharacter"><img class="imgActor" src="${listCharacter.img}" alt="Imagen actor/actriz"><h2 class="nameCha">${listCharacter.name}</h2><h3 class= "status">${listCharacter.status}</h3></article></li>`;
  return html;
}

//Función para que pinte los personajes

function renderSearch(searchList) {
  let html = '';
  for (let i = 0; i < searchList.length; i++) {
    html += paintCharacter(searchList[i]);
  }
  personajesList.innerHTML = html;
  listenCurrent();
}


//función para buscar nombre por el buscador y los vuelva pintar

function handlerClick(event) {
  event.preventDefault();
  const inputValue = input.value.toLowerCase();
  const filterList = character.filter((character) =>
    character.name.toLowerCase().includes(inputValue)
  );
  renderSearch(filterList);
}

//función para adjudicar el evento click a cada uno de los favoritos

function listenClickRemove(){
  const btnRemove = document.querySelectorAll('.js-removeFav');
  for(const eachBtn of btnRemove){
    eachBtn.addEventListener('click',handleClickRemove);
  }
}

//función que quita de fav solo a uno a través del click

function handleClickRemove(event){
  const posOneFav = favourites.findIndex(
    (selectFav) => selectFav.char_id === parseInt(event.currentTarget.id)
  );
  if (posOneFav !== -1)
  {
    favourites.splice(posOneFav, 1);
  }
  localStorage.setItem('favourites', JSON.stringify(favourites));
  renderFavourites();
  renderSearch(character);
}

//Petición al servidor para obtener lista de personajes y vaya a pintarlos

fetch('https://breakingbadapi.com/api/characters')
  .then((response) => response.json())
  .then((charactersList) => {
    character = charactersList;

    renderSearch(character);
  });

//función limpiar fav con reset

function handleReset(event){
  event.preventDefault();
  let html = '';
  localStorage.removeItem('favourites');
  favourites=[];
  favouritesList.innerHTML = html;
  sectionFav.classList.add('hidden');
  renderSearch(character);
}

//pintar lo que hay guardado en localStorage y si no hay lista de favoritos no pinte nada


const savedFavourites = JSON.parse(localStorage.getItem('favourites'));


if (savedFavourites !== null) {
  favourites = savedFavourites;
  renderFavourites();
}

//Funciones para el modal.Add/Remove

/*function showModal() {
  spoiler.classList.remove('hidden');
  blurDiv.classList.remove('hidden');
}

setTimeout(showModal, 2000);

function handleClose() {
  spoiler.classList.add('hidden');
  blurDiv.classList.add('hidden');
}*/

//evento click botón de buscar

btnSearch.addEventListener('click', handlerClick);

//evento botón resetear fav

reset.addEventListener('click',handleReset);

//evento para cerrar modal

//btnClose.addEventListener('click', handleClose);
