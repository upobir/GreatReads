import React from 'react'
import {Spinner} from 'react-bootstrap';

export const SpinnerWrapper = ({Component, isLoading}) => {
    if(isLoading)
        return <Spinner animation="border" variant="primary" />
    else
        return Component
}
export const SimpleSpinner = ()=> <Spinner animation="border" variant="primary" />
