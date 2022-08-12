import React from 'react'
import { useContext } from 'react';
import { useState, useEffect } from 'react'
import { Tab, Tabs, Container, Row, Col, Stack } from 'react-bootstrap';
import { Routes, Route, useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import useAxios from "../utils/useAxios";   // fo
import { MakeVerticalTabBarBookshelf, MakeHorizontalTabBar } from './CustomTabs';
import { BookShelf_WantToRead } from './Bookshelf_WantToRead';
import { BookShelf_stats } from './Bookshelf_stats';
import { bookshelfUserInfoEndpoint } from '../endpoints';

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

  const [user_name, setUser_name] = useState(null) 
  const [follower_count, setFollower_count] = useState(0) 
  const [following_count, setFollowing_count] = useState(0)

  let userID;
  if ( user_id )
    userID = user_id;
  else
    userID = user.user_id;
  const loc = useLocation();
  console.log('user', user)
  console.log('userID', userID)

  const api = useAxios();

  const getBookShelfUserInfo = async () => {
    api()
    .get(bookshelfUserInfoEndpoint(userID), {
    })
    .then((response) => {
        console.log('user info: ', response.data);
        let bookShelfUserInfo = response.data
        setUser_name(bookShelfUserInfo.user_name)
        setFollower_count(bookShelfUserInfo.follower_count)
        setFollowing_count(bookShelfUserInfo.following_count)
    })
    .catch((error)=> {
        console.log('Error during fetch bookshelf user info:', error)
    });
  }

  useEffect(()=> {
    getBookShelfUserInfo();
  }, [])

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
        <Row>
          <Container className="userprofile-bar" fluid>
            <Stack gap={1} className='userprofile'>
                {
                <div className='userprofile__body'>
                    <h3 className='primary-text'>{ user_name }</h3>
                    <p>{follower_count} Followers, {following_count} Following</p>
                </div>
                }
            </Stack>
          </Container>
        </Row>

        <Row>
          <Col xs={{span:10}}>
            <Container className="bookself__tab-bar" alignment="center">
              <MakeHorizontalTabBar tabs={tabs} rootURL={"/user/" + userID + "/"} loc={loc.pathname} className="ml-auto" userID={userID} />
            </Container>
          </Col>
        </Row>

        <Row>
          <Col xs={{span:10}}>
            <Routes>
              <Route path="/WantToRead" element={<BookShelf_WantToRead userID={userID} bookshelfCategory={0} />} />
              <Route path="/Reading" element={<BookShelf_WantToRead userID={userID} bookshelfCategory={1} />} />
              <Route path="/Read" element={<BookShelf_WantToRead userID={userID} bookshelfCategory={2} />} />
              <Route path="/Reviewed" element={<BookShelf_WantToRead userID={userID} bookshelfCategory={3} />} />
            </Routes>
          </Col>
          <Col xs={{span:2}}>
            <Container className="bookself__stats">
              <BookShelf_stats userID={userID} />
            </Container>
          </Col>
        </Row>
 
      </Container>
  )
}

