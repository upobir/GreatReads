import { useState } from 'react'
import { _messagePreviews, _conversationWithUser } from '../PlaceHolder'
import { MakeHorizontalTabBar } from './CustomTabs'
import { Link, useLocation, useParams, Routes, Route } from 'react-router-dom'
import React from 'react'
import {Tabs, Tab, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'
import { Container, Row, Col,Stack, Form } from 'react-bootstrap'
import { viewMessagesFromUserUrl } from '../urls'
import {Button} from 'react-bootstrap'
import { userDetailsURL } from '../urls'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import useAxios from '../utils/useAxios'
import { messagePostEndpoint } from '../endpoints'
const messagePreviewTabs = [
    {
        tabTitle:"New",
        tabLink:"/messages/new",
        tabKey:"new",
      },
      {
        tabTitle:"Archived",
        tabLink:"/messages/archived",
        tabKey:"archived",
      },
]
export function showNonArchivedMessages(messagePreviews) {
    return messagePreviews.filter((m) => m.from.followedByUser && m.from.followsUser)
}

export function showArchivedMessages(messagePreviews) {
    return messagePreviews.filter((m) => !m.from.followedByUser || !m.from.followsUser)
}


export function MessagesPreviewList({messagePreviews, filter}){
    const {messages_from_id} = useParams();
    console.log('messages_from_id', messages_from_id)
    console.log('filter(messagePreviews)', filter(messagePreviews)   )
    // return <Stack gap={1}>
    //         {filter(messagePreviews).map((m, index)=>{
    //             return <ToggleButton
    //                         variant='outline-primary' 
    //                         key={index} 
    //                         type="checkbox"
    //                         name={index}
    //                         checked={m.from.id === messages_from_id}
    //                         className='message-preview no-text-effects'>
    //                 <Stack gap={1}>
    //                     <Stack direction='horizontal' className='space-contents-between'>
    //                         <span>{m.from.name}</span>
    //                         <span className='light-text'>{m.lastMessage.timestamp}</span>
    //                     </Stack>
    //                     <p className='message-preview__medium-text'>{m.lastMessage.text?.substring(0,100)}</p>
    //                 </Stack>
    //             </ToggleButton>
    //         } )}
    //     </Stack>
    return <Stack gap={1}>
    {filter(messagePreviews).map((m, index)=>{
        console.log('index', index, m.from.id,   messages_from_id, (m.from.id == messages_from_id))
        return <Container
                    as={Link} to={viewMessagesFromUserUrl(m.from.id)}
                    key={index} 
                    className={'message-preview no-text-effects ' + ((m.from.id == messages_from_id)? 'message-preview__active':'')}>
            <Stack gap={1}>
                <Stack direction='horizontal' className='space-contents-between'>
                    <span  className='primary-text'>{m.from.username}</span>
                    {/* <Link to={userDetailsURL(m.from.id)} className='primary-text'>{m.from.username}</Link> */}
                    <span className='light-text'>{m.message.timestamp}</span>
                </Stack>
                <p className='message-preview__medium-text'>{m.message.text?.substring(0,100)}</p>
            </Stack>
        </Container>
    } )}
    </Stack>
}



export function MessagesList({messages, archived}){
    return <Stack gap={1}>
        {messages.map((m, index)=>{ return (
            <div key={index}
                 className={"message-align" + (m.from?'__self':'__other')}>
                <Container className="message">
                    <Stack gap={2} >
                        <Stack direction='horizontal' gap={1} className="idk">
                            <span className='light-text'>{m.timestamp}</span>
                        </Stack>
                        <p>{m.text} </p>
                    </Stack>
                </Container>
            </div>)    
        } )}
    </Stack>
}
export function PostMessageTextBox(){
    const {messages_from_id} = useParams()
    const api = useAxios()
    const [message, setMessage] = useState(null)
    const postMesage = ()=> {
        if (message && message.legnth > 0) {
            api()
                .post(messagePostEndpoint(messages_from_id), {
                    messageText: message,
                })
                .then((response) => {
                    console.log('rmessage  post response', response);
                    window.location.reload(true)
                })
                .catch((error) => {
                    console.log('message post error', error)
                });
        }
    }
    return (
        <Form></Form>
    )
}

export function MessagesPreview({messagePreviews}) {
    return (
        <Tabs
            defaultActiveKey="new"
        >
        <Tab eventKey="new" title="New">
            <MessagesPreviewList messagePreviews={messagePreviews} filter={showNonArchivedMessages}/>
        </Tab>
        <Tab eventKey="archived" title="Archived">
            <MessagesPreviewList messagePreviews={messagePreviews} filter={showArchivedMessages}/>
        </Tab>
      </Tabs>
    )
}

export default function Messenger() {
    const  [messagePreviews, setMessagePreviews] = useState(_messagePreviews) 
    const  [messagesBetweenUser, setMessagesBetweenUser] = useState(_conversationWithUser.messages)
     
    console.log('_messagePreviews', messagePreviews)
    return (
        <Container fluid>
            <Row>
                <Col xs={3}>
                    <Routes>
                        <Route path='/:messages_from_id' element={<MessagesPreview messagePreviews={messagePreviews}/>}/>
                        <Route path='/' element={<MessagesPreview messagePreviews={messagePreviews}/>}/>
                    </Routes>
                    
                </Col>
                <Col xs={6}>
                    <MessagesList messages={_conversationWithUser}/>
                </Col>
                <Col xs={3}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse necessitatibus eos error pariatur nam neque soluta dolor laborum vero, sint at officia fugit quo. Odit neque inventore incidunt quod similique!</Col>
            </Row>
        </Container>
    )
}
