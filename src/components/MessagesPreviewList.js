import { Link, useParams } from 'react-router-dom';
import React from 'react';
import { Container, Stack } from 'react-bootstrap';
import { viewMessagesFromUserUrl } from '../urls';
import { SimpleSpinner } from './SpinnerWrapper';
import { timestampToString } from '../utils/TimestampHelper';
function truncateMessage(message){
    return message && message.length > 50 ? (message.substring(0, 50) + '...') : message;
}
export function MessagePreview({m,messages_from_id}){
    return <Container fluid
        as={Link} to={viewMessagesFromUserUrl(m.from.id)}
        className={'message-preview  no-text-effects ' + ((m.from.id == messages_from_id) ? 'message-preview__active' : '')}>
        <Stack gap={1}>
            <Stack direction='horizontal' className='space-contents-between' gap={1}>
                <span className={m.message.isRead?'light-text' : 'primary-text'}>{m.from.username}</span>
                {/* <Link to={userDetailsURL(m.from.id)} className='primary-text'>{m.from.username}</Link> */}
                <span className={m.message.isRead?'light-text' : 'primary-text'}>{timestampToString(m.message.timestamp)}</span>
            </Stack>
            <p className={m.message.isRead?'medium-text' : 'primary-text'}>{truncateMessage(m.message.text)}</p>
        </Stack>
    </Container>;
}

export function MessagesPreviewList({ messagePreviews, filter, className }) {
    const { messages_from_id } = useParams();
    // console.log('messages_from_id', messages_from_id);
    // if(filter)
    //     console.log('filter(messagePreviews)', filter(messagePreviews));
    
    return <Stack gap={1} className={className? className:''}> 
        {messagePreviews
        ? (filter?filter(messagePreviews):messagePreviews).map((m, index) => {
            return <MessagePreview key={index} m={m} messages_from_id={messages_from_id}/>
        })
        : <SimpleSpinner/>}
        {}
    </Stack>;
}
