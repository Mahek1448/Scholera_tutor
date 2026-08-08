import { motion } from 'framer-motion'
import { Clock, Target, PenLine, HelpCircle } from 'lucide-react'
import { dashboardData } from '../../services/mockApi'

function RadialProgress({ value, max, color, size = 80, strokeW = 8 }) {
    const r = (size - strokeW) / 2
    const circ = 2 * Math.PI * r
    const pct = Math.min(value / max, 1)
    const offset = circ * (1 - pct)

    return (
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
            <circle
                cx={size / 2} cy={size / 2} r={r}
                fill="none" stroke="#E8ECF4" strokeWidth={strokeW}
            />
            <motion.circle
                cx={size / 2} cy={size / 2} r={r}
                fill="none" stroke={color} strokeWidth={strokeW}
                strokeDasharray={circ}
                initial={{ strokeDashoffset: circ }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                strokeLinecap="round"
            />
        </svg>
    )
}

const stats = [
    { label: 'Minutes', icon: Clock, value: 47, max: 120, color: '#6366F1', unit: 'min', key: 'todayMinutes' },
    { label: 'Topics', icon: Target, value: 4, max: 10, color: '#22C55E', unit: '', key: 'todayTopics' },
    { label: 'Notes', icon: PenLine, value: 6, max: 20, color: '#F59E0B', unit: '', key: 'notesCreated' },
    { label: 'Questions', icon: HelpCircle, value: 11, max: 30, color: '#A78BFA', unit: '', key: 'questionsAsked' },
]

export default function TodayProgressCard() {
    const d = dashboardData

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass rounded-2xl p-5 relative overflow-hidden group"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center">
                    <Target size={15} className="text-primary-500" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-text-primary">Today's Progress</h3>
                    <p className="text-xs text-text-muted">Thursday, Sep 22</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {stats.map(({ label, icon: Icon, value, max, color, unit }) => (
                    <motion.div
                        key={label}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.35 }}
                        className="bg-surface-2 rounded-xl p-3 border border-border flex items-center gap-3"
                    >
                        <div className="relative flex-shrink-0">
                            <RadialProgress value={value} max={max} color={color} size={52} strokeW={5} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Icon size={14} style={{ color }} />
                            </div>
                        </div>
                        <div>
                            <div className="text-base font-bold text-text-primary leading-none">
                                {value}{unit}
                            </div>
                            <div className="text-[11px] text-text-muted mt-0.5">{label}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Overall bar */}
            <div className="mt-4 pt-3 border-t border-border">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-text-muted">Daily Goal</span>
                    <span className="text-xs font-semibold text-text-primary">39%</span>
                </div>
                <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '39%' }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                        className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                    />
                </div>
            </div>
        </motion.div>
    )
}
