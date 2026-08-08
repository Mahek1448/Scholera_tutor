import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain } from 'lucide-react'
import { dashboardData } from '../../services/mockApi'

const statusConfig = {
    mastered: { color: 'bg-emerald-500/70 border-emerald-400/50', dot: 'bg-emerald-400', label: 'Mastered' },
    learning: { color: 'bg-amber-500/60 border-amber-400/50', dot: 'bg-amber-400', label: 'Learning' },
    'needs-revision': { color: 'bg-rose-500/60 border-rose-400/50', dot: 'bg-rose-400', label: 'Needs Revision' },
}

export default function HeatmapCard() {
    const [hovered, setHovered] = useState(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const { heatmapTopics } = dashboardData

    const mastered = heatmapTopics.filter(t => t.status === 'mastered').length
    const learning = heatmapTopics.filter(t => t.status === 'learning').length
    const revision = heatmapTopics.filter(t => t.status === 'needs-revision').length

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass rounded-2xl p-5 relative overflow-visible group"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent-500/15 border border-accent-500/25 flex items-center justify-center">
                        <Brain size={15} className="text-accent-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-text-primary">Understanding Heatmap</h3>
                        <p className="text-xs text-text-muted">{heatmapTopics.length} topics tracked</p>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div
                className="grid gap-1.5"
                style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(52px, 1fr))' }}
                onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
            >
                {heatmapTopics.map((topic) => {
                    const cfg = statusConfig[topic.status]
                    return (
                        <motion.div
                            key={topic.id}
                            whileHover={{ scale: 1.12, zIndex: 10 }}
                            onMouseEnter={() => setHovered(topic)}
                            onMouseLeave={() => setHovered(null)}
                            className={`relative h-12 rounded-xl border cursor-pointer flex flex-col items-center justify-center gap-0.5 ${cfg.color} transition-all`}
                            title={topic.name}
                        >
                            <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            <span className="text-[9px] text-gray-700 font-medium text-center leading-tight px-1 truncate w-full text-center">
                                {topic.name.length > 10 ? topic.name.slice(0, 8) + '…' : topic.name}
                            </span>
                        </motion.div>
                    )
                })}
            </div>

            {/* Tooltip */}
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        className="fixed z-50 pointer-events-none"
                        style={{ left: mousePos.x + 16, top: mousePos.y - 100 }}
                    >
                        <div className="glass border border-border rounded-2xl p-4 shadow-card-hover min-w-[220px]">
                            <div className="flex items-center gap-2 mb-3">
                                <div className={`w-2.5 h-2.5 rounded-full ${statusConfig[hovered.status].dot}`} />
                                <span className="text-sm font-semibold text-text-primary">{hovered.name}</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-text-muted">Understanding</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 h-1.5 bg-surface-3 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${hovered.understanding}%` }}
                                                className={`h-full rounded-full ${statusConfig[hovered.status].dot.replace('bg-', 'bg-')}`}
                                            />
                                        </div>
                                        <span className="text-xs font-semibold text-text-primary">{hovered.understanding}%</span>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs text-text-muted">Times Asked</span>
                                    <span className="text-xs text-text-primary">{hovered.timesAsked}×</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs text-text-muted">Lecture</span>
                                    <span className="text-xs text-primary-500">{hovered.lecture}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs text-text-muted">Slide</span>
                                    <span className="text-xs text-text-primary">#{hovered.slide}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs text-text-muted">Last Revised</span>
                                    <span className="text-xs text-text-secondary">{hovered.lastRevised}</span>
                                </div>
                                <div className="pt-1 border-t border-border">
                                    <span className={`text-[11px] font-semibold ${hovered.status === 'mastered' ? 'text-emerald-400' :
                                        hovered.status === 'learning' ? 'text-amber-400' : 'text-rose-400'
                                        }`}>
                                        {statusConfig[hovered.status].label}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Legend */}
            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border">
                {[
                    { label: 'Mastered', dot: 'bg-emerald-400', count: mastered },
                    { label: 'Learning', dot: 'bg-amber-400', count: learning },
                    { label: 'Needs Revision', dot: 'bg-rose-400', count: revision },
                ].map(({ label, dot, count }) => (
                    <div key={label} className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${dot}`} />
                        <span className="text-[11px] text-text-muted">{label}</span>
                        <span className="text-[11px] font-semibold text-text-secondary">({count})</span>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}
