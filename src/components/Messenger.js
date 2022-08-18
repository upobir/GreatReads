import { useState } from 'react'
import { _messagePreviews } from '../PlaceHolder'
import { MakeHorizontalTabBar } from './CustomTabs'
import { useLocation } from 'react-router-dom'
import React from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import { Container, Row, Col,Stack, Form } from 'react-bootstrap'
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
    return messagePreviews.filter((m) => m.followedByUser && m.followsUser)
}

export function showArchivedMessages(messagePreviews) {
    return messagePreviews.filter((m) => !m.followedByUser || !m.followsUser)
}


export function MessagesPreviewList({messagePreviews, filter}){
    return <Stack gap={1}>
        {filter(messagePreviews).map((m, index)=>{
            <Stack gap={1}>
                <Stack direction='horizontal'>
                    <span>{m.from.name}</span>
                    <span>{m.lastMessage.timestamp}</span>
                </Stack>
                <p>{m.text.splice(100)}</p>
            </Stack>    
        } )}
    </Stack>
}
// export function MessagesPreview({messagePreviews}) {
//     const loc = useLocation()
//     return (
//         <Container>
//             <Row>
//                 <MakeHorizontalTabBar tabs={tabs} loc={loc} rootURL="/messages/" />
//             </Row>
//             <Row>
//             <Routes>
//               <Route path='/archived' element={<BrowseGenre />} />
//               <Route path='/new' element={<BrowseNewReleases />}  />
//               <Route path='' element={<BrowseNewReleases />}  />
//             </Routes>
//             </Row>
//         </Container>
//     )
// }


export function MessagesList({messages,filter}){
    return <Stack gap={1}>
        {filter(messages).map((m, index)=>{
            <Stack gap={1}>
                <Stack direction='horizontal'>
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
            defaultActiveKey="New"
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
    const  messagePreviews = useState(_messagePreviews) 
    return (
        <Container>
            <Row>
                <Col xs={2}>
                    <MessagesPreview messagePreviews={messagePreviews}/>
                </Col>
            </Row>
        </Container>
    )
}
