import React, { useState } from 'react'
import useAxios from '../utils/useAxios'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useEffect } from 'react'
import { reviewLikeToggleEndpoint } from '../endpoints'
import { Button } from 'react-bootstrap'
import { FaThumbsUp, FaComment} from 'react-icons/fa'

/** 
 * requires state to be responsive as well as a post request so separate file
 * @param {*} param0 
 * @returns 
 */
export default function BookReviewLikeButton({review}) {
    const api = useAxios()
    const {user}= useContext(AuthContext)
    const [liked, setLiked] = useState(review?review.liked: false)
    useEffect(()=>{
      setLiked(review?.liked)  
    }, [review])
                
    const handleLikeToggle =(e) => {
        e.preventDefault()
        console.log('toggling like', liked)
        setLiked(!liked)
        api()
        .post(reviewLikeToggleEndpoint(review.id),{})
        .then((response)=>console.log('review toggle response', response))
        .catch((err)=>{console.log('review toggle err', err)})
    }
    return (
        <Button 
            variant="outline-primary"
            active={liked}
            onClick={handleLikeToggle}
            >
            <FaThumbsUp /> {review?.likes} likes
        </Button>
    )
}
