import styles from './SearchBar.module.css';
import { toast } from 'sonner';
import React from 'react';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const query = String(fd.get('query') || '').trim();

    console.log('[SearchBar] submit, query =', query); 

    if (!query) {
      toast.error('Please enter your search query');
      return;
    }
    onSubmit(query); 
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a className={styles.link} href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
          Powered by TMDB
        </a>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input className={styles.input} type="text" name="query" placeholder="Search movies..." autoComplete="off" />
          <button className={styles.button} type="submit">Search</button>
        </form>
      </div>
    </header>
  );
}
