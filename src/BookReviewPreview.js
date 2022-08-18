import React, { useState } from 'react'
import { Image,Stack, Container,Row,Col, Button, Ratio } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import 'holderjs'
import { reviewDetailsURL,userDetailsURL,reviewID, reviewReplyURL } from './urls'
import { FaThumbsUp, FaComment} from 'react-icons/fa'
import {Spinner} from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating'
import { useEffect } from 'react'
import { Placeholder } from 'react-bootstrap'
import BookReviewLikeButton from './components/BookReviewLikeButton'
import {FaUser} from 'react-icons/fa';
import { placeholderUserImage } from './PlaceHolder'
function truncateReview(review){
  return  review?.substring(0, 100);
}
export const TruncatedReview = ({review,bookID})=> {
  if(review)
    return (
    <>
      <Row>
        <span>{`${truncateReview(review?.body)}`}</span>
      </Row>
      <Row>
        <Link to={reviewDetailsURL(bookID, review?.id)}>See more</Link>
      </Row>
    </>
    );
  else
    return (<Placeholder  animation="glow">
      <Placeholder xs={12} size="lg" />
      <Placeholder xs={12} size="lg" />
      <Placeholder xs={12} size="lg" />
      <Placeholder xs={4} size="lg" />
  </Placeholder>)
}
export const NormalReview = ({review,bookID})=> {
if(review)
   return (<Row>
   {review?(<p>{review.body}</p>)
          : <Spinner animation="border" variant="secondary" />}
  </Row>)
 else
   return (<Placeholder  animation="glow">
     <Placeholder xs={12} size="lg" />
     <Placeholder xs={12} size="lg" />
     <Placeholder xs={12} size="lg" />
     <Placeholder xs={4} size="lg" />
 </Placeholder>)
}

export const BookReviewPreview = ({bookID,review, shouldTruncate, commentReplyHandler}) => {
  // console.log('review', review)
  return (
    <Container className='book-review-block'>
      <Row>
        <Col xs = {2}>
        
        <div className="book-review-block__thumbnail">
              <div className='book-review-block__thumbnail__placeholder'>
                <FaUser />
              </div>
        </div>
        </Col>
        <Col>
          {review && <Stack gap={2} direction='horizontal' className='space-contents-between'>
              <Stack gap={2} direction='horizontal'>
                <Link to={userDetailsURL(review?.reviewerId)} >{review.reviewer}</Link>
                <span className='inline-block light-text'>Rated it</span>
                <Rating readonly={true} size={30} ratingValue={review.rating * 100 / 5} />
              </Stack>
              <span className='medium-text'>{review.Timestamp}</span>
            </Stack>
          }

      <Row>
          <Container>
            {shouldTruncate
              ? <TruncatedReview review={review} bookID={bookID}/>
              : <NormalReview review={review} bookID={bookID}/>
            }
          </Container>
      </Row>
          <br />
          {review && <Row>
            <Col xs={"auto"}>
              <BookReviewLikeButton review={review}/>
            </Col>
            <Col xs={"auto"}>
              {shouldTruncate
              ? <Button as={Link} to={reviewReplyURL(bookID, review.id)}> <FaComment />  reply</Button>
              : <Button onClick={commentReplyHandler}> <FaComment />  reply</Button>
              }
              
            </Col>
            <Col xs={"auto"}>
              {review && <Link to={reviewDetailsURL(bookID, review.id)} >{`${review?.commentCount} comments`}</Link>}
            </Col>
          </Row>}
        </Col>
      </Row>
    </Container>
  )
}
