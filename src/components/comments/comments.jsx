import "./comments.css";

const Comments = () => {
  return (
    <div className="appContainer">
      <h1>Books and Movies Source Page</h1>

      <section>
        <h2>📚 Books</h2>
      </section>

      <div className="ScienceFiction">
        <h3>Science-Fiction/Thriller</h3>
        <li>
          <strong>Project Hail Mary (2016)</strong>
        </li>
        <li>
          <strong>Gone Girl (2012)</strong>
        </li>
        <li>
          <strong>Dune (1965)</strong>
        </li>
      </div>

      <div className="Fiction">
        <h3>Fiction/Historical Fiction</h3>
        <ul>
          <li>
            <strong>Rita Hayworth and Shawshank Redemption (1982)</strong>
          </li>
          <li>
            <strong>Harry Potter and the Philosopher's Stone (1997)</strong>
          </li>
          <li>
            <strong>The Great Gatsby</strong> by F. Scott Fitzgerald (1925){" "}
            <span> The American Dream in the Jazz Age.</span>
          </li>
          <li>
            <strong>To Kill a Mockingbird (1960)</strong>
          </li>
          <li>
            <strong>Catcher in the Rye (1951)</strong>
          </li>
          <li>
            <strong>The Outsiders (1967)</strong>
          </li>
          <li>
            <strong>The Book Thief (2005)</strong>
          </li>
          <li>
            <strong>The Alchemist (1988)</strong>
          </li>
        </ul>
      </div>

      <div className="Poetry">
        <h3>Poetry/Romance</h3>
        <li>
          <strong>Beowulf (1000)</strong>
        </li>
        <li>
          <strong>The Fault in our Stars(2012)</strong>
        </li>
      </div>

      <div className="Writing">
        <h3>Children's Literature</h3>
        <li>
          <strong>The Secret Garden (1911)</strong>
        </li>
        <li>
          <strong>Charlotte's Web (1952)</strong>
        </li>
      </div>

      <div className="Fantasy">
        <h3>Fantasy/Dystopian</h3>
        <ul>
          <li>
            <strong>The Hobbit(1937)</strong>
          </li>{" "}
          by J.R.R. Tolkein
          <li>
            <strong>The Hunger Games(2008)</strong>
          </li>{" "}
          by Suzanne Collins
          <li>
            <strong>Brave New World(1932)</strong>
          </li>
          <li>
            <strong>The Road (2006)</strong>
          </li>
        </ul>
      </div>

      <section>
        <h2>🎬 Movies</h2>
      </section>

      <div>
        <h3>Drama</h3>
        <ul>
          <li>
            <strong>The Shawshank Redemption</strong> (1994), Dir. Frank
            Darabont <span> Hope and friendship in prison.</span>
          </li>
          <li>
            <strong>Great Gatsby</strong> (2013), Dir. Baz Luhrmann
          </li>
          <li>
            <strong>To Kill a Mockingbird</strong> (1962), Dir. Robert Mulligan
          </li>
        </ul>
      </div>

      <div className="Fantasy">
        <h3>Fantasy</h3>
        <ul>
          <li>
            <strong>Harry Potter and the Philosopher's Stone</strong> (2001),
            Dir. Chris Columbus
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Comments;
