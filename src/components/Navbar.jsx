import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { removeUser } from '../utils/userSlice.js.jsx';
import { BASE_URL } from '../utils/constants.js';

const Navbar = () => {
  const currentUser = useSelector((store) => store.user.currentUser);
  const dispatch = useDispatch();
  console.log(currentUser);
  const handleLogout = () => {
    axios.delete(BASE_URL + '/logout', { withCredentials: true })
    .then((res) => {
      console.log(res.data);
      dispatch(removeUser());
    })
    .catch((err) => {
      console.error(err);
    });
  }
  return (
    <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">👫JustFriend</a>
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
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
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
        <a className="justify-between">
          Profile
          <span className="badge badge-primary badge-sm">New</span>
        </a>
      </li>
      <li><a>Settings</a></li>
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
