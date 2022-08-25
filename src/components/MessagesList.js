import React from 'react';
import { Container, Stack } from 'react-bootstrap';



export function MessagesList({ messages, archived }) {
    return (
        <Stack gap={2} className="messages-list">
            {messages.map((m, index) => {
                return (
                    <div
                        key={index}
                        className={'message__container ' + 'message__container' + (m.from ? '__self' : '__other')}>
                        <div className={'message__timestamp ' + 'message__timestamp' + (m.from ? '__self' : '__other') + ' light-text'}>{m.timestamp}</div>
                        <Container
                            className={"message " + "message" + (m.from ? '__self' : '__other')}>
                            <Stack gap={2}>
                                <Stack direction='horizontal' gap={1} className="idk">
                                </Stack>
                                <p>{m.text} </p>
                            </Stack>
                        </Container>
                    </div>
                );
            })}
        </Stack>);
}
