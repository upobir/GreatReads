import React, {useState, useEffect} from 'react'
import { bookBrowseEndpoint } from '../endpoints'
import { Container, Row, Col,Stack } from 'react-bootstrap'
import { BookSearchPreview } from './BookSearchPreview';
import { Route, Routes } from 'react-router-dom';
import { BrowseGenre } from './BrowseGenre';
import {Spinner} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { useNavigate } from 'react-router-dom';
const AllBooks=({books})=> {
  const navigate = useNavigate()

  if(books.length <= 0){
    return <Container>
      <Spinner animation="border" variant="primary" />
    </Container>
  }else{  
    return <Row>
        <Col xs={{span: 7, offset: 2}}>
          <Stack gap={1}>
            {
            books.map((book) => {
                return (
                    <BookSearchPreview book={book} key={book.id}/>
                )
                })
            }
          </Stack>
      </Col> 
    </Row>
  }
}

export const BrowseBooks = () => {
    const [books, setBooks] = useState([])
  
    const getBooks= async () => { 
      let response = await fetch(bookBrowseEndpoint())
      let jBooks = await response.json()
      console.log('jBooks', jBooks)
      setBooks(jBooks)
    }
  
    useEffect(() => {
      getBooks()
    }, [])
    const handleTabChange = (eventKey, e) => {
      console.log('e', e)
      navigate(eventKey); 
    };
    // if(books.length <= 0)
      // return "loading..."
  
    return (
      <Container fluid>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column" onSelect={handleTabChange}>
            <Nav.Item>
              <Nav.Link eventKey="all" href="#" className="browse-genre__tab-header">
                All
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="byGenre" href="#" className="browse-genre__tab-header">
                By Genre
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="byFollowedAuthors" href="#" className="browse-genre__tab-header">
                By Followed Authors
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="newReleases" href="#" className="browse-genre__tab-header">
                New Releases
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="newlyRated" href="#" className="browse-genre__tab-header">
                Newly Rated
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col xs={5}>
          <Routes>
            <Route path='/genre/:genreID/*' element={<BrowseGenre />} />
            <Route path='/all/' element={<AllBooks books={books} />} />
            {/* <Route path="/byGenre" element={<SimilarBooksView similarBooks={_similar_books} />} /> */}
            {/* <Route path="/byFollowedAuthors" element={<BookReview bookID={id} />}></Route> */}
            {/* <Route path="/newReleases" element={<BookReviews book={book} />} /> */}
            {/* <Route path="/newlyRated" element={<BookReviews bookID={id} />} /> */}
            {/* <Route path="" element={<BookReviews book={book} />} /> */}
          </Routes>
        </Col>

      </Container>
    )
}
