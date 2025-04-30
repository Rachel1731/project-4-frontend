import React, { useEffect, useState } from 'react'
import './books.css'

const Books = () => {
  const [books, setBooks] = useState([]);
  const [movies, setMovies] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [bookCovers, setBookCovers] = useState(null)
  const [editForm, setEditForm] = useState({
    title: '', date: '', category: '', movie: null });
  
  useEffect(() => {
    const getData = async () => {
        try {
          const booksResponse = await fetch('http://3.83.236.184:8000/api/books/',{
            method: 'GET',
          });
          const booksData = await booksResponse.json();
          setBooks(booksData);
          const moviesResponse = await fetch('http://3.83.236.184:8000/api/movies/',{
            method: 'GET',
          });
          const moviesData = await moviesResponse.json();
          setMovies(moviesData);
        } catch (err) {
          console.log("Error fetching books", err)
        }
    }
    getData();
  }, []);

  const handleEdit = (book) => {
    console.log('Editting book:', book.id)
    setEditingBook(book.id);
    console.log('Editting book after set:', book.id)
    setEditForm({
      title: book.title, 
      date: book.date,
       category: book.category, 
       movie: '',
    });
  };
  const handleFormChange = (event) => {
    setEditForm({...editForm, [event.target.name]: event.target.value})
  }
  const handleSave = async (id) => {
    const updatedBook = {
      title: editForm.title,
      date: editForm.date,
      category: editForm.category,
      movie: editForm.movie || null,
    };
    const response = await fetch(`http://3.83.236.184:8000/api/books/${id}`, {
      method: 'PUT',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(updatedBook)
    });
    const updatedBookData = await response.json();
    setBooks(books.map((book) => (book.id === id ? updatedBookData : book)))
    setEditingBook(null);
  };

  const handleCancel = () => {
    setEditingBook(null);
    setEditForm({
      title: '',
      date: '',
      category: '',
      movie: null
    });
  }
  
    return (
      <div className='books-container'>
        <h1>Books Page</h1>
        {books.length === 0 ? (
          <p>No books found</p>
        ) : (
          <div className="book-card">
            {books.map((book) => (
              <div key={book.id} className='book-item'>
                <h3>{book.title}</h3>
                <p>Published: {book.date}</p>
                <p>Category: {book.category}</p>
                <p>Related Movie:
                  {book.movie ? book.movie.title : 'None'}
                </p>
                <button onClick={() => handleEdit(book)}>Edit</button>
              </div>
            ))}
          </div>
        )}
        {editingBook && (
          <div className='modal'>
            <div className='modal-content'>
              <h2>Edit Book</h2>
              <div className="edit-form">
                <div>
                  <label>Title:</label>
                  <input
                    type='text'
                    name='title'
                    value={editForm.title}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div>
                  <label>Publication Year:</label>
                  <input
                    type='number'
                    name='date'
                    value={editForm.date}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div>
                  <label>Category:</label>
                  <input
                    type='text'
                    name='category'
                    value={editForm.category}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div>
                  <label>Related Movie:</label>
                  <select
                  name='movie'
                  value={editForm.movie || ''}
                  onChange={handleFormChange}
                  >
                  {movies.map((movie) => (
                    <option key={movie.id} value={movie.id}>
                      {movie.title}
                    </option>
                  ))}
                  </select>
                </div>
                  <button onClick={() => handleSave(editingBook)}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
      
    )
  };
  
export default Books;
  