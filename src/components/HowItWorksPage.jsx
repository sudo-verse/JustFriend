import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, UserPlus, Search, MessageCircle, Video, Star, Shield, CheckCircle2 } from 'lucide-react'

const HowItWorksPage = () => {
    const steps = [
        {
            number: '01',
            title: 'Create Your Profile',
            description: 'Sign up with your email address. Add your name, a profile photo, and a short bio. We\'ll verify your email to keep the community safe and authentic.',
            details: [
                'Choose a profile picture (or upload via Cloudinary)',
                'Write a bio that represents you',
                'Verify your email address',
                'Set your gender preference',
            ],
            icon: <UserPlus size={32} />,
            color: 'text-primary',
            accent: 'from-primary/20 to-purple-500/20',
        },
        {
            number: '02',
            title: 'Discover Students',
            description: 'Browse through a curated feed of student profiles. Each card shows their photo, name, bio, and gender. Decide if you\'d like to connect.',
            details: [
                'Swipe-style card interface',
                'View profiles one at a time',
                'See photos, bios, and interests',
                'Cards load automatically',
            ],
            icon: <Search size={32} />,
            color: 'text-secondary',
            accent: 'from-secondary/20 to-pink-500/20',
        },
        {
            number: '03',
            title: 'Send Connection Requests',
            description: 'Found someone interesting? Tap the heart to send an "Interested" signal. Not a match? Tap X to pass. It\'s respectful, and your choices are private.',
            details: [
                'Tap ❤️ to show interest',
                'Tap ✕ to pass (no one sees this)',
                'Mutual interest = connection',
                'Manage requests in your dashboard',
            ],
            icon: <Star size={32} />,
            color: 'text-yellow-500',
            accent: 'from-yellow-500/20 to-amber-500/20',
        },
        {
            number: '04',
            title: 'Chat in Real-Time',
            description: 'Once connected, start chatting instantly! Our real-time messaging powered by Socket.io delivers messages in milliseconds. See online status and keep the conversation going.',
            details: [
                'Instant message delivery',
                'See when connections are online',
                'Full chat history preserved',
                'Real-time typing indicators',
            ],
            icon: <MessageCircle size={32} />,
            color: 'text-blue-500',
            accent: 'from-blue-500/20 to-cyan-500/20',
        },
        {
            number: '05',
            title: 'Voice & Video Call',
            description: 'Take conversations beyond text. Start a voice or video call directly from the chat. Our WebRTC integration ensures crystal-clear, peer-to-peer calls.',
            details: [
                'One-tap calling from chat',
                'HD voice & video quality',
                'Peer-to-peer (no server in between)',
                'Call notifications in real-time',
            ],
            icon: <Video size={32} />,
            color: 'text-green-500',
            accent: 'from-green-500/20 to-emerald-500/20',
        },
    ]

    return (
        <div className="bg-base-300">
            {/* Hero */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px]"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                        How{' '}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">CampusVerse</span>
                        {' '}Works
                    </h1>
                    <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
                        From creating your profile to making your first video call — here's your complete guide to connecting with campus friends.
                    </p>
                </div>
            </section>

            {/* Steps */}
            <section className="py-12 px-6 pb-24">
                <div className="max-w-4xl mx-auto">
                    {steps.map((step, i) => (
                        <div key={i} className="relative mb-12 last:mb-0">
                            {/* Connector line */}
                            {i < steps.length - 1 && (
                                <div className="absolute left-8 top-24 bottom-0 w-0.5 bg-gradient-to-b from-base-content/10 to-transparent hidden md:block"></div>
                            )}

                            <div className="flex gap-6 md:gap-10 items-start">
                                {/* Step indicator */}
                                <div className="shrink-0 hidden md:flex flex-col items-center">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.accent} border border-base-content/5 flex items-center justify-center ${step.color}`}>
                                        {step.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-6 md:p-8 rounded-2xl bg-base-100/40 border border-base-content/5 backdrop-blur-sm hover:bg-base-100/60 transition-all">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-xs font-bold uppercase tracking-widest text-base-content/30">Step {step.number}</span>
                                        <div className={`md:hidden w-8 h-8 rounded-lg bg-gradient-to-br ${step.accent} flex items-center justify-center ${step.color}`}>
                                            {React.cloneElement(step.icon, { size: 16 })}
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-bold mb-3 text-base-content">{step.title}</h2>
                                    <p className="text-base-content/60 leading-relaxed mb-5">{step.description}</p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {step.details.map((detail, j) => (
                                            <div key={j} className="flex items-start gap-2 text-sm text-base-content/50">
                                                <CheckCircle2 size={14} className={`${step.color} shrink-0 mt-0.5`} />
                                                {detail}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Safety Section */}
            <section className="py-20 px-6 bg-base-200/50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <Shield className="mx-auto text-primary mb-4" size={40} />
                        <h2 className="text-3xl font-bold mb-4">
                            Your Safety is Our{' '}
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Priority</span>
                        </h2>
                        <p className="text-base-content/60 max-w-lg mx-auto">
                            We've built multiple layers of protection to make CampusVerse a safe space for all students.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: 'Email Verification', desc: 'Every account is verified via email. No fake profiles, no bots.', icon: '✉️' },
                            { title: 'Encrypted Data', desc: 'Passwords are hashed with bcrypt. Auth tokens use JWT encryption.', icon: '🔐' },
                            { title: 'Private by Default', desc: 'Your choices (pass/interest) are private. Only mutual connections see each other.', icon: '👤' },
                        ].map((item, i) => (
                            <div key={i} className="text-center p-6 rounded-2xl bg-base-100/30 border border-base-content/5">
                                <div className="text-4xl mb-3">{item.icon}</div>
                                <h3 className="font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-base-content/60">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Sounds Good? Let's Get Started.
                    </h2>
                    <p className="text-base-content/60 mb-8 max-w-md mx-auto">
                        Create your free account in under 2 minutes and start discovering your campus community.
                    </p>
                    <Link to="/login" className="btn btn-primary btn-lg shadow-xl shadow-primary/30 group">
                        Create Your Profile — Free
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default HowItWorksPage
