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
import { useEffect } from 'react'

export default function BookCapsule({book, id}) {
  const api = useAxios();
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const handleReviewPopupShow = () => setShowReviewPopup(true);
  const handleReviewPopupClose = () => setShowReviewPopup(false);

  const [showReadPageUpdateOverlay, setShowReadPageUpdateOverlay] = useState(false);
  const ReadPageUpdateOverlayTarget = useRef(null);
  const [pagesRead, setPagesRead] = useState(book && book.pagesRead?book.pagesRead: 0);
  const [readStatus, setReadStatus] = useState(book && book.readStatus?book.readStatus: null);


  const postBookStatus =  (_readStatus, _pagesRead) => {
    api()
    .post(bookReadStatusPostEndpoint(id), {
      readStatus: _readStatus,
      pagesRead: _pagesRead,
    })
    .then((response)=> {
      console.log('read status update ok with response', response)
    })
    .catch(error => {
      console.log('read status update error', error)
    }) 
  }
  const setReadStatusAndPost = (status) => {
    if(readStatus !== status){
      setReadStatus(status)
      postBookStatus(status, pagesRead)
    }
  }
  
  const handleBookSetToWishlist = () => {
    if (book && readStatus !== "wishlisted"){
      setShowReadPageUpdateOverlay(false);
      setReadStatusAndPost("wishlisted")
    }
  };
  const handleBookSetToReading = () => {
    if(book){
      if(pagesRead == null){
        setPagesRead(book.pagesRead ? book.pagesRead : 0); 
      }

      if (readStatus === "reading"){
        setShowReadPageUpdateOverlay(!showReadPageUpdateOverlay);
      }else{
        setReadStatusAndPost("reading")
      }
    }
  };
  
  const handleBookSetToRead = () => {
    if (book && readStatus !== "read"){
      setShowReadPageUpdateOverlay(false);
      setReadStatusAndPost("read")
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
      </Link>
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
          <ButtonGroup className='book-capsule__btn-group'>
            <Button variant="outline-primary" 
              onClick={handleBookSetToWishlist} 
              active={readStatus === "wishlisted"}>
              <FaBookmark fontSize={20}/>
            </Button>
            <Button ref={ReadPageUpdateOverlayTarget} 
                    variant="outline-primary" 
                    onClick={handleBookSetToReading} 
                    active={readStatus === "reading"}>
              <FaBookOpen  fontSize={20}/>
            </Button>
            <Button variant="outline-primary" 
                    onClick={handleBookSetToRead} 
                    active={readStatus === "read"}>
              <FaCheck  fontSize={20}/>
            </Button>

          </ButtonGroup>
          
        <Overlay 
          target={ReadPageUpdateOverlayTarget.current} 
          show={showReadPageUpdateOverlay} 
          placement="bottom"
          >
          <Tooltip>
            <Container className='book-capsule__read-page-update-overlay' >
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
        <ReviewPopup showState={showReviewPopup} bookID={id} handleClose={handleReviewPopupClose} />
    </Stack>

  )
}