import React from 'react'
import { Stack, Container, Row, Col, Image, Button } from 'react-bootstrap'
import 'holderjs'

export default function AuthorPreview({author}) {
  return (
    <Container>
        <Row>
            <Col xs={2}>
                <Image fluid src="holder.js/100px180" height="100%"/>
            </Col>
            <Col>
                <p>About:</p>
                <h3>{author.name}</h3>
            </Col>
        </Row>
        <Row>
            <Col xs = "auto">
                    <h3 style={{ paddingTop: 0,
                                 paddingBottom: 0,
                                 marginBlockEnd:0,
                                 marginBlockStart:0  }}>
                        {author.followCount}
                    </h3>
                    <p>Following</p>
            </Col>
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
