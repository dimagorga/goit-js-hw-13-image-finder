  
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';


const BASE_URL = 'https://pixabay.com/api/';
const KEY = '22395218-1fa4e36600279d8c4f99c77de';

export default class ImagesApiServis {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    
    fetchImages(){
        const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`
        return fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => { 
            if (data.total === 0) {
                error({text: 'Ups, images is not be found =('})
            } else {
                return  data.hits;
            };
        });
    }

    get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery = newQuery; 
    }

    incrementPage(){
        this.page +=1
    }
    
    resetPage() {
        this.page = 1;
    }
}