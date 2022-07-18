import {React, useState} from 'react'
import { Stack,Button, Row, Col, Image, Container} from 'react-bootstrap'
import 'holderjs'
import { FaBookOpen,FaBook, FaBookmark, FaCheck, FaStar } from 'react-icons/fa'
import { ReviewPopup } from './ReviewPopup'
import { bookDetailsURL } from '../urls'
import { Link } from 'react-router-dom'

export default function BookCapsule({book}) {
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  
  const handleReviewPopupShow = () => setShowReviewPopup(true);
  const handleReviewPopupClose = () => setShowReviewPopup(false);
  return (
    <Link to={bookDetailsURL(book? book.id: "")}>
        
    <Stack className='book-capsule'>
          
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
          <div className='book-capsule-buttons'>
            <FaBookmark fontSize={20}/>
            <FaBookOpen  fontSize={20}/>
            <FaCheck  fontSize={20}/>
          </div>
        <ReviewPopup showState={showReviewPopup} handleClose={handleReviewPopupClose} />
    </Stack>
    </Link>

  )
}