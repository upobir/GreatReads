import React from 'react'
import { Image, Container,Row,Col, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import 'holderjs'
import { RatingView } from './components/RatingView'
import { reviewDetailsURL,userDetailsURL,reviewID } from './urls'
function truncateReview(review){
  return  review.body.substring(0, 100);
}
export const BookReviewPreview = ({bookID,review}) => {
  const handleLikeToggle= () => {
    console.log("#TODO like toggle fetch url ")
  }
  const handleCommentReply = () => { 
    //#TODO
    console.log('#TODO comnet reply navigate')
   }

  return (
    <Container>
      <Row>
        <Col xs = {2}>
          <Image fluid src="holder.js/80px80" height="100%"/>
        </Col>
        <Col>
          <Row>
            <Col xs ={1}>
              <Link to={userDetailsURL(review.reviewer)}>{review.reviewer}</Link> 
            </Col>
            <Col>
              <RatingView rating={review.rating}></RatingView>
            </Col>
          </Row>
          <Row>
            <Container>
            {review.body}...

            </Container>
          </Row>
          <Row>
            <Link to={reviewDetailsURL(bookID, review.id)}>See more</Link> 
          </Row>
          <br />
          <Row>
            <Col xs={"auto"}>
              <Button onClick={handleLikeToggle}>{review.likes} likes</Button>
            </Col>
            <Col xs={"auto"}>
              <Button onClick={handleCommentReply}> reply</Button>
            </Col>
            <Col xs={"auto"}>
              <Link to={reviewDetailsURL(bookID, review.id)}>{`${review.commentCount} comments`}</Link> 
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
