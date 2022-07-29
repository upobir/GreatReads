import React, {useState, useEffect} from 'react'
import { bookBrowseEndpoint } from '../endpoints'
import { Container, Row, Col,Stack } from 'react-bootstrap'
import { BookSearchPreview } from './BookSearchPreview';
import { BrowseGenre } from './BrowseGenre';
import {Spinner} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { useNavigate, Routes, Route, useParams, Link, useLocation } from 'react-router-dom';
import { MakeVerticalTabBar } from './CustomTabs';

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
    tabTitle:"All",
    tabLink:"/browse/all",
    tabKey:"all",
    tabContentElement: ""
  },
  {
    tabTitle:"By Genre",
    tabLink:"/browse/genre",
    tabKey:"genre",
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
    const [books, setBooks] = useState([])
    const navigate = useNavigate();
    const loc = useLocation()
    console.log('getCategory(loc.pathname): ', getCategory(loc.pathname))

    const getBooks= async () => { 
      let response = await fetch(bookBrowseEndpoint())
      let jBooks = await response.json()
      console.log('jBooks', jBooks)
      setBooks(jBooks)
    }
  
    useEffect(() => {
      getBooks()
    }, [])
    // if(books.length <= 0)
      // return "loading..."

    return (
      <Container fluid>
        <Row>
          <Col xs={{span:2}}>
          <MakeVerticalTabBar tabs={tabs} firstPart="/browse/" loc={loc}/>
          </Col>
          <Col xs={{span:8}}>
            <Routes>
              <Route path='/genre/:genreID/' element={<BrowseGenre />} />
              <Route path='/genre/' element={<BrowseGenre />} />
              <Route path='/all/' element={<AllBooks books={books} />} />
              <Route path='' element={<AllBooks books={books} />} />
            </Routes>
          </Col>
        </Row>

      </Container>
    )
}
