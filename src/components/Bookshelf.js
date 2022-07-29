import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import useAxios from "../utils/useAxios";   // fo
import { MakeHorizontalTabBar } from './CustomTabs';

const tabs = [
  {
    tabTitle:"Want To Read",
    tabLink:"/WantToRead",
    tabKey:"genre",
    tabContentElement: ""
  },
  {
    tabTitle:"Reading",
    tabLink:"/Reading",
    tabKey:"genre",
    tabContentElement: ""
  },
  {
    tabTitle:"Read",
    tabLink:"/Read",
    tabKey:"genre",
    tabContentElement: ""
  },
  {
    tabTitle:"Reviewed",
    tabLink:"/Reviewed",
    tabKey:"genre",
    tabContentElement: ""
  },
]
const bookshelfGallary = () => {
  
}
export const Bookshelf = () => {
  const {user} = useContext(AuthContext)
  console.log('user', user)
  const [readBooks, setReadBooks] = useState([])
  return (
    <>
      {/* <MakeHorizontalTabBar tabs={tabs} /> */}
      <Routes>
        {/* {
          (book?.series) && <Route path="/series" element={<SeriesView book={book} series={series} />} />
        }
        <Route path="/WantToRead" element={<BookReview bookID={id} />}></Route>
        <Route path="/Read" element={<SimilarBooksView similarBooks={_similar_books} />} />
        <Route path="/Reading" element={<SimilarBooksView similarBooks={_similar_books} />} />
        <Route path="/Reviewed" element={<BookReviews bookID={id} />} />
        <Route path="" element={<BookReviews book={book} />} /> */}

      </Routes>       
    </>
  )
}

