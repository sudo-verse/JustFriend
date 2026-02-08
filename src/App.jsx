import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Body from './components/Body.jsx'
import Login from './components/Login.jsx'
import Profile from './components/Profile.jsx'
import Feed from './components/Feed.jsx'
import Footer from './components/Footer.jsx'
import { Provider } from 'react-redux'
import appStore from './utils/appStore.jsx'
import Connections from './components/Connections.jsx'
import Requests from './components/Requests.jsx'
import Premium from './components/Premium.jsx'
import Chat from './components/Chat.jsx'


const App = () => {
  return (
    <div>
      <Provider store={appStore}>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/chat/:id" element={<Chat />} />
              <Route path="*" element={
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                  <span className="text-9xl mb-4">🤔</span>
                  <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4">404</h1>
                  <p className="text-xl font-medium opacity-70">Oops! Looks like you're lost.</p>
                  <a href="/feed" className="btn btn-primary mt-8">Go Home</a>
                </div>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
