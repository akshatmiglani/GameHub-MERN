import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'
import { Route, Routes } from "react-router-dom"
import { Post } from './Post.jsx'
import { Header } from './Header.jsx'
import Layout from './Layout.jsx'
import { IndexPage } from './pages/IndexPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { CreatePost } from './pages/CreatePost.jsx'
import { UserContextProvider } from './UserContext.jsx'
import GamePage from './pages/GamePage.jsx'
import { PostPage } from './pages/PostPage.jsx'

function App() {


  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<GamePage />}/>
            <Route path='/posts' element={<IndexPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
          </Route>
        </Routes>
      </UserContextProvider>

    </>
  )
}

export default App
