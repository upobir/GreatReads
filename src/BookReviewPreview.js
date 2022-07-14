import React from 'react'
import { Image,Stack, Container,Row,Col, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import 'holderjs'
import { RatingView } from './components/RatingView'
import { reviewDetailsURL,userDetailsURL,reviewID } from './urls'
import { FaThumbsUp, FaComment} from 'react-icons/fa'

function truncateReview(review){
  console.log('review', review)
  console.log('aaaaaaaaaaaaaaa')
  console.log('review truncks',review.substring(0, 100))
  return  review.substring(0, 100);
}
export const TruncatedReview = ({review,bookID})=> {
  return (<>
    <Row>
      {`${truncateReview(review.body)}...`}
    </Row>
    <Row>
      <Link to={reviewDetailsURL(bookID, review.id)}>See more</Link>
    </Row>
  </>);
}
export const NormalReview = ({review,bookID})=> {
  return <Row>
            {review.body}
        </Row>
}

export const BookReviewPreview = ({bookID,review, shouldTruncate}) => {
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
          <Container>
            {shouldTruncate
              ? <TruncatedReview review={review} bookID={bookID}/>
              : <NormalReview review={review} bookID={bookID}/>
            }
          </Container>
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
