import React from 'react';
import styles from './MovieCard.module.css';
import { Link } from 'react-router-dom';
import { getPosterUrl } from '../services/tmdb';

function MovieCard({ movie }) {
  if (!movie) {
    return null;
  }

  const { id, title, vote_average, poster_path, release_date, genre_ids } = movie;
  
  // Formater la date de sortie
  const releaseYear = release_date ? new Date(release_date).getFullYear() : 'N/A';
  
  // Formater la note
  const rating = vote_average ? (vote_average / 2).toFixed(1) : 'N/A';
  
  // Obtenir l'URL de l'affiche
  const posterUrl = getPosterUrl(poster_path);

  return (
    <article className={styles.card}>
      <Link to={`/movie/${id}`} className={styles.cardLink}>
        <div className={styles.posterContainer}>
          <img className={styles.poster} src={posterUrl} alt={title} />
          <div className={styles.overlay}>
            <span className={styles.playIcon}>▶</span>
          </div>
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.meta}>
            <span className={styles.year}>{releaseYear}</span>
            <span className={styles.badge}>{rating}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default MovieCard;

