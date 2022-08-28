import React from 'react';
import { Container, Stack } from 'react-bootstrap';
import { timestampToString } from '../utils/TimestampHelper';



export function MessagesList({ messages, archived }) {
    return (
        <Container fluid className="messages-list">
            <Stack gap={2} >
                {messages.map((m, index) => {
                    return (
                        <div
                            key={index}
                            className={'message__container ' + 'message__container' + (m.from ? '__other'  : '__self' )}>
                            <div className={'message__timestamp ' + 'message__timestamp' + (m.from ? '__other'  : '__self' )+ ' light-text'}>{timestampToString(m.timestamp)}</div>
                            <Container
                                className={"message " + "message" + (m.from ? '__other'  : '__self' )}>
                                <Stack gap={2}>
                                    <Stack direction='horizontal' gap={1} className="idk">
                                    </Stack>
                                    <p>{m.text} </p>
                                </Stack>
                            </Container>
                        </div>
                    );
                })}
            </Stack>
        </Container>);
}
