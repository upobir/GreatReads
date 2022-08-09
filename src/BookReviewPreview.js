import React from 'react'
import { Image,Stack, Container,Row,Col, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import 'holderjs'
import { reviewDetailsURL,userDetailsURL,reviewID } from './urls'
import { FaThumbsUp, FaComment} from 'react-icons/fa'
import {Spinner} from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating'
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
    return <Spinner animation="border" variant="secondary" />
}
export const NormalReview = ({review,bookID})=> {
  return <Row>
            {review?(<p>{review.body}</p>)
                   : <Spinner animation="border" variant="secondary" />}
        </Row>
}

export const BookReviewPreview = ({bookID,review, shouldTruncate, commentReplyHandler}) => {
  const handleLikeToggle= () => {
    console.log("#TODO like toggle fetch url ")
  }



  return (
    <Container className='book-review-block'>
      <Row>
        <Col xs = {2}>
          <Image className='book-review-block__reviewer_image'/>
        </Col>
        <Col>
          <Stack gap={2} direction='horizontal'>
            {review && <>
                          <Link to={userDetailsURL(review?.reviewer)} >{review.reviewer}</Link>
                          <span className='inline-block light-text'>Rated it</span>
                          <Rating readonly={true} size={30} ratingValue={review.rating * 100 / 5} />
                       </>
            }

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
          {review && <Row>
            <Col xs={"auto"}>
              <Button onClick={handleLikeToggle}> <FaThumbsUp /> {review?.likes} likes</Button>
            </Col>
            <Col xs={"auto"}>
              <Button onClick={commentReplyHandler}> <FaComment />  reply</Button>
            </Col>
            <Col xs={"auto"}>
              {review && <Link to={reviewDetailsURL(bookID, review?.id)} >{`${review?.commentCount} comments`}</Link>}
            </Col>
          </Row>}
        </Col>
      </Row>
    </Container>
  )
}
