import React, {useContext, useEffect, useState} from 'react'
import { _feed } from '../PlaceHolder'
import { useNavigate, Routes, Route, useParams, Link, useLocation } from 'react-router-dom';
import { MakeVerticalTabBar } from './CustomTabs';
import { FeedView } from './FeedView';
import { Row,Col,Container, Stack } from 'react-bootstrap';
import useAxios from '../utils/useAxios';
import { feedAllEndpoint } from '../endpoints';

const tabs = [
    {
      tabTitle:"All",
      tabLink:"/feed/all",
      tabKey:"all",
    },
    {
      tabTitle:"Reading Updates",
      tabLink:"/feed/readingUpdates",
      tabKey:"readingUpdates",
    },
    {
      tabTitle:"Reviews",
      tabLink:"/feed/reviews",
      tabKey:"reviews",
    },
  ]
export const FeedPage = () => {
    const [feed, setFeed] = useState(null)
    const loc = useLocation()
    const api = useAxios()
    useEffect(()=> {
      console.log("start feed fetch")
      api()
      .get(feedAllEndpoint())
      .then((response)=> {
        let _feed = response.data
        console.log('_feed', _feed) 
        setFeed(_feed)
      })
      .catch(err => console.log('_feed err', err))
    }, [])

    return (
      <Container fluid>
        <Row>
          <Col xs={{span:2}}>
            <Container className="feed__tab-bar">
              <MakeVerticalTabBar tabs={tabs} rootURL="/feed/" loc={loc.pathname} className="ml-auto"/>
            </Container>
          </Col>
          <Col xs={{span:8}}>
            <Routes>
              <Route path='' element={<FeedView  feed={feed} setFeed={setFeed}/>} />
              <Route path='/all' element={<FeedView  feed={feed} setFeed={setFeed}/>} />
              <Route path='/reviews/' element={<FeedView category="review"  feed={feed} setFeed={setFeed}/>} />
              <Route path='/readingUpdates/' element={<FeedView category="readingUpdate"  feed={feed} setFeed={setFeed}/>} />
            </Routes>
          </Col>
        </Row>
 
      </Container>
    )
}
