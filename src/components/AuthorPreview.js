import React from 'react'
import { Stack, Container, Row, Col, Image, Button } from 'react-bootstrap'
import 'holderjs'
import { useQuery } from 'react-query'
import { authorFetchEndpoint } from '../endpoints'
export default function AuthorPreview({book}) {
    const {author, authorFetchStatus} = useQuery(["authorPreviewForBook", book?.authors], fetchAuthor)
    async function fetchAuthor(){
        let data = await fetch(authorFetchEndpoint(book))
        return data.json()
    }
    function getAuthor(authors){
        if(authorFetchStatus == "success"){
            return authors[0]
        }else{
            return _author
        }
    }
    let _author = {
        "followCount": 178000,
        "isFollowedByUser": false,
        "description": "Duis fermentum velit orci, sit amet laoreet libero faucibus ac. Aliquam erat volutpat. Sed et rutrum orci, vitae mattis mi. Cras eget maximus lacus, id dictum neque. Quisque fermentum neque nunc, at iaculis mauris pellentesque eu. Aliquam erat volutpat. Fusce eu tellus ut tellus consequat condimentum. Aenean congue mollis turpis, quis volutpat metus sagittis malesuada. Etiam ornare leo egestas, placerat sem non, faucibus ex.",
        "name": "Brandon Sanderson",
        "id": 1,
    }
    
  return (
    <Container className='author-preview'>
        <Row>
            <Col xs={4}>
                <Image className='author-preview__image'/>
            </Col>
            <Col xs={8} className='__author-name-block'>
                <div>About:</div>
                <h3 className='primary-text'>{getAuthor().name}</h3>
            </Col>
        </Row>
        <Row>
            <Col xs = "auto">
                    <h3 style={{ paddingTop: 0,
                                 paddingBottom: 0,
                                 marginBlockEnd:0,
                                 marginBlockStart:0  }}>
                        {getAuthor().followCount}
                    </h3>
                    <p>Following</p>
            </Col>
            <Col>
            <Button variant='primary'>
                {getAuthor().isFollowedByUser? "Unfollow": "Follow"}</Button>
            </Col>
     
        </Row>
        <Row>
            <Container>{getAuthor().description}</Container>
        </Row>
    </Container>
  )
}
