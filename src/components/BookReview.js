import {React, useState, useEffect} from 'react'
import { Container, Stack, Row, Col, Form,Button  } from 'react-bootstrap'
import { BookReviewPreview } from '../BookReviewPreview'
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { commentPostEndpoint, reviewFetchEndpoint } from '../endpoints';
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
    api()
    .post(commentPostEndpoint(review_id), {
      "commentText": comment
    })
    .then((response)=>console.log('comment post response', response))
    .catch((err)=>console.log('comment post err', err))
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
          {isReplying && (
          <Form>
            <Form.Group className="mb-3" controlId="comment">
              <Form.Control 
                as="textarea" 
                rows={10}  
                placeholder="Enter Comment"
                onChange={handleCommentTextUpdate}/>
            </Form.Group>
            <Button variant="primary" onClick={handleCommentPost}>
              Submit
            </Button>
          </Form>
          )}
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
