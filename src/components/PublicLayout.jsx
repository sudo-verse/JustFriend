import React, { useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice.jsx'
import { BASE_URL } from '../utils/constants.jsx'
import axios from 'axios'
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react'

const PublicNavbar = () => {
    const location = useLocation()
    const user = useSelector((state) => state.user.currentUser)

    const navLinks = [
        { path: '/how-it-works', label: 'How It Works' },
        { path: '/features', label: 'Features' },
        { path: '/about', label: 'About' },
    ]

    return (
        <nav className="navbar bg-base-100/80 backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b border-base-300/50">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold tracking-tight">
                    👫 CampusVerse
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-1">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`font-medium transition-colors rounded-lg ${location.pathname === link.path
                                        ? 'text-primary bg-primary/10'
                                        : 'hover:text-primary'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="navbar-end gap-2">
                {user ? (
                    <>
                        <Link to="/feed" className="btn btn-primary btn-sm shadow-lg shadow-primary/20 group">
                            Go to Feed
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        {user.photoUrl && (
                            <Link to="/profile" className="avatar">
                                <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                                    <img src={user.photoUrl} alt={user.name} />
                                </div>
                            </Link>
                        )}
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-ghost btn-sm font-medium">
                            Login
                        </Link>
                        <Link to="/login" className="btn btn-primary btn-sm shadow-lg shadow-primary/20">
                            Sign Up Free
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}

const PublicFooter = () => {
    return (
        <footer className="bg-base-200 border-t border-base-300">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            👫 CampusVerse
                        </Link>
                        <p className="mt-3 text-sm text-base-content/60 leading-relaxed">
                            India's #1 campus social network. Connect with college students, chat in real-time, and build meaningful relationships.
                        </p>
                    </div>

                    {/* Platform */}
                    <div>
                        <h4 className="font-semibold text-base-content mb-3 text-sm uppercase tracking-wider opacity-70">Platform</h4>
                        <ul className="space-y-2">
                            <li><Link to="/features" className="text-sm text-base-content/70 hover:text-primary transition-colors">Features</Link></li>
                            <li><Link to="/how-it-works" className="text-sm text-base-content/70 hover:text-primary transition-colors">How It Works</Link></li>
                            <li><Link to="/premium" className="text-sm text-base-content/70 hover:text-primary transition-colors">Premium Plans</Link></li>
                            <li><Link to="/login" className="text-sm text-base-content/70 hover:text-primary transition-colors">Sign Up Free</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold text-base-content mb-3 text-sm uppercase tracking-wider opacity-70">Company</h4>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="text-sm text-base-content/70 hover:text-primary transition-colors">About Us</Link></li>
                            <li><a href="mailto:ashishkrgupta.hajipur@gmail.com" className="text-sm text-base-content/70 hover:text-primary transition-colors">Contact</a></li>
                            <li><a href="https://github.com/sudo-verse/" target="_blank" rel="noopener noreferrer" className="text-sm text-base-content/70 hover:text-primary transition-colors">Open Source</a></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="font-semibold text-base-content mb-3 text-sm uppercase tracking-wider opacity-70">Connect</h4>
                        <div className="flex gap-3">
                            <a href="https://github.com/sudo-verse/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm btn-circle text-base-content/60 hover:text-primary">
                                <Github size={18} />
                            </a>
                            <a href="https://www.linkedin.com/in/devashish-verse" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm btn-circle text-base-content/60 hover:text-primary">
                                <Linkedin size={18} />
                            </a>
                            <a href="mailto:ashishkrgupta.hajipur@gmail.com" className="btn btn-ghost btn-sm btn-circle text-base-content/60 hover:text-primary">
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="divider my-6 opacity-30"></div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-base-content/50">
                    <p>© {new Date().getFullYear()} CampusVerse by Sudoverse. All rights reserved.</p>
                    <p>Made with 💜 for college students across India</p>
                </div>
            </div>
        </footer>
    )
}

const PublicLayout = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.currentUser)

    // Silently check if user is already logged in (has valid session cookie)
    useEffect(() => {
        if (!user) {
            axios.get(BASE_URL + '/profile/view', { withCredentials: true })
                .then((res) => dispatch(addUser(res.data)))
                .catch(() => { }) // Not logged in — that's fine, stay on public page
        }
    }, [dispatch, user])

    return (
        <div className="flex flex-col min-h-screen">
            <PublicNavbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <PublicFooter />
        </div>
    )
}

export default PublicLayout
