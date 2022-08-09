import React from 'react'
import { Button } from 'react-bootstrap'

export const FollowButton = ({followContext}) => {
  return (
    <Button variant='primary'>  
        {followContext && followContext.isFollowedByUser? "Unfollow": "Follow"}
    </Button>
  )
}
