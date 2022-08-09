import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Row, Col,Container, Stack } from 'react-bootstrap';
import { browseNewReleasesEndpoint } from '../endpoints';
import { BookGallery } from './BookGallery';
export const BrowseNewReleases = () => {
    const [books, setBooks] = useState([])
    
    const getBooks= async () => { 
      let response = await fetch(browseNewReleasesEndpoint())
      let jBooks = await response.json()
      console.log('jBooks', jBooks)
      setBooks(jBooks)
    }
  
    useEffect(() => {
      getBooks()
    }, [])

  return (
    <Container fluid>
          <Row>
              <Stack gap={1} className='browse-new'>
                  <div gap={0} className='browse-new__header'>
                      <h3 className='primary-text'>Hot new releases:</h3>
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