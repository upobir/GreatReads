import React from 'react'
import { Stack, Row, Col, Image, Container} from 'react-bootstrap'
import 'holderjs'
import { FaBookOpen, FaBookmark, FaCheck } from 'react-icons/fa'
export default function BookCapsule({book}) {
  return (
    <Container>
        <Row>
          <Image fluid src="holder.js/100px180" width={"100%"}/>
        </Row>
        <Row>
          <Col xs = {4}><FaBookmark fontSize={20}/></Col>
          <Col xs = {4}><FaBookOpen  fontSize={20}/></Col>
          <Col xs = {4}><FaCheck  fontSize={20}/></Col>
        </Row>
    </Container>
  )
}
