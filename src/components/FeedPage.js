import React, {useContext, useState} from 'react'
import { _feed } from '../PlaceHolder'
import { useNavigate, Routes, Route, useParams, Link, useLocation } from 'react-router-dom';
import { MakeVerticalTabBar } from './CustomTabs';
import { FeedView } from './FeedView';
import { Row,Col,Container, Stack } from 'react-bootstrap';
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
    const [feed, setFeed] = useState(_feed)
    const loc = useLocation()

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
              <Route path='' element={<FeedView />} />
              <Route path='/all' element={<FeedView />} />
              <Route path='/reviews/' element={<FeedView />} />
              <Route path='/readingUpdates/' element={<FeedView />} />
            </Routes>
          </Col>
        </Row>
 
      </Container>
    )
}
