import React from 'react'
import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import Body from './components/Body.jsx'
import Login from './components/Login.jsx'
import Profile from './components/Profile.jsx'
import Footer from './components/Footer.jsx'
import { Provider } from 'react-redux'
import appStore from './utils/appStore.jsx'

const App = () => {
  return (
    <div>
      <Provider store={appStore}>
      <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<Body/>}>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        
        </Route>
      </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
