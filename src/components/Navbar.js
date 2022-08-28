import React, {useRef} from 'react'
import {Navbar,NavDropdown,Nav, Container, Stack,Row,
        Col, Form,FormControl, Button, ButtonGroup,
      Dropdown, DropdownButton} from 'react-bootstrap'
import {myBookShelfURL, myFeedURL, homeURL, browseAllURL,
   genreBrowseURL, newlyRatedBrowseURL, newReleasesBrowseURL, followedAuthorBrowseURL, loginURL, registerURL
  } from '../urls'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";
import {OverlayTrigger} from 'react-bootstrap';
import { useState } from 'react';
import { Overlay } from 'react-bootstrap';
import { _genres } from '../PlaceHolder';
import useAxios from '../utils/useAxios';
import { SimpleSpinner } from './SpinnerWrapper';
import { genresFetchEndpoint } from '../endpoints';
const GenreSubmenu = () => { 
  const[genres,setGenres] = useState(null) 
  const api = useAxios()
  console.log('_genresubmenu ', genres)
  useState(()=>{
    api()
        .get(genresFetchEndpoint())
        .then((response)=>{
            let _genres = response.data
            console.log('nav genres', _genres)
            setGenres(_genres)
        })
        .catch((err)=> console.log('genres fetcg err', err))
  },[])
  return (
    <Container fluid>
      <Stack  className='genre-submenu'>
        <h4>Genre</h4>
        {genres
          ? (genres.map((genre, index)=> {
            return <Link key={index}  to={genreBrowseURL(genre.id)}>{genre.name}</Link>
          }))
          : <SimpleSpinner />
        }
        {}
      </Stack>
    </Container>
  )
}

export default function GreatReadsNavbar() {
  const { user, logoutUser } = useContext(AuthContext);

  const navigate = useNavigate();

  let [searchString, setSearchString] = useState("Search")
  let [bookSelected, setBookSelected] = useState(true);
  let [authorSelected, setAuthorSelected] = useState(false);
  let [seriesSelected, setSeriesSelected] = useState(false);
  let [isSearchbarFocused, setIsSearchBarFocused] = useState(false);
  let [isDropdownFocused, setIsDropdownFocused] = useState(false);
  let [isHoverOnSearch, setIsHoverOnSearch] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    console.log('pattern: ', searchString)

    let pattern = searchString
    let type = "book"

    if(authorSelected)
    {
      console.log('type: Author')
      type = "author"
    }
    else if(seriesSelected)
    {
      console.log('type: Series')
      type = "series"
    }
    else
      console.log('type: Book')

    navigate('/search/',{state:{type:type, pattern:pattern}});
  };

  const handleRadioSelection = (type) => {
    setAuthorSelected(false)
    setBookSelected(false)
    setSeriesSelected(false)

    if(type === "author")
      setAuthorSelected(true)
    else if(type === "series")
      setSeriesSelected(true)
    else
      setBookSelected(true)
  };

  return (
    <Navbar variant = "dark" fixed="top" className="top-navbar">
      <Stack >
                    <Stack direction="horizontal" gap={2} className="top-navbar__inner">
                      <Navbar.Brand href={homeURL}>GreatReads</Navbar.Brand>
                      <NavDropdown title="Browse" className='top-navbar__browse__dropdown'>
                          <Stack direction='horizontal'>
                            <Stack className='top-navbar__browse__dropdown__left-menu'>
                              <NavDropdown.Item as={Link} to={newReleasesBrowseURL()} className="navItem">New Releases</NavDropdown.Item>
                              <NavDropdown.Item as={Link} to={followedAuthorBrowseURL()} className="navItem">Followed Authors</NavDropdown.Item>
                              <NavDropdown.Item as={Link} to={newlyRatedBrowseURL()} className="navItem">Newly Rated</NavDropdown.Item>
                            </Stack>
                            <GenreSubmenu/>
                          </Stack>
                      </NavDropdown>
                      {user && <Nav.Link href ={myBookShelfURL(user)}>Bookshelf</Nav.Link>}
                      {user && <Nav.Link href ={myFeedURL}>My Feed</Nav.Link>}
                      <Form className="d-flex" style={{flex:"1"}} onSubmit={handleSubmit}>
                        <div
                        className="nav-search-bar__container"
                        onMouseEnter={() => setIsHoverOnSearch(true)}
                        onMouseLeave={() => setIsHoverOnSearch(false)}>
                          <FormControl
                              type="search"
                              placeholder={searchString}
                              className="nav-search-bar"
                              aria-label="Search"
                              onChange={e => setSearchString(e.target.value)}
                              onFocus={e=>setIsSearchBarFocused(true)}
                              onBlur={e=>setIsSearchBarFocused(false)}
                            />
                          {(isSearchbarFocused || isHoverOnSearch || (searchString && searchString !== "")) && <>
                              <DropdownButton title={(authorSelected && "Author") || (seriesSelected && "Series") || "Book" }>
                                <Dropdown.Item  onClick={() =>  handleRadioSelection("book")}>Book</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleRadioSelection("author")}>Author</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleRadioSelection("series")}>Series</Dropdown.Item>
                              </DropdownButton>
                            </>
                          }
                        </div>
                     </Form>
                    {(user == null) && <Link to={loginURL()} className='no-text-effects'>Login</Link>}
                    {(user == null) && <Button variant="primary" as={Link} to={registerURL()} >Sign Up </Button>}
                    {user && <UserInfo user={user} logout={logoutUser} />} 
                    </Stack>
                <Row><div className='primary-bg top-navbar__border-hack'></div></Row>
      </Stack>    
    </Navbar>
  )
}
