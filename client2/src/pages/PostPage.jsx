import { format, formatISO9075 } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const PostPage = () => {
    const { id } = useParams();
    const [postInfo, setPostInfo] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo);
            })
        });
    }, []);
    if (!postInfo) return ``;
    return (
        <div className='post-page'>
            <h1 style={{color:'black'}}>{postInfo.title}</h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className='author'>By @{postInfo.author.username}</div>

            <div className='post-img'>
                <img src={`http://localhost:4000/${postInfo.cover}`} alt="cover"></img>
            </div>
            <div className='post-content'>
                <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
            </div>
        </div>
    )
}
