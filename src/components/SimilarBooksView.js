import { useEffect } from 'react';
import { useState, React} from 'react'
import {Stack,Row, Col,Container, Carousel, CarouselItem} from 'react-bootstrap'
import { similarBooksEndpoint } from '../endpoints';
import useAxios from '../utils/useAxios';
import BookCapsule from './BookCapsule';
import { BookCarousel } from './BookCarousel';
import { SimpleSpinner } from './SpinnerWrapper';
export const SimilarBooksView = ({bookID}) => {
    const [similarBooks,setSimilarBooks] = useState(null)
    const api = useAxios()
    useEffect(() => { 
        api()
        .get(similarBooksEndpoint(bookID))
        .then((response)=>{
            let _similarBooks = response.data
            console.log('_similarBooks', _similarBooks)
            setSimilarBooks(_similarBooks)
        })
        .catch(err=>console.log('similar books fetch err', err))
    },[]) 
    const handleSeriesUpdate = (mutatedBooks) => {
        setSimilarBooks({books: mutatedBooks});
    }  
    if(similarBooks == null)
        return <SimpleSpinner />
    return (
        <Container>
            <Row>
                <h3 className='text-high'>Readers also enjoyed:</h3>
            </Row>
            <Row>
                <BookCarousel books={similarBooks} setBooks={handleSeriesUpdate}></BookCarousel>
            </Row>
        </Container>
  )
}

