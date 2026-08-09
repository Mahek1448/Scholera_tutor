import { motion } from 'framer-motion'
import { Target, Flame, BookOpenCheck } from 'lucide-react'



export default function TodayProgressCard({ isNewStudent = false }) {
    const stats = [
    {
        label: 'Topics Studied',
        value: isNewStudent ? 0 : 3,
        icon: BookOpenCheck,
        color: 'rgba(26,158,109,0.85)',
    },
    {
        label: 'Questions Asked',
        value: isNewStudent ? 0 : 12,
        icon: Target,
        color: 'rgba(196,98,45,0.85)',
    },
    {
        label: 'Min Today',
        value:  isNewStudent ? 0 : 47,
        icon: Flame,
        color: 'rgba(26,158,109,0.65)',
    },
]

// Goal: study 60 min today
const GOAL = 60
const actual =  isNewStudent ? 0 : 47
    const pct = Math.min((actual / GOAL) * 100, 100)
    const r = 32
    const circ = 2 * Math.PI * r
    const stroke = circ - (pct / 100) * circ

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
            className="card p-5 h-full flex flex-col"
        >
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Today's Progress</h3>

            {/* Ring chart */}
            <div className="flex items-center gap-5 mb-5">
                <div className="relative flex-shrink-0">
                    <svg width="84" height="84" className="-rotate-90">
                        <circle cx="42" cy="42" r={r} fill="none"
                            strokeWidth="7" stroke="var(--surface-2)" />
                        <motion.circle
                            cx="42" cy="42" r={r} fill="none"
                            strokeWidth="7"
                            stroke="#1A9E6D"
                            strokeLinecap="round"
                            strokeDasharray={circ}
                            initial={{ strokeDashoffset: circ }}
                            animate={{ strokeDashoffset: stroke }}
                            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                            {Math.round(pct)}%
                        </span>
                        <span className="text-[9px]" style={{ color: 'var(--text-muted)' }}>of goal</span>
                    </div>
                </div>
                <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-secondary)' }}>
                        {actual} / {GOAL} min
                    </div>
                    <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                        {isNewStudent ? 'Start your first study session' : 'Daily study goal'}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="space-y-2.5 flex-1">
                {stats.map((s, i) => {
                    const Icon = s.icon
                    return (
                        <div key={i} className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ background: s.color + '15', border: `1px solid ${s.color}25` }}>
                                <Icon size={12} style={{ color: s.color }} />
                            </div>
                            <div className="flex-1 flex items-baseline justify-between">
                                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
                                <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{s.value}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </motion.div>
    )
}
