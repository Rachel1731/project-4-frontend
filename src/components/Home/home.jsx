import React from 'react';
import './home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-heading">Welcome to the Books/Movies Home Page</h1>
      <p className="home-paragraph">
        Where all your favorite books and movies live!
      </p>
    </div>
  );
};


const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#333',
  },
  paragraph: {
    fontSize: '1.2rem',
    color: '#555',
  },
};

export default Home;

  
