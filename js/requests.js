const { API_KEY } = require('./constants');

const requests = {
    // Fetch Tv Shows
   fetchTvShows: `/discover/tv?api_key=${API_KEY}`,

   // Fetch Movies
   fetchMovies: `/discover/movie?api_key=${API_KEY}`,
};

module.exports = requests;