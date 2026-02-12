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
      .then(() => {
        // console.log(res.data);
        dispatch(removeUser());
        navigate('/login');
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <div className="navbar bg-base-100/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-base-300">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold">
          👫 CampusVerse
        </Link>
      </div>

      {currentUser && (
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li><Link to="/feed" className="font-medium hover:text-primary transition-colors">Feed</Link></li>
            <li><Link to="/connections" className="font-medium hover:text-primary transition-colors">Connections</Link></li>
            <li><Link to="/requests" className="font-medium hover:text-primary transition-colors">Requests</Link></li>
            <li><Link to="/premium" className="font-medium hover:text-primary transition-colors">Premium</Link></li>

          </ul>
        </div>
      )}

      <div className="navbar-end gap-2">
        {currentUser ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar border border-base-300 hover:border-primary transition-all">
              <div className="w-10 rounded-full">
                <img alt="User avatar" src={currentUser.photoUrl} />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-200">
              <li className="menu-title px-4 py-2 border-b border-base-200 mb-2">
                <span className="text-xs opacity-50">Signed in as</span>
                <span className="font-bold text-primary truncate block w-full">{currentUser.name}</span>
              </li>
              <li><Link to="/profile">Profile <span className="badge badge-primary badge-xs">New</span></Link></li>
              <div className="divider my-1"></div>
              {/* Mobile links shown in dropdown only */}
              <li className="lg:hidden"><Link to="/feed">Feed</Link></li>
              <li className="lg:hidden"><Link to="/connections">Connections</Link></li>
              <li className="lg:hidden"><Link to="/requests">Requests</Link></li>
              <div className="lg:hidden divider my-1"></div>
              <li><button onClick={handleLogout} className="text-error hover:bg-error/10">Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
