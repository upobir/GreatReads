import { Stack } from 'react-bootstrap';
import {FaUser, FaBell} from 'react-icons/fa';
import {Dropdown,Button, Navbar,NavDropdown,Nav, Container  } from 'react-bootstrap';
import { MessagesPreviewList } from './MessagesPreviewList';
import { _messagePreviews } from '../PlaceHolder';
import React,{useEffect, useState} from 'react';
import {OverlayTrigger} from 'react-bootstrap';
import { Overlay } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';
import { viewMessagesFromUserUrl, viewMessagesUrl } from '../urls';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { messagesFetchEndpoint } from '../endpoints';
import useAxios from '../utils/useAxios';
function shortenMessagePreviewsList(messagePreviewsList){
  return messagePreviewsList.slice(0,3);
}
function getUnreadCount(messagePreviewsList){
  return messagePreviewsList.filter(m=> !m.isRead).length
} 
function UserInfo({ user, logout }) {
  const [messagePreviews, setMessagePreviews] = useState(null) 
  const [unreadCount, setUnreadCount] = useState(0)
  const api =  useAxios()
  useEffect(()=> {
    api()
    .get(messagesFetchEndpoint())
    .then((response)=>{
        let _messages = response.data;
        console.log('messages fetch response.data',_messages);
        console.log('messagePreviews', _messages)
        setUnreadCount(getUnreadCount(_messages))
        setMessagePreviews(_messages)
    } )
    .catch(err => console.log('messages fetch err', err))
  },[])

    return (
      <Stack direction='horizontal' gap={1}>
        <span><FaUser/>{user.username}</span>
        <OverlayTrigger trigger="click" placement="bottom"
          overlay={(<Popover  className='navbar-user-submenu'>
              <Popover.Header> Messages</Popover.Header>
              {messagePreviews && (
                <MessagesPreviewList messagePreviews={shortenMessagePreviewsList(messagePreviews)} className='navbar-messages-list'/>
              )}
              <Popover.Body as={Container} fluid className='navbar-user-submenu__footer'>
                <Link to={viewMessagesUrl()}> See All Messages</Link>
              </Popover.Body>
            </Popover>
            )}>
            <Button variant="outline-primary" className='navbar-user-submenu__toggle__btn'>
              <div className='navbar-user-submenu__notification'>
                 <FaBell/>
               { unreadCount > 0 && (<div className='navbar-user-submenu__unread-indicator bg-danger'>
                  {unreadCount > 9?"9+": unreadCount}
                </div>)
                }
              </div>
            </Button>
        </OverlayTrigger>
        <Button variant="outline-primary" onClick={logout}> Logout </Button>
      </Stack>

    );
  }
  
  export default UserInfo;