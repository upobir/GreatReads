import { useState, React} from 'react'
import {Stack,Row, Col,Container, Carousel, CarouselItem} from 'react-bootstrap'
import BookCapsule from './BookCapsule';

export const SeriesView = ({book, series}) => {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };
    const groupBooks = (series) => { 
        console.log('series', series)
        let books_grouped = []
        let groupindex = 0;
        let group = []
        for (const seriesEntry of series) { 
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
            <p><h5 className='inline-block text-high'>Book {book.seriesEntry}</h5> <span>of</span></p>
            <h3 className='primary-text'>{`${series.name} (${series.entries.length} books):`}</h3>
        </Row>
        <Row>
            <Carousel className='book-carousel'>
                {groupBooks(series.entries).map((group) => { 
                    return <Carousel.Item>
                                <Container>
                                    <Row>
                                        {group.map((seriesEntry) => {
                                            return <Col xs = {4}>
                                                    <Stack>
                                                        <BookCapsule book={seriesEntry}/>
                                                        <Container className='center-text no-pad-y'>Book {seriesEntry.seriesEntry}</Container>
                                                    </Stack>
                                                       
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

