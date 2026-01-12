import React, { useEffect } from 'react'
import Navbar from './Navbar.jsx'
import {  Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer.jsx'
import { BASE_URL } from '../utils/constants.jsx'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice.jsx'
import axios from 'axios';
import Profile from './Profile.jsx'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser=async()=>{
    try{
      const res = await axios.get(BASE_URL + '/profile/view', { withCredentials: true });
      // console.log(res.data);
      dispatch(addUser(res.data));  
    }
    catch(err){
      navigate('/login');
      console.error(err);
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <Navbar/>
     
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body
