import React, { useState, useEffect, useRef } from 'react'
import { Search, X, User } from 'lucide-react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants.jsx'
import { useNavigate } from 'react-router-dom'

const SearchUsers = () => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [focused, setFocused] = useState(false)
    const searchRef = useRef(null)
    const debounceRef = useRef(null)
    const navigate = useNavigate()

    // Debounced search
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current)

        if (query.trim().length < 2) {
            setResults([])
            setIsOpen(false)
            return
        }

        setLoading(true)
        debounceRef.current = setTimeout(async () => {
            try {
                const res = await axios.get(`${BASE_URL}/user/search`, {
                    params: { query: query.trim() },
                    withCredentials: true,
                })
                setResults(res.data.data || [])
                setIsOpen(true)
            } catch (err) {
                console.error('Search failed:', err)
                setResults([])
            } finally {
                setLoading(false)
            }
        }, 300)

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current)
        }
    }, [query])

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setIsOpen(false)
                setFocused(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Close on Escape
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                setIsOpen(false)
                setQuery('')
            }
        }
        document.addEventListener('keydown', handleEsc)
        return () => document.removeEventListener('keydown', handleEsc)
    }, [])

    const handleSelectUser = (user) => {
        setIsOpen(false)
        setQuery('')
        navigate(`/user/${user._id}`)
    }

    const clearSearch = () => {
        setQuery('')
        setResults([])
        setIsOpen(false)
    }

    return (
        <div ref={searchRef} className="relative w-full max-w-sm">
            {/* Search Input */}
            <div className={`flex items-center gap-2 bg-base-200/60 rounded-xl border transition-all duration-200 px-3 py-1.5 ${focused ? 'border-primary/50 bg-base-200 shadow-sm shadow-primary/10' : 'border-transparent hover:border-base-300'
                }`}>
                <Search size={16} className={`shrink-0 transition-colors ${focused ? 'text-primary' : 'text-base-content/40'}`} />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                        setFocused(true)
                        if (results.length > 0) setIsOpen(true)
                    }}
                    placeholder="Search students..."
                    className="bg-transparent outline-none text-sm w-full placeholder:text-base-content/40 text-base-content"
                    id="search-users-input"
                />
                {loading && (
                    <span className="loading loading-spinner loading-xs text-primary shrink-0"></span>
                )}
                {query && !loading && (
                    <button onClick={clearSearch} className="btn btn-ghost btn-xs btn-circle shrink-0">
                        <X size={14} />
                    </button>
                )}
            </div>

            {/* Results Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-base-100 rounded-xl border border-base-300 shadow-xl z-50 overflow-hidden animate-slide-down">
                    {results.length > 0 ? (
                        <ul className="py-1 max-h-80 overflow-y-auto">
                            {results.map((user) => (
                                <li key={user._id}>
                                    <button
                                        onClick={() => handleSelectUser(user)}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-base-200/80 transition-colors text-left group"
                                    >
                                        {/* Avatar */}
                                        <div className="avatar shrink-0">
                                            <div className="w-10 h-10 rounded-full ring-2 ring-base-300 group-hover:ring-primary transition-all">
                                                {user.photoUrl ? (
                                                    <img src={user.photoUrl} alt={user.name} loading="lazy" />
                                                ) : (
                                                    <div className="bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                                                        {user.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-sm text-base-content truncate">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-base-content/50 truncate">
                                                {user.about || 'No bio'}
                                            </p>
                                        </div>

                                        {/* View Profile arrow */}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-base-content/20 group-hover:text-primary transition-colors shrink-0">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="px-4 py-8 text-center">
                            <User size={24} className="mx-auto text-base-content/20 mb-2" />
                            <p className="text-sm text-base-content/50">No students found for "{query}"</p>
                            <p className="text-xs text-base-content/30 mt-1">Try a different name</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchUsers
