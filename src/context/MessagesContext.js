import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { myFeedURL } from "../urls";
import { unreadMessageCountEndpoint } from "../endpoints";
import useAxios from "../utils/useAxios";
const messagePreviewContext = createContext();

export default messagePreviewContext;

export const MessagePreviewsProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0)
  const [messagePreviews, setMessagePreviews] = useState(null) 

  const api = useAxios()
  const contextData = {
    "unreadCount": unreadCount,
    "setUnreadCount": setUnreadCount,
    "messagePreviews": messagePreviews,
    "setMessagePreviews": setMessagePreviews
  }
  useEffect(() => {
    api()
    .get(unreadMessageCountEndpoint())
    .then((response)=>{
        let numUnread = response.data;
        console.log('numUnread', numUnread.count)
        setUnreadCount(numUnread.count)
    } )
    .catch(err => console.log('messages fetch err', err))
  });

  return (
    <messagePreviewContext.Provider value={contextData}>
      {children}
    </messagePreviewContext.Provider>
  );
};