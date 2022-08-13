import React from 'react'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import useAxios from '../utils/useAxios'

export const FollowButton = ({followContext, followToggleURL}) => {
  const [isFollowedByUser, setIsFollowedByUser] = useState(false)
  const {user} = useContext(AuthContext)

  const api = useAxios()
  const handleToggle = () => {
    if(followContext != null && user != null && followToggleURL != null) {
      setIsFollowedByUser(!isFollowedByUser)
      api()
      .post(followToggleURL)
      .then((response)=> {
        console.log('follow post to '+ followToggleURL + ' response ', response )
      }).catch(error => {
        console.log('follow post to ' + followToggleURL +  'response error', error)
      })
    }
  }
  useEffect(()=>{
    if(followContext)
      setIsFollowedByUser(followContext?.isFollowedByUser);
  }, [followContext])

  return (
    <Button variant='outline-primary'
            disabled={followContext == null} 
            active={isFollowedByUser}
            onClick={handleToggle}
    >  
        {isFollowedByUser? "Unfollow": "Follow"}
    </Button>
  )
}
