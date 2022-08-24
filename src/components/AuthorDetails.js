import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, Routes, Route, Link } from "react-router-dom";
import { authorBooksFetchEndpoint, authorFetchEndpoint, authorFollowToggleEndpoint, authorSeriesFetchEndpoint, bookFetchEndpoint, seriesFetchEndpoint } from '../endpoints';
import GenreBlock from './GenreBlock';
import {Row, Col, Container, Tabs, Tab, Stack, Button,TabContainer, Navbar, Image} from 'react-bootstrap'
import { FollowBlock } from './FollowBlock';
import useAxios from "../utils/useAxios";   // for private api endpoints
import { SimpleSpinner, SpinnerWrapper } from './SpinnerWrapper';
import {PlaceholderMiniBlockWrapper, PlaceholderParagraphWrapper} from './PlaceholderBlockWrapper';
import { MakeHorizontalTabBar } from './CustomTabs';
import { authorDetailsURL, bookDetailsURL } from '../urls';
import { useLocation } from 'react-router-dom';
import BookCapsule from './BookCapsule';
import { SeriesView } from './SeriesView';
import {_genres} from './../PlaceHolder';
import {BookGallery} from './BookGallery'
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

export const AuthorBooks = ({author_id}) => {
    const api = useAxios();                 // for private api endpoints
    const [books, setBooks] = useState(null)

    useEffect(() => {
        api()
        .get(authorBooksFetchEndpoint(author_id))
        .then(response =>{
            let _books = response.data
            console.log('author _books', _books)
            setBooks(_books)
        })
        .catch((err)=>console.log('author book fetch err', err))
    }, [])
    return (
        <BookGallery books={books} setBooks={setBooks}/>
    )
}


export const AuthorSerieses = ({author_id}) => {
    const api = useAxios();                 // for private api endpoints
    const [serieses, setSerieses] = useState(null)
    const handleSeriesSet = (index, series) => {
        let mutatedSerieses = [...series];
        mutatedSerieses[index] = series;
        setSerieses(mutatedSerieses);
    } 
    useEffect(() => {
        api()
        .get(authorSeriesFetchEndpoint(author_id))
        .then(response =>{
            let _series = response.data
            let dummySeries = []
            console.log('_series', _series)
            dummySeries.push(_series)
            dummySeries.push(_series)
            dummySeries.push(_series)
            dummySeries.push(_series)
            setSerieses(dummySeries)
        })
        .catch((err)=>console.log('author series fetch err', err))
    }, [])
    if(serieses == null)
        return <SimpleSpinner/>
    return (<Stack gap={2}>
        {serieses?.map((series,index) => {
            return (
                <SeriesView series={series} setSeries={(s)=>handleSeriesSet(index, s)}/>
            )
        })}
    </Stack>
    )
}

const AuthorDetails = () => {
    const {author_id} = useParams();
    const [author, setAuthor] = useState(null)

    const api = useAxios();                 // for private api endpoints
    const loc = useLocation()

    const authorURL = authorDetailsURL(author_id)

    const getData = async () => { 
        api()
        .get(authorFetchEndpoint(author_id))
        .then((response) => {
            let _author = response.data
            console.log('_author', _author);
            _author.birth_date= "Cosmere"
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
            <div className='author-details'>
                <Container fluid className='author-details__left-col'>
                    <Col xs={2} className='allow-click-self author-details__left-col__inner' >
                        <Image fluid src={author?.picture_url} className='author-preview__image'/>
                        {author && <Container>
                            <FollowBlock
                                followContext={author}
                                followedByUser={author.followedByUser}
                                followToggleURL={authorFollowToggleEndpoint(author_id)}
                                className="space-contents-between"
                                vertical
                            />
                        </Container>}
                    </Col>
                </Container>
                <Container fluid  className='author-details__right-col'>
                    <Col xs={{span:3,offset:9 }} className='allow-click-self author-details__right-col__inner'>
                        <Stack gap={2}>
                            <Row><Col xs={2}><h5>Born:</h5><span className='medium-text'>{author?.birth_date}</span></Col></Row>
                            <Row><Col xs={2}><h5>Website:</h5><Link to={author?author.website: '#'}>{author?.website}</Link></Col></Row>
                            <Row><Col xs={2}><h5>Books Written:</h5><h2 className='primary-text'>{author?.booksWritten}</h2></Col></Row>
                            <Row><Col xs={2}><h5 className='high-text '>Avg. Rating:</h5><h2  className='primary-text'>{author?.avgRating}</h2></Col></Row>
                            <GenreBlock genres={author?.genres} />
                        </Stack>
                    </Col>
                </Container>

                <Container fluid  className='author-details__mid-col-top'>
                    <Col xs={{span:7,offset:2 }} className='author-details__mid-col-top-header' id='author-details-mid-header'>
                        {/* <SpinnerWrapper Component={<h1 className='primary-text'>{book?.title}</h1>} isLoading={book==null}/> */}
                        <PlaceholderMiniBlockWrapper Component={<h3 className='primary-text'>{author?.name}</h3>}
                        isLoading={author==null}
                        cols={6}
                        />

                    </Col>
                </Container>
                <Container fluid className='author-details__mid-col-bottom'>
                    <Col xs={{span:7,offset:2 }}>
                    <PlaceholderParagraphWrapper Component={author?.description} isLoading={author==null}/>
                        <MakeHorizontalTabBar tabs={tabs} loc={loc.pathname} rootURL={authorURL} className="author-details__tab-bar"/>
                        <Routes>                            
                            <Route path="/series" element={<AuthorSerieses author_id={author_id}/>} />
                            <Route path="/books" element={<AuthorBooks author_id={author_id} />} />
                            <Route path="" element={<AuthorBooks author_id={author_id}/> } />
                        </Routes>                    
                    </Col>
                </Container>
            </div>
            {/* <ReviewPopup showState={showReviewPopup} bookID={id} handleClose={handleReviewPopupClose} /> */}
        </>

    )
}
export default AuthorDetails
