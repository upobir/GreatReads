import { useState, React} from 'react'
import {Stack,Row, Col,Container, Carousel, CarouselItem} from 'react-bootstrap'
import BookCapsule from './BookCapsule';

export const SimilarBooksView = ({similarBooks}) => {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    const groupBooks = (series) => { 
        console.log('series bview series', series)
        let books_grouped = []
        let groupindex = 0;
        let group = []
        for (const seriesEntry of series.entries) { 
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
            <strong className='text-high'>Readers also enjoyed:</strong>
        </Row>
        <Row>
            <Carousel className='book-carousel'>
                {similarBooks && (groupBooks(similarBooks).map((group) => { 
                    return <Carousel.Item >
                                <Container fluid>
                                    <Row>
                                        {group.map((book, index) => {
                                            return  <Col xs = {4} key={index}>
                                                        <BookCapsule book={book}/>
                                                    </Col>
                                        })}
                                </Row>
                                </Container>
                            </Carousel.Item>
                            
                }))}
            </Carousel>
        </Row>
    </Container>
  )
}

