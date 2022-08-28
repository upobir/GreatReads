import React,{useContext} from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import AuthorCapsule from './AuthorCapsule'
import {Spinner} from 'react-bootstrap';

export const AuthorGallery = ({authors, authorsPerRow})=>{

    console.log('authors: ', authors)
    
    if( authors == null || authors.length < 0){
        return <Container>
            <Spinner animation="border" variant="primary" />
        </Container>
    }
    return <Row>
    {
        authors.map((author, index) => {
            return (<Col xs={12/authorsPerRow} key={index}>
                <AuthorCapsule 
                    author={author}
                    id={author.id}
                    />
            </Col>)
        })
    }
    </Row>
}