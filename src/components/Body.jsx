import React, { useEffect } from 'react'
import Navbar from './Navbar.jsx'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import Footer from './Footer.jsx'
import { BASE_URL } from '../utils/constants.jsx'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice.jsx'
import axios from 'axios';
import Profile from './Profile.jsx'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isChatPage = location.pathname.startsWith('/chat');
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(BASE_URL + '/profile/view', { withCredentials: true });
        // console.log(res.data);
        dispatch(addUser(res.data));
      }
      catch (err) {
        navigate('/login');
        console.error(err);
      }
    }
    fetchUser();
  }, [dispatch, navigate]);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow">
        <Outlet />
      </div>
      {!isChatPage && <Footer />}
    </div>
  )
}

export default Body
