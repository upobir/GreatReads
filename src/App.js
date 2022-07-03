import './App.scss';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import { bookDetailsURL } from './urls';
import GreatReadsNavbar from './components/Navbar';

import BookDetails from './components/BookDetails';

function App() {
  return (
    <Router>
      <GreatReadsNavbar />
      <div className="app">
        <Link to={bookDetailsURL(2)}>
          Test book.sdsdsds
        </Link>
        <p>aaaaaaaaaaaadfiodfjdifjkdijiojp;lk</p>
        <Routes>
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </div> 
    </Router>
  );
}

export default App;
