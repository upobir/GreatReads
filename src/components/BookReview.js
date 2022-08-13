import {React, useState, useEffect} from 'react'
import { Container, Stack, Row, Col, Form,Button  } from 'react-bootstrap'
import { BookReviewPreview } from '../BookReviewPreview'
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { commentDeleteEndpoint, commentPostEndpoint, reviewFetchEndpoint } from '../endpoints';
import { userDetailsURL } from '../urls';
import { Link } from 'react-router-dom';
import useAxios from '../utils/useAxios';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import {FaTrashAlt} from 'react-icons/fa'
export const BookReviewComment = ({comment, userID, handleCommentDeleted}) => {
  return (
  <Stack className="book-review-details__comment">
    <Stack gap={1} direction="horizontal">
      <span as={Link} to={userDetailsURL(comment.Commenter)} className="primary-text">{comment.Commenter}</span>
      <span className="light-text">{comment.Timestamp}</span>
      {(comment.CommenterId === userID) && (
        <Button 
          className='book-review-details__comment__delete-btn'
          variant='link'
          onClick={handleCommentDeleted}
        >
            <FaTrashAlt /> 
        </Button>)
      }
    </Stack>
    <p>{comment.Text}</p>
  </Stack>
  )
}
export const BookReview = ({bookID}) => {
  let {review_id} = useParams();
  const {user} = useContext(AuthContext)
  const api =  useAxios()
  const navigate = useNavigate();
  const [isReplying, setIsReplying] = useState(false)
  const [comment, setComment] = useState(null) 
  const [isCommentPostLoading, setIsCommentPostLoading] = useState(false);
  const [review, setReview] = useState(null)
  
  const getReview= async () => { 
    api()
    .get(reviewFetchEndpoint(review_id))
    .then((response) => {
      let jreview  = response.data
      console.log('jreview', jreview)
      setReview(jreview)  
    })
    .catch((error)=>{
      console.log('review fetch error', error)
    })
  }

  const handleCommentTextUpdate = (e) => { setComment(e.target.value) }
  const handleCommentPost = () => {
    if (user != null && comment != null && comment !== '') {
      setIsCommentPostLoading(true)
      api()
        .post(commentPostEndpoint(review_id), {
          "commentText": comment
        })
        .then((response) => {
          console.log('comment post response', response)
          let mutatedComments = review.comments;
          mutatedComments.push(comment);
          setReview({ comments: mutatedComments })
        })
        .catch((err) => console.log('comment post err', err))
        .finally(() => {
          setIsReplying(false)
          setIsCommentPostLoading(false)
        })
    }
  }
  const handleCommentDeleted = (index) => {
    api()
    .post(commentDeleteEndpoint(review.comments[index].id))
    .then((response) => {
      console.log('Comment no:', review.comments[index].id , ' delete post response:', response)
      let mutatedComments = review.comments;
      mutatedComments.splice(index, 1)
      setReview({ comments: mutatedComments })
    })
    .catch((err)=> {
      console.log('Comment no:', review.comments[index].id , ' delete post err:', err)
    })
  }
  useEffect(() => {
    getReview()
  }, [])
  
  return (
    <Container id="review-header" className = "book-review-details">
        <Stack gap={2}>
          <BookReviewPreview 
            bookID={bookID} 
            review={review} 
            shouldTruncate={false}
            commentReplyHandler={()=> setIsReplying(!isReplying)} />
          {isReplying && (
          <Col xs={{span:10, offset:2}}>
            <Form>
              <Form.Group className="mb-3" controlId="comment">
                <Form.Control
                  as="textarea"
                  rows={10}
                  placeholder="Enter Comment"
                  onChange={handleCommentTextUpdate}/>
              </Form.Group>
              <Button variant="primary" 
                disabled={isCommentPostLoading}
                onClick={handleCommentPost}>
                {isCommentPostLoading?"loading": "Post"}
              </Button>
            </Form>
          </Col >
          )}
          <Col xs={{span:10, offset:2}} className="book-review-details__comment-container">
              <Stack  gap={2}>
                {review?.comments.map((comment, index) =>{
                  return <BookReviewComment 
                            key={index}
                            comment={comment} 
                            userID={user?.user_id}
                            handleCommentDeleted={()=> handleCommentDeleted(index)}
                            />
                })}
              </Stack>
          </Col>
        </Stack>
    </Container>
  )
  
}
