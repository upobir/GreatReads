import {React, useState, useRef, useContext} from 'react'
import { Stack,Button,ButtonGroup,Overlay, Tooltip,FormGroup,FormControl,OverlayTrigger, Row, Col, Image, Container} from 'react-bootstrap'
import 'holderjs'
import { FaBookOpen,FaBook, FaBookmark, FaCheck, FaStar } from 'react-icons/fa'
import { ReviewPopup } from './ReviewPopup'
import { bookDetailsURL } from '../urls'
import { Link } from 'react-router-dom'
import useAxios from '../utils/useAxios'
import Form from 'react-bootstrap/Form';
import { bookReadStatusPostEndpoint } from '../endpoints'
import { useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import { placeholderBookImage } from '../PlaceHolder'
function capsuleButtonTooltip (text){
  return (
    <Tooltip>
      {text}
    </Tooltip>
  );
}

export default function BookCapsule({book,setBook, id, mini}) {
  const api = useAxios();
  const {user} = useContext(AuthContext)
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const handleReviewPopupShow = () => setShowReviewPopup(true);
  const handleReviewPopupClose = () => setShowReviewPopup(false);

  const [showReadPageUpdateOverlay, setShowReadPageUpdateOverlay] = useState(false);
  const ReadPageUpdateOverlayTarget = useRef(null);
  const [pagesRead, setPagesRead] = useState(book && book.readPages?book.readPages: 0);
  useEffect(() => {
    if(book && book.readPages)
      setPagesRead(book.readPages > 0 ? book.readPages : 0 )
    
  }, [book])
  const postBookStatus =  (_readStatus, _pagesRead) => {
    if (book && user != null) {
      api()
      .post(bookReadStatusPostEndpoint(id), {
        readStatus: _readStatus,
        pagesRead: _pagesRead,
      })
      .then((response) => {
        console.log('read status update ok with response', response)
      })
      .catch(error => {
        console.log('read status update error', error)
      })
    } 
  }
  const setReadStatusAndPost = (status) => {
    if(book.readStatus !== status && user != null){
      // setReadStatus(status)
      postBookStatus(status, pagesRead)
      
      let mutated_book = {...book};
      mutated_book.readStatus = status;
      setBook(mutated_book)
    }
  }
  
  const handleBookSetToWishlist = () => {
    if (book && book.readStatus !== "wishlisted" && user != null){
      setShowReadPageUpdateOverlay(false);
      setReadStatusAndPost("wishlisted")
    }
  };
  const handleBookSetToReading = () => {
    if(book && user != null){

      if (book.readStatus === "reading"){
        setShowReadPageUpdateOverlay(!showReadPageUpdateOverlay);
      }else{
        setReadStatusAndPost("reading")
      }
    }
  };
  
  const handleBookSetToRead = () => {
    if (book && book.readStatus !== "read" && user != null){
      setShowReadPageUpdateOverlay(false);
      setReadStatusAndPost("read")
    }
  };
  const updatePagesRead = (e) => {
    e.preventDefault()
    if(book && pagesRead && user != null){
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
    setShowReadPageUpdateOverlay(false)
  }
  
  return (
    
    <Stack className={'book-capsule'+(mini?' book-capsule__mini':'')}>
          
      <Link to={id? bookDetailsURL(id) : '#'}>
        {
        book?.thumbnail
        ? <Image fluid src={book.thumbnail} />
        : (<div className="book-capsule__thumbnail">
              <Image fluid src={placeholderBookImage} />
              <div className='book-capsule__thumbnail__placeholder'>
                <FaBook />
              </div>
            </div>)
        }

          
          {/* <div className="book-capsule__thumbnail">
            <FaBook fontSize={90}/>
          </div> */}
      </Link>
      <Stack className='book-capsule__rating-bar' direction='horizontal'>
        <div className='book-capsule__rating-bar__avg-rating'>
          <FaStar fontSize={17}/><span fontSize={17}>{book?.avgRating.toFixed(2)}</span>
        </div>
        <Button 
          variant='outline-primary' 
          className='book-capsule__rating-bar__user-rating' 
          disabled={book == null || user==null  }
          onClick={handleReviewPopupShow}>
        {book?.userRating
            ? (<><FaStar fontSize={17} /><span style={{fontSize:17}}>{book?.userRating}</span></>)
            : (<span style={{fontSize:17}}>+ Rate</span> ) 
        }
        </Button>            
        {/* <div  className='book-capsule__rating-bar__user-rating'>
          {book?.userRating
            ? (<Button ><FaStar fontSize={20} /><span>{book?.userRating}</span></Button>)
            : (<Button variant='outline-primary' className='book-capsule__rating-bar__btn' onClick={handleReviewPopupShow}> {"+ Rate"} </Button>) 
          }            
        </div> */}
      </Stack>
          <ButtonGroup className='book-capsule__btn-group' >
            <OverlayTrigger
              placement="bottom"
              delay={{ hide: 100 }}
              overlay={<Tooltip className='book-capsule__btn-group__tooltip'>
                Add to Wishlist
              </Tooltip>}
            >
              <Button variant="outline-primary"
                disabled={book == null || user == null}
                onClick={handleBookSetToWishlist}
                active={book && book.readStatus === "wishlisted"}>
                <FaBookmark fontSize="1.4rem" />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ hide: 100 }}
              overlay={<Tooltip className='book-capsule__btn-group__tooltip'>
                Add to Reading list
              </Tooltip>}
            >
              <Button ref={ReadPageUpdateOverlayTarget}
                    disabled={book == null || user == null} 
                    variant="outline-primary" 
                    onClick={handleBookSetToReading} 
                    active={book && book.readStatus === "reading"}>
              <FaBookOpen  fontSize="1.4rem"/>
              </Button>
            </OverlayTrigger>

         

            <OverlayTrigger
              placement="bottom"
              delay={{ hide: 100 }}
              overlay={<Tooltip className='book-capsule__btn-group__tooltip'>
                Mark as read
              </Tooltip>}
            >
                          <Button variant="outline-primary"
                    disabled={book == null || user == null} 
                    onClick={handleBookSetToRead} 
                    active={book && book.readStatus === "read"}>
              <FaCheck  fontSize="1.4rem"/>
            </Button>
            </OverlayTrigger>
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
                    <FormControl 
                      type="number" 
                      className="form-control" 
                      onChange={(e) => setPagesRead(e.target.value)}
                      placeholder={pagesRead}/>
                  </FormGroup>
                  <p className='medium-text'>Of</p>
                  <p className='high-text'>{book.pageCount}</p>
                  <Button variant='primary'  type="submit">Update</Button>
                </form>
              }
            </Container>
          </Tooltip>
        </Overlay>
        <ReviewPopup showState={showReviewPopup} setShowState={setShowReviewPopup} bookID={id} handleClose={handleReviewPopupClose} />
    </Stack>

  )
}