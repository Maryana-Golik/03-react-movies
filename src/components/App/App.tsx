import 'modern-normalize';
import SearchBar from '../SearchBar/SearchBar';
import { Toaster, toast } from 'sonner';
import { useEffect, useState } from 'react';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import MovieModal from '../MovieModal/MovieModal';
import fetchMovies from '../../services/movieService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSearchSubmit = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!query) return;
    const searchMovies = async (query: string) => {
      try {
        setIsError(false);
        setLoading(true);
        const res = await fetchMovies(query);

        if (res.length == 0) {
          toast.error('No movies found for your request.');
        }
        setMovies(res);
        console.log('Movies:', res);
      } catch {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };
    searchMovies(query);
  }, [query]);

  const closeModalWindow = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />
      <Toaster position="top-center" />
      {loading && <Loader />}
      {isError && <ErrorMessage />}
      {!isError && movies.length > 0 && (
        <MovieGrid onSelect={handleSelect} movies={movies} />
      )}
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModalWindow} />
      )}
    </>
  );
}
