import React from 'react'
import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import Body from './components/Body.jsx'
import Login from './components/Login.jsx'
import Profile from './components/Profile.jsx'
import Feed from './components/Feed.jsx'
import Footer from './components/Footer.jsx'
import { Provider } from 'react-redux'
import appStore from './utils/appStore.jsx'
import Connections from './components/Connections.jsx'
import Requests from './components/Requests.jsx'

const App = () => {
  return (
    <div>
      <Provider store={appStore}>
      <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<Body/>}>
         <Route index element={<Feed />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/connections" element={<Connections/>}/>
        <Route path="/requests" element={<Requests/>}/>
        <Route path="*" element={<h1 className='text-center mt-10 text-3xl font-bold'>404 Not Found</h1>}/>
        </Route>
        <Route path="*" element={<Footer/>}>
        
        </Route>
      </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
