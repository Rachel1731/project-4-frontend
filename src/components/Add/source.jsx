import "./source.css";
import { motion, AnimatePresence } from "framer-motion";

const Add = () => {
  return (
    <AnimatePresence>
      <motion.div 
      className="appContainer bg-dark text-light my-4 p-4"
      initial={{opacity: 0, y: 300}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0, y: -50}}
      transition={{duration: 1}}
      >
        <h1>Books and Movies Source Page</h1>

        <section>
          <h2>📚 Backend technology</h2>
        </section>

        <div className="Science Fiction">
          <h3>Django, python and PSQL</h3>
          <li>
            <strong>Python 3.13.3</strong>
          </li>
          <li>
            <strong>Django 4.2.20</strong>
          </li>
          <li>
            <strong>Postgres 16.8</strong>
          </li>
          <h3>Frontend technology</h3>
          <li>
            <strong>react 19.1.0</strong>
          </li>
          <li>
            <strong>react-dom@19.1.0</strong>
          </li>
          <li>
            <strong>react-router-dom@7.5.3</strong>
          </li>
        </div>

        <div className="Poetry">
          <h3>API</h3>
          <li>
            API used for Movie Images
            <strong>OMDB</strong>
          </li>
          <li>
            <strong>https://developers.google.com/books</strong>
          </li>
        </div>

        <div className="Writing">
          <h3>CRUD App</h3>
          <li>
            <strong>Created by</strong> Rachel, Angel, Lead: Connor
          </li>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Add;
