import { React} from 'react'
import {Row, Container, CarouselItem} from 'react-bootstrap'
import { seriesFetchEndpoint } from '../endpoints';
import { BookCarousel } from './BookCarousel';
export const SeriesView = ({book, series, setSeries}) => {
    const handleSeriesUpdate = (mutatedBooks) => {
        setSeries({books: mutatedBooks});
    }
    
    
    return (
        <Container>
            <Row>
            {series &&
                <>
                    <p><strong className='inline-block text-high'>Book {book?.seriesEntry}</strong> <span>of</span></p>
                    <h3 className='primary-text'>{`${series.name} (${series.bookCount} books):`}</h3>
                </>}
            </Row>
            <Row>
                <BookCarousel series={series} setSeries={handleSeriesUpdate}/>     
            </Row>
        </Container>
    )
}

