import { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import './App.css';
import SearchIcon from './search.svg'

const API_URL = process.env.REACT_APP_API_KEY;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies({API_URL})
  }, [])

   return (
    <div className="app">
      <h1>MoviesLand</h1>

      <div className="search">
        <input 
          type="text" 
          placeholder='Search for movies' 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img 
          src={SearchIcon} 
          alt="Search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0
          ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.imdbID}/>
              ))}
            </div> 
          ) : (
            <div className="empty">
              <h2>Welcome! Please, search your favorite movie on input field above.</h2>
            </div>
          )}                 
      </div>
  );
}

export default App;
