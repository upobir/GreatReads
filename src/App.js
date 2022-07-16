import './App.scss';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import { bookDetailsURL } from './urls';
import GreatReadsNavbar from './components/Navbar';
import {Container} from 'react-bootstrap'
import {Header} from 'react'
import BookDetails from './components/BookDetails';
import { LandingPage } from './components/LandingPage';
import { QueryClientProvider,QueryClient } from 'react-query';
const queryClient = new QueryClient()

function GetBooksList(){
  return <>
    <Link to={bookDetailsURL(2)}>
      Test book
    </Link>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, quisquam aliquam, labore optio error et eveniet magnam, maiores nesciunt consequuntur perspiciatis. Repudiandae, sapiente. Distinctio libero laudantium ipsa laborum nihil ex.</p>
  </>
}
function App() {
  return (
    <Router>
      <QueryClientProvider client = {queryClient}>
        <div className="app">
          <GreatReadsNavbar />
          <Container fluid className='app-body'>
            
            <Routes>
              <Route path="/book/:id/*" element={<BookDetails />} />
              <Route path="/browse/" element={<GetBooksList />} />
              <Route path="/" element={<LandingPage />} />
            </Routes>
            </Container>
        </div> 
      </QueryClientProvider>


    </Router>
  );
}

export default App;
