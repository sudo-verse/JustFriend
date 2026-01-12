import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState ,useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

import Usercard from './UserCard';
const EditProfile = () => {
    const {currentUser} = useSelector((state) => state.user);
    
    const [name, setName] = useState(currentUser?.name || '');
    const [gender, setGender] = useState(currentUser?.gender || '');
    const [photoUrl, setPhotoUrl] = useState(currentUser?.photoUrl || '');
    const [about, setAbout] = useState(currentUser?.about || '');
    const dispatch = useDispatch();
const handleEdit = async(e) => { 
    try{
        const res=await axios.patch(BASE_URL+'/profile/edit',{
            name,
            gender,
            photoUrl,
            about
        },
        { withCredentials: true })
        dispatch(addUser(res.data) );
        
    }catch(err){
        console.error(err);
    }
}
useEffect(() => {
  if (currentUser) {
    setName(currentUser.name || '');
    setGender(currentUser.gender || '');
    setPhotoUrl(currentUser.photoUrl || '');
    setAbout(currentUser.about || '');
  }
}, [currentUser]);
if (!currentUser) {
  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}

  return (
<div className="hero bg-base-200 min-h-screen">
  <div className="px-4">
    <div className="flex flex-col lg:flex-row flex-nowrap items-start justify-center gap-12">

      {/* LEFT */}
      <div className="card bg-base-100 w-[380px] shadow-2xl">
        <div className="card-body">
          <h1 className="text-xl font-bold">Edit Profile</h1>

          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input className="input input-bordered" value={name} onChange={(e)=>setName(e.target.value)} />

            <label className="label">About</label>
            <input className="input input-bordered" value={about} onChange={(e)=>setAbout(e.target.value)} />

            <label className="label">Gender</label>
            <input className="input input-bordered" value={gender} onChange={(e)=>setGender(e.target.value)} />

            <label className="label">Photo URL</label>
            <input className="input input-bordered" value={photoUrl} onChange={(e)=>setPhotoUrl(e.target.value)} />

            <button className="btn btn-neutral mt-4" onClick={handleEdit}>
              Save Changes
            </button>
          </fieldset>
        </div>
      </div>

      {/* RIGHT */}
      
      <Usercard user={currentUser} />

    </div>
  </div>
</div>


  )
}

export default EditProfile
