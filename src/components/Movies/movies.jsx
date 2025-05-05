import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./movies.css";

const API_URL = "http://54.88.117.91:8000/api/";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [formMode, setFormMode] = useState("add"); // 'add' or 'edit'
  const [showModal, setShowModal] = useState(false);
  const [editingMovieId, setEditingMovieId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    date: "",
    budget: "",
    actors: "",
  });

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(`${API_URL}movies/`);
        const data = await response.json();

        const moviesWithPosters = await Promise.all(
          data.map(async (movie) => {
            const poster = await fetchPoster(movie.title);
            return { ...movie, poster };
          })
        );

        setMovies(moviesWithPosters);
      } catch (err) {
        console.log("Error fetching movies", err);
      }
    };

    getMovies();
  }, []);

  const fetchPoster = async (title) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(
          title
        )}&apikey=8a350606`
      );
      const data = await response.json();
      return data.Poster !== "N/A" ? data.Poster : null;
    } catch (error) {
      console.error("Error fetching poster:", error);
      return null;
    }
  };

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleEdit = (movie) => {
    setFormMode("edit");
    setEditingMovieId(movie.id);
    setEditForm({
      title: movie.title,
      date: movie.date,
      budget: movie.budget,
      actors: movie.actors,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setFormMode("add");
    setEditingMovieId(null);
    setEditForm({
      title: "",
      date: "",
      budget: "",
      actors: "",
    });
    setShowModal(true);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const updatedMovie = {
      title: editForm.title,
      date: editForm.date,
      budget: editForm.budget,
      actors: editForm.actors,
    };

    try {
      let response;
      if (formMode === "add") {
        response = await fetch(`${API_URL}mopvies/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedMovie),
        });
      } else {
        response = await fetch(`${API_URL}movies/${editingMovieId}/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedMovie),
        });
      }

      if (response.ok) {
        const updatedMovie = await response.json();
        if (formMode === "add") {
          const poster = await fetchPoster(updatedMovie.title);
          setMovies((prevMovies) => [
            ...prevMovies,
            { ...updatedMovie, poster },
          ]);
        } else {
          const poster = await fetchPoster(updatedMovie.title);
          setMovies((prevMovies) =>
            prevMovies.map((movie) =>
              movie.id === editingMovieId ? { ...updatedMovie, poster } : movie
            )
          );
        }
        setShowModal(false);
      } else {
        console.error("Failed to save the movie.");
      }
    } catch (error) {
      console.error("Error saving the movie:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}movies/${editingMovieId}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        setMovies((prevMovies) =>
          prevMovies.filter((movie) => movie.id !== editingMovieId)
        );
        setShowModal(false);
        alert("Movie was deleted");
      } else {
        console.error("Failed to delete the movie.");
      }
    } catch (error) {
      console.error("Error deleting the movie:", error);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="add-button">
        <button onClick={handleAdd}>Add Movie!</button>
      </div>
      <div className="container my-4">
        {movies.length === 0 ? (
          <p>No movies found</p>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 row-cols-lg-4 row-cols-xl-5">
            {movies.map((movie) => (
              <div key={movie.id} className="col">
                <div className="card h-100">
                  {movie.poster ? (
                    <img
                      style={{
                        height: "440px",
                        color: "#666",
                        fontSize: "14px",
                      }}
                      src={movie.poster}
                      className="card-img-top"
                      alt={movie.title}
                    />
                  ) : (
                    <div
                      className="card-img-top d-flex align-items-center justify-content-center bg-secondary text-white"
                      style={{ height: "180px" }}
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
                      <strong>Budget:</strong>{" "}
                      {currencyFormatter.format(movie.budget)}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Actors:</strong> {movie.actors}
                    </p>
                    <div className="mt-auto d-flex justify-content-between">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleEdit(movie)}
                      >
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

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {formMode === "add" ? "Add Movie" : "Edit Movie"}
                </h5>
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
                {formMode === "add" ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSave}
                  >
                    Add
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </>
                )}
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
