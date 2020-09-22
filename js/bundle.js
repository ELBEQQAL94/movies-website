(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// API KEY FOR FETCH DATA FROM SERVER
const API_KEY = "27a06a6fe752225bcecc30870f193be2";

// TMDB API's BASE URL 
const BASE_URL = "https://api.themoviedb.org/3";

// BASE IMAGE URL FROM TMDB API's
const baseImgUrl = "https://image.tmdb.org/t/p/original";

module.exports = {
    API_KEY,
    BASE_URL,
    baseImgUrl,
}
},{}],2:[function(require,module,exports){
// RENDER MOVIES
function renderContent(content, container, loadImage, baseImgUrl) {
    return content?.map(({
        title, 
        name, 
        original_name, 
        backdrop_path, 
        poster_path
    }) => {
        title = title || name || original_name;
        container.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="content">
                <h2>${title}</h2>
                <img 
                    style=${loadImage ? '' : 'display: none'}
                    src=${baseImgUrl}${backdrop_path || poster_path}
                    alt=${title} 
                    title=${title}
                    onload=${loadImage}
                >
            </div>
        </div>`
    });
};

module.exports = renderContent;
},{}],3:[function(require,module,exports){
const { API_KEY } = require('./constants');

const requests = {
    // Fetch Tv Shows
   fetchTvShows: `/discover/tv?api_key=${API_KEY}`,

   // Fetch Movies
   fetchMovies: `/discover/movie?api_key=${API_KEY}`,
};

module.exports = requests;
},{"./constants":1}],4:[function(require,module,exports){
// DOM Elements
const moviesContainer = document.querySelector('.movies__container');
const tvShowsContainer = document.querySelector('.tvShows__container');
const MessageError = document.querySelector('.message__error');
const loadingMessage = document.querySelector('.loading__message');

// check if image loaded
let loadImage = true;

// Loading data from SERVER
let loading = true;

// CONTSTANTS
const {BASE_URL, baseImgUrl} = require('./constants');

// Requests from TMDB Server
const requests = require('./requests');

// RENDER CONTENT
const renderContent = require('./renderContent');

// FETCH SPECIFIC DATA FROM SERVER
async function fetchData(fetchRequest) {
    try {
        const response = await fetch(`${BASE_URL}${fetchRequest}`);
        const data = await response.json();
        const movies = data.results;

        // SET LOADING TO FALSE
        loading = false;

        return movies;
    } catch(error) {
        loading = false;
        // display error if movies not loaded
        MessageError.textContent = error.message;
    };
};

// LOAD CONTENT
async function loadContent() {
    const movies = await fetchData(requests.fetchMovies);
    const tvShows = await fetchData(requests.fetchTvShows);

    loadImage = false;

    if(!loading){
        loadingMessage.style.display = "none";

        // Check if movies container is not null
        if(moviesContainer !== null) {
            renderContent(movies, moviesContainer, loadImage, baseImgUrl);
        } else {
            renderContent(tvShows, tvShowsContainer, loadImage, baseImgUrl);
        };
    };
};

loadContent();


},{"./constants":1,"./renderContent":2,"./requests":3}]},{},[4]);
