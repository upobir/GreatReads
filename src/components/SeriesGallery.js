import React,{useContext} from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import {Spinner} from 'react-bootstrap';
import SeriesCapsule from './SeriesCapsule'

export const SeriesGallery = ({seriesList, seriesPerRow})=>{

    console.log('series: ', seriesList)
    
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