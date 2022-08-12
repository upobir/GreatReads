import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Row, Col,Container, Stack } from 'react-bootstrap';
import { browseNewlyRatedEndpoint } from '../endpoints';
import { BookGallery } from './BookGallery';
import useAxios from '../utils/useAxios';
export const BrowseNewlyRated = () => {
    const [books, setBooks] = useState([])
    const api =  useAxios() 
    
    const getBooks= async () => { 
   
      api()
      .get(browseNewlyRatedEndpoint())
      .then((response) => {
        let _books  = response.data
        console.log('_books', _books)
        setBooks(_books) 
      })
      .catch((error)=>{
        console.log('books fetch error', error)
      })
    }
  
    useEffect(() => {
      getBooks()
    }, [])

  return (
    <Container fluid>
          <Row>
              <Stack gap={1} className='browse-new'>
                  <div gap={0} className='browse-new__header'>
                      <h3 className='primary-text'>Newly Rated Releases:</h3>
                      <hr style={{ marginBlockStart: "0.25em", marginBlockEnd: "0.25em" }} />
                  </div>
                  {books &&
                      <div className='browse-new__body'>
                          <BookGallery books={books} booksPerRow={4} setBooks={setBooks}></BookGallery>
                      </div>
                  }
              </Stack>

          </Row>
      </Container>
  )
}
