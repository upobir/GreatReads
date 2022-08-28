import React,{useContext} from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import {Spinner} from 'react-bootstrap';
import SeriesCapsule from './SeriesCapsule'

export const SeriesGallery = ({seriesList, seriesPerRow, spinner})=>{

    console.log('series: ', seriesList)

    if ( spinner )  { // ( books == null || books.length <= 0){
        return <Container>
            <Spinner animation="border" variant="primary" />
        </Container>
    }
    
    return <Row>
    {
        seriesList.map((series, index) => {
            return (<Col xs={12/seriesPerRow} key={index}>
                <SeriesCapsule 
                    series={series}
                    id={series.id}
                    />
            </Col>)
        })
    }
    </Row>
}