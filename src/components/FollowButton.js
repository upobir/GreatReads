import React from 'react'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import useAxios from '../utils/useAxios'

export const FollowButton = ({followContext,followedByUser,followsUser, followToggleURL, followToggleCallback}) => {
  const [isFollowedByUser, setIsFollowedByUser] = useState(followedByUser)
  const {user} = useContext(AuthContext)

  const api = useAxios()
  const handleToggle = () => {
    if(followContext != null && user != null && followToggleURL != null) {
      let willFollowUser = !isFollowedByUser//state updates are not synchronous. We want correct val when we call callback 
      setIsFollowedByUser(willFollowUser)
      if(followToggleCallback)
        followToggleCallback(willFollowUser)
        
      api()
      .post(followToggleURL)
      .then((response)=> {
        console.log('follow post to '+ followToggleURL + ' response ', response )
      }).catch(error => {
        console.log('follow post to ' + followToggleURL +  'response error', error)
      })
    }
  }
  return (
    <>
      {followsUser != null && <span className='light-text'>{followsUser?"following you":"not following you"} </span>}
      <Button variant='outline-primary'
              disabled={followContext == null}
              active={isFollowedByUser}
              onClick={handleToggle}
      >
          {isFollowedByUser? "Unfollow": "Follow"}
      </Button>
    </>
  )
}
