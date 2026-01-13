import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { removeUser } from '../utils/userSlice.jsx';
import { BASE_URL } from '../utils/constants.jsx';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const currentUser = useSelector((store) => store.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(currentUser);
  const handleLogout = () => {
    axios.delete(BASE_URL + '/logout', { withCredentials: true })
    .then((res) => {
      // console.log(res.data);
      dispatch(removeUser());
      navigate('/login');
    })
    .catch((err) => {
      console.error(err);
    });
  }
  return (
    <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
      <Link to="/feed" className="btn btn-ghost text-xl">
  👫 JustFriend
</Link>
    </div>
  <div className="flex-none">
    
    {currentUser && (
  <div className="dropdown dropdown-end mx-4">
    {/* Trigger */}
    <label tabIndex={0} className="flex items-center gap-3 cursor-pointer">
      <p className="text-sm font-medium">
        Welcome <span className="font-semibold">{currentUser.name}</span>
      </p>

      <div className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User avatar"
            src={currentUser.photoUrl}
          />
        </div>
      </div>
    </label>

    {/* Dropdown Menu */}
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow z-[100]"
    >
      <li>
        <Link to="/profile" className="justify-between">
          Profile
          <span className="badge badge-primary badge-sm">New</span>
        </Link>
      </li>
      <li><Link to="/connections" className="justify-between">
          Connections
        </Link></li>
        <li><Link to="/requests" className="justify-between">
          Requests
        </Link></li>
      <li>
        <a onClick={handleLogout} className="text-error">
          Logout
        </a>
      </li>
    </ul>
  </div>
)}

  </div>
</div>
  )
}

export default Navbar
