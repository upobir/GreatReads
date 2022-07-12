import React from 'react'
import { Stack, Container, Row, Col,Button } from 'react-bootstrap'

export default function GenreBlock({genres}) {
  return (
    <div>
        <h1> Genre: </h1>
        <Stack gap={2} direction="horizontal">
        {genres.map((g) => 
                    <Col xs={"auto"}>
                        <Button key={g.id} >
                            {g.name}
                        </Button> 
                    </Col>
                )}
        </Stack>
        <br />
    </div>
  )
}
