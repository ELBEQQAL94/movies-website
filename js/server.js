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

