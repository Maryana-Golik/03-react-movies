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
  const token = (import.meta.env.VITE_TMDB_TOKEN || '').trim();

  console.log('VITE_TMDB_TOKEN length:', token.length);

  if (!token) {
   
    throw new Error('TMDB token is missing. Put VITE_TMDB_TOKEN in .env.local and restart dev server.');
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

