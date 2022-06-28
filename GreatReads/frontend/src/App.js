import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import BookDetails from './components/BookDetails';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
        {/* <NotesListPage/> */}
      </div> 
    </Router>
  );
}

export default App;
