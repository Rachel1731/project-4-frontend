import React from 'react';
import './home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-heading">Welcome to the Books/Movies Home Page</h1>
      <p className="home-paragraph">
        Where all your favorite books and movies live!
      </p>
      <div>
        <img src='images/stack-of-books.png'/>
      </div>
    </div>
  );
};


export default Home;

  
