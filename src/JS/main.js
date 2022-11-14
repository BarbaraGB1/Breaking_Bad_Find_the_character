'use strict';

const personajesList = document.querySelector('.js-charac');
const btnSearch = document.querySelector('.js-btnSearch');
const input = document.querySelector('.js-inputSearch');
const favouritesList = document.querySelector('.js-select');
const spoiler = document.querySelector('.js-modal');
const btnClose = document.querySelector('.js-btnClose');
const blurDiv = document.querySelector('.js-blur');
const reset = document.querySelector('.js-reset');

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
  listenClickRemove()
}

function paintFavourites(listFav) {
  let html = `<li class="listRenderFav"><article  class= "article js-clickFav "><img class="imgFav" src="${listFav.img}" alt="Imagen actor/actriz"><h2>${listFav.name}</h2><h3>${listFav.status}</h3><button id="${listFav.char_id}" class="removeFav js-removeFav">Eliminar<img class="imgRemove" src="https://e7.pngegg.com/pngimages/607/869/png-clipart-trachoma-fly-blindness-eye-what-can-i-help-you-with-cartoon-fictional-character.png"></button></article></li>`;
  return html;
}
//Función para que pinte personajes según los reciba
function paintCharacter(listCharacter) {

  const favouriteSelected = favourites.findIndex(
    (eachCha) => eachCha.char_id === parseInt(listCharacter.char_id));
  let classFav = '';
  if (favouriteSelected === -1) {
    classFav = '';
  } else {
    classFav = 'selected';
  }


  let html = `<li class="listRender"><article id="${listCharacter.char_id}" class= "article ${classFav} js-clickCharacter"><img class="imgActor" src="${listCharacter.img}" alt="Imagen actor/actriz"><h2>${listCharacter.name}</h2><h3>${listCharacter.status}</h3></article></li>`;
  return html;
}

function renderSearch(searchList) {
  let html = '';
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
//función quitar uno lista fav
function listenClickRemove(){
  const btnRemove = document.querySelectorAll('.js-removeFav');
  for(const eachBtn of btnRemove){
    eachBtn.addEventListener('click',handleClickRemove);
  }
}

function handleClickRemove(event){
  const posOneFav = favourites.findIndex(
    (selectFav) => selectFav.char_id === parseInt(event.currentTarget.id)
  );
console.log(event.currentTarget.id);
  if (posOneFav !== -1)
     {
    favourites.splice(posOneFav, 1);
  }
  localStorage.setItem('favourites', JSON.stringify(favourites));
  renderFavourites();
}
//Petición al servidor para obtener lista de personajes
fetch('https://breakingbadapi.com/api/characters')
  .then((response) => response.json())
  .then((charactersList) => {
    character = charactersList;

    renderSearch(character);
  });
//función limpiar fav
function handleReset(event){
  debugger;
  event.preventDefault();
  let html = "";
  localStorage.removeItem('favourites');
  favourites=[];
  favouritesList.innerHTML = html;
  renderSearch(character);
 
}
//evento click botón de buscar
btnSearch.addEventListener('click', handlerClick);

//evento botón resetear fav
reset.addEventListener("click",handleReset);

//pintar lo que hay guardado en localStorage
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
}
btnClose.addEventListener('click', handleClose);*/
