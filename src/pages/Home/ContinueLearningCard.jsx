import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, BookOpen, TrendingUp } from 'lucide-react'
import { dashboardData } from '../../services/mockApi'

export default function ContinueLearningCard() {
    const navigate = useNavigate()
    const { lastTopic } = dashboardData

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="glass rounded-2xl p-5 relative overflow-hidden group"
        >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/8 via-transparent to-accent-600/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center">
                    <TrendingUp size={15} className="text-primary-500" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-text-primary">Continue Learning</h3>
                    <p className="text-xs text-text-muted">where you left off</p>
                </div>
            </div>

            <div className="bg-surface-2 rounded-xl p-4 border border-border mb-4">
                <div className="text-base font-semibold text-text-primary mb-1">{lastTopic.name}</div>
                <div className="flex items-center gap-1.5 text-xs text-text-muted mb-3">
                    <BookOpen size={11} />
                    <span>{lastTopic.lecture} · Slide {lastTopic.slide}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-surface-3 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${lastTopic.understanding}%` }}
                            transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
                            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                        />
                    </div>
                    <span className="text-xs font-semibold text-primary-600 flex-shrink-0">
                        {lastTopic.understanding}%
                    </span>
                </div>
                <div className="text-[10px] text-text-muted mt-1">Understanding</div>
            </div>

            <motion.button
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/tutor')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl text-white text-sm font-semibold hover:shadow-glow transition-shadow"
            >
                <span>Continue Learning</span>
                <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                    <ArrowRight size={15} />
                </motion.div>
            </motion.button>
        </motion.div>
    )
}
