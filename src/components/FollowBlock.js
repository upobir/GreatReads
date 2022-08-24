import React from 'react'
import { Stack } from 'react-bootstrap'
import { FollowButton } from './FollowButton'
export const FollowBlock = ({followContext,followedByUser, followToggleURL}) => {
  return (
    <Stack direction='horizontal' gap={3}>
      <Stack className="follow-block">
        <h3 style={{ paddingTop: 0,
              paddingBottom: 0,
              marginBlockEnd:0,
              marginBlockStart:0  }}>
        {followContext?.followerCount}
        </h3>
        <span className='light-text'>Following</span>
      </Stack>
      <FollowButton 
        followContext={followContext}
        followedByUser={followedByUser} 
        followToggleURL={followToggleURL}/>
    </Stack>
  )
}
