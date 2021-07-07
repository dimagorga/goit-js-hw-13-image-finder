import './sass/main.scss';
import ImagesApiService from './js/apiService';
import imageCardtemplate from './templates/image-card.hbs'
var debounce = require('lodash.debounce');


const inpitRef = document.querySelector('.search-input')
const loadMoreBtnRef = document.querySelector('.load-more-btn')
const cardListRef = document.querySelector('.gallery')

const imagesApiService = new ImagesApiService();

inpitRef.addEventListener('input', debounce(onSearch, 1000))
loadMoreBtnRef.addEventListener('click', onLoadMore)



function onSearch(e){
    e.preventDefault()
    imagesApiService.query = e.target.value    
    imagesApiService.resetPage();
    clearGallery();
    createImagesList()  
}

function onLoadMore(){
    createImagesList()
    imagesApiService.incrementPage()
    
}

function createImagesList(){
    imagesApiService.fetchImages()
    .then(hits => {
        renderImages(hits);
        }
    );
}

function renderImages(hits){
    cardListRef.insertAdjacentHTML('beforeend', imageCardtemplate(hits))
}
function clearGallery(){
    cardListRef.innerHTML = ''
}