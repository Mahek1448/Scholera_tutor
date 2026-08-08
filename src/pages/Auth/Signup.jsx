import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'

const EDU_SYMBOLS = ['∑', '∇', 'π', 'θ', 'λ', 'f(x)', 'AI', 'ML', '∂', '∈', '≈', 'σ', 'α', 'β', 'ε']

export default function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        document.documentElement.classList.remove('dark')
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (!name.trim() || !email.trim() || !password.trim()) {
            setError('Please fill in all fields.')
            return
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters.')
            return
        }
        setLoading(true)
        await new Promise(r => setTimeout(r, 600))

        const users = JSON.parse(localStorage.getItem('scholera_users') || '[]')
        if (users.find(u => u.email === email.toLowerCase())) {
            setError('An account with this email already exists.')
            setLoading(false)
            return
        }

        const newUser = {
            id: `usr_${Date.now()}`,
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password,
            createdAt: new Date().toISOString(),
        }
        users.push(newUser)
        localStorage.setItem('scholera_users', JSON.stringify(users))
        localStorage.setItem('scholera_current_user', JSON.stringify(newUser))
        // Clear any old data for fresh experience
        localStorage.removeItem('scholera_notes')
        localStorage.removeItem('scholera_saved')
        localStorage.removeItem('scholera_chats')
        navigate('/')
    }

    return (
        <div className="min-h-screen flex relative overflow-hidden" style={{ background: '#F8F4EF' }}>
            {/* Floating symbols */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
                {EDU_SYMBOLS.map((sym, i) => (
                    <motion.div
                        key={i}
                        className="absolute font-mono text-primary-600"
                        style={{
                            left: `${5 + (i * 6.5) % 88}%`,
                            top: `${10 + (i * 7.8) % 75}%`,
                            fontSize: `${11 + (i % 4) * 3}px`,
                            opacity: 0.06,
                        }}
                        animate={{ y: [0, -8, 0], opacity: [0.04, 0.1, 0.04] }}
                        transition={{ duration: 5 + (i % 3), repeat: Infinity, delay: i * 0.35, ease: 'easeInOut' }}
                    >
                        {sym}
                    </motion.div>
                ))}
            </div>

            {/* Left panel */}
            <div className="hidden lg:flex flex-col justify-between w-[420px] flex-shrink-0 p-10 relative"
                style={{ background: '#1A3C34', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div>
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center shadow-glow-sm">
                            <span className="text-white font-bold text-sm">S</span>
                        </div>
                        <span className="text-white font-semibold text-lg">Scholera</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4 leading-snug">
                        Start your learning<br />journey today.
                    </h2>
                    <p className="text-primary-200 text-sm leading-relaxed">
                        Set up your account and start asking questions from your lecture materials.
                        Your tutor is ready.
                    </p>
                </div>
                <div>
                    <div className="text-xs font-semibold text-primary-400 uppercase tracking-wider mb-3">
                        What you get
                    </div>
                    <div className="space-y-4">
                        {[
                            'AI tutor answers only from your lectures',
                            'Citations trace to exact slides',
                            'Notes, revision tools & learning map',
                        ].map((f, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-primary-500/30 border border-primary-400/40 flex items-center justify-center flex-shrink-0">
                                    <div className="w-2 h-2 rounded-full bg-primary-400" />
                                </div>
                                <span className="text-sm text-primary-100">{f}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right panel */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-sm"
                >
                    <div className="flex items-center gap-2 mb-8 lg:hidden">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">S</span>
                        </div>
                        <span className="font-semibold text-lg" style={{ color: '#1C1917' }}>Scholera</span>
                    </div>

                    <h1 className="text-2xl font-bold mb-1" style={{ color: '#1C1917' }}>Create your account</h1>
                    <p className="text-sm mb-8" style={{ color: '#78716C' }}>
                        Your learning journey starts here.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium mb-1.5" style={{ color: '#44403C' }}>
                                Full name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Your name"
                                className="w-full px-3.5 py-3 rounded-xl text-sm outline-none transition-all"
                                style={{ background: '#FDFAF6', border: '1px solid #D5CBC0', color: '#1C1917' }}
                                onFocus={e => e.target.style.borderColor = '#1A9E6D'}
                                onBlur={e => e.target.style.borderColor = '#D5CBC0'}
                                autoComplete="name"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium mb-1.5" style={{ color: '#44403C' }}>
                                Email address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="you@university.edu"
                                className="w-full px-3.5 py-3 rounded-xl text-sm outline-none transition-all"
                                style={{ background: '#FDFAF6', border: '1px solid #D5CBC0', color: '#1C1917' }}
                                onFocus={e => e.target.style.borderColor = '#1A9E6D'}
                                onBlur={e => e.target.style.borderColor = '#D5CBC0'}
                                autoComplete="email"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium mb-1.5" style={{ color: '#44403C' }}>
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Min. 6 characters"
                                    className="w-full px-3.5 py-3 pr-11 rounded-xl text-sm outline-none transition-all"
                                    style={{ background: '#FDFAF6', border: '1px solid #D5CBC0', color: '#1C1917' }}
                                    onFocus={e => e.target.style.borderColor = '#1A9E6D'}
                                    onBlur={e => e.target.style.borderColor = '#D5CBC0'}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(v => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                                    style={{ color: '#78716C' }}
                                    aria-label="Toggle password visibility"
                                >
                                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
                            >
                                {error}
                            </motion.p>
                        )}

                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors disabled:opacity-60 shadow-glow-sm"
                        >
                            {loading ? 'Creating account…' : 'Create Account'}
                            {!loading && <ArrowRight size={15} />}
                        </motion.button>
                    </form>

                    <p className="text-center text-xs mt-6" style={{ color: '#78716C' }}>
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
                            Sign in
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
