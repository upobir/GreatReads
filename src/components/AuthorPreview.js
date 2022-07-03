import React from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'

export default function AuthorPreview({author}) {
  return (
    <Container>
        <Row>
            <Col xs={2}>
                <Image fluid src="holder.js/100px180" height="100%"/>
            </Col>
            <Col>
                <p>About:</p>
                <h3>author.name</h3>
            </Col>
        </Row>
        <Row>
            <Col>{author.followCount}Following</Col>
            <Col>
            <Button variant='primary'>{author.isFollowedByUser? "Unfollow": "Follow"}</Button>
            </Col>
     
        </Row>
        <Row>
            {author.description}
        </Row>

    </Container>
  )
}
