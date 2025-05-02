import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './books.css'

const Books = () => {
  const [books, setBooks] = useState([]);
  const [movies, setMovies] = useState([]);
  const [formMode, setFormMode] = useState('add');
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [bookCovers, setBookCovers] = useState({})
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

        //API fetches cover for each book
        const coverPromises = booksData.map(async (book) => {
          const coverUrl = await fetchCoverByTitle(book.title);
          console.log(`Cover for ${book.title}:`, coverUrl);
          return { id: book.id, coverUrl };
        });
        const coversArray = await Promise.all(coverPromises);
        const covers = coversArray.reduce((acc, { id, coverUrl }) => {
          acc[id] = coverUrl;
          return acc;
        }, {});
        setBookCovers(covers);

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

  const fetchCoverByTitle = async (title) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}`
      );
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const book = data.items[0]; // Get the first matching book
        const coverUrl = book.volumeInfo.imageLinks?.thumbnail;
        return coverUrl || null;
      }
      return null;
    } catch (error) {
      console.error('Error fetching book cover:', error);
      return null;
    }
  };
  const handleEdit = (book) => {
    setFormMode('edit');
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

  const handleSave = async () => {
    const updatedBook = {
      title: editForm.title,
      date: editForm.date,
      category: editForm.category,
      movie: editForm.movie || null,
    };
    console.log(editingBook)
    try {
      let response;
      if (formMode === 'add') {
        response = await fetch('http://3.83.236.184:8000/api/books/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedBook),
        });
      } else {
        response = await fetch(`http://3.83.236.184:8000/api/books/${editingBook}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedBook),
        });
      }

      if (response.ok) {
        const updatedBookData = await response.json();
        const coverURL = await fetchCoverByTitle(updatedBookData.title);
        if (formMode === 'add') {
          setBooks((prevBooks) => [...prevBooks, updatedBookData]);
          setBookCovers((prevCovers) => ({
            ...prevCovers,
            [updatedBookData.id]: coverURL,
          }));
        } else {
          setBooks((prevBooks) =>
          prevBooks.map((book) => (book.id === editingBook ? updatedBookData : book))
        );
        setBookCovers((prevCovers) => ({
          ...prevCovers, [editingBook]: coverURL,
        }))
        console.log(updatedBook)
        }
        
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
    setEditForm({
      title: '',
    date: '',
    category: '',
    movie: null,
    })

  };

  const handleDelete = async () => {
    const response = await fetch(`http://3.83.236.184:8000/api/books/${editingBook}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== editingBook))
      setEditingBook(null);
      alert('Book Deleted')
    }
  }
  const handleAdd = () => {
    setFormMode('add');
    setEditingBook(true);
    setEditForm({
    title: '',
    date: '',
    category: '',
    movie: null,
    })
  }
  return (
    <>
    <div className="add-button">
        <button onClick={handleAdd}>Add Book!</button>
    </div>
    <div className="container my-4">
      
      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
          {books.map((book) => (
            <div key={book.id} className="col d-flex justify-content-center">
              <div className="card h-100" style={{maxWidth: '300px'}}>
              {bookCovers[book.id] ? (
                  <img
                    src={bookCovers[book.id]}
                    className="card-img-top"
                    alt={book.title}
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    className="card-img-top bg-light d-flex align-items-center justify-content-center"
                    style={{ height: '300px', color: '#666', fontSize: '14px' }}
                  >
                    No Cover Available
                  </div>
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text mb-1">
                    <strong>Published:</strong> {book.date}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Category:</strong> {book.category}
                  </p>
                  <p className="card-text mb-3">
                    <strong>Related Movie:</strong>
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
                <h5 className="modal-title">
                {formMode === 'add' ? 'Add Book' : 'Edit Book'}
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
              {formMode === 'add' ? (
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
    </div>
    </>
  );
};

export default Books;


