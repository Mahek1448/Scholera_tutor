import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Map, CheckCircle, Circle, AlertCircle, ChevronDown, ChevronUp, BookOpen, Lightbulb } from 'lucide-react'
import { dashboardData } from '../../services/mockApi'

const statusIcon = {
    mastered: <CheckCircle size={14} className="text-emerald-400" />,
    learning: <Circle size={14} className="text-amber-400" />,
    'needs-revision': <AlertCircle size={14} className="text-rose-400" />,
}

const statusBar = {
    mastered: 'bg-emerald-400',
    learning: 'bg-amber-400',
    'needs-revision': 'bg-rose-400',
}

export default function LearningMapCard() {
    const [selected, setSelected] = useState(null)
    const { learningMap } = dashboardData

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-5 relative overflow-hidden group"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/25 flex items-center justify-center">
                    <Map size={15} className="text-blue-400" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-text-primary">Learning Map</h3>
                    <p className="text-xs text-text-muted">{learningMap.length} concepts</p>
                </div>
            </div>

            {/* Roadmap */}
            <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[18px] top-3 bottom-3 w-px bg-gradient-to-b from-primary-500/40 via-primary-500/20 to-transparent" />

                <div className="space-y-1">
                    {learningMap.map((node, i) => (
                        <div key={node.id}>
                            <motion.div
                                whileHover={{ x: 4 }}
                                onClick={() => setSelected(selected?.id === node.id ? null : node)}
                                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${selected?.id === node.id
                                        ? 'bg-primary-600/15 border border-primary-500/30'
                                        : 'hover:bg-surface-3 border border-transparent'
                                    }`}
                            >
                                {/* Node dot */}
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border-2 z-10 ${node.status === 'mastered'
                                        ? 'bg-emerald-500/20 border-emerald-400/60'
                                        : node.status === 'learning'
                                            ? 'bg-amber-500/20 border-amber-400/60'
                                            : 'bg-rose-500/20 border-rose-400/60'
                                    }`}>
                                    {statusIcon[node.status]}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-text-primary truncate">{node.label}</span>
                                        <div className="flex items-center gap-1.5 flex-shrink-0">
                                            <div className="w-14 h-1 bg-surface-3 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${statusBar[node.status]}`}
                                                    style={{ width: `${node.understanding}%` }}
                                                />
                                            </div>
                                            <span className="text-[11px] text-text-muted">{node.understanding}%</span>
                                            {selected?.id === node.id
                                                ? <ChevronUp size={12} className="text-text-muted" />
                                                : <ChevronDown size={12} className="text-text-muted" />
                                            }
                                        </div>
                                    </div>
                                    <div className="text-[11px] text-text-muted mt-0.5">{node.lecture} · Slide {node.slide}</div>
                                </div>
                            </motion.div>

                            {/* Expanded detail */}
                            <AnimatePresence>
                                {selected?.id === node.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                                        className="overflow-hidden ml-12"
                                    >
                                        <div className="bg-surface-2 rounded-xl p-3 mb-1 border border-border">
                                            <div className="flex items-center gap-1.5 mb-2">
                                                <Lightbulb size={12} className="text-primary-400" />
                                                <span className="text-xs font-semibold text-text-secondary">Related Concepts</span>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {node.related.map((r) => (
                                                    <span key={r} className="text-[11px] bg-primary-500/10 text-primary-300 border border-primary-500/20 px-2 py-0.5 rounded-full">
                                                        {r}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-border">
                                                <BookOpen size={11} className="text-text-muted" />
                                                <span className="text-[11px] text-text-muted">{node.lecture} · Slide {node.slide}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Connector animation */}
                            {i < learningMap.length - 1 && (
                                <motion.div
                                    initial={{ scaleY: 0, opacity: 0 }}
                                    animate={{ scaleY: 1, opacity: 1 }}
                                    transition={{ delay: 0.05 * i }}
                                    className="ml-[18px] w-px h-1 bg-primary-500/30"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}
