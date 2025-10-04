import styles from './SearchBar.module.css';
import { toast } from 'sonner';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  
  const formAction = (formData: FormData) => {
    const query = String(formData.get('query') || '').trim();

    if (!query) {
      toast.error('Please enter your search query');
      return;
    }

    onSubmit(query); 
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        {}
        <form action={formAction} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="query"            
            placeholder="Search movies..."
            autoComplete="off"
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

