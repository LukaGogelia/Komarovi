import React from 'react'

const OldPostData = ({ content }) => {
    return (
        <div className="mt-30" dangerouslySetInnerHTML={{ __html: content }}></div>
    )
}

export default OldPostData