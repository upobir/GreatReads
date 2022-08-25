import './App.scss';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import PrivateRoute from "./utils/PrivateRoute";
import AuthContext, { AuthProvider } from './context/AuthContext';
import GreatReadsNavbar from './components/Navbar';
import {Container} from 'react-bootstrap'
import { Bookshelf } from './components/Bookshelf';
import {Header} from 'react'
import BookDetails from './components/BookDetails';
import { LandingPage } from './components/LandingPage';
import { QueryClientProvider,QueryClient } from 'react-query';
import { LoginPage } from './components/LoginPage';
import { BrowseBooks } from './components/BrowseBooks';
import Register from "./components/RegisterPage";
import { FeedPage } from './components/FeedPage';
import ImgPostTest from './components/imgPostTest';
import AuthorDetails from './components/AuthorDetails';
import Messenger from './components/Messenger';
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
              <Route exact path='/bookshelf/*' element={<PrivateRoute/>}>
                <Route exact path='/bookshelf/*' element={<Bookshelf/>}/>
              </Route>
              <Route exact path='/' element={<PrivateRoute/>}>
                <Route exact path='/' element={<LandingPage/>}/>
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/book/:id/*" element={<BookDetails />} />
              <Route path="/author/:author_id/*" element={<AuthorDetails />} />
              <Route path="/browse/*" element={<BrowseBooks />} />
              <Route path="/user/:user_id/*" element={<Bookshelf />} />
              <Route path="/user/" element={<Bookshelf />} />
              <Route path="/feed/*" element={<FeedPage />} />
              <Route path="/" element={<FeedPage />} />
              <Route path="/messages/:messages_from_id" element={<Messenger />} />
              <Route path="/messages/" element={<Messenger />} />
            </Routes>
          </Container>
        </AuthProvider >
        </div> 
    </Router>
  );
}

export default App;
