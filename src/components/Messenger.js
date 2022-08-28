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
import { followUserEndpoint, messagePostEndpoint,messagesFetchEndpoint, messagesWithUserFetchEndpoint, userDetailsEndpoint } from '../endpoints'
import { FollowButton } from './FollowButton'
import {FaUser, FaPaperPlane} from 'react-icons/fa'
import { MessagesPreviewList } from './MessagesPreviewList'
import { MessagesList } from './MessagesList'
import { useEffect } from 'react'
import { timestampToString } from '../utils/TimestampHelper'
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


export function PostMessageTextBox({messages, setMessages, otherUser, archived}){
    const {messages_from_id} = useParams()
    const {user} = useContext(AuthContext)
    const api = useAxios()
    const [message, setMessage] = useState("")
    const postMessage = (e)=> {
        if (message && message.length > 0 ) {


            let timestamp = new Date()
            console.log('timestamp', timestamp)

            let _message = {
                // "from": user.user_id,
                "isRead":false,
                "text": message,
                "timestamp": timestamp,
            };

            console.log('post message ', _message )
            
            let mutatedMessages =  [...messages]
            mutatedMessages.push(_message)
            setMessages(mutatedMessages);

            console.log('mutatedMessages', mutatedMessages)

            api()
                .post(messagePostEndpoint(messages_from_id), {
                    text: message,
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
            <Container fluid className='message-post-textbox'>
                <Form  >
                    <Stack direction='horizontal' gap={2}>
                        <Form.Control
                            as="textarea"
                            rows={1}
                            placeholder={archived?"(Archived)":"Enter Message"}
                            value={message? message : ''}
                            onChange={e => setMessage(e.target.value)}/>
                        <Button variant="primary" 
                                onClick={postMessage}
                                disabled={archived || !user || !messages || !otherUser}
                        >
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
                <Container fluid className="message-preview__container">
                    <MessagesPreviewList     messagePreviews={messagePreviews} filter={showNonArchivedMessages}/>
                </Container>
            </Tab>
            <Tab eventKey="archived" title="Archived">
                <Container fluid className="message-preview__container">
                <MessagesPreviewList messagePreviews={messagePreviews} filter={showArchivedMessages}/>
                </Container>
            </Tab>
                  </Tabs>
        
    )
}

export default function Messenger() {
    const {messages_from_id} = useParams()
    const [messagePreviews, setMessagePreviews] = useState(null) 
    const [messagesBetweenUser, setMessagesBetweenUser] = useState(null)
    const [otherUser, setOtherUser] = useState(null)
    const [archived, setArchived] = useState(false)
    const api = useAxios()

    useEffect(()=> {
  
    }, [])

    const handleFollowToggle = (otherUserID, isFollowingOtherUser) => { 
        console.log('folllow toggle handle otherUserID', otherUserID)
        
        let mutatedOtherUser = otherUser
        mutatedOtherUser.followedByUser = isFollowingOtherUser
        setOtherUser(mutatedOtherUser)
        
        let mutatedMessagePreviews = [...messagePreviews]
        mutatedMessagePreviews.forEach((m, index, messagePreviews) => {
            if(m.from.id === otherUserID){
                m.from.followedByUser = isFollowingOtherUser
                console.log('m.from.followedByUser', m.from.followedByUser)
            }
        })
        setMessagePreviews(mutatedMessagePreviews)
        console.log('mutatedMessagePreviews', mutatedMessagePreviews)

        let willBeArchived = !mutatedOtherUser || !mutatedOtherUser.followsUser || !mutatedOtherUser.followedByUser;
        setArchived(willBeArchived)
    }
    useEffect(()=> {
        //get those spinners spinnnin
        if(messagePreviews != [])
            setMessagePreviews(null)
        if(messagePreviews)
            setMessagesBetweenUser(null)
        if(otherUser)
            setOtherUser(null)
        //fetch messages list first
        api()
        .get(messagesFetchEndpoint())
        .then((response)=>{
            let _messages = response.data;
            console.log('messages fetch response.data',_messages);
            
            setMessagePreviews(_messages)
        } )
        .catch(err => console.log('messages fetch err', err))

        //then from user under this id
        console.log('messages_from_id', messages_from_id)
        if(messages_from_id){
            api()
            .get(userDetailsEndpoint(messages_from_id))
            .then((response) => {
                let _user = response.data
                console.log('setother user _user', _user)
                setOtherUser(_user)

                let willBeArchived = !_user || !_user.followsUser || !_user.followedByUser;
                // const isArchivedConversation = () => !otherUser || !otherUser.followsUser || !otherUser.followedByUser; 
                // console.log('otherUser',otherUser,'willBeArchived', willBeArchived, 'otherUser.followsUser', otherUser.followsUser,
                // 'otherUser.followedByUser', otherUser.followedByUser)
                setArchived(willBeArchived)

                api()
                .get(messagesWithUserFetchEndpoint(messages_from_id, true))
                .then((response)=> {
                    let _messages = response.data;
                    console.log('message with user response', _messages)
                    setMessagesBetweenUser(_messages.reverse())
                })
                .catch((err)=> console.log('message with user err', err))
            })
            .catch((err) => console.log('user fetch fail err', err))

        }
    }, [messages_from_id])
    console.log('archived', archived)
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
                    <MessagesList messages={messagesBetweenUser} archived={archived} />
                    <PostMessageTextBox 
                        archived={archived}
                        otherUser={otherUser} 
                        messages={messagesBetweenUser}
                        setMessages={setMessagesBetweenUser}/>
                    {messagesBetweenUser && otherUser && archived && <Container fluid className='messages-list__archived'>
                        <h1> Archived </h1>
                    </Container>}
                </Col>
                <Col xs={3}>
                    <Container>
                        {otherUser && <Stack gap={2} className="align-center">
                                <FaUser fontSize={80}/>
                            <h2 as={Link} to={userDetailsURL(otherUser.id)}>{otherUser.name}</h2>
                            <FollowButton 
                                followContext={otherUser}
                                followsUser={otherUser.followsUser}
                                followedByUser={otherUser.followedByUser}
                                followToggleURL={followUserEndpoint(otherUser.id)}
                                followToggleCallback= {(willFollowUser) => {handleFollowToggle(otherUser.id, willFollowUser)}}
                                />
                        </Stack>
                        }
                    </Container>

                </Col>
                
            </Row>

        </Container>
    )
}
