import {React, useState, useEffect} from 'react'
import { Container, Stack, Row, Col, Form,  } from 'react-bootstrap'
import { BookReviewPreview } from '../BookReviewPreview'
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { reviewFetchEndpoint } from '../endpoints';
import { userDetailsURL } from '../urls';
import { Link } from 'react-router-dom';
import useAxios from '../utils/useAxios';
export const BookReview = ({bookID}) => {
  let {review_id} = useParams();
  const api =  useAxios()
  const navigate = useNavigate();
  const [isReplying, setIsReplying] = useState(false)
  const [comment, setComment] = useState(null) 
  const [review, setReview] = useState(null)
  
  const getReview= async () => { 
    api()
    .get(reviewFetchEndpoint(review_id))
    .then((response) => {
      let jreview  = response.data
      setReview(jreview)  
    })
    .catch((error)=>{
      console.log('review fetch error', error)
    })
  }

  const handleCommentTextUpdate = (e) => { setComment(e.target.value) }
  const handleCommentPost = () => { 
    setIsReplying(false)
   }
  useEffect(() => {
    if(isReplying){
      navigate('#replyBox')
    }
  }, [isReplying])
  
  return (
    <Container id="review-header" className = "book-review-details">
        <Stack gap={2}>
          <BookReviewPreview 
            bookID={bookID} 
            review={review} 
            shouldTruncate={false}
            commentReplyHandler={()=> setIsReplying(!isReplying)} />
          {isReplying && <Form>
            <Form.Group className="mb-3" controlId="reviewText">
              <Form.Label>Review:</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={10}  
                placeholder="Enter Review Text"
                onChange={handleCommentTextUpdate}/>
            </Form.Group>
          </Form>}
          <Col xs={{span:10, offset:2}} className="book-review-details__comment-container">
              <Stack  gap={2}>
                {review?.comments.map((comment, index) =>{
                  return (
                  <Stack key={index} className="book-review-details__comment">
                    <Stack gap={1} direction="horizontal">
                      <span as={Link} to={userDetailsURL(comment.Commenter)} className="primary-text">{comment.Commenter}</span>
                      <span className="light-text">{comment.Timestamp}</span>
                    </Stack>
                    <p>{comment.Text}</p>
                  </Stack>
                  )
                })}
              </Stack>
          </Col>
        </Stack>
    </Container>
  )
  
}
