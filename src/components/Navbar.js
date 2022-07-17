import React from 'react'
import {Navbar,NavDropdown,Nav, Container, Stack,Row, Col, Form,FormControl, Button} from 'react-bootstrap'
import {myBookShelfURL, myFeedURL, homeURL} from '../urls'

import { useContext } from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";

export default function GreatReadsNavbar() {
  const { user, logoutUser } = useContext(AuthContext);
  
  return (
    <Navbar variant = "dark" fixed="top" className="top-navbar">
        <Container fluid>
            <Stack direction="horizontal" gap={2}>
              <Navbar.Brand href={homeURL}>GreatReads</Navbar.Brand>
              <NavDropdown title="Browse" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
              {user && <Nav.Link href ={myBookShelfURL}>Bookshelf</Nav.Link>}
              {user && <Nav.Link href ={myFeedURL}>My Feed</Nav.Link>}
            </Stack>
            <Col >
              <Form className="d-flex">
              <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"  
                  aria-label="Search"
                  />
              </Form>
            </Col>
            <Navbar.Brand href={homeURL}> {user && <UserInfo user={user} logout={logoutUser} />} </Navbar.Brand>
        </Container>
        
    </Navbar>
  )
}
