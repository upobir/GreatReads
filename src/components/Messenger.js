import { useState } from 'react'
import { _messagePreviews } from '../PlaceHolder'
import { MakeHorizontalTabBar } from './CustomTabs'
import { Link, useLocation, useParams } from 'react-router-dom'
import React from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import { Container, Row, Col,Stack, Form } from 'react-bootstrap'
import { viewMessagesFromUserUrl } from '../urls'
import {Button} from 'react-bootstrap'
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
    console.log('filter(messagePreviews)', filter(messagePreviews)   )
    return <Stack gap={1}>
            {filter(messagePreviews).map((m, index)=>{
                return <Button 
                active={messages_from_id === m.from.id}
                            variant='link'
                            className='message-preview no-text-effects'>
                    <Stack gap={1}>
                        <Stack direction='horizontal' className='space-contents-between'>
                            <span>{m.from.name}</span>
                            <span className='light-text'>{m.lastMessage.timestamp}</span>
                        </Stack>
                        <p className='message-preview__medium-text'>{m.lastMessage.text?.substring(0,100)}</p>
                    </Stack>
                </Button>
            } )}
        </Stack>
}


export function MessagesList({messages,filter}){
    return <Stack gap={1}>
        {filter(messages).map((m, index)=>{
            <Stack gap={1} className={messages}>
                <Stack direction='horizontal' gap={1} className="idk">
                    <span>{m.from.name}</span>
                    <span>{m.lastMessage.timestamp}</span>
                </Stack>
                <p>{m.text}</p>
            </Stack>    
        } )}
    </Stack>
}
export function PostMessageTextBox(){
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
    console.log('_messagePreviews', messagePreviews)
    return (
        <Container fluid>
            <Row>
                <Col xs={3}>
                    <MessagesPreview messagePreviews={messagePreviews}/>
                </Col>
                <Col xs={6}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique quisquam modi, magnam consequatur illum porro eaque nihil repellendus doloremque? Blanditiis, minima consectetur laborum maiores rem recusandae velit. Nulla, vero assumenda?
                </Col>
                <Col xs={3}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse necessitatibus eos error pariatur nam neque soluta dolor laborum vero, sint at officia fugit quo. Odit neque inventore incidunt quod similique!</Col>
            </Row>
        </Container>
    )
}
