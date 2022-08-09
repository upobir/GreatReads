import React, {useContext, useState} from 'react'
import { _feed } from '../PlaceHolder'
import { useNavigate, Routes, Route, useParams, useLocation } from 'react-router-dom';
import { MakeVerticalTabBar } from './CustomTabs';
import { useEffect } from 'react';
import { Row,Col,Stack } from 'react-bootstrap';
import { ReviewBlurb } from './ReviewBlurb';
import { BookReadUpdate } from './BookReadUpdate';

export const FeedItemToComponent= ({feedItem}) => {
  switch(feedItem.updateType){
    case "readingUpdate":
      return <BookReadUpdate bookReadUpdateData={feedItem}/>
    case "review":
      return <ReviewBlurb reviewBlurbData={feedItem}/>
  }
  return null;
}
export const FeedView = ({fetchURL}) => {
    const [feed, setFeed] = useState(_feed)

    useEffect(()=> {
      
    }, [])

    return (
        <Stack fluid>
          {feed.map((feedItem, index) => {
            return <FeedItemToComponent key={index} feedItem={feedItem}/>
          })}
      </Stack>
    )
}
