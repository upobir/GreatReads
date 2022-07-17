import React, {useState, useEffect} from 'react'
import { bookBrowseEndpoint } from '../endpoints'
import { Container, Row, Col,Stack } from 'react-bootstrap'
import BookCapsule from './BookCapsule';
import { BookSearchPreview } from './BookSearchPreview';
function bookGallery(books){
    return <Row>
    {
        books.map((book) => {
            return (<Col xs={3} key={book.id}>
                <BookCapsule book={book} />
            </Col>)
        })
    }
    </Row>
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
  
    if(books.length <= 0)
      return "..."
  
    return (
      <Container fluid>

          <Row>
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
      </Container>
    )
}
