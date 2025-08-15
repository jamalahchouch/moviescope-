import axios from 'axios';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'e4a275d7969c64f09b0022c49d0a1917'; 

const tmdbApi = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'fr-FR',
  },
});


export const movieService = {
  // Récupérer les films populaires
  getPopularMovies: async (page = 1) => {
    try {
      const response = await tmdbApi.get('/movie/popular', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des films populaires:', error);
      throw error;
    }
  },

  // Rechercher des films
  searchMovies: async (query, page = 1) => {
    try {
      const response = await tmdbApi.get('/search/movie', {
        params: { 
          query,
          page,
          include_adult: false
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la recherche de films:', error);
      throw error;
    }
  },

  // Obtenir les détails d'un film
  getMovieDetails: async (movieId) => {
    try {
      const response = await tmdbApi.get(`/movie/${movieId}`, {
        params: {
          append_to_response: 'credits,videos,images'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du film:', error);
      throw error;
    }
  },

  // Obtenir les films en cours de diffusion
  getNowPlaying: async (page = 1) => {
    try {
      const response = await tmdbApi.get('/movie/now_playing', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des films en cours:', error);
      throw error;
    }
  },

  // Obtenir les films à venir
  getUpcoming: async (page = 1) => {
    try {
      const response = await tmdbApi.get('/movie/upcoming', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des films à venir:', error);
      throw error;
    }
  }
};

// Fonction utilitaire pour construire l'URL de l'affiche
export const getPosterUrl = (posterPath, size = 'w500') => {
  if (!posterPath) return '/logo512.png';
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
};

// Fonction utilitaire pour construire l'URL de l'image de fond
export const getBackdropUrl = (backdropPath, size = 'w1280') => {
  if (!backdropPath) return null;
  return `https://image.tmdb.org/t/p/${size}${backdropPath}`;
};

export default tmdbApi; 