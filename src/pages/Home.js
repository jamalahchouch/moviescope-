import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { movieService } from '../services/tmdb';
import './home.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchMode, setSearchMode] = useState(false);

  // Charger les films populaires au montage
  useEffect(() => {
    loadPopularMovies();
  }, []);

  // Charger les films populaires
  const loadPopularMovies = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const data = await movieService.getPopularMovies(page);
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setCurrentPage(page);
      setSearchMode(false);
    } catch (err) {
      setError('Erreur lors du chargement des films');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Rechercher des films
  const searchMovies = async (query, page = 1) => {
    if (!query.trim()) {
      loadPopularMovies();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await movieService.searchMovies(query, page);
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setCurrentPage(page);
      setSearchMode(true);
    } catch (err) {
      setError('Erreur lors de la recherche');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Gérer la recherche
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim()) {
      searchMovies(query);
    } else {
      loadPopularMovies();
    }
  };

  // Charger la page suivante
  const loadNextPage = () => {
    const nextPage = currentPage + 1;
    if (searchMode) {
      searchMovies(searchQuery, nextPage);
    } else {
      loadPopularMovies(nextPage);
    }
  };

  // Charger la page précédente
  const loadPrevPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      if (searchMode) {
        searchMovies(searchQuery, prevPage);
      } else {
        loadPopularMovies(prevPage);
      }
    }
  };

  if (loading && movies.length === 0) {
    return (
      <div className="home">
        <div className="loading">
          <div className="spinner"></div>
          <p>Chargement des films...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="home-header">
        <h1>MovieScope</h1>
        <p>Découvrez les films les plus populaires et recherchez vos favoris</p>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Rechercher un film..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          {searchQuery && (
            <button 
              onClick={() => {
                setSearchQuery('');
                loadPopularMovies();
              }}
              className="clear-search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={loadPopularMovies} className="retry-button">
            Réessayer
          </button>
        </div>
      )}

      {movies.length === 0 && !loading && !error ? (
        <div className="empty">
          <p>Aucun film trouvé pour votre recherche.</p>
        </div>
      ) : (
        <>
          <ul className="grid">
            {movies.map((movie) => (
              <li key={movie.id} className="grid-item">
                <MovieCard movie={movie} />
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={loadPrevPage}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                ← Précédent
              </button>
              <span className="page-info">
                Page {currentPage} sur {totalPages}
              </span>
              <button 
                onClick={loadNextPage}
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                Suivant →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;

