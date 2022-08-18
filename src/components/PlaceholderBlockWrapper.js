import React from 'react'
import { Placeholder } from 'react-bootstrap'
export  function PlaceholderMiniBlockWrapper({Component, isLoading, cols}) {
    if(isLoading)
        return <Placeholder  animation="glow">
                    <Placeholder xs={cols?cols:12} size="lg" />
                    <Placeholder xs={cols?cols:12} size="lg" />
                    <Placeholder xs={cols?cols:12} size="lg" />
                </Placeholder>
    else
        return Component
}

export  function PlaceholderParagraphWrapper({Component, isLoading}) {
    if(isLoading)
        return <Placeholder  animation="glow">
                    <Placeholder xs={12} size="lg" />
                    <Placeholder xs={12} size="lg" />
                    <Placeholder xs={12} size="lg" />
                    <Placeholder xs={4} size="lg" />
                </Placeholder>
    else
        return Component
}

