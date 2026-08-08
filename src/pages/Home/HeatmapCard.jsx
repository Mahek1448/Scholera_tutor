import { useState } from 'react'
import { motion } from 'framer-motion'

// Topics with simulated understanding levels (0-100)
const TOPICS = [
    { name: 'Linear Regression', score: 92, category: 'Supervised' },
    { name: 'Gradient Descent', score: 85, category: 'Optimization' },
    { name: 'Neural Networks', score: 78, category: 'Deep Learning' },
    { name: 'Backpropagation', score: 61, category: 'Deep Learning' },
    { name: 'Decision Trees', score: 88, category: 'Supervised' },
    { name: 'Random Forest', score: 74, category: 'Ensemble' },
    { name: 'SVM', score: 55, category: 'Supervised' },
    { name: 'K-Means', score: 82, category: 'Unsupervised' },
    { name: 'PCA', score: 47, category: 'Dimensionality' },
    { name: 'Transformers', score: 33, category: 'Deep Learning' },
    { name: 'Attention', score: 28, category: 'Deep Learning' },
    { name: 'Regularization', score: 69, category: 'Optimization' },
    { name: 'Cross-Validation', score: 91, category: 'Evaluation' },
    { name: 'Bias–Variance', score: 76, category: 'Theory' },
    { name: 'Bayesian Methods', score: 41, category: 'Probabilistic' },
    { name: 'Reinforcement Learning', score: 19, category: 'RL' },
]

function scoreToColor(score) {
    if (score >= 80) return { bg: 'rgba(26,158,109,0.85)', text: 'white', label: 'Strong' }
    if (score >= 60) return { bg: 'rgba(26,158,109,0.45)', text: '#0D4F39', label: 'Good' }
    if (score >= 40) return { bg: 'rgba(196,98,45,0.45)', text: '#6E2E14', label: 'Weak' }
    return { bg: 'rgba(196,98,45,0.85)', text: 'white', label: 'Needs work' }
}

export default function HeatmapCard() {
    const [hovered, setHovered] = useState(null)

    const avg = Math.round(TOPICS.reduce((s, t) => s + t.score, 0) / TOPICS.length)
    const strong = TOPICS.filter(t => t.score >= 80).length
    const needsWork = TOPICS.filter(t => t.score < 40).length

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="card p-5"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                        Understanding Heatmap
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        Hover a topic to see your score
                    </p>
                </div>
                <div className="flex gap-4 text-right">
                    <div>
                        <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{avg}%</div>
                        <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Avg score</div>
                    </div>
                    <div>
                        <div className="text-xs font-bold text-primary-600">{strong}</div>
                        <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Strong</div>
                    </div>
                    <div>
                        <div className="text-xs font-bold text-accent-600">{needsWork}</div>
                        <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Review</div>
                    </div>
                </div>
            </div>

            {/* Heatmap grid */}
            <div className="grid grid-cols-4 gap-1.5">
                {TOPICS.map((topic, i) => {
                    const { bg, text } = scoreToColor(topic.score)
                    const isHov = hovered === i
                    return (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.04, zIndex: 10 }}
                            onHoverStart={() => setHovered(i)}
                            onHoverEnd={() => setHovered(null)}
                            className="relative rounded-lg px-2 py-2.5 cursor-default text-center transition-all"
                            style={{ background: bg }}
                        >
                            <div className="text-[10px] font-medium leading-tight truncate" style={{ color: text }}>
                                {topic.name}
                            </div>
                            {isHov && (
                                <motion.div
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-semibold rounded-full px-2 py-0.5 whitespace-nowrap z-20 shadow-md"
                                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                                >
                                    {topic.score}% · {scoreToColor(topic.score).label}
                                </motion.div>
                            )}
                            {/* Score bar at bottom */}
                            <div className="absolute bottom-0 left-0 h-0.5 rounded-b-lg transition-all"
                                style={{ width: `${topic.score}%`, background: 'rgba(255,255,255,0.35)' }} />
                        </motion.div>
                    )
                })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 mt-3 flex-wrap">
                {[
                    { label: '80–100% Strong', bg: 'rgba(26,158,109,0.85)' },
                    { label: '60–79% Good', bg: 'rgba(26,158,109,0.40)' },
                    { label: '40–59% Weak', bg: 'rgba(196,98,45,0.40)' },
                    { label: '0–39% Review', bg: 'rgba(196,98,45,0.85)' },
                ].map(item => (
                    <div key={item.label} className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm" style={{ background: item.bg }} />
                        <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}
