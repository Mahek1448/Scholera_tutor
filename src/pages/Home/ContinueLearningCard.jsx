import { motion } from 'framer-motion'
import { BookOpen, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const lastTopic = {
    title: 'Backpropagation',
    subtitle: 'Lecture 7 · Slide 14',
    progress: 62,
    timeSpent: '24 min',
}

export default function ContinueLearningCard() {
    const navigate = useNavigate()

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="card p-4"
        >
            <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(26,158,109,0.1)', border: '1px solid rgba(26,158,109,0.2)' }}>
                    <BookOpen size={15} color="#1A9E6D" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>
                        Continue from where you left off
                    </div>
                    <div className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                        {lastTopic.title}
                    </div>
                    <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        {lastTopic.subtitle} · {lastTopic.timeSpent} spent
                    </div>

                    {/* Progress bar */}
                    <div className="mt-2.5 flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--surface-2)' }}>
                            <div
                                className="h-1.5 rounded-full transition-all"
                                style={{ width: `${lastTopic.progress}%`, background: 'linear-gradient(90deg, #1A9E6D, #38B985)' }}
                            />
                        </div>
                        <span className="text-[10px] font-medium flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                            {lastTopic.progress}%
                        </span>
                    </div>
                </div>
            </div>

            <motion.button
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/tutor')}
                className="mt-3 w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all"
                style={{ background: 'rgba(26,158,109,0.07)', border: '1px solid rgba(26,158,109,0.18)', color: '#137F57' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(26,158,109,0.12)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(26,158,109,0.07)'}
            >
                Continue with Tutor <ArrowRight size={12} />
            </motion.button>
        </motion.div>
    )
}
