import React, {useState, useEffect} from 'react'
import { Container,Row,Col,Stack } from 'react-bootstrap'
import { browseFollowedAuthorEndpoint } from '../endpoints'
import { BookGallery } from './BookGallery'
import useAxios from '../utils/useAxios';
export const BrowseFollowedAuthors = () => {
    const [books, setBooks] = useState([])
    const api =  useAxios()
    
    const getBooks= async () => { 
      api()
      .get(browseFollowedAuthorEndpoint())
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
                      <h3 className='primary-text'>From authors you follow:</h3>
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
