import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { removeUser } from '../utils/userSlice.jsx';
import { BASE_URL } from '../utils/constants.jsx';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SearchUsers from './SearchUsers.jsx';
import { Menu, X, Home, Users, UserPlus, Crown, User, LogOut, Search, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const currentUser = useSelector((store) => store.user.currentUser);
  const requests = useSelector((state) => state.requests);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('cv-theme') || 'dark');

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cv-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    axios.delete(BASE_URL + '/logout', { withCredentials: true })
      .then(() => {
        dispatch(removeUser());
        navigate('/login');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const requestCount = requests?.length || 0;

  const navLinks = [
    { to: '/feed', label: 'Feed', icon: Home },
    { to: '/connections', label: 'Connections', icon: Users },
    { to: '/requests', label: 'Requests', icon: UserPlus, badge: requestCount },
    { to: '/premium', label: 'Premium', icon: Crown },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="navbar bg-base-100/95 backdrop-blur-xl shadow-md sticky top-0 z-50 border-b border-base-300/50 px-3 lg:px-6">

        {/* ── LEFT: Logo + Mobile Menu Toggle ── */}
        <div className="navbar-start gap-1">
          {currentUser && (
            <button
              onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setMobileSearchOpen(false); }}
              className="btn btn-ghost btn-sm btn-square lg:hidden"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
          <Link to="/" className="btn btn-ghost text-lg px-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold tracking-tight">
            👫 CampusVerse
          </Link>
        </div>

        {/* ── CENTER: Desktop nav links ── */}
        {currentUser && (
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-1 px-0">
              {navLinks.map(({ to, label, badge }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={`font-medium text-sm transition-colors rounded-lg px-3 py-2 relative ${isActive(to) ? 'text-primary bg-primary/10' : 'hover:text-primary'
                      }`}
                  >
                    {label}
                    {badge > 0 && (
                      <span className="absolute -top-1 -right-1 badge badge-error badge-xs text-[10px] min-w-[18px] h-[18px] font-bold animate-pulse">
                        {badge > 9 ? '9+' : badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── RIGHT: Search + Theme + Avatar ── */}
        <div className="navbar-end gap-1.5">
          {currentUser ? (
            <>
              {/* Desktop search */}
              <div className="hidden lg:block">
                <SearchUsers />
              </div>

              {/* Mobile search toggle */}
              <button
                onClick={() => { setMobileSearchOpen(!mobileSearchOpen); setMobileMenuOpen(false); }}
                className="btn btn-ghost btn-sm btn-square lg:hidden"
                aria-label="Search"
              >
                <Search size={18} className={mobileSearchOpen ? 'text-primary' : ''} />
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="btn btn-ghost btn-sm btn-square"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </button>

              {/* Avatar dropdown */}
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar border border-base-300 hover:border-primary transition-all">
                  <div className="w-9 rounded-full">
                    <img alt="User avatar" src={currentUser.photoUrl} />
                  </div>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-56 border border-base-200">
                  <li className="px-4 py-3 border-b border-base-200 mb-1">
                    <div className="flex flex-col gap-0.5 hover:bg-transparent cursor-default active:!bg-transparent">
                      <span className="text-xs opacity-50">Signed in as</span>
                      <span className="font-bold text-primary truncate">{currentUser.name}</span>
                    </div>
                  </li>
                  <li>
                    <Link to="/profile" className="gap-3">
                      <User size={15} />
                      Profile
                    </Link>
                  </li>
                  <div className="divider my-1 px-3"></div>
                  <li>
                    <button onClick={handleLogout} className="text-error hover:bg-error/10 gap-3">
                      <LogOut size={15} />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="btn btn-ghost btn-sm btn-square"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </button>
              <Link to="/login" className="btn btn-primary btn-sm shadow-md shadow-primary/20">Login</Link>
            </div>
          )}
        </div>
      </div>

      {/* ── MOBILE SEARCH BAR (slides down below navbar) ── */}
      {currentUser && mobileSearchOpen && (
        <div className="lg:hidden sticky top-[65px] z-40 bg-base-100 border-b border-base-300/50 px-4 py-3 shadow-sm animate-slide-down">
          <SearchUsers />
        </div>
      )}

      {/* ── MOBILE NAV MENU (slides down below navbar) ── */}
      {currentUser && mobileMenuOpen && (
        <div className="lg:hidden sticky top-[65px] z-40 bg-base-100 border-b border-base-300 shadow-lg animate-slide-down">
          <ul className="menu menu-sm py-2 px-3 gap-0.5">
            {navLinks.map(({ to, label, icon: Icon, badge }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-medium gap-3 py-3 rounded-xl transition-colors ${isActive(to) ? 'text-primary bg-primary/5' : 'hover:bg-primary/5 hover:text-primary'
                    }`}
                >
                  <Icon size={18} />
                  {label}
                  {badge > 0 && (
                    <span className="badge badge-error badge-sm ml-auto">{badge}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default Navbar
