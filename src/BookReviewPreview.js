import React from 'react'
import { Image,Stack, Container,Row,Col, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import 'holderjs'
import { RatingView } from './components/RatingView'
import { reviewDetailsURL,userDetailsURL,reviewID } from './urls'
import { FaThumbsUp, FaComment} from 'react-icons/fa'

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
    <Container className='book-review-block'>
      <Row>
        <Col xs = {2}>
          <Image className='book-review-block__reviewer_image'/>
        </Col>
        <Col>
          <Stack gap={2} direction='horizontal'>
            <Link to={userDetailsURL(review.reviewer)}>{review.reviewer}</Link> 
            <span className='inline-block'>Rated </span>
            <RatingView rating={review.rating}></RatingView>
          </Stack>
          <Row>
            <Col xs ={1}>
            </Col>
            <Col xs ={11}>
            </Col>
          </Row>
          {/* <Row>
            <Col xs ={1}>
              <Link to={userDetailsURL(review.reviewer)}>{review.reviewer}</Link> 
            </Col>
            <Col xs ={11}>
              <span className='inline-block'>Rated </span><RatingView rating={review.rating}></RatingView>
            </Col>
          </Row> */}
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
              <Button onClick={handleLikeToggle}> <FaThumbsUp/> {review.likes} likes</Button>
            </Col>
            <Col xs={"auto"}>
              <Button onClick={handleCommentReply}> <FaComment />  reply</Button>
            </Col>
            <Col xs={"auto"}>
              <Link to={reviewDetailsURL(bookID, review.id)} >{`${review.commentCount} comments`}</Link> 
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
