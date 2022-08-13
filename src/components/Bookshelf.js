import React from 'react'
import { useContext } from 'react';
import { useState, useEffect } from 'react'
import { Container, Row, Col, Stack, Button, Form } from 'react-bootstrap';
import { Routes, Route, useParams, useLocation, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import useAxios from "../utils/useAxios";   // fo
import { MakeVerticalTabBarBookshelf, MakeHorizontalTabBar } from './CustomTabs';
import { BookShelf_WantToRead } from './Bookshelf_WantToRead';
import { BookShelf_stats } from './Bookshelf_stats';
import { bookshelfUserInfoEndpoint, followUserEndpoint, unFollowUserEndpoint } from '../endpoints';


const bookshelfGallary = () => {
  
}
export const Bookshelf = () => {
  const { user_id } = useParams();
  const { user } = useContext(AuthContext);

  const [user_name, setUser_name] = useState(null) 
  const [follower_count, setFollower_count] = useState(0) 
  const [following_count, setFollowing_count] = useState(0)
  const [isFollowedByUser, setIsFollowedByUser] = useState(false)

  let userID;
  if ( user_id )
    userID = user_id;
  else
    userID = user.user_id;
  const loc = useLocation();
  console.log('user', user)
  console.log('userID', userID)
  const tabs = [
    {
      tabTitle:"Want To Read",
      tabLink:`/user/${userID}/WantToRead/`,
      tabKey:"WantToRead",
    },
    {
      tabTitle:"Reading",
      tabLink:`/user/${userID}/Reading`,
      tabKey:"Reading",
    },
    {
      tabTitle:"Read",
      tabLink:`/user/${userID}/Read`,
      tabKey:"Read",
    },
    {
      tabTitle:"Reviewed",
      tabLink:`/user/${userID}/Reviewed`,
      tabKey:"Reviewed",
    },
  ]
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
        setIsFollowedByUser(bookShelfUserInfo.is_followed_by_user)
    })
    .catch((error)=> {
        console.log('Error during fetch bookshelf user info:', error)
    });
  }

  const handleSubmit = () => {
    console.log("Follow/Unfollow button clicked!");
    if ( isFollowedByUser )
    {
      api()
      .get(unFollowUserEndpoint(userID), {
      })
      .then((response) => {
          console.log('Unfollowed: ', response.data);
          let unfollowData = response.data
          if (unfollowData.status === "success")
          {
            setIsFollowedByUser(false);
            setFollower_count(follower_count - 1);
          }
      })
      .catch((error)=> {
          console.log('Error in unfollow: ', error)
      });
    }

    else
    {
      api()
      .get(followUserEndpoint(userID), {
      })
      .then((response) => {
          console.log('Followed: ', response.data);
          let followData = response.data
          if (followData.status === "success")
          {
            setIsFollowedByUser(true);
            setFollower_count(follower_count + 1);
          }
      })
      .catch((error)=> {
          console.log('Error in follow: ', error)
      });
    }
  }

  useEffect(()=> {
    getBookShelfUserInfo();
  }, [])

  return (
    <Container fluid>
        <Row>
          <Container className="userprofile-bar" fluid>
            <Stack gap={1} className='userprofile'>
                {
                <div className='userprofile__body'>
                    <h3 className='primary-text'>{ user_name }</h3>
                    { (user.username !== user_name) &&
                      <Button variant='outline-primary'
                              // disabled={followContext == null} 
                              active={isFollowedByUser}
                              onClick={handleSubmit}>  
                          {isFollowedByUser? "Unfollow": "Follow"}
                      </Button>
                    }
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
              <Route path="/Read" element={<BookShelf_WantToRead userID={userID} bookshelfCategory={1} />} />
              <Route path="/Reading" element={<BookShelf_WantToRead userID={userID} bookshelfCategory={2} />} />
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

