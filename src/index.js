import './sass/main.scss';
import ImagesApiService from './js/apiService';
import imageCardtemplate from './templates/image-card.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { info } from '@pnotify/core';


var debounce = require('lodash.debounce');
const inpitRef = document.querySelector('.search-input')
const loadMoreBtnRef = document.querySelector('[data-load]')
const cardListRef = document.querySelector('.gallery')
const imagesApiService = new ImagesApiService();


function onSearch(e){
    e.preventDefault()
    imagesApiService.query = e.target.value   
    if (imagesApiService.query === '') {     
        info({ text: 'Please, enter the keyword' })
        clearGallery(); 
        loadMoreBtnRef.classList.add('is-hidden')     
    }else{
        clearGallery();  
        imagesApiService.resetPage();       
        createImagesList()  
        loadMoreBtnRef.classList.remove('is-hidden')
    }
    
}

function createImagesList(){    
    imagesApiService.fetchImages()
        .then(hits => {
            imagesApiService.incrementPage()
            renderImages(hits);             
        }
    );  
}

function onLoadMore(){
    createImagesList()
    setTimeout(makeScroll, 300)
}

function renderImages(hits){
    cardListRef.insertAdjacentHTML('beforeend', imageCardtemplate(hits))
}

function clearGallery(){
    cardListRef.innerHTML = ''
}

function makeScroll(){
    cardListRef.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        });   
}


function onOpenModal(e) {
    if (e.target.nodeName === 'IMG') {
        const instance = basicLightbox.create(`<img src= ${e.target.dataset.show}>`);
        instance.show();
    }      
}

inpitRef.addEventListener('input', debounce(onSearch, 500))
loadMoreBtnRef.addEventListener('click', onLoadMore)
cardListRef.addEventListener('click', onOpenModal)