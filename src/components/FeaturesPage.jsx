import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, MessageCircle, Video, Shield, Zap, Users, ArrowRight, Globe, Bell, Lock, Palette, Smartphone, Wifi } from 'lucide-react'

const FeaturesPage = () => {
    const features = [
        {
            icon: <Heart size={28} />,
            title: 'Smart Matching',
            description: 'Our intelligent feed shows you compatible students based on your campus and interests. Swipe right to show interest, left to pass. When both students match — a connection is born.',
            highlights: ['Campus-aware suggestions', 'Interest-based filtering', 'Mutual matching system'],
            color: 'text-pink-500',
            bg: 'bg-pink-500/10',
            border: 'border-pink-500/20',
        },
        {
            icon: <MessageCircle size={28} />,
            title: 'Real-Time Chat',
            description: 'Instant messaging powered by Socket.io. Send messages, share thoughts, and keep conversations flowing in real-time with zero latency.',
            highlights: ['Instant delivery', 'Online status indicators', 'Typing indicators'],
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
        },
        {
            icon: <Video size={28} />,
            title: 'Voice & Video Calls',
            description: 'Take your conversations further with high-quality voice and video calls. Built with WebRTC for peer-to-peer connections — no middleman, just you and your friend.',
            highlights: ['HD video quality', 'Peer-to-peer (WebRTC)', 'In-chat call button'],
            color: 'text-green-500',
            bg: 'bg-green-500/10',
            border: 'border-green-500/20',
        },
        {
            icon: <Shield size={28} />,
            title: 'Email Verification',
            description: 'Every account is verified via email. This ensures that only real students join the platform, keeping the community authentic and trustworthy.',
            highlights: ['Mandatory email verification', 'Secure token system', 'Spam-free environment'],
            color: 'text-purple-500',
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/20',
        },
        {
            icon: <Zap size={28} />,
            title: 'Profile Boosts',
            description: 'Premium members can boost their profile to appear more frequently in other students\' feeds. Get more visibility and connections faster.',
            highlights: ['5-10 boosts per day', 'Priority in feed', 'Premium exclusive'],
            color: 'text-yellow-500',
            bg: 'bg-yellow-500/10',
            border: 'border-yellow-500/20',
        },
        {
            icon: <Users size={28} />,
            title: 'Connection Requests',
            description: 'Send interest, accept or reject requests, and manage your growing network of campus friends. Full control over who you connect with.',
            highlights: ['Send & receive requests', 'Accept / Reject controls', 'Connection list management'],
            color: 'text-teal-500',
            bg: 'bg-teal-500/10',
            border: 'border-teal-500/20',
        },
        {
            icon: <Lock size={28} />,
            title: 'Secure Authentication',
            description: 'Industry-standard JWT authentication with bcrypt password hashing. Your data is encrypted and protected at every step.',
            highlights: ['JWT token auth', 'Bcrypt password hashing', 'Secure cookie handling'],
            color: 'text-red-500',
            bg: 'bg-red-500/10',
            border: 'border-red-500/20',
        },
        {
            icon: <Smartphone size={28} />,
            title: 'Mobile Responsive',
            description: 'CampusVerse works beautifully on any device — desktop, tablet, or phone. A fully responsive design that adapts to your screen.',
            highlights: ['Mobile-first design', 'Touch-friendly UI', 'Adaptive layouts'],
            color: 'text-indigo-500',
            bg: 'bg-indigo-500/10',
            border: 'border-indigo-500/20',
        },
        {
            icon: <Wifi size={28} />,
            title: 'Real-Time Online Status',
            description: 'See who\'s online right now. Green dots and real-time status updates make it easy to know the best time to reach out.',
            highlights: ['Live online indicators', 'Socket-based tracking', 'Instant status updates'],
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20',
        },
    ]

    return (
        <div className="bg-base-300">
            {/* Hero */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                        Features Built for{' '}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Students</span>
                    </h1>
                    <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
                        Every feature on CampusVerse is designed with college students in mind.
                        From smart matching to video calls — we've got everything you need to connect.
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-12 px-6 pb-24">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                className={`group p-6 rounded-2xl ${feature.bg} border ${feature.border} backdrop-blur-sm hover:scale-[1.02] transition-all duration-300`}
                            >
                                <div className={`w-14 h-14 rounded-xl bg-base-100/60 flex items-center justify-center mb-5 ${feature.color} group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-base-content">{feature.title}</h3>
                                <p className="text-sm text-base-content/60 leading-relaxed mb-4">{feature.description}</p>
                                <ul className="space-y-1.5">
                                    {feature.highlights.map((h, j) => (
                                        <li key={j} className="flex items-center gap-2 text-xs text-base-content/50">
                                            <div className={`w-1.5 h-1.5 rounded-full ${feature.color.replace('text-', 'bg-')}`}></div>
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 bg-base-200/50 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Ready to Experience All Features?
                </h2>
                <p className="text-base-content/60 mb-8 max-w-md mx-auto">
                    Sign up for free and start connecting with students at your college today.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/login" className="btn btn-primary btn-lg shadow-lg shadow-primary/30 group">
                        Sign Up Free
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/how-it-works" className="btn btn-ghost btn-lg border border-base-content/10">
                        How It Works
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default FeaturesPage
