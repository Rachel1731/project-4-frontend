import React from 'react';
import './home.css'; 
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {

  return (
    <AnimatePresence>
    <div className="home-container">
      <motion.div 
      className="homeheading"
      initial={{opacity: 0, y: -50}}
      animate={{opacity: 1, y: 0, x: 0}}
      exit={{opacity: 0, y: -50}}
      transition={{duration: .5}}
      >
      <h1>Welcome to Page and Picture</h1>
      <p className="home-paragraph">
        Where all your favorite books and movies lived!
      </p> 
      </motion.div>
      
      <div className="container">
        <motion.div 
        className="movie"
        initial={{opacity: 0, y: 100, x: -90}}
        animate={{opacity: 1, y: 0, x: 0}}
        exit={{opacity: 0, y: -50}}
        transition={{duration: .5}}
        >
          <img  alt="Movies" src="images/image (1).png" />
        </motion.div>
        <motion.div 
        className="book"
        initial={{opacity: 0, y: 100, x: 90}}
        animate={{opacity: 1, y: 0, x: 0}}
        exit={{opacity: 0, y: -50}}
        transition={{duration: .5}}
        >
          <img  alt="Books" src="images/image.png" />
        </motion.div >
     </div>
    </div>
    </AnimatePresence>
        
  );
};


export default Home;