const Add = () => {
    return (
      <h1>Add Page</h1>
    )
  };
  
export default Add;

import React from 'react';

const SourcePage = () => {
  return (
    <div style={styles.container}>
      <h1>Books and Movies Source Page</h1>

      <section style={styles.section}>
        <h2>📚 Books</h2>

    <div style={styles.category}>
        <h3>Science-Fiction/Thriller</h3>
        <li><strong>Project Hail Mary (2016)</strong> 
        <li><strong>Gone Girl (2012)</strong>
        <li><strong>Dune (1965)</strong>
        </div>

        <div style={styles.category}>
          <h3>Fiction/Historical Fiction</h3>
          <ul style={styles.list}>
           <li><strong>Rita Hayworth and Shawshank Redemption (1982)</strong>
            <li><strong>Harry Potter and the Philosopher's Stone (1997)</strong> 
            <li><strong>The Great Gatsby</strong> by F. Scott Fitzgerald (1925) <span style={styles.note}>— The American Dream in the Jazz Age.</span></li>
            <li><strong>To Kill a Mockingbird (1960)</strong>
            <li><strong>Catcher in the Rye (1951)</strong>
            <li><strong>The Outsiders (1967)</strong>
            <li><strong>The Book Thief (2005)</strong>
            <li><strong>The Alchemist (1988)</strong>
          </ul>
        </div>

        <div style={styles.category}>
          <h3>Poetry/Romance</h3>
        <li><strong>Beowulf (1000)</strong>
        <li><strong>The Fault in our Stars(2012)</strong>

        <div style={styles.category}>
          <h3>Children's Literature</h3>
        <li><strong>The Secret Garden (1911)</strong>
        <li><strong>Charlotte's Web (1952)</strong>

        <div style={styles.category}>
          <h3>Fantasy/Dystopian</h3>
          <ul style={styles.list}>
            <li><strong>The Hobbit(1937)</strong> by J.R.R. Tolkein 
            <li><strong>The Hunger Games(2008)</strong> by Suzanne Collins  
            <li><strong>Brave New World(1932)</strong>
            <li><strong>The Road (2006)</strong>
          </ul>
        </div>
      </section>

      <section style={styles.section}>
        <h2>🎬 Movies</h2>

        <div style={styles.category}>
          <h3>Drama</h3>
          <ul style={styles.list}>
            <li><strong>The Shawshank Redemption</strong> (1994), Dir. Frank Darabont <span style={styles.note}>— Hope and friendship in prison.</span></li>
            <li><strong>Great Gatsby</strong> (2013), Dir. Baz Luhrmann 
            <li><strong>To Kill a Mockingbird</strong> (1962), Dir. Robert Mulligan



        <div style={styles.category}>
        <h3>Fantasy</h3>
        <ul style={styles.list}>
        <li><strong>Harry Potter and the Philosopher's Stone</strong> (2001), Dir. Chris Columbus