import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import { Navigate } from 'react-router-dom';;
import 'react-quill/dist/quill.snow.css'

export const CreatePost = () => {
  const modules={
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };
  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]
  const [title,setTitle]=useState('')
  const [summary,setSummary]=useState('')
  const [content,setContent]=useState('')
  const [files,setFiles]=useState('');
  const [redirect,setRedirect]=useState(false);
  async function createNewPost(ev){
    const data=new FormData();
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    data.set('file',files[0]);
    ev.preventDefault();
    const response= await fetch('http://localhost:4000/post',{
      method:'POST',
      body:data,
      credentials:'include',
      
    })
    setTitle('');
    setSummary('');
    setContent('');
    setFiles('');
    if(response.ok){
      <Navigate to={'/posts'} />

    }
    
      
    
  }
 
  return (
    <>
        <form onSubmit={createNewPost}>
          <input type="title" placeholder='title' value={title} onChange={ev=>setTitle(ev.target.value)} ></input>
          <input type="summary" placeholder='This game is about....' value={summary} onChange={ev=>setSummary(ev.target.value)}></input>
          <input type="file" onChange={ev=>setFiles(ev.target.files)} ></input>
          <ReactQuill value={content} onChange={newValue=>setContent(newValue)} modules={modules} formats={formats}/>
          <button style={{marginTop:'5px'}}>Create Post</button>
        </form>
    </>
  )
}
