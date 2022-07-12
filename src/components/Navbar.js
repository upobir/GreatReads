import React from 'react'
import {Navbar,NavDropdown,Nav, Container, Row, Col, Form,FormControl, Button} from 'react-bootstrap'
import {myBookShelfURL, myFeedURL, homeURL} from '../urls'
export default function GreatReadsNavbar() {
  return (
    <Navbar variant = "dark">
        <Container fluid>
            <Navbar.Brand href={homeURL}>GreatReads</Navbar.Brand>
            <NavDropdown title="Browse" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href ={myBookShelfURL}>Bookshelf</Nav.Link>
            <Nav.Link href ={myFeedURL}>My Feed</Nav.Link>
            <Col xs={3}>
              <Form className="d-flex">
              <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"  
                  aria-label="Search"
                  />
              </Form>
            </Col>
        </Container>
        
    </Navbar>
  )
}
