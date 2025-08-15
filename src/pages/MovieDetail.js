import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { movieService, getPosterUrl, getBackdropUrl } from '../services/tmdb';
import styled from 'styled-components';

const Page = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
  min-height: 100vh;
`;

const Hero = styled.div`
  position: relative;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 32px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.8)
    );
    z-index: 1;
  }
`;

const Backdrop = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px;
  z-index: 2;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const Details = styled.div`
  color: #e6e9ff;
`;

const Meta = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

const Tag = styled.span`
  background: linear-gradient(135deg, #6c5ce7, #00d4ff);
  color: #081028;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const Section = styled.section`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h3`
  color: #6c5ce7;
  font-size: 1.5rem;
  margin: 0 0 16px 0;
  border-bottom: 2px solid rgba(108, 92, 231, 0.3);
  padding-bottom: 8px;
`;

const Overview = styled.p`
  line-height: 1.7;
  color: #c4cbf5;
  font-size: 1.1rem;
`;

const CastList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const CastMember = styled.div`
  background: rgba(11, 15, 31, 0.5);
  border: 1px solid rgba(108, 92, 231, 0.2);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
`;

const CastName = styled.p`
  margin: 8px 0 0 0;
  font-weight: 600;
  color: #e3e6f9;
`;

const CastRole = styled.p`
  margin: 0;
  color: #aeb6d9;
  font-size: 0.9rem;
`;

const Back = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #6c5ce7;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 24px;
  padding: 12px 20px;
  background: rgba(108, 92, 231, 0.1);
  border-radius: 12px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(108, 92, 231, 0.2);
    transform: translateX(-4px);
  }
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #aeb6d9;
`;

const Error = styled.div`
  text-align: center;
  color: #fca5a5;
  padding: 40px;
`;

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await movieService.getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError('Erreur lors du chargement du film');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  if (loading) {
    return (
      <Page>
        <Loading>
          <div>Chargement...</div>
        </Loading>
      </Page>
    );
  }

  if (error || !movie) {
    return (
      <Page>
        <Error>
          <p>{error || 'Film introuvable'}</p>
          <Back to="/">← Retour à l'accueil</Back>
        </Error>
      </Page>
    );
  }

  const {
    title,
    overview,
    poster_path,
    backdrop_path,
    release_date,
    runtime,
    vote_average,
    genres,
    credits
  } = movie;

  const releaseYear = release_date ? new Date(release_date).getFullYear() : 'N/A';
  const rating = vote_average ? (vote_average / 2).toFixed(1) : 'N/A';
  const posterUrl = getPosterUrl(poster_path, 'w500');
  const backdropUrl = getBackdropUrl(backdrop_path);

  return (
    <Page>
      <Back to="/">← Retour à l'accueil</Back>
      
      {backdropUrl && (
        <Hero>
          <Backdrop src={backdropUrl} alt={title} />
          <HeroContent>
            <Title>{title}</Title>
            <Subtitle>
              {releaseYear} • {runtime} min • Note: {rating}/5
            </Subtitle>
          </HeroContent>
        </Hero>
      )}

      <Content>
        <Poster src={posterUrl} alt={title} />
        
        <Details>
          <Meta>
            {genres?.map(genre => (
              <Tag key={genre.id}>{genre.name}</Tag>
            ))}
          </Meta>

          {overview && (
            <Section>
              <SectionTitle>Synopsis</SectionTitle>
              <Overview>{overview}</Overview>
            </Section>
          )}

          {credits?.cast && credits.cast.length > 0 && (
            <Section>
              <SectionTitle>Distribution</SectionTitle>
              <CastList>
                {credits.cast.slice(0, 6).map(actor => (
                  <CastMember key={actor.id}>
                    <CastName>{actor.name}</CastName>
                    <CastRole>{actor.character}</CastRole>
                  </CastMember>
                ))}
              </CastList>
            </Section>
          )}
        </Details>
      </Content>
    </Page>
  );
}

export default MovieDetail;

