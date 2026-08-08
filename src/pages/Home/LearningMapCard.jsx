import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    CheckCircle,
    Circle,
    Clock,
    Map,
    ArrowRight
} from 'lucide-react'

const NODES = [
    {
        id: 'intro',
        label: 'Intro to ML',
        lecture: 'Lecture 1',
        score: 100,
        status: 'done',
        x: 40,
        y: 100,
    },
    {
        id: 'supervised',
        label: 'Supervised Learning',
        lecture: 'Lecture 2',
        score: 100,
        status: 'done',
        x: 250,
        y: 100,
    },
    {
        id: 'regression',
        label: 'Regression',
        lecture: 'Lecture 3',
        score: 92,
        status: 'done',
        x: 460,
        y: 35,
    },
    {
        id: 'classification',
        label: 'Classification',
        lecture: 'Lecture 4',
        score: 88,
        status: 'done',
        x: 460,
        y: 165,
    },
    {
        id: 'trees',
        label: 'Decision Trees',
        lecture: 'Lecture 5',
        score: 74,
        status: 'review',
        x: 680,
        y: 100,
    },
    {
        id: 'ensemble',
        label: 'Ensemble Methods',
        lecture: 'Lecture 6',
        score: 62,
        status: 'current',
        x: 900,
        y: 100,
    },
    {
        id: 'deep',
        label: 'Deep Learning',
        lecture: 'Lecture 7',
        score: 0,
        status: 'todo',
        x: 1120,
        y: 100,
    },
    {
        id: 'transformers',
        label: 'Transformers',
        lecture: 'Lecture 8',
        score: 0,
        status: 'todo',
        x: 1340,
        y: 100,
    },
]

const CONNECTIONS = [
    ['intro', 'supervised'],
    ['supervised', 'regression'],
    ['supervised', 'classification'],
    ['regression', 'trees'],
    ['classification', 'trees'],
    ['trees', 'ensemble'],
    ['ensemble', 'deep'],
    ['deep', 'transformers'],
]

const STATUS_STYLE = {
    done: {
        background: 'rgba(26,158,109,0.10)',
        border: 'rgba(26,158,109,0.45)',
        text: '#137F57',
        icon: CheckCircle,
    },

    current: {
        background: 'rgba(26,158,109,0.13)',
        border: '#1A9E6D',
        text: '#137F57',
        icon: Clock,
    },

    review: {
        background: 'rgba(196,98,45,0.10)',
        border: 'rgba(196,98,45,0.40)',
        text: '#A84E24',
        icon: Clock,
    },

    todo: {
        background: 'var(--surface-2)',
        border: 'var(--border)',
        text: 'var(--text-muted)',
        icon: Circle,
    },
}

function getNode(id) {
    return NODES.find(node => node.id === id)
}

export default function LearningMapCard() {

    const [selected, setSelected] = useState('ensemble')

    const completed = NODES.filter(node => node.status === 'done').length
    const explored = NODES.filter(node => node.status !== 'todo').length
    const journey = Math.round((explored / NODES.length) * 100)

    const selectedNode = getNode(selected)

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="card p-5"
        >

            {/* ================= HEADER ================= */}

            <div className="flex items-center justify-between mb-5">

                <div className="flex items-center gap-3">

                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                            background: 'rgba(26,158,109,0.08)',
                            border: '1px solid rgba(26,158,109,0.18)'
                        }}
                    >
                        <Map
                            size={19}
                            color="#1A9E6D"
                        />
                    </div>

                    <div>
                        <h3
                            className="text-base font-semibold"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Knowledge Journey
                        </h3>

                        <p
                            className="text-xs mt-0.5"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            See how your concepts connect
                        </p>
                    </div>

                </div>


                {/* Statistics */}

                <div className="flex items-center gap-6">

                    <div className="text-right">
                        <div
                            className="text-lg font-bold"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            {explored}/{NODES.length}
                        </div>

                        <div
                            className="text-[10px]"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            explored
                        </div>
                    </div>

                    <div className="text-right">
                        <div
                            className="text-lg font-bold"
                            style={{ color: '#438A6A' }}
                        >
                            {journey}%
                        </div>

                        <div
                            className="text-[10px]"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            journey
                        </div>
                    </div>

                </div>

            </div>


            {/* ================= LEGEND ================= */}

            <div className="flex items-center gap-5 mb-4">

                {[
                    ['done', 'Mastered'],
                    ['current', 'Current'],
                    ['review', 'Review'],
                    ['todo', 'Upcoming']
                ].map(([status, label]) => {

                    const style = STATUS_STYLE[status]

                    return (
                        <div
                            key={status}
                            className="flex items-center gap-1.5"
                        >

                            <div
                                className="w-3 h-3 rounded-full"
                                style={{
                                    background: style.background,
                                    border: `2px solid ${style.border}`
                                }}
                            />

                            <span
                                className="text-[10px]"
                                style={{
                                    color: 'var(--text-muted)'
                                }}
                            >
                                {label}
                            </span>

                        </div>
                    )
                })}

            </div>


            {/* ================= GRAPH ================= */}

            <div
                className="relative overflow-x-auto no-scrollbar rounded-xl"
                style={{
                    background: 'rgba(26,158,109,0.015)'
                }}
            >

                <div
                    className="relative"
                    style={{
                        width: '1530px',
                        height: '285px'
                    }}
                >

                    {/* CONNECTION LINES */}

                    <svg
                        className="absolute inset-0 pointer-events-none"
                        width="1530"
                        height="285"
                    >

                        {CONNECTIONS.map(([fromId, toId], index) => {

                            const from = getNode(fromId)
                            const to = getNode(toId)

                            if (!from || !to) return null

                            const startX = from.x + 150
                            const startY = from.y + 45

                            const endX = to.x
                            const endY = to.y + 45

                            const middleX =
                                startX + (endX - startX) / 2

                            return (
                                <motion.path
                                    key={index}
                                    d={`
                                        M ${startX} ${startY}
                                        C ${middleX} ${startY},
                                          ${middleX} ${endY},
                                          ${endX} ${endY}
                                    `}
                                    fill="none"
                                    stroke="rgba(26,158,109,0.28)"
                                    strokeWidth="2"
                                    strokeDasharray="5 5"
                                    initial={{
                                        pathLength: 0,
                                        opacity: 0
                                    }}
                                    animate={{
                                        pathLength: 1,
                                        opacity: 1
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        delay: index * 0.08
                                    }}
                                />
                            )
                        })}

                    </svg>


                    {/* NODE CARDS */}

                    {NODES.map(node => {

                        const style = STATUS_STYLE[node.status]
                        const Icon = style.icon
                        const isSelected = selected === node.id

                        return (
                            <motion.button
                                key={node.id}
                                onClick={() =>
                                    setSelected(
                                        isSelected ? null : node.id
                                    )
                                }
                                whileHover={{
                                    y: -4,
                                    scale: 1.02
                                }}
                                whileTap={{
                                    scale: 0.98
                                }}
                                className="absolute text-left rounded-xl p-3 transition-all"
                                style={{
                                    left: `${node.x}px`,
                                    top: `${node.y}px`,
                                    width: '150px',
                                    height: '90px',

                                    background:
                                        isSelected
                                            ? 'rgba(26,158,109,0.12)'
                                            : style.background,

                                    border:
                                        `1.5px solid ${isSelected
                                            ? '#1A9E6D'
                                            : style.border}`,

                                    boxShadow:
                                        isSelected
                                            ? '0 0 0 3px rgba(26,158,109,0.10), 0 8px 20px rgba(0,0,0,0.06)'
                                            : '0 3px 10px rgba(0,0,0,0.03)'
                                }}
                            >

                                {/* Top row */}

                                <div className="flex items-center justify-between">

                                    <Icon
                                        size={14}
                                        style={{
                                            color: style.text
                                        }}
                                    />

                                    <span
                                        className="text-[10px] font-semibold"
                                        style={{
                                            color: style.text
                                        }}
                                    >
                                        {node.score}%
                                    </span>

                                </div>


                                {/* Topic */}

                                <div
                                    className="text-xs font-semibold mt-2 truncate"
                                    style={{
                                        color: 'var(--text-primary)'
                                    }}
                                >
                                    {node.label}
                                </div>


                                {/* Lecture */}

                                <div
                                    className="text-[10px] mt-1"
                                    style={{
                                        color: 'var(--text-muted)'
                                    }}
                                >
                                    {node.lecture}
                                </div>


                                {/* Progress */}

                                <div
                                    className="absolute bottom-2 left-3 right-3 h-1 rounded-full"
                                    style={{
                                        background:
                                            'var(--surface-2)'
                                    }}
                                >

                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: `${node.score}%`,
                                            background:
                                                node.status === 'review'
                                                    ? '#A84E24'
                                                    : '#438A6A'
                                        }}
                                    />

                                </div>

                            </motion.button>
                        )
                    })}


                    {/* CURRENT POSITION LABEL */}

                    <div
                        className="absolute text-[9px] font-bold tracking-wide"
                        style={{
                            left: '895px',
                            top: '205px',
                            color: '#438A6A'
                        }}
                    >
                        YOU ARE HERE
                    </div>

                </div>

            </div>


            {/* ================= DETAIL PANEL ================= */}

            {selectedNode && (

                <motion.div
                    key={selectedNode.id}
                    initial={{
                        opacity: 0,
                        y: 8
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    className="mt-4 rounded-xl px-4 py-3"
                    style={{
                        background: 'var(--surface-2)',
                        border: '1px solid var(--border)'
                    }}
                >

                    <div className="flex items-center justify-between">

                        <div>

                            <div className="flex items-center gap-2">

                                <h4
                                    className="text-sm font-semibold"
                                    style={{
                                        color: 'var(--text-primary)'
                                    }}
                                >
                                    {selectedNode.label}
                                </h4>

                                <span
                                    className="text-[9px] px-2 py-1 rounded-full font-medium"
                                    style={{
                                        background:
                                            STATUS_STYLE[
                                                selectedNode.status
                                            ].background,

                                        color:
                                            STATUS_STYLE[
                                                selectedNode.status
                                            ].text,

                                        border:
                                            `1px solid ${
                                                STATUS_STYLE[
                                                    selectedNode.status
                                                ].border
                                            }`
                                    }}
                                >
                                    {selectedNode.status === 'done'
                                        ? 'Mastered'
                                        : selectedNode.status === 'current'
                                            ? 'Current'
                                            : selectedNode.status === 'review'
                                                ? 'Needs Review'
                                                : 'Upcoming'}
                                </span>

                            </div>

                            <p
                                className="text-xs mt-1"
                                style={{
                                    color: 'var(--text-muted)'
                                }}
                            >
                                {selectedNode.status === 'done'
                                    ? 'You have successfully covered this concept.'
                                    : selectedNode.status === 'current'
                                        ? 'This is your current learning position.'
                                        : selectedNode.status === 'review'
                                            ? 'You have covered this topic but should revise it.'
                                            : 'This concept is coming next in your learning journey.'}
                            </p>

                        </div>


                        <div
                            className="flex items-center gap-1 text-xs font-medium"
                            style={{
                                color: '#438A6A'
                            }}
                        >
                            Next
                            <ArrowRight size={13} />
                        </div>

                    </div>

                </motion.div>

            )}


            {/* ================= COURSE PROGRESS ================= */}

            <div className="mt-4">

                <div className="flex items-center justify-between mb-1.5">

                    <span
                        className="text-[10px]"
                        style={{
                            color: 'var(--text-muted)'
                        }}
                    >
                        Course journey
                    </span>

                    <span
                        className="text-[10px] font-semibold"
                        style={{
                            color: '#438A6A'
                        }}
                    >
                        {journey}% explored
                    </span>

                </div>

                <div
                    className="h-1.5 rounded-full"
                    style={{
                        background: 'var(--surface-2)'
                    }}
                >

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{
                            width: `${journey}%`
                        }}
                        transition={{
                            duration: 1
                        }}
                        className="h-full rounded-full"
                        style={{
                            background:
                                'linear-gradient(90deg, #438A6A, #1A9E6D)'
                        }}
                    />

                </div>

            </div>

        </motion.div>
    )
}