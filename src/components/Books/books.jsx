import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ''

const Books = () => {
  const [books, setBooks] = useState([]);
  const [movies, setMovies] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    date: '',
    category: '',
    movie: null,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const booksResponse = await fetch('http://3.83.236.184:8000/api/books/', {
          method: 'GET',
        });
        const booksData = await booksResponse.json();
        setBooks(booksData);

        const moviesResponse = await fetch('http://3.83.236.184:8000/api/movies/', {
          method: 'GET',
        });
        const moviesData = await moviesResponse.json();
        setMovies(moviesData);
      } catch (err) {
        console.log('Error fetching books or movies', err);
      }
    };
    getData();
  }, []);

  const handleEdit = (book) => {
    setEditingBook(book.id);
    setEditForm({
      title: book.title,
      date: book.date,
      category: book.category,
      movie: book.movie ? book.movie.id : null,
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
    const updatedBook = {
      title: editForm.title,
      date: editForm.date,
      category: editForm.category,
      movie: editForm.movie || null,
    };

    try {
      const response = await fetch(`http://3.83.236.184:8000/api/books/${id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook),
      });

      if (response.ok) {
        const updatedBookData = await response.json();
        setBooks((prevBooks) =>
          prevBooks.map((book) => (book.id === id ? updatedBookData : book))
        );
        setEditingBook(null);
      } else {
        console.error('Failed to update the book.');
      }
    } catch (error) {
      console.error('Error updating the book:', error);
    }
  };

  const handleCancel = () => {
    setEditingBook(null);
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Books Page</h1>
      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {books.map((book) => (
            <div key={book.id} className="col">
              <div className="card h-100">
                <img
                  src={book.image || 'https://via.placeholder.com/286x180?text=Book+Cover'}
                  className="card-img-top"
                  alt={book.title}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text mb-1">
                    <strong>Published:</strong> {book.date}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Category:</strong> {book.category}
                  </p>
                  <p className="card-text mb-3">
                    <strong>Related Movie:</strong>{' '}
                    {book.movie ? book.movie.title : 'None'}
                  </p>
                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleEdit(book)}
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

      {editingBook && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Book</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCancel}
                  aria-label="Close"
                >
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
                    <label>Category:</label>
                    <input
                      type="text"
                      name="category"
                      value={editForm.category}
                      onChange={handleFormChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Related Movie:</label>
                    <select
                      name="movie"
                      value={editForm.movie || ''}
                      onChange={handleFormChange}
                      className="form-control"
                    >
                      <option value="">None</option>
                      {movies.map((movie) => (
                        <option key={movie.id} value={movie.id}>
                          {movie.title}
                        </option>
                      ))}
                    </select>
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
    </div>
  );
};

export default Books;
