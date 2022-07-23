import React, { useEffect } from 'react'
import { useState } from 'react';
import { Container, Row,Stack, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { BookGallery } from './BookGallery';
import {GenreDropDown} from './GenreDropDown'; 
import { bookBrowseEndpoint } from '../endpoints';

import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';

export const BrowseGenre = () => {
    const {genreID} = useParams();
    const navigate = useNavigate()

    const [books, setBooks] = useState([])  
    const [genre, setGenre]  = useState({
        "id": 1,
        "tag": "Fiction",
        "description": "Fiction is the telling of stories which are not real. More specifically, fiction is an imaginative form of narrative, one of the four basic rhetorical modes. Although the word fiction is derived from the Latin fingo, fingere, finxi, fictum, \"to form, create\", works of fiction need not be entirely imaginary and may include real people, places, and events. Fiction may be either written or oral. Although not all fiction is necessarily artistic, fiction is largely perceived as a form of art or entertainment. The ability to create fiction and other artistic works is considered to be a fundamental a",
        "followerCount": 182917,
        "userFollowsGenre": false,
    })
    const getNewBooksInGenre = async () => {
        //#TODO PROPER FETCH ONCE API DONE
        let response = await fetch(bookBrowseEndpoint())
        let jBooks = await response.json()
        console.log('jBooks', jBooks)
        setBooks(jBooks)
    }
    useEffect(()=> {
        getNewBooksInGenre()
    }, [])


    return (
        <Container>
            {genre && 
                <>
                <Tab.Container defaultActiveKey="byGenre">
                    <Row>

                        <Col sm={9}>
                            {/* <Tab.Content>
                                <Tab.Pane eventKey="byGenre">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit dignissimos aspernatur dicta eveniet doloribus, in assumenda itaque dolorum? Maxime, totam. Possimus deleniti tenetur quam doloremque totam cumque voluptates dolorem ratione.
                                </Tab.Pane>
                                <Tab.Pane eventKey="byFollowedAuthors">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae totam quo, fuga facere iste ex inventore voluptas id ipsam omnis distinctio adipisci dolore ducimus aut, explicabo nam vel ea tenetur.
                                </Tab.Pane>
                                <Tab.Pane eventKey="newReleases">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum facere quos a eos, nihil voluptatem? Debitis voluptatum, corporis nihil saepe officiis amet repellendus ea, accusamus quis sapiente ipsam, labore praesentium!
                                </Tab.Pane>
                                <Tab.Pane eventKey="newlyRated">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos iusto, nemo saepe beatae quia aspernatur hic consequatur vero explicabo provident similique praesentium! Accusamus nobis nulla, ratione expedita labore corrupti officia.
                                </Tab.Pane>
                            </Tab.Content> */}
                            <Routes>
                                <Route path="/byGenre" element={<SimilarBooksView similarBooks={_similar_books} />} />
                                <Route path="/byFollowedAuthors" element={<BookReview bookID={id} />}></Route>
                                <Route path="/newReleases" element={<BookReviews book={book} />} />
                                <Route path="/newlyRated" element={<BookReviews bookID={id} />} />
                                <Route path="" element={<BookReviews book={book} />} />
                            </Routes>
                        </Col>
                    </Row>
                </Tab.Container>
                    <Stack gap={1}>
                        <Stack direction="horizontal" gap={1}>
                            <GenreDropDown selectedID ={genreID}/>
                            <Stack>
                                <h1>{genre.followerCount}</h1>
                                <span>Following</span>
                            </Stack>
                            <Button variant="primary"> Follow </Button>
                        </Stack>
                        <div><p>{genre.description}</p></div>
                        <h3 className='primary-text'>New releases Tagged "{genre.tag}":</h3>
                        <BookGallery books={books}></BookGallery>
                    </Stack>
                </>
            }
        </Container>
    )
}
