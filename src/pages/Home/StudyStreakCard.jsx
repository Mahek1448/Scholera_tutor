import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, TrendingUp } from 'lucide-react'

// Generate 52 weeks of mock study data
function generateStreakData() {
    const weeks = []
    const today = new Date()
    const topics = ['Linear Regression', 'Gradient Descent', 'Backpropagation', 'Regularization', 'ReLU', 'Cross-Entropy', 'Softmax', 'Dropout']

    for (let w = 51; w >= 0; w--) {
        const week = []
        for (let d = 0; d < 7; d++) {
            const date = new Date(today)
            date.setDate(date.getDate() - (w * 7 + (6 - d)))

            const isFuture = date > today
            const daysSinceStart = Math.floor((today - date) / (1000 * 60 * 60 * 24))
            const baseProb = daysSinceStart > 90 ? 0.3 : daysSinceStart > 30 ? 0.55 : 0.75
            const hasStudy = !isFuture && Math.random() < baseProb
            const minutes = hasStudy ? Math.floor(Math.random() * 90 + 15) : 0
            const topicCount = hasStudy ? Math.floor(Math.random() * 4 + 1) : 0
            const dayTopics = hasStudy ? topics.sort(() => 0.5 - Math.random()).slice(0, topicCount) : []

            week.push({
                date,
                hasStudy,
                minutes,
                topics: dayTopics,
                level: minutes > 75 ? 4 : minutes > 50 ? 3 : minutes > 25 ? 2 : minutes > 0 ? 1 : 0,
            })
        }
        weeks.push(week)
    }
    return weeks
}

const weeks = generateStreakData()

const levelColors = [
    'bg-surface-3 border-border',
    'bg-primary-100 border-primary-200',
    'bg-primary-200 border-primary-300',
    'bg-primary-400 border-primary-300',
    'bg-primary-500 border-primary-600',
]

export default function StudyStreakCard() {
    const [tooltip, setTooltip] = useState(null)

    // Calculate streak
    let streak = 0
    const allDays = weeks.flat().filter(d => d.date <= new Date())
    for (let i = allDays.length - 1; i >= 0; i--) {
        if (allDays[i].hasStudy) streak++
        else break
    }

    const formatDate = (d) =>
        d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-5 relative overflow-hidden group"
        >
            {/* Top glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/15 border border-orange-500/25 flex items-center justify-center">
                        <Flame size={15} className="text-orange-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-text-primary">Study Streak</h3>
                        <p className="text-xs text-text-muted">Last 12 months</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5">
                    <Flame size={14} className="text-orange-400" />
                    <span className="text-xl font-bold text-text-primary">{streak}</span>
                    <span className="text-xs text-text-muted">days</span>
                </div>
            </div>

            {/* Grid */}
            <div className="relative">
                {/* Month labels */}
                <div className="flex mb-1 ml-6">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
                        <div key={m} className="text-[9px] text-text-muted" style={{ flex: i === 11 ? 1 : undefined, width: i === 11 ? undefined : `${(weeks.length / 12) * 10}px`, minWidth: 0 }}>
                            {m}
                        </div>
                    ))}
                </div>

                <div className="flex gap-[3px]">
                    {/* Day labels */}
                    <div className="flex flex-col gap-[3px] mr-1">
                        {['M', '', 'W', '', 'F', '', 'S'].map((d, i) => (
                            <div key={i} className="text-[9px] text-text-muted h-[10px] flex items-center">{d}</div>
                        ))}
                    </div>

                    {/* Contribution squares */}
                    <div className="flex gap-[3px] flex-1 overflow-x-auto no-scrollbar">
                        {weeks.map((week, wi) => (
                            <div key={wi} className="flex flex-col gap-[3px]">
                                {week.map((day, di) => (
                                    <div
                                        key={di}
                                        className="relative"
                                        onMouseEnter={(e) => {
                                            if (!day.hasStudy && day.level === 0) return
                                            const rect = e.currentTarget.getBoundingClientRect()
                                            setTooltip({ day, x: rect.left, y: rect.top })
                                        }}
                                        onMouseLeave={() => setTooltip(null)}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.4 }}
                                            className={`w-[10px] h-[10px] rounded-[2px] border cursor-pointer transition-colors ${levelColors[day.level]}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tooltip */}
                <AnimatePresence>
                    {tooltip && (
                        <motion.div
                            initial={{ opacity: 0, y: 4, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="fixed z-50 pointer-events-none"
                            style={{ left: tooltip.x + 16, top: tooltip.y - 80 }}
                        >
                            <div className="glass border border-border rounded-xl p-3 shadow-card min-w-[160px]">
                                <div className="text-xs font-semibold text-text-primary mb-1">
                                    {formatDate(tooltip.day.date)}
                                </div>
                                <div className="text-xs text-text-secondary space-y-0.5">
                                    <div>{tooltip.day.minutes} min studied</div>
                                    {tooltip.day.topics.length > 0 && (
                                        <div className="text-text-muted">{tooltip.day.topics.slice(0, 2).join(', ')}</div>
                                    )}
                                </div>
                                <div className="mt-1.5 flex items-center gap-1">
                                    <Flame size={10} className="text-orange-400" />
                                    <span className="text-[10px] text-orange-400">{streak} day streak</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 mt-3">
                <span className="text-[10px] text-text-muted">Less</span>
                {levelColors.map((cls, i) => (
                    <div key={i} className={`w-2.5 h-2.5 rounded-sm border ${cls}`} />
                ))}
                <span className="text-[10px] text-text-muted">More</span>
            </div>
        </motion.div>
    )
}
