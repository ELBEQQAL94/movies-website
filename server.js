// movies section container
const moviesContainer = document.querySelector('.movies');
const movieContainer = document.querySelector('.movie');

// API KEY FOR FETCH DATA FROM SERVER
const API_KEY = "27a06a6fe752225bcecc30870f193be2";

// TMDB API's BASE URL 
const BASE_URL = "https://api.themoviedb.org/3";

// BASE IMAGE URL FROM TMDB API's
const baseImgUrl = "https://image.tmdb.org/t/p/original";

// Requests from TMDB Server
const requests = {
  fetchTv: `/discover/movie?api_key=${API_KEY}&with_genres=10770`,
  fetchMovies: `/discover/movie?api_key=${API_KEY}`,
};

// FETCH SPECIFIC DATA FROM SERVER
async function fetchData(fetchRequest) {
    try {
        const response = await fetch(`${BASE_URL}${fetchRequest}`);
        const data = await response.json();
        const movies = data.results;
        return movies;
    } catch(error) {
        console.log('Error: ', error);
    }
};

// LOAD CONTENT
async function loadContent() {
    const movies = await fetchData(requests.fetchMovies);
    movies.map(({title, backdrop_path, poster_path}) => {
        moviesContainer.innerHTML += `<div class="movie">
        <h2>${title}</h2>
        <img 
            src=${baseImgUrl}${backdrop_path || poster_path}
            alt=${title} 
            title=${title}
        >
    </div>`
    });
};

loadContent();

