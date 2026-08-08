import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Circle, Clock, ChevronDown, ChevronUp } from 'lucide-react'

const NODES = [
    {
        id: 'intro', label: 'Intro to ML', status: 'done',
        children: ['supervised', 'unsupervised'],
    },
    {
        id: 'supervised', label: 'Supervised Learning', status: 'done',
        children: ['regression', 'classification'],
    },
    {
        id: 'unsupervised', label: 'Unsupervised Learning', status: 'active',
        children: ['clustering'],
    },
    {
        id: 'regression', label: 'Regression', status: 'done',
        children: ['trees'],
    },
    {
        id: 'classification', label: 'Classification', status: 'done',
        children: ['svm', 'trees'],
    },
    {
        id: 'clustering', label: 'Clustering', status: 'active',
        children: ['deep'],
    },
    {
        id: 'trees', label: 'Decision Trees', status: 'done',
        children: ['ensemble'],
    },
    {
        id: 'svm', label: 'SVM', status: 'partial',
        children: [],
    },
    {
        id: 'ensemble', label: 'Ensemble Methods', status: 'partial',
        children: ['deep'],
    },
    {
        id: 'deep', label: 'Deep Learning', status: 'todo',
        children: ['transformers'],
    },
    {
        id: 'transformers', label: 'Transformers', status: 'todo',
        children: [],
    },
]

const STATUS_STYLE = {
    done: { bg: 'rgba(26,158,109,0.12)', border: 'rgba(26,158,109,0.50)', text: '#137F57', icon: CheckCircle },
    active: { bg: 'rgba(196,98,45,0.10)', border: 'rgba(196,98,45,0.45)', text: '#A84E24', icon: Clock },
    partial: { bg: 'rgba(196,98,45,0.06)', border: 'rgba(196,98,45,0.25)', text: '#8B3D1C', icon: Clock },
    todo: { bg: 'var(--surface-2)', border: 'var(--border)', text: 'var(--text-muted)', icon: Circle },
}

// Build a simple left-to-right DAG display: tier by BFS depth
function buildTiers() {
    const visited = new Set()
    const tiers = []
    let frontier = ['intro']
    while (frontier.length) {
        tiers.push(frontier)
        visited.add(...frontier)
        const next = []
        for (const id of frontier) {
            const node = NODES.find(n => n.id === id)
            if (node) {
                for (const c of node.children) {
                    if (!visited.has(c) && !next.includes(c)) next.push(c)
                }
            }
        }
        frontier = next
    }
    return tiers
}

export default function LearningMapCard() {
    const [detail, setDetail] = useState(null)
    const tiers = buildTiers()

    const done = NODES.filter(n => n.status === 'done').length
    const total = NODES.length

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="card p-5"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Learning Map</h3>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        {done} of {total} topics mastered
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {['done', 'active', 'todo'].map(s => (
                        <div key={s} className="flex items-center gap-1">
                            <div className="w-2.5 h-2.5 rounded-full"
                                style={{ background: STATUS_STYLE[s].bg, border: `1.5px solid ${STATUS_STYLE[s].border}` }} />
                            <span className="text-[10px] capitalize" style={{ color: 'var(--text-muted)' }}>{s}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Map — horizontal tiers */}
            <div className="overflow-x-auto no-scrollbar">
                <div className="flex items-start gap-6 pb-2 min-w-[620px]">
                    {tiers.map((tier, ti) => (
                        <div key={ti} className="flex flex-col gap-3 flex-shrink-0">
                            {tier.map(nodeId => {
                                const node = NODES.find(n => n.id === nodeId)
                                if (!node) return null
                                const s = STATUS_STYLE[node.status]
                                const Icon = s.icon
                                const isSelected = detail === node.id
                                return (
                                    <motion.button
                                        key={node.id}
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => setDetail(isSelected ? null : node.id)}
                                        className="relative flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all"
                                        style={{
                                            background: isSelected ? s.border : s.bg,
                                            border: `1.5px solid ${s.border}`,
                                            minWidth: 130,
                                            boxShadow: isSelected ? `0 0 0 3px ${s.border}30` : 'none',
                                        }}
                                    >
                                        <Icon size={13} style={{ color: s.text, flexShrink: 0 }} />
                                        <span className="text-xs font-medium leading-tight" style={{ color: isSelected ? 'white' : s.text }}>
                                            {node.label}
                                        </span>
                                    </motion.button>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {/* Detail panel */}
            {detail && (() => {
                const node = NODES.find(n => n.id === detail)
                if (!node) return null
                const s = STATUS_STYLE[node.status]
                return (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 rounded-xl px-4 py-3"
                        style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{node.label}</span>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}>
                                {node.status === 'done' ? 'Mastered' : node.status === 'active' ? 'In Progress' : node.status === 'partial' ? 'Partially Done' : 'Not Started'}
                            </span>
                        </div>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            {node.status === 'done' && 'You have covered and understood this topic well.'}
                            {node.status === 'active' && 'You are currently working through this topic in lecture.'}
                            {node.status === 'partial' && "You started this topic but haven't fully consolidated it yet."}
                            {node.status === 'todo' && "This topic hasn't been covered in your lectures yet."}
                        </p>
                        {node.children.length > 0 && (
                            <p className="text-[10px] mt-1.5 font-medium" style={{ color: 'var(--text-muted)' }}>
                                Unlocks → {node.children.map(c => NODES.find(n => n.id === c)?.label).join(', ')}
                            </p>
                        )}
                    </motion.div>
                )
            })()}
        </motion.div>
    )
}
