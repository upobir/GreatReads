import React, {useState, useEffect} from 'react'
import { bookBrowseEndpoint } from '../endpoints'
import { Container, Row, Col,Stack } from 'react-bootstrap'
import { BookSearchPreview } from './BookSearchPreview';
import { Route, Routes } from 'react-router-dom';
import { BrowseGenre } from './BrowseGenre';
import {Spinner} from 'react-bootstrap';
const AllBooks=({books})=> {
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
  
    // if(books.length <= 0)
      // return "loading..."
  
    return (
      <Container fluid>
          <Routes>
              <Route path='/genre/:genreID/*' element={<BrowseGenre />} />
              <Route path='/all/' element={<AllBooks books={books} />} />
          </Routes>


      </Container>
    )
}
