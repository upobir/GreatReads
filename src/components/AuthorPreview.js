import React from 'react'
import { Stack, Container, Row, Col, Image, Button } from 'react-bootstrap'
import 'holderjs'
import { authorFetchEndpoint } from '../endpoints'
import { FollowButton } from './FollowButton'
import { FollowBlock } from './FollowBlock'
import { authorFollowToggleEndpoint } from '../endpoints'
import {Spinner} from 'react-bootstrap'
export default function AuthorPreview({ author }) {
  return (
    <Stack className='author-preview' gap={0}>
        {author
        ? (
        <Container>
            <Row>
                <Col xs={4}>
                    <Image className='author-preview__image'/>
                </Col>
                <Col xs={8} className='__author-name-block'>
                    <div>About:</div>
                    <h3 className='primary-text'>{author?.name}</h3>
                </Col>
            </Row>
        </Container>)
        : <Container>
            <Spinner animation="border" variant="primary" />
        </Container>}
 
        <Container>
        {author &&
            <Row>
                <Col xs = "auto">
                        <h3 style={{ paddingTop: 0,
                                     paddingBottom: 0,
                                     marginBlockEnd:0,
                                     marginBlockStart:0  }}>
                            {author?.followCount}
                        </h3>
                        <span className='light-text'>Following</span>
                </Col>
                <Col>
                         (<FollowButton followContext={author} followToggleURL={authorFollowToggleEndpoint(author.id)}/>)
                </Col>
            </Row>
        }
        </Container>
        <Container>
            {author?.description}
        </Container>
    </Stack>
  )
}
