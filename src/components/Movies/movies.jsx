import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./movies.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch("http://3.83.236.184:8000/api/movies/", {
          method: "GET",
        });
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        console.log("Error fetching movies", err);
      }
    };
    getMovies();
  }, []);

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
                <img
                  src={movie.image || "https://via.placeholder.com/286x180"}
                  className="card-img-top"
                  alt={movie.title}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text mb-1">
                    <strong>Published:</strong> {movie.date}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Budget:</strong> {movie.budget}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Actors:</strong> {movie.actors}
                  </p>
                  <p className="card-text mb-3">
                    <strong>Related Movie:</strong>{" "}
                    {movie.movie ? movie.movie.title : "None"}
                  </p>
                  <div className="mt-auto">
                    <a
                      href={`/movies/${movie.id}`}
                      className="btn btn-primary me-2"
                    >
                      View
                    </a>
                    <a
                      href={`/movies/edit/${movie.id}`}
                      className="btn btn-secondary"
                    >
                      Edit
                    </a>
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
