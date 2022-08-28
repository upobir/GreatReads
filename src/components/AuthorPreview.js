import React from 'react'
import { Stack, Container, Row, Col, Image, Button } from 'react-bootstrap'
import 'holderjs'
import { authorFetchEndpoint } from '../endpoints'
import { Link } from 'react-router-dom'
import { FollowButton } from './FollowButton'
import { FollowBlock } from './FollowBlock'
import { authorFollowToggleEndpoint } from '../endpoints'
import {Spinner} from 'react-bootstrap'
import { PlaceholderMiniBlockWrapper,PlaceholderParagraphWrapper } from './PlaceholderBlockWrapper'
import { authorDetailsURL } from '../urls'
export default function AuthorPreview({ author }) {
  return (
    <Stack className='author-preview' gap={0}>
        <Container>
            <Row>
                <Col xs={4}>
                    <Image fluid src={author?.picture_url} className='author-preview__image'/>
                </Col>

                <Col xs={8} className='author-preview__name-block'>
                    <PlaceholderMiniBlockWrapper Component={ <>
                        <div>About:</div>
                        <Link  to={authorDetailsURL(author?.id)} className='primary-text author-preview__name-block__name'>{author?.name}</Link>
                    </>
                    }
                    isLoading={author==null}
                    cols={6}
                    />
            </Col>
            </Row>
        </Container>
        <Container>
        {author &&(
            <FollowBlock 
                followContext={author} 
                followedByUser={author.isFollowedByUser}
                followToggleURL={authorFollowToggleEndpoint(author.id)}
            
                     />
            // <Row>
            //     <Col xs = "auto">
            //             <h3 style={{ paddingTop: 0,
            //                          paddingBottom: 0,
            //                          marginBlockEnd:0,
            //                          marginBlockStart:0  }}>
            //                 {author.followCount}
            //             </h3>
            //             <span className='light-text'>Following</span>
            //     </Col>
            //     <Col>
            //         <FollowButton 
            //             followContext={author} 
            //             followedByUser={author?.followedByUser} followToggleURL={authorFollowToggleEndpoint(author.id)}/>
            //     </Col>
            // </Row>
        )
        }
        </Container>
        <Container>
        <PlaceholderParagraphWrapper Component={author?.description} isLoading={author==null}/>
            
        </Container>
    </Stack>
  )
}
