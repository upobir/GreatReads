import { useState, React} from 'react'
import {Stack,Row, Col,Container, Carousel, CarouselItem} from 'react-bootstrap'
import BookCapsule from './BookCapsule';

export const SimilarBooksView = ({similarBooks}) => {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    const groupBooks = (books) => { 
        console.log('series', books)
        let books_grouped = []
        let groupindex = 0;
        let group = []
        for (const seriesEntry of books) { 
            if((groupindex++) >= 3){
                books_grouped.push(group)
                group = []
            } 
            group.push(seriesEntry)
        }
        console.log('books_grouped', books_grouped)
        return books_grouped
    }
  return (
    <Container>
        <Row>
            <h5 className='text-high'>Readers also enjoyed:</h5>
        </Row>
        <Row>
            <Carousel className='book-carousel'>
                {groupBooks(similarBooks).map((group) => { 
                    return <Carousel.Item >
                                <Container fluid>
                                    <Row>
                                        {group.map((book) => {
                                            return  <Col xs = {4}>
                                                        <BookCapsule book={book}/>
                                                    </Col>
                                        })}
                                </Row>
                                </Container>
                            </Carousel.Item>
                            
                })}
            </Carousel>
        </Row>
    </Container>
  )
}

