import React from 'react';
import './home.css'; 
const Home = () => {

  return (
    
    <div className="home-container">
      <div className="homeheading">
      <h1>Welcome to Page and Picture</h1>
      <p className="home-paragraph">
        Where all your favorite books and movies live!
      </p> 
      </div>
     <div className="container">
        <div className="movie">
          <img  alt="Movies" src="images/image (1).png" />
        </div>
        <div className="book">
          <img  alt="Books" src="images/image.png" />
        </div >
     </div>
          </div>
        
  );
};


export default Home;