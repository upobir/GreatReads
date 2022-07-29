import React from 'react'
import {Navbar,NavDropdown,Nav, Container, Stack,Row, Col, Form,FormControl, Button} from 'react-bootstrap'
import {myBookShelfURL, myFeedURL, homeURL, browseAllURL, genreBrowseURL} from '../urls'
import { Link } from 'react-router-dom';
import { useContext } from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";

export default function GreatReadsNavbar() {
  const { user, logoutUser } = useContext(AuthContext);
  
  return (
    <Navbar variant = "dark" fixed="top" className="top-navbar">
      <Stack >
                    <Stack direction="horizontal" gap={2} className="top-navbar__inner">
                      <Navbar.Brand href={homeURL}>GreatReads</Navbar.Brand>
                      <NavDropdown title="Browse" id="basic-nav-dropdown">
                          <NavDropdown.Item as={Link} to={browseAllURL()}>
                            All
                          </NavDropdown.Item>
                          <NavDropdown.Item as={Link} to={genreBrowseURL(1)}>
                            Genre
                          </NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.3">New Releases</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.4">Followed Authors</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.4">Newly Reviewed</NavDropdown.Item>
                      </NavDropdown>
                      {user && <Nav.Link href ={myBookShelfURL}>Bookshelf</Nav.Link>}
                      {user && <Nav.Link href ={myFeedURL}>My Feed</Nav.Link>}
                      <Form className="d-flex" style={{flex:"1"}}>
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                    </Form>
                    {user && <UserInfo user={user} logout={logoutUser} />} 
                    </Stack>
                <Row><div className='primary-bg top-navbar__border-hack'></div></Row>
      </Stack>    
    </Navbar>
  )
}
