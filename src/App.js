import './App.scss';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import { bookDetailsURL } from './urls';
import GreatReadsNavbar from './components/Navbar';
import {Container} from 'react-bootstrap'
import {Header} from 'react'
import BookDetails from './components/BookDetails';
function GetBooksList(){
  return <>
    <Link to={bookDetailsURL(2)}>
      Test book.sdsdsds
    </Link>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, quisquam aliquam, labore optio error et eveniet magnam, maiores nesciunt consequuntur perspiciatis. Repudiandae, sapiente. Distinctio libero laudantium ipsa laborum nihil ex.</p>
  </>
}
function App() {
  return (
    <Router>
      <div className="app">
        <GreatReadsNavbar />
        <Container fluid className='app-body'>
          
          <Routes>
            <Route path="/book/:id/*" element={<BookDetails />} />
            <Route path="/" element={<GetBooksList />} />
          </Routes>
          </Container>
        </div> 
    </Router>
  );
}

export default App;
