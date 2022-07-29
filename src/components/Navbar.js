import React, {useRef} from 'react'
import {Navbar,NavDropdown,Nav, Container, Stack,Row, Col, Form,FormControl, Button, ButtonGroup} from 'react-bootstrap'
import {myBookShelfURL, myFeedURL, homeURL, browseAllURL, genreBrowseURL} from '../urls'
import { Link } from 'react-router-dom';
import { useContext } from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";
import {OverlayTrigger} from 'react-bootstrap';
import { useState } from 'react';
import { Overlay } from 'react-bootstrap';
import { _genres } from '../PlaceHolder';

export default function GreatReadsNavbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const target = useRef(null);
  const [show,setShow] = useState(false)
  const GenreSubmenu = () => { 
    console.log('_genres', _genres)
    return (
      <Stack vertical
      onMouseEnter={()=>setShow(true)}
      onMouseLeave={()=>setShow(false)}>
        {_genres.map((genre, index)=> {
          return <Link to={genreBrowseURL(genre.id)}>{genre.tag}</Link>
        })}
      </Stack>
    )
  }
  return (
    <Navbar variant = "dark" fixed="top" className="top-navbar">
      <Stack >
                    <Stack direction="horizontal" gap={2} className="top-navbar__inner">
                      <Navbar.Brand href={homeURL}>GreatReads</Navbar.Brand>
                      <NavDropdown title="Browse" >
                          <Stack direction='horizontal'>
                            <Stack>
                              {/* <OverlayTrigger
                                onEnter={()=>setShow(true)}
                                onExit={()=>setShow(false)}
                                overlay={()=> ""}
                                > */}
                                <NavDropdown.Item as={Link} to={genreBrowseURL(1)}
                                     onMouseEnter={()=>setShow(true)}
                                     onMouseLeave={()=>setShow(false)}
                                >
                                  Genre
                                </NavDropdown.Item>
                              {/* </OverlayTrigger> */}
                              <NavDropdown.Item href="#action/3.3">New Releases</NavDropdown.Item>
                              <NavDropdown.Item href="#action/3.4">Followed Authors</NavDropdown.Item>
                              <NavDropdown.Item href="#action/3.4">Newly Reviewed</NavDropdown.Item>
                            </Stack>
                            {show && <GenreSubmenu/>}
                            {/* <Overlay target={target.current} show={show}> */}
                                {/* <div> */}
                                {/* <ButtonGroup vertical>
                                  <Button>Button</Button>
                                  <Button>Button</Button>
                                </ButtonGroup> */}
                                {/* </div> */}
                            {/* </Overlay> */}
                          </Stack>
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
