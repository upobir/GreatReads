import React from 'react'
import { Button } from 'react-bootstrap'

export const FollowButton = ({isFollowedByUser}) => {
  return (
    <Button variant='primary'>  
        {isFollowedByUser? "Unfollow": "Follow"}
    </Button>
  )
}
