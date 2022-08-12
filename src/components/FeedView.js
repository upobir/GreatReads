import React, {useContext, useState} from 'react'
import { _feed } from '../PlaceHolder'
import { useNavigate, Routes, Route, useParams, useLocation } from 'react-router-dom';
import { MakeVerticalTabBar } from './CustomTabs';
import { useEffect } from 'react';
import { Row,Col,Stack } from 'react-bootstrap';
import { ReviewBlurb } from './ReviewBlurb';
import { BookReadUpdate } from './BookReadUpdate';

export const FeedItemToComponent= ({feedItem,setFeedItem}) => {
  switch(feedItem.updateType){
    case "readingUpdate":
      return <BookReadUpdate bookReadUpdateData={feedItem} setBookReadUpdateData={setFeedItem}/>
    case "review":
      return <ReviewBlurb reviewBlurbData={feedItem} setReviewBlurbData={setFeedItem}/>
  }
  return null;
}
function filter(feed, fetchURL){
  let newFeed = []
  feed.forEach(d => {
    if(d.updateType === fetchURL || fetchURL == null)
      newFeed.push(d)
  }); 
  return newFeed;
}
export const FeedView = ({fetchURL}) => {
    const [feed, setFeed] = useState(_feed)

    useEffect(()=> {
      
    }, [])
    const setFeedItem = (feedItem, index) => {
      let mutatedFeed = [...feed];
      mutatedFeed[index] = feedItem;
      setFeed(mutatedFeed);
    }
    return (
        <Stack  gap={2}>
          {filter(feed,fetchURL).map((feedItem, index) => {
            return <FeedItemToComponent key={index} feedItem={feedItem} setFeedItem={(item) => setFeedItem(item, index)} />
          })}
      </Stack>
    )
}
