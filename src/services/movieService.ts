import axios from 'axios';
import type { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';

interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export default async function fetchMovies(query: string, page = 1): Promise<Movie[]> {
  console.log('[service] fetchMovies called with:', { query, page }); // ← лог 7

  const token = (import.meta.env.VITE_TMDB_TOKEN || '').trim();
  if (!token) {
    console.error('[service] NO TOKEN from env'); // ← лог 8
    throw new Error('TMDB token missing');
  }

  const { data } = await axios.get<FetchMoviesResponse>(`${BASE_URL}/search/movie`, {
    params: { query, page, include_adult: false, language: 'en-US' },
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return data.results;
}


