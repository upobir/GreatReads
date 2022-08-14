import React, {useState, useEffect} from 'react'
import { bookBrowseEndpoint } from '../endpoints'
import { Container, Row, Col,Stack } from 'react-bootstrap'
import { BookSearchPreview } from './BookSearchPreview';
import { BrowseGenre } from './BrowseGenre';
import {Spinner} from 'react-bootstrap';
import { useNavigate, Routes, Route, useParams, Link, useLocation } from 'react-router-dom';
import { MakeVerticalTabBar } from './CustomTabs';
import { BrowseNewReleases } from './BrowseNewReleases';
import { BrowseNewlyRated } from './BrowseNewlyRated';
import { BrowseFollowedAuthors } from './BrowseFollowedAuthors';
const AllBooks=({books})=> {
  if(books.length <= 0){
    return <Container>
      <Spinner animation="border" variant="primary" />
    </Container>
  }else{  
    return <Container fluid>
          <Stack gap={2}>
            {
            books.map((book) => {
                return (
                    <BookSearchPreview book={book} key={book.id}/>
                )
                })
            }
          </Stack>
    </Container>
  }
}
const tabs = [
  {
    tabTitle:"New releases",
    tabLink:"/browse/newReleases",
    tabKey:"newReleases",
  },
  {
    tabTitle:"By Genre",
    tabLink:"/browse/genre/0",
    tabKey:"genre",
  },
  {
    tabTitle:"By Followed Authors",
    tabLink:"/browse/followedAuthors",
    tabKey:"followedAuthors",
  },
  {
    tabTitle:"Newly Rated",
    tabLink:"/browse/newlyRated",
    tabKey:"newlyRated",
  },
]

export const BrowseBooks = () => {
    const loc = useLocation()

    return (
      <Container fluid>
        <Row>
          
        </Row>
        <Row>
          <Col xs={{span:2}}>
            <Container className="browse__tab-bar">
              <MakeVerticalTabBar tabs={tabs} rootURL="/browse/" loc={loc.pathname} className="ml-auto"/>
            </Container>
          </Col>
          <Col xs={{span:8}}>
            <Routes>
              <Route path='/genre/:genre_id/' element={<BrowseGenre />} />
              <Route path='/newReleases/' element={<BrowseNewReleases />} />
              <Route path='/newlyRated/' element={<BrowseNewlyRated />} />
              <Route path='/followedAuthors/' element={<BrowseFollowedAuthors />} />
              <Route path='' element={<BrowseNewReleases />}  />
            </Routes>
          </Col>
        </Row>
 
      </Container>
    )
}
