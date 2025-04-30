import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch('http://3.83.236.184:8000/api/movies/', {
          method: 'GET',
        });
        const data = await response.json();

        // Fetch poster for each movie
        const moviesWithPosters = await Promise.all(
          data.map(async (movie) => {
            const poster = await fetchPoster(movie.title);
            return { ...movie, poster };
          })
        );

        setMovies(moviesWithPosters);
      } catch (err) {
        console.log('Error fetching movies', err);
      }
    };

    getMovies();
  }, []);

  const fetchPoster = async (title) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=8a350606`
      );
      const data = await response.json();
      return data.Poster !== 'N/A' ? data.Poster : null;
    } catch (error) {
      console.error('Error fetching poster:', error);
      return null;
    }
  };
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="container my-4">
      <h1 className="mb-4">Movies Page</h1>
      {movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {movies.map((movie) => (
            <div key={movie.id} className="col">
              <div className="card h-100">
                {movie.poster ? (
                  <img
                    src={movie.poster}
                    className="card-img-top"
                    alt={movie.title}
                  />
                ) : (
                  <div
                    className="card-img-top d-flex align-items-center justify-content-center bg-secondary text-white"
                    style={{ height: '180px' }}
                  >
                    No Image
                  </div>
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text mb-1">
                    <strong>Published:</strong> {movie.date}
                  </p>
                  <p className="card-text mb-1">
                  <strong>Budget:</strong> {currencyFormatter.format(movie.budget)}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Actors:</strong> {movie.actors}
                  </p>
                
                  <div className="mt-auto d-flex justify-content-between">
                    <button className="btn btn-outline-primary btn-sm">
                      View
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
