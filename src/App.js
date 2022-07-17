import './App.scss';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import PrivateRoute from "./utils/PrivateRoute";
import AuthContext, { AuthProvider } from './context/AuthContext';
import { bookDetailsURL } from './urls';
import GreatReadsNavbar from './components/Navbar';
import {Container} from 'react-bootstrap'
import {Header} from 'react'
import BookDetails from './components/BookDetails';
import { LandingPage } from './components/LandingPage';
import { QueryClientProvider,QueryClient } from 'react-query';
import { LoginPage } from './components/LoginPage';
import { BrowseBooks } from './components/BrowseBooks';

const queryClient = new QueryClient()
function App() {
  return (
    <Router>
      <div className="app">
        <AuthProvider>
          <Container fluid className='app-body'>
            <GreatReadsNavbar />

            <Routes>
              <Route exact path='/home' element={<PrivateRoute/>}>
                <Route exact path='/home' element={<LandingPage/>}/>
              </Route>
              <Route exact path='/' element={<PrivateRoute/>}>
                <Route exact path='/' element={<LandingPage/>}/>
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/book/:id/*" element={<BookDetails />} />
              <Route path="/browse/*" element={<BrowseBooks />} />
              <Route path="/" element={<LandingPage />} />
            </Routes>
          </Container>
        </AuthProvider >
        </div> 
    </Router>
  );
}

export default App;
