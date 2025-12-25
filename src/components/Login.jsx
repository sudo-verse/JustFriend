import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.jsx';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants.jsx';

const Login = () => {
  const [email, setEmail] = useState("dev@gmail.com");
  const [password, setPassword] = useState("DevPass123!");
  const dispatch  = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    try{
      const res =await axios.post(BASE_URL + '/login', {
        email,
        password
      },
    { withCredentials: true })
    console.log(res.data);
    dispatch(addUser(res.data) );
    navigate('/');
    }catch(err){
      console.error(err)
    }
  }
  return (
    <div className='flex justify-center'>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mt-10">
  <legend className="fieldset-legend ">Login</legend>

  <label className="label">Email</label>
  <input type="email" className="input"  placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

  <label className="label">Password</label>
  <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

  <button className="btn btn-neutral mt-4" onClick={handleSubmit}>Login</button>
</fieldset>
    </div>
  )
}

export default Login
