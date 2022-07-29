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
    tabTitle:"By Genre",
    tabLink:"/browse/genre/0",
    tabKey:"genre",
    tabContentElement: ""
  },
  {
    tabTitle:"By Followed Authors",
    tabLink:"/browse/followedAuthors",
    tabKey:"followedAuthors",
    tabContentElement: ""
  },
  {
    tabTitle:"New releases",
    tabLink:"/browse/NewReleases",
    tabKey:"NewReleases",
    tabContentElement: ""
  },
  {
    tabTitle:"Newly Rated",
    tabLink:"/browse/NewlyRated",
    tabKey:"NewlyRated",
    tabContentElement: ""
  },
]
/**
 * Getting it via route parameters kind messes up routing so just get the url from browser
 * and extract the cetegory from here
 * @param {*} loc 
 */
 function getCategory(loc){
  const firstPart = "/browse/"
  if(loc.length > firstPart.length){
    let category = loc.substring(firstPart.length)
    
    let endIndex = category.indexOf('/')
    if(endIndex !== -1){
      category = category.substring(0, endIndex)
    }

    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].tabLink.substring(firstPart.length) === category) 
        return category
    }
  }
  return tabs[0].tabLink.substring(firstPart.length);
}
export const BrowseBooks = () => {
    const loc = useLocation()
    console.log('getCategory(loc.pathname): ', getCategory(loc.pathname))

    return (
      <Container fluid>
        <Row>
          
        </Row>
        <Row>
          <Col xs={{span:2}}>
            <Container className="browse__tab-bar">
              <MakeVerticalTabBar tabs={tabs} firstPart="/browse/" loc={loc} className="ml-auto"/>
            </Container>
          </Col>
          <Col xs={{span:8}}>
            <Routes>
              <Route path='/genre/:genreID/' element={<BrowseGenre />} />
              {/* <Route path='/genre/' element={<BrowseGenre />} /> */}
              <Route path='/newReleases/' element={<BrowseNewReleases />} />
              <Route path='/newlyRated/' element={<BrowseNewlyRated />} />
              <Route path='' element={<BrowseNewReleases />}  />
            </Routes>
          </Col>
        </Row>

      </Container>
    )
}
