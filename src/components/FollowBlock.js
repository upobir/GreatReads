import React from 'react'
import { useState } from 'react'
import { Stack } from 'react-bootstrap'
import { FollowButton } from './FollowButton'
export const FollowBlock = ({followContext,followedByUser, followToggleURL, vertical,className}) => {
  const [followCount, setFollowCount] = useState(followContext?followContext.followerCount:0)
  const handleFollowToggle = (isFollowing) => { 
    if (followContext) {
      if (!followedByUser && isFollowing) {
        setFollowCount(followContext.followCount + 1);
      } else if (followedByUser && !isFollowing) {
        setFollowCount(followContext.followCount - 1);
      }
    }
  }
  return (
    <Stack direction={vertical? 'vertical':'horizontal'} gap={3} className={className?className:''}>
      <Stack className="follow-block">
        <h3 style={{ paddingTop: 0,
              paddingBottom: 0,
              marginBlockEnd:0,
              marginBlockStart:0  }}>
        {followCount}
        </h3>
        <span className='light-text'>Following</span>
      </Stack>
      <FollowButton 
        followContext={followContext}
        followedByUser={followedByUser} 
        followToggleURL={followToggleURL}
        followToggleCallback={handleFollowToggle}
        />
    </Stack>
  )
}
