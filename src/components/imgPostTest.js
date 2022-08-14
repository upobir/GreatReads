import React from 'react'
import { Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import useAxios from '../utils/useAxios'
import { useState } from 'react'
export default function ImgPostTest () {
    const [img, setImg]= useState(null)
    const api = useAxios()
    const handleSubmit =() => { 
        if(img != null)
        {
            console.log('img', img)
            let fd = new FormData()
            fd.append('profilePicture', img, img.name)
            api()//since this url is  temporary it's not in endpoint.js
                .post("/api/imgPostTest/", fd)
                .then((response) => {
                    console.log('img post response', response)
                })
                .catch((err) => { console.log('img post err', err) })
        }
    }
    const handleImgUpload = (e)=>{
        if (e.target.files.length > 0) 
            setImg(e.target.files[0]);
        else
            setImg(null);
    }
    return (
      <Form>
          <Form.Group controlId="formFile" className="mb-3">
              <Form.Label >test post:</Form.Label>
              <Form.Control type="file" 
                onChange={handleImgUpload}
                accept=".png,.jpg,.jpeg,.webp" />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit}>
              Submit
          </Button>
      </Form>
  )
}
