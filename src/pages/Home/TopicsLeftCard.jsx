import { motion } from 'framer-motion'
import { BookMarked, ArrowRight, Layers } from 'lucide-react'
import { dashboardData } from '../../services/mockApi'

export default function TopicsLeftCard() {
    const { heatmapTopics } = dashboardData
    const total = heatmapTopics.length
    const mastered = heatmapTopics.filter(t => t.status === 'mastered').length
    const learning = heatmapTopics.filter(t => t.status === 'learning').length
    const revision = heatmapTopics.filter(t => t.status === 'needs-revision').length

    const categories = [
        { label: 'Mastered', count: mastered, color: '#16A34A', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600' },
        { label: 'Learning', count: learning, color: '#D97706', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600' },
        { label: 'Needs Revision', count: revision, color: '#DC2626', bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600' },
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-5 relative overflow-hidden group"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                    <Layers size={15} className="text-emerald-600" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-text-primary">Topics Overview</h3>
                    <p className="text-xs text-text-muted">{total} total topics</p>
                </div>
            </div>

            {/* Stacked progress bar */}
            <div className="h-3 rounded-full overflow-hidden bg-surface-3 flex mb-4">
                {categories.map(({ count, color, label }) => (
                    <motion.div
                        key={label}
                        initial={{ width: 0 }}
                        animate={{ width: `${(count / total) * 100}%` }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                        style={{ backgroundColor: color }}
                        className="h-full first:rounded-l-full last:rounded-r-full"
                    />
                ))}
            </div>

            {/* Category cards */}
            <div className="grid grid-cols-3 gap-2">
                {categories.map(({ label, count, bg, border, text, color }) => (
                    <motion.div
                        key={label}
                        whileHover={{ y: -2 }}
                        className={`${bg} border ${border} rounded-xl p-3 text-center`}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', delay: 0.5 }}
                            className={`text-2xl font-bold ${text}`}
                        >
                            {count}
                        </motion.div>
                        <div className="text-[10px] text-text-muted mt-0.5 leading-tight">{label}</div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
