import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

// Generate 16 weeks of data
function generateStreakData() {
    const arr = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const startDay = new Date(today)
    startDay.setDate(today.getDate() - 111) // ~16 weeks back
    const dayOfWeek = startDay.getDay()
    startDay.setDate(startDay.getDate() - dayOfWeek) // align to Sunday

    for (let d = new Date(startDay); d <= today; d.setDate(d.getDate() + 1)) {
        const chance = Math.random()
        let level = 0
        if (chance > 0.48) {
            if (chance > 0.85) level = 4
            else if (chance > 0.72) level = 3
            else if (chance > 0.60) level = 2
            else level = 1
        }
        arr.push({ date: new Date(d), level })
    }
    return arr
}

const LEVEL_COLORS = [
    'var(--surface-2)',       // 0 - empty
    'rgba(26,158,109,0.22)', // 1
    'rgba(26,158,109,0.45)', // 2
    'rgba(26,158,109,0.68)', // 3
    'rgba(26,158,109,0.95)', // 4
]

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function StudyStreakCard() {
    const data = useMemo(() => generateStreakData(), [])
    const [tooltip, setTooltip] = useState(null)

    const weeks = useMemo(() => {
        const result = []
        for (let i = 0; i < data.length; i += 7) {
            result.push(data.slice(i, i + 7))
        }
        return result
    }, [data])

    const totalDays = data.filter(d => d.level > 0).length
    const currentStreak = useMemo(() => {
        let streak = 0
        for (let i = data.length - 1; i >= 0; i--) {
            if (data[i].level > 0) streak++
            else break
        }
        return streak
    }, [data])

    const monthLabels = useMemo(() => {
        const labels = []
        weeks.forEach((week, wi) => {
            const first = week[0]
            if (first?.date.getDate() <= 7) {
                labels.push({ wi, label: first.date.toLocaleString('default', { month: 'short' }) })
            }
        })
        return labels
    }, [weeks])

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="card p-5 flex flex-col"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3 flex-shrink-0">
                <div>
                    <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                        Study Streak
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        {totalDays} active days · last 16 weeks
                    </p>
                </div>
                <div className="flex gap-4">
                    <Stat label="Current" value={`${currentStreak}d`} />
                    <Stat label="Total" value={`${totalDays}d`} />
                </div>
            </div>

            {/* Month labels row */}
            <div className="flex gap-[3px] mb-1 pl-8 flex-shrink-0">
                {weeks.map((_, wi) => {
                    const label = monthLabels.find(m => m.wi === wi)
                    return (
                        <div
                            key={wi}
                            className="flex-1 text-[9px] truncate"
                            style={{ color: 'var(--text-muted)', minWidth: 0 }}
                        >
                            {label?.label || ''}
                        </div>
                    )
                })}
            </div>

            {/* Grid — flex-1 so it fills the card */}
            <div className="flex gap-[3px] flex-1 min-h-0">
                {/* Day labels */}
                <div className="flex flex-col justify-between py-0.5 pr-1 flex-shrink-0 w-7">
                    {DAY_LABELS.map((l, i) => (
                        <div
                            key={i}
                            className="text-[9px] leading-none flex items-center justify-end"
                            style={{ color: 'var(--text-muted)', height: `${100 / 7}%` }}
                        >
                            {i % 2 === 1 ? l : ''}
                        </div>
                    ))}
                </div>

                {/* Columns */}
                {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px] flex-1 min-w-0">
                        {week.map((day, di) => {
                            const tipKey = `${wi}-${di}`
                            return (
                                <motion.div
                                    key={di}
                                    onHoverStart={() => setTooltip({ key: tipKey, day })}
                                    onHoverEnd={() => setTooltip(null)}
                                    whileHover={{ scale: 1.15, zIndex: 10 }}
                                    className="relative rounded-sm cursor-default flex-1"
                                    style={{
                                        background: LEVEL_COLORS[day.level],
                                        border: `1px solid ${day.level === 0 ? 'var(--border)' : 'rgba(26,158,109,0.15)'}`,
                                        minHeight: 4,
                                    }}
                                >
                                    {tooltip?.key === tipKey && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute -top-7 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap text-[9px] font-semibold px-1.5 py-0.5 rounded shadow-md pointer-events-none"
                                            style={{
                                                background: 'var(--surface)',
                                                border: '1px solid var(--border)',
                                                color: 'var(--text-primary)',
                                            }}
                                        >
                                            {day.date?.toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                                            {day.level > 0 ? ` · ${['', 'Light', 'Moderate', 'Active', 'Intense'][day.level]}` : ' · No activity'}
                                        </motion.div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1.5 mt-3 justify-end flex-shrink-0">
                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Less</span>
                {LEVEL_COLORS.map((c, i) => (
                    <div key={i} className="w-[11px] h-[11px] rounded-sm" style={{ background: c, border: '1px solid var(--border)' }} />
                ))}
                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>More</span>
            </div>
        </motion.div>
    )
}

function Stat({ label, value }) {
    return (
        <div className="text-right">
            <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{value}</div>
            <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{label}</div>
        </div>
    )
}
