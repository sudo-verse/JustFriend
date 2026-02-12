import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, MessageCircle, Video, Shield, Sparkles, ArrowRight, Star, Zap, Heart, CheckCircle2 } from 'lucide-react'

// Animated counter component
const AnimatedCounter = ({ target, suffix = '' }) => {
    const [count, setCount] = useState(0)
    useEffect(() => {
        let start = 0
        const end = target
        const duration = 2000
        const increment = end / (duration / 16)
        const timer = setInterval(() => {
            start += increment
            if (start >= end) {
                setCount(end)
                clearInterval(timer)
            } else {
                setCount(Math.floor(start))
            }
        }, 16)
        return () => clearInterval(timer)
    }, [target])
    return <span>{count.toLocaleString()}{suffix}</span>
}

const LandingPage = () => {
    return (
        <div className="bg-base-300">
            {/* ── HERO SECTION ─────────────────────────────────────── */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
                {/* Animated background orbs */}
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>

                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
                        <Sparkles size={14} className="text-primary" />
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">India's #1 Campus Social Network</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
                        <span className="text-base-content">Connect with </span>
                        <span className="bg-gradient-to-r from-primary via-purple-400 to-secondary bg-clip-text text-transparent">
                            College Students
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-lg md:text-xl text-base-content/60 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Meet friends, chat in real-time, video call, and build meaningful connections at your college.
                        Your campus community, reimagined.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/login"
                            id="hero-signup-btn"
                            className="btn btn-primary btn-lg px-8 shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105 group"
                        >
                            Sign Up Free
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/how-it-works"
                            id="hero-learn-btn"
                            className="btn btn-ghost btn-lg border border-base-content/10 hover:bg-base-content/5"
                        >
                            See How It Works
                        </Link>
                    </div>

                    {/* Social Proof */}
                    <div className="mt-12 flex flex-wrap justify-center gap-8 text-base-content/50">
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 border-2 border-base-300 flex items-center justify-center text-xs text-white font-bold">A</div>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-pink-600 border-2 border-base-300 flex items-center justify-center text-xs text-white font-bold">R</div>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-teal-500 border-2 border-base-300 flex items-center justify-center text-xs text-white font-bold">S</div>
                            </div>
                            <span className="text-sm font-medium">Join 5,000+ students</span>
                        </div>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />
                            ))}
                            <span className="text-sm font-medium ml-1">4.8/5 rating</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── STATS SECTION ────────────────────────────────────── */}
            <section className="py-16 border-y border-base-content/5">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: 5000, suffix: '+', label: 'Active Students' },
                            { value: 100, suffix: '+', label: 'Colleges' },
                            { value: 50000, suffix: '+', label: 'Connections Made' },
                            { value: 99, suffix: '%', label: 'Satisfaction' },
                        ].map((stat, i) => (
                            <div key={i} className="space-y-1">
                                <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                                </p>
                                <p className="text-sm text-base-content/50 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURES GRID ────────────────────────────────────── */}
            <section className="py-24 px-6" id="features-preview">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Everything You Need to{' '}
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Connect</span>
                        </h2>
                        <p className="text-base-content/60 max-w-xl mx-auto">
                            Built from the ground up for college students. Every feature designed to make your campus experience unforgettable.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Heart className="text-pink-500" size={24} />,
                                title: 'Smart Matching',
                                description: 'Discover compatible students on your campus. Swipe to connect, pass, or send interest.',
                                gradient: 'from-pink-500/10 to-rose-500/10',
                                border: 'border-pink-500/20',
                            },
                            {
                                icon: <MessageCircle className="text-blue-500" size={24} />,
                                title: 'Real-Time Chat',
                                description: 'Instant messaging with your connections. React, reply, and keep conversations flowing.',
                                gradient: 'from-blue-500/10 to-cyan-500/10',
                                border: 'border-blue-500/20',
                            },
                            {
                                icon: <Video className="text-green-500" size={24} />,
                                title: 'Video & Voice Calls',
                                description: 'Face-to-face conversations with connected students. High-quality WebRTC calls.',
                                gradient: 'from-green-500/10 to-emerald-500/10',
                                border: 'border-green-500/20',
                            },
                            {
                                icon: <Shield className="text-purple-500" size={24} />,
                                title: 'Verified Profiles',
                                description: 'Email verification ensures real students. Premium users get the coveted Blue Tick.',
                                gradient: 'from-purple-500/10 to-violet-500/10',
                                border: 'border-purple-500/20',
                            },
                            {
                                icon: <Zap className="text-yellow-500" size={24} />,
                                title: 'Profile Boosts',
                                description: 'Get seen by more students. Premium boosts put you at the top of the feed.',
                                gradient: 'from-yellow-500/10 to-amber-500/10',
                                border: 'border-yellow-500/20',
                            },
                            {
                                icon: <Users className="text-teal-500" size={24} />,
                                title: 'Campus Community',
                                description: 'Join students from IITs, NITs, BITS, and 100+ colleges across India.',
                                gradient: 'from-teal-500/10 to-cyan-500/10',
                                border: 'border-teal-500/20',
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className={`group p-6 rounded-2xl bg-gradient-to-br ${feature.gradient} border ${feature.border} backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 cursor-default`}
                            >
                                <div className="w-12 h-12 rounded-xl bg-base-100/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-base-content">{feature.title}</h3>
                                <p className="text-sm text-base-content/60 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/features" className="btn btn-outline btn-primary group">
                            Explore All Features
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ─────────────────────────────────────── */}
            <section className="py-24 px-6 bg-base-200/50" id="how-it-works-preview">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Get Started in{' '}
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">3 Simple Steps</span>
                        </h2>
                        <p className="text-base-content/60 max-w-lg mx-auto">
                            From signup to your first conversation — it takes less than 2 minutes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Create Your Profile',
                                description: 'Sign up with your email, add a photo, and tell the campus who you are. Email verification keeps the community safe.',
                                emoji: '🎓',
                            },
                            {
                                step: '02',
                                title: 'Discover & Connect',
                                description: 'Browse student profiles from your campus. Swipe right to show interest, left to pass. When both match — it\'s a connection!',
                                emoji: '💫',
                            },
                            {
                                step: '03',
                                title: 'Chat, Call & Meet',
                                description: 'Start chatting instantly. Upgrade to voice or video calls. Turn online connections into real campus friendships.',
                                emoji: '🤝',
                            },
                        ].map((item, i) => (
                            <div key={i} className="relative text-center group">
                                {/* Step number */}
                                <div className="text-8xl font-black text-primary/5 absolute top-0 left-1/2 -translate-x-1/2 group-hover:text-primary/10 transition-colors">
                                    {item.step}
                                </div>

                                <div className="relative pt-12">
                                    <div className="text-5xl mb-4">{item.emoji}</div>
                                    <h3 className="text-xl font-bold mb-3 text-base-content">{item.title}</h3>
                                    <p className="text-sm text-base-content/60 leading-relaxed max-w-xs mx-auto">{item.description}</p>
                                </div>

                                {/* Connector line */}
                                {i < 2 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-primary/20"></div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/login" className="btn btn-primary btn-lg shadow-xl shadow-primary/30 group">
                            Get Started Now — It's Free
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── PREMIUM PREVIEW ──────────────────────────────────── */}
            <section className="py-24 px-6 relative overflow-hidden" id="premium-preview">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[150px]"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Unlock{' '}
                            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Premium</span>
                            {' '}Power
                        </h2>
                        <p className="text-base-content/60 max-w-lg mx-auto">
                            Go further with CampusVerse Premium. Unlimited connections, video calls, profile boosts, and more.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        {/* Silver */}
                        <div className="p-6 rounded-2xl bg-base-100/50 border border-base-content/10 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center">
                                    <Star size={18} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Silver</h3>
                                    <p className="text-xs text-base-content/50">Standard Tier</p>
                                </div>
                            </div>
                            <ul className="space-y-2 text-sm text-base-content/70">
                                {['Blue Tick Verification', '100 Connections/day', '5 Profile Boosts/day', 'Ad-free Experience'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-gray-400 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Gold */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/5 to-yellow-600/10 border border-yellow-500/20 backdrop-blur-sm relative">
                            <div className="absolute top-3 right-3 badge badge-warning badge-sm font-semibold">BEST VALUE</div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                                    <Star size={18} className="text-white fill-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Gold</h3>
                                    <p className="text-xs text-yellow-500/70">Premium Tier</p>
                                </div>
                            </div>
                            <ul className="space-y-2 text-sm text-base-content/80">
                                {['Blue Tick Verification', 'Unlimited Connections', '10 Profile Boosts/day', 'Ad-free Experience', 'Priority Support'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-yellow-500 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="text-center mt-10">
                        <Link to="/premium" className="btn btn-outline border-yellow-500/30 text-yellow-500 hover:bg-yellow-500 hover:border-yellow-500 hover:text-white group">
                            View Premium Plans
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── FAQ SECTION ──────────────────────────────────────── */}
            <section className="py-24 px-6 bg-base-200/50" id="faq">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Frequently Asked{' '}
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Questions</span>
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {[
                            {
                                q: 'Is CampusVerse free for students?',
                                a: 'Yes! CampusVerse is completely free to use. You can create a profile, discover students, send connection requests, and chat for free. Premium memberships offer additional features like unlimited connections and profile boosts.',
                            },
                            {
                                q: 'How does CampusVerse matching work?',
                                a: 'CampusVerse shows you profiles of students from your campus and beyond. You can swipe to connect (Interested) or pass (Ignored). When both students express interest, a connection is made and you can start chatting instantly.',
                            },
                            {
                                q: 'Is CampusVerse safe?',
                                a: 'Absolutely. We require email verification for all accounts and have robust security measures. Your data is encrypted and we never share your personal information with third parties.',
                            },
                            {
                                q: 'Can I video call on CampusVerse?',
                                a: 'Yes! CampusVerse supports real-time voice and video calling between connected students using WebRTC technology for high-quality, peer-to-peer calls.',
                            },
                            {
                                q: 'Which colleges are supported?',
                                a: 'CampusVerse is open to students from all colleges and universities across India — including IITs, NITs, BITS, IIITs, and many more. Anyone with a valid email can sign up!',
                            },
                        ].map((faq, i) => (
                            <div key={i} className="collapse collapse-plus bg-base-100/70 border border-base-content/5 rounded-xl">
                                <input type="radio" name="faq-accordion" defaultChecked={i === 0} />
                                <div className="collapse-title text-base font-semibold pr-12">
                                    {faq.q}
                                </div>
                                <div className="collapse-content">
                                    <p className="text-sm text-base-content/70 leading-relaxed pt-0">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA ────────────────────────────────────────── */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]"></div>

                <div className="relative z-10 text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Ready to Meet Your{' '}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Campus Community?</span>
                    </h2>
                    <p className="text-base-content/60 mb-10 text-lg">
                        Join thousands of students already connecting on CampusVerse. It's free, it's safe, and it takes less than 2 minutes.
                    </p>
                    <Link
                        to="/login"
                        id="final-cta-btn"
                        className="btn btn-primary btn-lg px-10 shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105 group"
                    >
                        Join CampusVerse Free
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <p className="mt-4 text-xs text-base-content/40">No credit card required • Free forever plan available</p>
                </div>
            </section>
        </div>
    )
}

export default LandingPage
