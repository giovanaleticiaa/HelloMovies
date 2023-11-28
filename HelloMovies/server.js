import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('movies.db');

// Crie uma tabela de filmes
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS movies (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, duration TEXT)');
});

app.get('/api/movies', (req, res) => {
  db.all('SELECT * FROM movies', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ movies: rows });
  });
});

app.post('/api/add-movies', (req, res) => {
  const { title, duration } = req.body;

  console.log("Received data:", { title, duration });

  if (!title || !duration) {
    res.status(400).json({ error: 'Title and duration are required' });
    return;
  }

  db.run('INSERT INTO movies (title, duration) VALUES (?, ?)', [title, duration], function (err) {
    if (err) {
      console.error("Error inserting into database:", err.message);
      res.status(500).json({ error: err.message });
      return;
    }

    console.log("Movie added. ID:", this.lastID);
    res.json({ id: this.lastID });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});