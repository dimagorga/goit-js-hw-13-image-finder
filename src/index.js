import './sass/main.scss';
import ImagesApiService from './js/apiService';
import imageCardtemplate from './templates/image-card.hbs'
var debounce = require('lodash.debounce');


const inpitRef = document.querySelector('.search-input')
const loadMoreBtnRef = document.querySelector('.load-more-btn')
const cardListRef = document.querySelector('.gallery')
const galeryItemRef = document.querySelector('.gallery-item')

const imagesApiService = new ImagesApiService();

inpitRef.addEventListener('input', debounce(onSearch, 500))
loadMoreBtnRef.addEventListener('click', onLoadMore)
loadMoreBtnRef.setAttribute("disabled", "disabled");


function onSearch(e){
    e.preventDefault()
    imagesApiService.query = e.target.value       
    
    if (e.target.value != '') {     
        createImagesList(e)  
        loadMoreBtnRef.removeAttribute("disabled", "disabled");
    }else{
        clearGallery();
        imagesApiService.resetPage();
        loadMoreBtnRef.setAttribute("disabled", "disabled");
    }
    
}

function createImagesList(e){    
    imagesApiService.fetchImages()
        .then(hits => {
            imagesApiService.incrementPage()
            renderImages(hits);             
        }
    );        
}

function onLoadMore(){
    createImagesList()
         
}

function renderImages(hits){
    cardListRef.insertAdjacentHTML('beforeend', imageCardtemplate(hits))
}

function clearGallery(){
    cardListRef.innerHTML = ''
    
}