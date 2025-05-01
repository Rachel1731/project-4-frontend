import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './movies.css'
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
    const [editForm, setEditForm] = useState({
      title: '',
      date: '',
      budget: '',
      actors: '',
    });

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

  const handleEdit = (movie) => {
    setEditingMovie(movie.id);
    setEditForm({
      title: movie.title,
      date: movie.date,
      budget: movie.budget,
      actors: movie.actors,
    });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSave = async (id) => {
    const updatedMovies = {
      title: editForm.title,
      date: editForm.date,
      budget: editForm.budget,
      actors: editForm.actors,
    };

    try {
      const response = await fetch(`http://3.83.236.184:8000/api/movies/${id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMovie),
      });

      if (response.ok) {
        const updatedMovieData = await response.json();
        setMovies((prevMovies) =>
          prevMovies.map((movie) => (movie.id === id ? updatedMovieData : movie))
        );
        setEditingMovie(null);
      } else {
        console.error('Failed to update the movie.');
      }
    } catch (error) {
      console.error('Error updating the movie:', error);
    }
  };

  const handleCancel = () => {
    setEditingMovie(null);
  };

  return (
    <>
      <div className="container my-4">
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
                    <div className="card-img-top d-flex align-items-center justify-content-center bg-secondary text-white"  style={{ height: '180px' }}>
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
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleEdit(movie)}>
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
  
      {editingMovie && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Movie</h5>
                <button type="button"className="close"onClick={handleCancel}aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Title:</label>
                    <input
                      type="text"
                      name="title"
                      value={editForm.title}
                      onChange={handleFormChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Publication Year:</label>
                    <input
                      type="text"
                      name="date"
                      value={editForm.date}
                      onChange={handleFormChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Budget:</label>
                    <input
                      type="text"
                      name="budget"
                      value={editForm.budget}
                      onChange={handleFormChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Actors:</label>
                    <input
                      type="text"
                      name="actors"
                      value={editForm.actors}
                      onChange={handleFormChange}
                      className="form-control"
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleSave(editingBook)}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 
  
export default Movies;
