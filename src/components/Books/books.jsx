import React, { useEffect, useState } from 'react'

const Books = () => {
  const [books, setBooks] = useState([])
  
  useEffect(() => {
    const getBooks = async () => {
        try {
          const response = await fetch('http://3.83.236.184:8000/api/books/',{
            method: 'GET',
          });
          const data = await response.json();
          setBooks(data)
        } catch (err) {
          console.log("Error fetching books", err)
        }
    }
    getBooks();
  }, [])
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
              </div>
            ))}
          </div>
        )}
      </div>
      
    )
  };
  
export default Books;
  