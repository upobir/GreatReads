import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, Routes, Route, Link } from "react-router-dom";
import { authorFetchEndpoint, bookFetchEndpoint, seriesFetchEndpoint } from '../endpoints';
import GenreBlock from './GenreBlock';
import {Row, Col, Container, Tabs, Tab, Stack, Button,TabContainer, Navbar, Image} from 'react-bootstrap'
import {SimilarBooksView} from './SimilarBooksView'
import BookAuthorsBlock from './BookAuthorsBlock';
import useAxios from "../utils/useAxios";   // for private api endpoints
import { SpinnerWrapper } from './SpinnerWrapper';
import {PlaceholderMiniBlockWrapper, PlaceholderParagraphWrapper} from './PlaceholderBlockWrapper';
import { MakeHorizontalTabBar } from './CustomTabs';
import { authorDetailsURL, bookDetailsURL } from '../urls';
import { useLocation } from 'react-router-dom';
import BookCapsule from './BookCapsule';
import { SeriesView } from './SeriesView';
import {_genres} from './../PlaceHolder';

let tabs = [
    {
      tabTitle:"Books",
      tabLink:"books",
      tabKey:"books",
    },
    {
      tabTitle:"Series",
      tabLink:"series",
      tabKey:"series",
    },
]


const AuthorDetails = () => {
    const {author_id} = useParams();
    const [author, setAuthor] = useState(null)
    const [serieses, setSerieses] = useState(null)
    const [books, setBooks] = useState(null)

    const api = useAxios();                 // for private api endpoints
    const loc = useLocation()

    const authorURL = authorDetailsURL(author_id)

    const getData = async () => { 
        api()
        .get(authorFetchEndpoint(author_id))
        .then((response) => {
            let _author = response.data
            console.log('_author', _author);
            _author.born= "Cosmere"
            _author.website="foo.bar.baz"
            _author.booksWritten=33
            _author.avgRating=4.55
            _author.genres = _genres
            setAuthor(_author)
        })
        .catch(error => {
            console.log('author fetch error', error)
        }); 
     }


    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className='book-details'>
                <Container fluid className='book-details__left-col'>
                    <Col xs={2} className='allow-click-self book-details__left-col__inner' >
                        <Image fluid src={author?.picture_url} className='author-preview__image'/>
                    </Col>
                </Container>
                <Container fluid  className='book-details__right-col'>
                    <Col xs={{span:3,offset:9 }} className='allow-click-self book-details__right-col__inner'>
                        <Stack gap={2}>
                            <Row><Col xs={2}>Born:{author?.born}</Col></Row>
                            <Row><Col xs={2}>Born:{author?.website}</Col></Row>
                            <Row><Col xs={2}>Born:{author?.booksWritten}</Col></Row>
                            <Row><Col xs={2}>Born:{author?.avgRating}</Col></Row>
                            <GenreBlock genres={author?.genres} />
                        </Stack>
                    </Col>
                </Container>

                <Container fluid  className='book-details__mid-col-top'>
                    <Col xs={{span:7,offset:2 }} className='book-details__mid-col-top-header' id='book-details-mid-header'>
                        {/* <SpinnerWrapper Component={<h1 className='primary-text'>{book?.title}</h1>} isLoading={book==null}/> */}
                        <PlaceholderMiniBlockWrapper Component={<h3 className='primary-text'>{author?.name}</h3>}
                        isLoading={author==null}
                        cols={6}
                        />

                    </Col>
                </Container>
                <Container fluid className='book-details__mid-col-bottom'>
                    <Col xs={{span:7,offset:2 }}>
                    <PlaceholderParagraphWrapper Component={author?.description} isLoading={author==null}/>
                        <MakeHorizontalTabBar tabs={tabs} loc={loc.pathname} rootURL={authorURL} className="book-details__tab-bar"/>
                        {/* <Routes>                            
                            <Route path="/series" element={<SeriesView book={book} series={series} setSeries={setSeries}/>} />
                            <Route path="/books" element={<SimilarBooksView similarBooks={similarBooks} setSimilarBooks={setSimilarBooks} />} />
                            <Route path="" element={<BookReviews book={book}/>} />
                        </Routes>                     */}
                    </Col>
                </Container>
            </div>
            {/* <ReviewPopup showState={showReviewPopup} bookID={id} handleClose={handleReviewPopupClose} /> */}
        </>

    )
}
export default AuthorDetails
