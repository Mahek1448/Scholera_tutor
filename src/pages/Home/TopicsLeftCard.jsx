import { motion } from 'framer-motion'
import { Clock, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const UPCOMING = [
    { title: 'Attention Mechanisms', lecture: 'Lecture 9', slides: 28 },
    { title: 'Transformers Architecture', lecture: 'Lecture 9', slides: 34 },
    { title: 'Reinforcement Learning Basics', lecture: 'Lecture 10', slides: 26 },
    { title: 'Policy Gradient Methods', lecture: 'Lecture 10', slides: 22 },
    { title: 'Bayesian Optimization', lecture: 'Lecture 11', slides: 19 },
]

export default function TopicsLeftCard({ newStudent = false }) {
    const navigate = useNavigate()


    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="card p-4 h-full"
        >
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{newStudent ? 'Topics to Explore' : 'Topics Ahead'}</h3>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{newStudent ? 0 : UPCOMING.length} topics not yet covered</p>
                </div>
                <div className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(21,101,192,0.10)', border: '1px solid rgba(21,101,192,0.20)' }}>
                    <Clock size={13} color="#1565C0" />
                </div>
            </div>

            <div className="space-y-1.5">
                {UPCOMING.map((topic, i) => (
                    <motion.button
                        key={i}
                        whileHover={{ x: 2 }}
                        onClick={() => navigate('/tutor')}
                        className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-left transition-colors group"
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--border)' }} />
                        <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                                {topic.title}
                            </div>
                            <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                                {topic.lecture} · {topic.slides} slides
                            </div>
                        </div>
                        <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-muted)' }} />
                    </motion.button>
                ))}
            </div>
        </motion.div>
    )
}
