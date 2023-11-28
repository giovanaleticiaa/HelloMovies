import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')// pegar as informações do banco
      .then(response => {
        setMovies(response.data.movies);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  const handleAddMovie = () => {
    console.log("Sending data:", { title, duration });
  
    axios.post('http://localhost:5000/api/add-movies', { title, duration })
      .then(response => {
        console.log("Response from server:", response.data);
        setMovies([...movies, { id: response.data.id, title, duration }]);
        setTitle('');
        setDuration('');
      })
      .catch(error => {
        console.error('Error adding movie:', error);
      });
  };

  return (
    <div className='container'>
      <h1>Filmes</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.title} - {movie.duration}</li>
        ))}
      </ul>
      <div>
        <h2>Add Movie</h2>
        <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Duração (x:xx:xx)" value={duration} onChange={(e) => setDuration(e.target.value)} />
        <button onClick={handleAddMovie}>Adicionar</button>
      </div>
    </div>
  );
}

export default App;