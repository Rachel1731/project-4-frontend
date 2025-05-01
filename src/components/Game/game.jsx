import React, {useState, useEffect} from 'react';

const Game = () => {
  const [books, setBooks] = useState([]);
  const [bookRatings, setBookRatings] = useState({})
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://3.83.236.184:8000/api/books/', {
          method: 'GET',
        });
        const booksData = await response.json();
        setBooks(booksData);

        for (const book of booksData) {
          const ratingResponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(book.title)}`);
          const ratingsData = await ratingResponse.json()
          console.log(ratingsData)
        }
      } catch {

      }
    }
    fetchBooks();
  }, [])

    return (
      <h1>Game Page</h1>
    )
  };
  
export default Game;
  