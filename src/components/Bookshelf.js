import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { Tab, Tabs, Container, Row, Col } from 'react-bootstrap';
import { Routes, Route, useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import useAxios from "../utils/useAxios";   // fo
import { MakeVerticalTabBarBookshelf } from './CustomTabs';
import { BookShelf_WantToRead } from './Bookshelf_WantToRead';

const tabs = [
  {
    tabTitle:"Want To Read",
    tabLink:"/WantToRead",
    tabKey:"genre",
    tabContentElement: ""
  },
  {
    tabTitle:"Reading",
    tabLink:"/Reading",
    tabKey:"genre",
    tabContentElement: ""
  },
  {
    tabTitle:"Read",
    tabLink:"/Read",
    tabKey:"genre",
    tabContentElement: ""
  },
  {
    tabTitle:"Reviewed",
    tabLink:"/Reviewed",
    tabKey:"genre",
    tabContentElement: ""
  },
]
const bookshelfGallary = () => {
  
}
export const Bookshelf = () => {
  const { user_id } = useParams();
  const { user } = useContext(AuthContext);
  let userID;
  if ( user_id )
    userID = user_id;
  else
    userID = user.user_id;
  const loc = useLocation();
  console.log('user', user)
  console.log('userID', userID)
  const [readBooks, setReadBooks] = useState([])
  return (
    // <>
    //   <MakeHorizontalTabBar tabs={tabs} rootURL="/user/:userID/" loc={loc.pathname} className="ml-auto" />
    //   {/* <MakeVerticalTabBar tabs={tabs} rootURL="/browse/" loc={loc.pathname} className="ml-auto"/> */}
    //   <Routes>
    //     {/* {
    //       (book?.series) && <Route path="/series" element={<SeriesView book={book} series={series} />} />
    //     }
    //     <Route path="/WantToRead" element={<BookReview bookID={id} />}></Route>
    //     <Route path="/Read" element={<SimilarBooksView similarBooks={_similar_books} />} />
    //     <Route path="/Reading" element={<SimilarBooksView similarBooks={_similar_books} />} />
    //     <Route path="/Reviewed" element={<BookReviews bookID={id} />} />
    //     <Route path="" element={<BookReviews book={book} />} /> */}

    //     {/* {
    //       (book?.series) && <Route path="/series" element={<SeriesView book={book} series={series} />} />
    //     } */}
    //     <Route path="/WantToRead" element={<BookShelf_WantToRead userID={userID} bookshelfCategory={0} />}></Route>
    //     {/* <Route path="/Read" element={<SimilarBooksView similarBooks={_similar_books} />} />
    //     <Route path="/Reading" element={<SimilarBooksView similarBooks={_similar_books} />} />
    //     <Route path="/Reviewed" element={<BookReviews bookID={id} />} />
    //     <Route path="" element={<BookReviews book={book} />} /> */}

    //   </Routes>       
    // </>

    <Container fluid>
        <Row></Row>
        <Row>
          <Col xs={{span:2}}>
            <Container className="bookself__tab-bar">
              <MakeVerticalTabBarBookshelf tabs={tabs} rootURL={"/user/" + userID + "/"} loc={loc.pathname} className="ml-auto" userID={userID} />
            </Container>
          </Col>
          <Col xs={{span:8}}>
            <Routes>
              <Route path="/WantToRead" element={<BookShelf_WantToRead userID={userID} bookshelfCategory={0} />} />
              <Route path="/Reading" element={<BookShelf_WantToRead userID={userID} bookshelfCategory={1} />} />
              <Route path="/Read" element={<BookShelf_WantToRead userID={userID} bookshelfCategory={2} />} />
              <Route path="/Reviewed" element={<BookShelf_WantToRead userID={userID} bookshelfCategory={3} />} />
            </Routes>
          </Col>
        </Row>
 
      </Container>
  )
}

