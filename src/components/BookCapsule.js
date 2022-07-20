import {React, useState, useRef} from 'react'
import { Stack,Button,ButtonGroup,Overlay, Tooltip,FormGroup,FormControl, Row, Col, Image, Container} from 'react-bootstrap'
import 'holderjs'
import { FaBookOpen,FaBook, FaBookmark, FaCheck, FaStar } from 'react-icons/fa'
import { ReviewPopup } from './ReviewPopup'
import { bookDetailsURL } from '../urls'
import { Link } from 'react-router-dom'
import useAxios from '../utils/useAxios'
import Form from 'react-bootstrap/Form';
import { bookReadStatusPostEndpoint } from '../endpoints'

export default function BookCapsule({book, id}) {
  const api = useAxios();
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const handleReviewPopupShow = () => setShowReviewPopup(true);
  const handleReviewPopupClose = () => setShowReviewPopup(false);

  const [showReadPageUpdateOverlay, setShowReadPageUpdateOverlay] = useState(false);
  const ReadPageUpdateOverlayTarget = useRef(null);
  const [pagesRead, setPagesRead] = useState(null)

  const handleBookSetToWishlist = () => {
    if (book && book.readStatus !== "wishlisted"){
      book.readStatus = "wishlisted";
      console.log('book.readStatus', book.readStatus)
    }
  };
  const handleBookSetToReading = () => {
    if(book){
      console.log('book.readStatus', book.readStatus)
      if(pagesRead == null){
        setPagesRead(book.pagesRead ? book.pagesRead : 0); 
      }
      if (book.readStatus === "reading"){
        setShowReadPageUpdateOverlay(!showReadPageUpdateOverlay);
      }else{
        book.readStatus = "reading";
      }
      
    }
  };
  
  const handleBookSetToRead = () => {
    if (book && book.readStatus !== "read"){
      book.readStatus = "read";
      console.log('book.readStatus', book.readStatus)
    }
  };
  const updatePagesRead = (e) => {
    e.preventDefault()
    console.log('book', book)
    console.log('bookReadStatusPostEndpoint(id)', bookReadStatusPostEndpoint(id))
    if(book && pagesRead){
      api()
      .post(bookReadStatusPostEndpoint(id), {
        readStatus: book.readStatus,
        pagesRead: pagesRead,
      })
      .then((response)=> {
        console.log('read status update ok with response', response)
      })
      .catch(error => {
        console.log('read status update error', error)
      })      
    }
  }
  return (
    
    <Stack className='book-capsule'>
          
      <Link to={book? bookDetailsURL(id): "#"}>
          <div className="book-capsule__thumbnail">
            <FaBook fontSize={90}/>
          </div>
          <Stack className='book-capsule__rating-bar' direction='horizontal'>
            <div className='book-capsule__rating-bar__avg-rating'>
              <FaStar fontSize={20}/><span>{book?.avgRating}</span>
            </div>
            <Button variant='outline-primary' className='book-capsule__rating-bar__user-rating' onClick={handleReviewPopupShow}>
            {book?.userRating
                ? (<><FaStar fontSize={20} /><span>{book?.userRating}</span></>)
                : (<>+ Rate</> ) 
            }
            </Button>            
            {/* <div  className='book-capsule__rating-bar__user-rating'>
              {book?.userRating
                ? (<Button ><FaStar fontSize={20} /><span>{book?.userRating}</span></Button>)
                : (<Button variant='outline-primary' className='book-capsule__rating-bar__btn' onClick={handleReviewPopupShow}> {"+ Rate"} </Button>) 
              }            
            </div> */}
          </Stack>
      </Link>
          <ButtonGroup className='book-capsule__btn-group'>
            <Button variant="outline-primary" onClick={handleBookSetToWishlist}>
              <FaBookmark fontSize={20}/>
            </Button>
            <Button ref={ReadPageUpdateOverlayTarget} 
                    variant="outline-primary" 
                    onClick={handleBookSetToReading}>
              <FaBookOpen  fontSize={20}/>
            </Button>
            <Button variant="outline-primary" onClick={handleBookSetToRead}>
              <FaCheck  fontSize={20}/>
            </Button>

          </ButtonGroup>
        <Overlay 
          target={ReadPageUpdateOverlayTarget.current} 
          show={showReadPageUpdateOverlay} 
          placement="bottom"
          >
          <Tooltip>
            <Container className='book-capsule__read-page-update-overlay'>
              {book &&
                <form onSubmit={updatePagesRead}>
                  <FormGroup role="form">
                    <Form.Label>Pages read:</Form.Label>
                    <FormControl type="number" className="form-control" onChange={(e) => setPagesRead(e.target.value)}/>
                  </FormGroup>
                  <p className='medium-text'>Of</p>
                  <p className='high-text'>{book.pageCount}</p>
                  <Button variant='primary'  type="submit">Update</Button>
                </form>
              }
            </Container>
          </Tooltip>
        </Overlay>
        <ReviewPopup showState={showReviewPopup} handleClose={handleReviewPopupClose} />
    </Stack>

  )
}