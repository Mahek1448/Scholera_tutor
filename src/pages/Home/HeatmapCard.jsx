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
    if (score >= 80) {
        return {
            bg: 'rgba(21,101,192,0.85)',
            text: '#FFFFFF',
            label: 'Strong',
            labelColor: '#FFFFFF'
        }
    }

    if (score >= 60) {
        return {
            bg: '#64B5F6',
            text: '#0D47A1',
            label: 'Good',
            labelColor: '#1565C0'
        }
    }

    if (score >= 40) {
        return {
            bg: '#AEDBFF',
            text: '#0d47a1',
            label: 'Weak',
            labelColor: '#7B1FA2'
        }
    }

    return {
        bg: 'rgb(207 233 255)',
        text: '#1E293B',
        label: 'Needs work',
        labelColor: '#1565C0'
    }
}

export default function HeatmapCard({ isNewStudent = false }) {
    const [hovered, setHovered] = useState(null)

    const avg = isNewStudent ? 0 : Math.round(
        TOPICS.reduce((sum, topic) => sum + topic.score, 0) / TOPICS.length
    )

    const strong = isNewStudent
        ? 0
        : TOPICS.filter(topic => topic.score >= 80).length

    const needsWork = isNewStudent
        ? 0
        : TOPICS.filter(topic => topic.score < 40).length
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="card p-5 h-full"
        >

            {/* Header */}
            <div className="flex items-start justify-between mb-4">

                <div>
                    <h3
                        className="text-sm font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Understanding Heatmap
                    </h3>

                    <p
                        className="text-xs mt-0.5"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        {isNewStudent
                            ? 'Start studying to build your understanding'
                            : 'Hover a topic to see your understanding'}
                    </p>
                </div>

                {/* Statistics */}
                <div className="flex gap-4 text-right shrink-0">

                    <div>
                        <div
                            className="text-xs font-bold"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            {avg}%
                        </div>

                        <div
                            className="text-[10px]"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            Avg score
                        </div>
                    </div>

                    <div>
                        <div
                            className="text-xs font-bold"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            {strong}
                        </div>

                        <div
                            className="text-[10px]"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            Strong
                        </div>
                    </div>

                    <div>
                        <div
                            className="text-xs font-bold"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            {needsWork}
                        </div>

                        <div
                            className="text-[10px]"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            Review
                        </div>
                    </div>

                </div>
            </div>

            {isNewStudent && (
                <div className="py-8 text-center">
                    <p
                        className="text-xs font-medium"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        No topics assessed yet
                    </p>

                    <p
                        className="text-[10px] mt-1"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        Start studying to see your understanding grow here.
                    </p>
                </div>
            )}
            {/* Topic Grid */}
            {!isNewStudent && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">

                    {TOPICS.map((topic, index) => {

                        const { bg, text, label, labelColor } = scoreToColor(topic.score)

                        const isHovered = hovered === index

                        return (
                            <motion.div
                                key={topic.name}

                                whileHover={{
                                    scale: 1.035,
                                    y: -2,
                                    zIndex: 20
                                }}

                                transition={{
                                    type: 'spring',
                                    stiffness: 400,
                                    damping: 20
                                }}

                                onHoverStart={() => setHovered(index)}
                                onHoverEnd={() => setHovered(null)}

                                className="relative h-11 min-w-0 rounded-lg px-2 cursor-default flex items-center justify-center overflow-visible"

                                style={{
                                    background: bg,
                                    color: text,
                                    boxShadow: isHovered
                                        ? '0 6px 16px rgba(0,0,0,0.10)'
                                        : 'none'
                                }}
                            >

                                {/* Topic name */}
                                <span
                                    className="text-[10px] sm:text-[11px] font-medium leading-tight text-center truncate w-full"
                                    style={{ color: text }}
                                    title={topic.name}
                                >
                                    {topic.name}
                                </span>


                                {/* Score indicator */}
                                <div
                                    className="absolute bottom-0 left-0 h-0.5 rounded-b-lg"
                                    style={{
                                        width: `${topic.score}%`,
                                        background: 'rgba(255,255,255,0.45)'
                                    }}
                                />


                                {/* Hover information */}
                                {isHovered && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 5,
                                            scale: 0.95
                                        }}

                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1
                                        }}

                                        transition={{
                                            duration: 0.15
                                        }}

                                        className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-max max-w-[190px] px-3 py-2 rounded-lg shadow-lg z-50 pointer-events-none"

                                        style={{
                                            background: 'var(--surface)',
                                            border: '1px solid var(--border)',
                                            color: 'var(--text-primary)'
                                        }}
                                    >

                                        <div className="text-[11px] font-semibold">
                                            {topic.name}
                                        </div>

                                        <div
                                            className="text-[10px] mt-0.5"
                                            style={{
                                                color: 'var(--text-muted)'
                                            }}
                                        >
                                            {topic.category}
                                        </div>

                                        <div className="flex items-center gap-2 mt-1.5">

                                            <span className="text-[11px] font-bold">
                                                {topic.score}%
                                            </span>

                                           <span
    className="text-[10px] font-medium"
    style={{
        color: labelColor
    }}
>
    {label}
</span>

                                        </div>

                                    </motion.div>
                                )}

                            </motion.div>
                        )
                    })}

                </div>)}


            {/* Legend */}
            {!isNewStudent && (
                <div className="flex items-center gap-x-4 gap-y-2 mt-8 flex-wrap">

                   {[
    {
        label: '80–100% Strong',
        bg: 'rgba(21,101,192,0.85)'
    },
    {
        label: '60–79% Good',
        bg: '#64B5F6'
    },
    {
        label: '40–59% Weak',
        bg: '#AEDBFF'
    },
    {
        label: '0–39% Review',
        bg: 'rgb(207 233 255)'
    }
].map(item => (
                        <div
                            key={item.label}
                            className="flex items-center gap-1.5"
                        >

                            <div
                                className="w-3 h-3 rounded-sm shrink-0"
                                style={{
                                    background: item.bg
                                }}
                            />

                            <span
                                className="text-[10px]"
                                style={{
                                    color: 'var(--text-muted)'
                                }}
                            >
                                {item.label}
                            </span>

                        </div>

                    ))}

                </div>)}

        </motion.div>
    )
}