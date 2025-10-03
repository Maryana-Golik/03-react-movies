import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import type { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import fetchMovies from '../../services/movieService';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selected, setSelected] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchSubmit = (q: string) => {
    console.log('[App] setQuery:', q); 
    setQuery(q);
  };

  useEffect(() => {
    console.log('[App] useEffect, query =', query); 
    if (!query) return;

    (async () => {
      try {
        setIsError(false);
        setLoading(true);
        console.log('[App] calling fetchMovies…'); 
        const res = await fetchMovies(query);
        console.log('[App] fetchMovies OK, count =', res.length); 
        if (res.length === 0) toast.error('No movies found for your request.');
        setMovies(res);
      } catch (err) {
        console.error('[App] fetchMovies ERROR:', err); 
        setIsError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [query]);

  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />
      <Toaster position="top-center" />
      {loading && <Loader />}
      {isError && <ErrorMessage />}
      {!isError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={(m) => { setSelected(m); setIsModalOpen(true); }} />
      )}
      {isModalOpen && selected && (
        <MovieModal movie={selected} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

