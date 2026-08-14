import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowRight, UserRound } from 'lucide-react'
import conversationData from '../../../conversation.json'
import conversationEmptyData from '../../../conversation-empty.json'

const EDU_SYMBOLS = [
    '∑', '∇', 'π', 'θ', 'λ', 'f(x)', '1+1',
    'AI', 'ML', '∂', '∈', '≈', 'σ', 'α', 'β'
]

const DEMO_PASSWORD = '123456'

export default function Login() {
    const [studentId, setStudentId] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    // Keep login page in light mode
    useEffect(() => {
        document.documentElement.classList.remove('dark')
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!studentId.trim() || !password.trim()) {
            setError('Please enter your Student ID and password.')
            return
        }

        if (password !== DEMO_PASSWORD) {
            setError('Invalid password. Use the demo password: 123456')
            return
        }

        setLoading(true)

        try {
            // Load both demo student records
            const existingData = conversationData
    const emptyData = conversationEmptyData

            const enteredId = studentId.trim().toLowerCase()

            let loggedInStudent = null

            // Existing student
            if (enteredId === existingData.student.id.toLowerCase()) {
                loggedInStudent = {
                    id: existingData.student.id,
                    name: existingData.student.name,
                    type: 'existing',
                    conversationId: existingData.id
                }
            }

            // New student
            else if (enteredId === emptyData.student.id.toLowerCase()) {
                loggedInStudent = {
                    id: emptyData.student.id,
                    name: emptyData.student.name,
                    type: 'new',
                    conversationId: emptyData.id
                }
            }

            // Unknown student
            if (!loggedInStudent) {
                setError(
                    'Student ID not found. Use stu_0014 or stu_0031.'
                )
                setLoading(false)
                return
            }

            // Save currently logged-in student
            localStorage.setItem(
                'scholera_current_user',
                JSON.stringify(loggedInStudent)
            )

            // Small delay for a smoother transition
            await new Promise(resolve => setTimeout(resolve, 400))

            navigate('/')
        } catch (error) {
            console.error('Login error:', error)
            setError(
                'Unable to load student data. Please make sure the JSON files are in the public folder.'
            )
            setLoading(false)
        }
    }

    return (
        <div
            className="min-h-screen flex relative overflow-hidden"
            style={{ background: '#F8F4EF' }}
        >

            {/* Floating educational symbols */}
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
                        animate={{
                            y: [0, -8, 0],
                            opacity: [0.04, 0.1, 0.04]
                        }}
                        transition={{
                            duration: 5 + (i % 3),
                            repeat: Infinity,
                            delay: i * 0.35,
                            ease: 'easeInOut'
                        }}
                    >
                        {sym}
                    </motion.div>
                ))}
            </div>

            {/* Left panel */}
            <div
                className="hidden lg:flex flex-col justify-between w-[420px] flex-shrink-0 p-10 relative"
                style={{
                    background: '#1A237E',
                    borderRight: '1px solid rgba(255,255,255,0.08)'
                }}
            >
                <div>
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center shadow-glow-sm">
                            <span className="text-white font-bold text-sm">
                                S
                            </span>
                        </div>

                        <span className="text-white font-semibold text-lg">
                            Scholera
                        </span>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-4 leading-snug">
                        Your lecture materials,
                        <br />
                        answered precisely.
                    </h2>

                    <p className="text-primary-200 text-sm leading-relaxed">
                        Every answer traces back to the exact lecture and
                        slide it came from. No guessing. No hallucinations.
                    </p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                    {[
                        'Understand concepts from your lectures',
                        'Trace answers back to the exact slide',
                        "Track what you've learned and what's left",
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3"
                        >
                            <div className="w-5 h-5 rounded-full bg-primary-500/30 border border-primary-400/40 flex items-center justify-center flex-shrink-0">
                                <div className="w-2 h-2 rounded-full bg-primary-400" />
                            </div>

                            <span className="text-sm text-primary-100">
                                {feature}
                            </span>
                        </div>
                    ))}
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

                    {/* Mobile logo */}
                    <div className="flex items-center gap-2 mb-8 lg:hidden">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                                S
                            </span>
                        </div>

                        <span
                            className="font-semibold text-lg"
                            style={{ color: '#1C1917' }}
                        >
                            Scholera
                        </span>
                    </div>

                    <h1
                        className="text-2xl font-bold mb-1"
                        style={{ color: '#1C1917' }}
                    >
                        Welcome back
                    </h1>

                    <p
                        className="text-sm mb-8"
                        style={{ color: '#78716C' }}
                    >
                        Sign in to continue your learning journey.
                    </p>

                    {/* Login form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        {/* Student ID */}
                        <div>
                            <label
                                className="block text-xs font-medium mb-1.5"
                                style={{ color: '#44403C' }}
                            >
                                Student ID
                            </label>

                            <div className="relative">
                                <input
                                    type="text"
                                    value={studentId}
                                    onChange={e =>
                                        setStudentId(e.target.value)
                                    }
                                    placeholder="stu_0014"
                                    className="w-full px-3.5 py-3 pl-10 rounded-xl text-sm outline-none transition-all"
                                    style={{
                                        background: '#FDFAF6',
                                        border: '1px solid #D5CBC0',
                                        color: '#1C1917',
                                    }}
                                    onFocus={e =>
                                        e.currentTarget.style.borderColor =
                                        '#1565C0'
                                    }
                                    onBlur={e =>
                                        e.currentTarget.style.borderColor =
                                        '#D5CBC0'
                                    }
                                    autoComplete="username"
                                />

                                <UserRound
                                    size={15}
                                    className="absolute left-3 top-1/2 -translate-y-1/2"
                                    style={{ color: '#78716C' }}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                className="block text-xs font-medium mb-1.5"
                                style={{ color: '#44403C' }}
                            >
                                Demo Password
                            </label>

                            <div className="relative">
                                <input
                                    type={
                                        showPass
                                            ? 'text'
                                            : 'password'
                                    }
                                    value={password}
                                    onChange={e =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="123456"
                                    className="w-full px-3.5 py-3 pr-11 rounded-xl text-sm outline-none transition-all"
                                    style={{
                                        background: '#FDFAF6',
                                        border: '1px solid #D5CBC0',
                                        color: '#1C1917',
                                    }}
                                    onFocus={e =>
                                        e.currentTarget.style.borderColor =
                                        '#1565C0'
                                    }
                                    onBlur={e =>
                                        e.currentTarget.style.borderColor =
                                        '#D5CBC0'
                                    }
                                    autoComplete="current-password"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPass(v => !v)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                                    style={{ color: '#78716C' }}
                                    aria-label="Toggle password visibility"
                                >
                                    {showPass ? (
                                        <EyeOff size={15} />
                                    ) : (
                                        <Eye size={15} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Demo account information */}
                        <div
                            className="rounded-xl px-3.5 py-3 text-xs"
                            style={{
                                background: 'rgba(21,101,192,0.06)',
                                border: '1px solid rgba(21,101,192,0.15)',
                            }}
                        >
                            <p
                                className="font-semibold mb-1"
                                style={{ color: '#1565C0' }}
                            >
                                Demo accounts
                            </p>

                            <p style={{ color: '#78716C' }}>
                                <strong>stu_0014</strong> — Existing student
                            </p>

                            <p style={{ color: '#78716C' }}>
                                <strong>stu_0031</strong> — New student
                            </p>

                            <p
                                className="mt-1"
                                style={{ color: '#78716C' }}
                            >
                                Password: <strong>123456</strong>
                            </p>
                        </div>

                        {/* Error */}
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
                            >
                                {error}
                            </motion.p>
                        )}

                        {/* Submit */}
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors disabled:opacity-60 shadow-glow-sm"
                        >
                            {loading
                                ? 'Signing in…'
                                : 'Sign In'}

                            {!loading && (
                                <ArrowRight size={15} />
                            )}
                        </motion.button>

                    </form>

                </motion.div>
            </div>
        </div>
    )
}