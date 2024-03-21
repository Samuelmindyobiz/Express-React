import React, { useState, useEffect } from 'react';
import axios from 'axios'


import './App.css'



function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [id, setId] = useState('')
  const [movie, setMovie] = useState('')
  const [genre, setGenre] = useState('')

  const apiCall = async () => {

    try {
      const response = await axios.get('http://localhost:5001/api/movies')
      setMovies(response.data)
    }
    catch (err) {
      setError(err)
    }
    finally {
      setLoading(false)
      console.log(movies)
    }
  }

  const postMovie = async (e) => {
    e.preventDefault()
    try {
      const newMovie = await axios.post('http://localhost:5001/api/movies', {

        movie: movie,
        genre: genre
      })
    }
    catch (err) {
      setError(err)
    }
    finally {
      apiCall()
      setId('')
      setMovie('')
      setGenre('')
    }
  }

  useEffect(() => {
    apiCall()

  }, [])

  console.log(id, movie, genre)

  if (error) return <p>oops schade</p>
  if (loading) return <p>Loading...</p>


  return (
    <>



      {movies.map((movie) => {
        return (
          <div>My favorite movie is {movie.movie} {movie.genre}</div>
        )
      })}


      {/* return (
      <>
        {data.map((data) => (
          <div key={data.id}>
            <h2>The Movie title : {data.title}</h2>
            <p>The Year is :{data.year}</p>
          </div>
        ))} */}

      <form onSubmit={postMovie}>
        <input type="text" placeholder='movie' value={movie} onChange={(e) => setMovie(e.target.value)} />
        <input type="text" placeholder='genre' value={genre} onChange={(e) => setGenre(e.target.value)} />

        <br />
        <button type='submit'>Add Movie</button>
      </form>


    </>
  )
}

export default App
