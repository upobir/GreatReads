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
import { BookShelf_ViewReviews} from './Bookshelf_reviews';
import { SpinnerWrapper } from './SpinnerWrapper';
import { viewMessagesFromUserUrl } from '../urls';
const tabs = [
  {
    tabTitle:"Want To Read",
    tabLink:`WantToRead`,
    tabKey:"WantToRead",
  },
  {
    tabTitle:"Reading",
    tabLink:`Reading`,
    tabKey:"Reading",
  },
  {
    tabTitle:"Read",
    tabLink:`Read`,
    tabKey:"Read",
  },
  {
    tabTitle:"Reviewed",
    tabLink:`Reviewed`,
    tabKey:"Reviewed",
  },
]
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
      .post(unFollowUserEndpoint(userID), {
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
      .post(followUserEndpoint(userID), {
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
          
        </Row>

        <Row>
          <Col xs={{span:10}}>
            
          </Col>
        </Row>

        <Row>
          <Col xs={{span:8, offset:2}}>
          <Container className="userprofile-bar" fluid>
            <Stack gap={1} className='userprofile'>
                <SpinnerWrapper Component={user_name && <Stack className='userprofile__body' direction='vertical' gap={2}>
                    <Stack direction='horizontal' gap={2  }>
                      <h3 className='primary-text'>{ user_name }</h3>
                      { (user.username !== user_name) &&
                        <Stack gap={2} direction='horizontal'>
                          <Button variant='outline-primary'
                                  // disabled={followContext == null}
                                  active={isFollowedByUser}
                                  onClick={handleSubmit}>
                              {isFollowedByUser? "Unfollow": "Follow"}
                          </Button>
                          <Button as={Link} to={viewMessagesFromUserUrl(userID)}>Message</Button>
                        </Stack>
                      }
                    </Stack>
                    <div className='light-text'>{follower_count} Followers, {following_count} Following</div>
                </Stack>}
                isLoading={user_name==null}></SpinnerWrapper>
            </Stack>
          </Container>
          <Container className="bookself__tab-bar" alignment="center">
              <MakeHorizontalTabBar tabs={tabs} rootURL={"/user/" + userID + "/"} loc={loc.pathname} className="ml-auto" userID={userID} />
            </Container>
            <Routes>
              <Route path="/WantToRead" element={<BookShelf_WantToRead userID={userID} bookshelfCategory={0} />} />
              <Route path="/" element={<BookShelf_WantToRead userID={userID} bookshelfCategory={0} />} />
              <Route path="/Read" element={<BookShelf_WantToRead userID={userID} bookshelfCategory={1} />} />
              <Route path="/Reading" element={<BookShelf_WantToRead userID={userID} bookshelfCategory={2} />} />
              <Route path="/Reviewed" element={<BookShelf_ViewReviews userID={userID} />} />
            </Routes>
          </Col>
          <Col xs={{span:2}}>
              <BookShelf_stats userID={userID} />
          </Col>
        </Row>
 
      </Container>
  )
}

