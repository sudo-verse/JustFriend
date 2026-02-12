import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Code2, Sparkles, Github, Linkedin, Mail, Globe, Rocket, Users, Shield } from 'lucide-react'

const AboutPage = () => {
    return (
        <div className="bg-base-300">
            {/* Hero */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute top-[-10%] left-[30%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                        About{' '}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">CampusVerse</span>
                    </h1>
                    <p className="text-lg text-base-content/60 max-w-2xl mx-auto leading-relaxed">
                        Built by a college student, for college students. CampusVerse is on a mission to make
                        campus social networking meaningful, safe, and fun.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="py-20 px-6 bg-base-200/50">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Heart className="text-pink-500" size={28} />,
                                title: 'Our Mission',
                                description: 'To help every college student find their tribe. We believe that the connections you make in college shape your life. CampusVerse makes those connections effortless.',
                            },
                            {
                                icon: <Sparkles className="text-yellow-500" size={28} />,
                                title: 'Our Vision',
                                description: 'A world where no student feels alone on campus. Where finding friends, study partners, and mentors is as easy as swiping right. We\'re building that future.',
                            },
                            {
                                icon: <Shield className="text-purple-500" size={28} />,
                                title: 'Our Values',
                                description: 'Safety first, always. We build with transparency, respect privacy, and create spaces where students feel comfortable being themselves.',
                            },
                        ].map((item, i) => (
                            <div key={i} className="text-center p-8 rounded-2xl bg-base-100/40 border border-base-content/5">
                                <div className="w-14 h-14 rounded-xl bg-base-100/80 flex items-center justify-center mx-auto mb-5">
                                    {item.icon}
                                </div>
                                <h2 className="text-xl font-bold mb-3">{item.title}</h2>
                                <p className="text-sm text-base-content/60 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="py-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        The{' '}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Story</span>
                    </h2>

                    <div className="prose prose-lg max-w-none text-base-content/70">
                        <div className="p-8 rounded-2xl bg-base-100/30 border border-base-content/5 space-y-4">
                            <p className="leading-relaxed">
                                CampusVerse started with a simple observation: <strong className="text-base-content">making friends at college shouldn't be this hard.</strong>
                            </p>
                            <p className="leading-relaxed">
                                Whether you're a fresher walking into a new campus, an introvert looking for like-minded people,
                                or a senior wanting to expand your network — the existing solutions didn't feel right.
                                Dating apps felt too romantic, LinkedIn too professional, and Instagram too superficial.
                            </p>
                            <p className="leading-relaxed">
                                So we built CampusVerse — a platform designed <em>specifically</em> for college students to make
                                genuine connections. No algorithms optimizing for ads. No toxic feeds. Just students connecting
                                with students.
                            </p>
                            <p className="leading-relaxed">
                                Built with <strong className="text-base-content">React, Node.js, MongoDB, and Socket.io</strong>,
                                CampusVerse supports real-time chat, video calling, smart matching, and premium features — all
                                crafted with the student experience in mind.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="py-20 px-6 bg-base-200/50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <Code2 className="mx-auto text-primary mb-4" size={36} />
                        <h2 className="text-3xl font-bold mb-4">
                            Built with Modern{' '}
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Technology</span>
                        </h2>
                        <p className="text-base-content/60">Open source. Transparent. Built to scale.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: 'React 19', desc: 'Frontend UI', color: 'text-cyan-500' },
                            { name: 'Node.js', desc: 'Backend API', color: 'text-green-500' },
                            { name: 'MongoDB', desc: 'Database', color: 'text-emerald-500' },
                            { name: 'Socket.io', desc: 'Real-time', color: 'text-blue-500' },
                            { name: 'WebRTC', desc: 'Video Calls', color: 'text-purple-500' },
                            { name: 'Vite', desc: 'Build Tool', color: 'text-yellow-500' },
                            { name: 'TailwindCSS', desc: 'Styling', color: 'text-sky-500' },
                            { name: 'Docker', desc: 'Deployment', color: 'text-blue-400' },
                        ].map((tech, i) => (
                            <div key={i} className="p-4 rounded-xl bg-base-100/40 border border-base-content/5 text-center hover:scale-105 transition-transform">
                                <p className={`font-bold text-sm ${tech.color}`}>{tech.name}</p>
                                <p className="text-xs text-base-content/40 mt-0.5">{tech.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Numbers */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {[
                            { icon: <Users size={24} />, value: '5,000+', label: 'Students' },
                            { icon: <Globe size={24} />, value: '100+', label: 'Colleges' },
                            { icon: <Rocket size={24} />, value: '50K+', label: 'Connections' },
                            { icon: <Heart size={24} />, value: '24/7', label: 'Support' },
                        ].map((stat, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-base-100/30 border border-base-content/5">
                                <div className="text-primary mb-2 flex justify-center">{stat.icon}</div>
                                <p className="text-2xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    {stat.value}
                                </p>
                                <p className="text-xs text-base-content/50 mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact / Connect */}
            <section className="py-20 px-6 bg-base-200/50">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                    <p className="text-base-content/60 mb-8">
                        Have questions, feedback, or want to collaborate? We'd love to hear from you.
                    </p>

                    <div className="flex justify-center gap-4 mb-8">
                        <a href="https://github.com/sudo-verse/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-circle btn-lg border border-base-content/10 hover:text-primary hover:border-primary transition-all">
                            <Github size={22} />
                        </a>
                        <a href="https://www.linkedin.com/in/devashish-verse" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-circle btn-lg border border-base-content/10 hover:text-primary hover:border-primary transition-all">
                            <Linkedin size={22} />
                        </a>
                        <a href="mailto:ashishkrgupta.hajipur@gmail.com" className="btn btn-ghost btn-circle btn-lg border border-base-content/10 hover:text-primary hover:border-primary transition-all">
                            <Mail size={22} />
                        </a>
                    </div>

                    <Link to="/login" className="btn btn-primary shadow-lg shadow-primary/30 group">
                        Join the Community
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default AboutPage
