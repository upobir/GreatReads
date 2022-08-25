import { useState } from 'react'
import { _messagePreviews, _conversationWithUser } from '../PlaceHolder'
import { MakeHorizontalTabBar } from './CustomTabs'
import { Link, useLocation, useParams, Routes, Route } from 'react-router-dom'
import React from 'react'
import {Tabs, Tab, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'
import { Container, Row, Col,Stack, Form } from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import { userDetailsURL } from '../urls'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import useAxios from '../utils/useAxios'
import { followUserEndpoint, messagePostEndpoint } from '../endpoints'
import { FollowButton } from './FollowButton'
import {FaUser, FaPaperPlane} from 'react-icons/fa'
import { MessagesPreviewList } from './MessagesPreviewList'
import { MessagesList } from './MessagesList'
const messagePreviewTabs = [
    {
        tabTitle:"New",
        tabLink:"new",
        tabKey:"new",
      },
      {
        tabTitle:"Archived",
        tabLink:"archived",
        tabKey:"archived",
      },
]
export function showNonArchivedMessages(messagePreviews) {
    return messagePreviews.filter((m) => m.from.followedByUser && m.from.followsUser)
}

export function showArchivedMessages(messagePreviews) {
    return messagePreviews.filter((m) => !m.from.followedByUser || !m.from.followsUser)
}


export function PostMessageTextBox(){
    const {messages_from_id} = useParams()
    const api = useAxios()
    const [message, setMessage] = useState(null)
    const postMessage = (e)=> {
        if (message && message.length > 0) {
            console.log('post message ', message )
            api()
                .post(messagePostEndpoint(messages_from_id), {
                    messageText: message,
                })
                .then((response) => {
                    console.log('message  post response', response);
                })
                .catch((error) => {
                    console.log('message post error', error)
                })
                .finally(()=>{
                    setMessage(null)
                });
        }
    }
    return (
        // <Col >
            <Container fluid>
                <Form className='message-post-textbox' >
                    <Stack direction='horizontal' gap={2}>
                        <Form.Control
                            as="textarea"
                            rows={1}
                            placeholder="Enter Message"
                            onChange={e => setMessage(e.target.value)}/>
                        <Button variant="primary" onClick={postMessage}>
                            <FaPaperPlane fontSize={25}/>
                        </Button>
                    </Stack>
                </Form>
            </Container>
        // </Col>
    )
}

export function MessagesPreview({messagePreviews}) {
    return (
        
            <Tabs
                defaultActiveKey="new"
            >
            <Tab eventKey="new" title="New">
                <div className="message-preview__container">
                    <MessagesPreviewList     messagePreviews={messagePreviews} filter={showNonArchivedMessages}/>
                </div>
            </Tab>
            <Tab eventKey="archived" title="Archived">
                <div className="message-preview__container">
                <MessagesPreviewList messagePreviews={messagePreviews} filter={showArchivedMessages}/>
                </div>
            </Tab>
                  </Tabs>
        
    )
}

export default function Messenger() {
    const [messagePreviews, setMessagePreviews] = useState(_messagePreviews) 
    const [messagesBetweenUser, setMessagesBetweenUser] = useState(_conversationWithUser.messages)
    const [otherUser, setOtherUser] = useState(_conversationWithUser.with)
    return (
        <Container fluid className='messenger-container'>
            <Row style={{height:"100%"}}>
                <Col xs={3} className='messenger-left'>
                    <Routes>
                        <Route path='/:messages_from_id' element={<MessagesPreview messagePreviews={messagePreviews}/>}/>
                        <Route path='/' element={<MessagesPreview messagePreviews={messagePreviews}/>}/>
                    </Routes>
                    
                </Col>
                <Col xs={{span:6}} className='messenger-mid'>
                    <MessagesList messages={messagesBetweenUser}/>

                    <PostMessageTextBox />

                </Col>
                <Col xs={3}>
                    <Container>
                        {otherUser && <Stack gap={2} className="align-center">
                                <FaUser fontSize={80}/>
                            <h2 as={Link} to={userDetailsURL(otherUser.id)}>{otherUser.username}</h2>
                            <FollowButton 
                                followContext={otherUser}
                                followsUser={otherUser.followsUser}
                                followedByUser={otherUser.followedByUser}
                                followToggleURL={followUserEndpoint(otherUser.id)}
                                />
                        </Stack>
                        }
                    </Container>

                </Col>
                
            </Row>

        </Container>
    )
}
