import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import { bookDetailsViewEndpoint } from './urls';

import BookDetails from './components/BookDetails';

function App() {
  return (
    <Router>
      <div className="app">
        <Link to={bookDetailsViewEndpoint(2)}>
          Test book.
        </Link>
        <Routes>
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </div> 
    </Router>
  );
}

export default App;
