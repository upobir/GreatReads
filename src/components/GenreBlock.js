import React from 'react'
import { Container, Row, Col,Button } from 'react-bootstrap'

export default function GenreBlock({genres}) {
  return (
    <div>
        <h1> Genre: </h1>
        <Row>
            <Col>
                {genres.map((g) => 
                    <Button key={g.id}>
                        {g.name}
                    </Button> 
                )}
            </Col>
        </Row>
    </div>
  )
}
