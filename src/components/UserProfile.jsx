import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constants.jsx'
import {
    ArrowLeft, Heart, X, MessageCircle, Check, Clock,
    UserX, UserCheck, Shield, MapPin
} from 'lucide-react'

const UserProfile = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [actionLoading, setActionLoading] = useState(false)
    const [actionDone, setActionDone] = useState(null) // 'interested' | 'ignored'

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${BASE_URL}/user/profile/${id}`, {
                    withCredentials: true,
                })
                setUser(res.data.data)
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load profile')
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [id])

    const handleAction = async (type) => {
        try {
            setActionLoading(true)
            await axios.post(
                `${BASE_URL}/request/send/${type}/${user._id}`,
                null,
                { withCredentials: true }
            )
            setActionDone(type)
            // Update local state
            setUser(prev => ({
                ...prev,
                connectionStatus: type === 'interested' ? 'request_sent' : 'ignored'
            }))
        } catch (err) {
            const msg = err.response?.data || err.message
            // If request already exists, update status accordingly
            if (typeof msg === 'string' && msg.includes('already exists')) {
                setUser(prev => ({ ...prev, connectionStatus: 'request_sent' }))
            }
            console.error(err)
        } finally {
            setActionLoading(false)
        }
    }

    const handleReview = async (status) => {
        // For accepting/rejecting received requests — needs request ID
        // This is handled on the Requests page, so navigate there
        navigate('/requests')
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="text-base-content/50 text-sm">Loading profile...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
                <UserX size={48} className="text-error/40" />
                <h2 className="text-xl font-bold text-base-content/80">{error}</h2>
                <button onClick={() => navigate(-1)} className="btn btn-primary btn-sm">
                    <ArrowLeft size={16} /> Go Back
                </button>
            </div>
        )
    }

    const { connectionStatus } = user

    return (
        <div className="min-h-[80vh] max-w-4xl mx-auto px-4 py-8">
            {/* Back button */}
            <button
                onClick={() => navigate(-1)}
                className="btn btn-ghost btn-sm gap-2 mb-6 text-base-content/60 hover:text-primary"
            >
                <ArrowLeft size={16} /> Back
            </button>

            <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-300">
                {/* Hero Section with Photo */}
                <div className="relative h-72 sm:h-96 bg-gradient-to-br from-primary/20 via-secondary/10 to-base-200">
                    {user.photoUrl ? (
                        <img
                            src={user.photoUrl}
                            alt={user.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-8xl font-bold text-primary/20">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    )}
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent" />

                    {/* Name overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg">
                            {user.name}
                        </h1>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="badge badge-lg bg-white/10 backdrop-blur-sm border-white/20 text-white uppercase tracking-wider text-xs font-medium">
                                {user.gender}
                            </span>
                            {connectionStatus === 'accepted' && (
                                <span className="badge badge-lg badge-success gap-1 text-xs">
                                    <UserCheck size={12} /> Connected
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Profile Info */}
                <div className="p-6 sm:p-8 space-y-6">
                    {/* About */}
                    <div>
                        <h3 className="text-sm font-semibold text-base-content/40 uppercase tracking-wider mb-2">
                            About
                        </h3>
                        <p className="text-base-content/80 leading-relaxed text-lg">
                            {user.about || 'No bio available.'}
                        </p>
                    </div>

                    {/* Membership */}
                    {user.membershipType && (
                        <div className="flex items-center gap-2">
                            <Shield size={16} className="text-warning" />
                            <span className="text-sm font-medium text-warning">
                                {user.membershipType} Member
                            </span>
                        </div>
                    )}

                    <div className="divider"></div>

                    {/* Action Area */}
                    <div className="flex flex-col items-center gap-4">
                        {/* Status: No interaction yet → Show buttons */}
                        {connectionStatus === 'none' && !actionDone && (
                            <>
                                <p className="text-sm text-base-content/50 mb-2">
                                    Would you like to connect with {user.name}?
                                </p>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleAction('ignored')}
                                        disabled={actionLoading}
                                        className="btn btn-lg btn-outline btn-error gap-2 rounded-2xl px-8 min-w-[140px]
                             hover:shadow-lg hover:shadow-error/20 transition-all"
                                    >
                                        {actionLoading ? (
                                            <span className="loading loading-spinner loading-sm"></span>
                                        ) : (
                                            <X size={22} />
                                        )}
                                        Pass
                                    </button>
                                    <button
                                        onClick={() => handleAction('interested')}
                                        disabled={actionLoading}
                                        className="btn btn-lg btn-primary gap-2 rounded-2xl px-8 min-w-[140px]
                             shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
                                    >
                                        {actionLoading ? (
                                            <span className="loading loading-spinner loading-sm"></span>
                                        ) : (
                                            <Heart size={22} />
                                        )}
                                        Interested
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Status: Action just taken */}
                        {actionDone === 'interested' && (
                            <div className="flex flex-col items-center gap-3 py-4">
                                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center animate-bounce-once">
                                    <Heart size={32} className="text-success fill-success" />
                                </div>
                                <h3 className="text-xl font-bold text-success">Interest Sent! 🎉</h3>
                                <p className="text-sm text-base-content/50 text-center max-w-xs">
                                    We'll notify {user.name} about your request. If they're interested too, you'll be connected!
                                </p>
                            </div>
                        )}

                        {actionDone === 'ignored' && (
                            <div className="flex flex-col items-center gap-3 py-4">
                                <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center">
                                    <X size={32} className="text-base-content/40" />
                                </div>
                                <h3 className="text-lg font-semibold text-base-content/60">Passed</h3>
                                <p className="text-sm text-base-content/40">You passed on this profile.</p>
                            </div>
                        )}

                        {/* Status: Already sent request */}
                        {connectionStatus === 'request_sent' && !actionDone && (
                            <div className="flex flex-col items-center gap-3 py-4">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Clock size={32} className="text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold text-primary">Request Pending</h3>
                                <p className="text-sm text-base-content/50 text-center max-w-xs">
                                    You've already sent a connection request to {user.name}. Waiting for their response.
                                </p>
                            </div>
                        )}

                        {/* Status: They sent me a request */}
                        {connectionStatus === 'request_received' && (
                            <div className="flex flex-col items-center gap-3 py-4">
                                <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center">
                                    <Heart size={32} className="text-warning fill-warning" />
                                </div>
                                <h3 className="text-lg font-semibold text-warning">
                                    {user.name} is interested in you!
                                </h3>
                                <p className="text-sm text-base-content/50 mb-2">
                                    Head to your Requests page to accept or decline.
                                </p>
                                <button
                                    onClick={handleReview}
                                    className="btn btn-warning btn-sm gap-2"
                                >
                                    <Check size={16} /> View Requests
                                </button>
                            </div>
                        )}

                        {/* Status: Already connected */}
                        {connectionStatus === 'accepted' && (
                            <div className="flex flex-col items-center gap-3 py-4">
                                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                                    <UserCheck size={32} className="text-success" />
                                </div>
                                <h3 className="text-lg font-semibold text-success">You're Connected! ✨</h3>
                                <p className="text-sm text-base-content/50 text-center max-w-xs">
                                    You and {user.name} are already friends. Start a conversation!
                                </p>
                                <Link
                                    to={`/chat/${user._id}`}
                                    className="btn btn-success btn-sm gap-2 mt-1"
                                >
                                    <MessageCircle size={16} /> Open Chat
                                </Link>
                            </div>
                        )}

                        {/* Status: Previously ignored */}
                        {connectionStatus === 'ignored' && !actionDone && (
                            <div className="flex flex-col items-center gap-3 py-4">
                                <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center">
                                    <X size={32} className="text-base-content/30" />
                                </div>
                                <h3 className="text-lg font-semibold text-base-content/50">Previously Passed</h3>
                                <p className="text-sm text-base-content/40 text-center max-w-xs">
                                    You or {user.name} previously passed on this connection.
                                </p>
                            </div>
                        )}

                        {/* Status: Rejected */}
                        {connectionStatus === 'rejected' && (
                            <div className="flex flex-col items-center gap-3 py-4">
                                <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center">
                                    <UserX size={32} className="text-error/50" />
                                </div>
                                <h3 className="text-lg font-semibold text-base-content/50">Request Declined</h3>
                                <p className="text-sm text-base-content/40 text-center max-w-xs">
                                    This connection request was previously declined.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
