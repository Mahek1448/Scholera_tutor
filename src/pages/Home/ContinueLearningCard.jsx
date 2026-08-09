import { motion } from 'framer-motion'
import {
    BookOpen,
    ArrowRight,
    Clock3
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const lastTopic = {
    title: 'Backpropagation',
    subtitle: 'Lecture 7 · Slide 14',
    progress: 62,
    timeSpent: '24 min',
}

export default function ContinueLearningCard({ isNewStudent = false }) {
    const navigate = useNavigate()
    if (isNewStudent) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="card p-5 h-full flex flex-col"
        >
            {/* Header */}
            <div className="flex items-center gap-3">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                        background: 'rgba(26,158,109,0.1)',
                        border: '1px solid rgba(26,158,109,0.2)'
                    }}
                >
                    <BookOpen size={17} color="#1A9E6D" />
                </div>

                <div className="min-w-0">
                    <div
                        className="text-[10px] font-medium mb-0.5"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        Start learning
                    </div>

                    <div
                        className="text-base font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Nothing here yet
                    </div>
                </div>
            </div>

            {/* Empty state */}
            <div className="flex-1 flex flex-col justify-center py-6 text-center">
                <div
                    className="w-11 h-11 rounded-full mx-auto mb-3 flex items-center justify-center"
                    style={{
                        background: 'rgba(26,158,109,0.08)'
                    }}
                >
                    <BookOpen size={18} color="#1A9E6D" />
                </div>

                <p
                    className="text-xs font-medium"
                    style={{ color: 'var(--text-primary)' }}
                >
                    Your learning starts here
                </p>

                <p
                    className="text-[10px] mt-1 leading-relaxed"
                    style={{ color: 'var(--text-muted)' }}
                >
                    Start your first session and your recent
                    learning will appear here.
                </p>
            </div>

            {/* Button */}
            <motion.button
                whileHover={{
                    x: 2,
                    boxShadow: '0 5px 14px rgba(26,158,109,0.12)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/tutor')}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all"
                style={{
                    background: 'rgba(26,158,109,0.07)',
                    border: '1px solid rgba(26,158,109,0.18)',
                    color: '#137F57'
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.background =
                        'rgba(26,158,109,0.12)'
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.background =
                        'rgba(26,158,109,0.07)'
                }}
            >
                Start Learning
                <ArrowRight size={13} />
            </motion.button>
        </motion.div>
    )
}
    

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="card p-5 h-full flex flex-col"
        >

            {/* HEADER */}
            <div className="flex items-center gap-3">

                <div
                    className="
                        w-10
                        h-10
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        flex-shrink-0
                    "
                    style={{
                        background: 'rgba(26,158,109,0.1)',
                        border: '1px solid rgba(26,158,109,0.2)'
                    }}
                >
                    <BookOpen
                        size={17}
                        color="#1A9E6D"
                    />
                </div>

                <div className="min-w-0 flex-1">

                    <div
                        className="text-[10px] font-medium mb-0.5"
                        style={{
                            color: 'var(--text-muted)'
                        }}
                    >
                        Continue learning
                    </div>

                    <div
                        className="text-base font-semibold truncate"
                        style={{
                            color: 'var(--text-primary)'
                        }}
                    >
                        {lastTopic.title}
                    </div>

                </div>

            </div>


            {/* LESSON INFORMATION */}
            <div className="mt-4">

                <div className="flex items-center justify-between">

                    <span
                        className="text-[11px]"
                        style={{
                            color: 'var(--text-muted)'
                        }}
                    >
                        {lastTopic.subtitle}
                    </span>

                    <div className="flex items-center gap-1.5">

                        <Clock3
                            size={12}
                            style={{
                                color: 'var(--text-muted)'
                            }}
                        />

                        <span
                            className="text-[10px]"
                            style={{
                                color: 'var(--text-muted)'
                            }}
                        >
                            {lastTopic.timeSpent} spent
                        </span>

                    </div>

                </div>


                {/* PROGRESS */}
                <div className="mt-4">

                    <div className="flex items-center justify-between mb-1.5">

                        <span
                            className="text-[10px]"
                            style={{
                                color: 'var(--text-muted)'
                            }}
                        >
                            Lecture progress
                        </span>

                        <span
                            className="text-[11px] font-semibold"
                            style={{
                                color: '#137F57'
                            }}
                        >
                            {lastTopic.progress}%
                        </span>

                    </div>

                    <div
                        className="w-full h-2 rounded-full"
                        style={{
                            background: 'var(--surface-2)'
                        }}
                    >

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{
                                width: `${lastTopic.progress}%`
                            }}
                            transition={{
                                duration: 0.7,
                                delay: 0.25
                            }}
                            className="h-2 rounded-full"
                            style={{
                                background:
                                    'linear-gradient(90deg, #1A9E6D, #38B985)'
                            }}
                        />

                    </div>

                </div>

            </div>


            {/* CONTINUE CONTEXT */}
            <div
                className="
                    mt-4
                    px-3.5
                    py-3
                    rounded-xl
                    flex
                    items-center
                    justify-between
                "
                style={{
                    background: 'rgba(26,158,109,0.045)',
                    border: '1px solid rgba(26,158,109,0.12)'
                }}
            >

                <div>

                    <div
                        className="text-[10px] font-medium"
                        style={{
                            color: 'var(--text-primary)'
                        }}
                    >
                        Pick up where you left off
                    </div>

                    <div
                        className="text-[10px] mt-0.5"
                        style={{
                            color: 'var(--text-muted)'
                        }}
                    >
                        Continue from Slide 14
                    </div>

                </div>

                <span
                    className="text-[10px] font-semibold"
                    style={{
                        color: '#137F57'
                    }}
                >
                    38% left
                </span>

            </div>


            {/* BUTTON */}
            <motion.button
                whileHover={{
                    x: 2,
                    boxShadow:
                        '0 5px 14px rgba(26,158,109,0.12)'
                }}

                whileTap={{
                    scale: 0.98
                }}

                onClick={() => navigate('/tutor')}

                className="
                    mt-4
                    w-full
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    px-3
                    py-2.5
                    rounded-xl
                    text-xs
                    font-semibold
                    transition-all
                "

                style={{
                    background:
                        'rgba(26,158,109,0.07)',

                    border:
                        '1px solid rgba(26,158,109,0.18)',

                    color:
                        '#137F57'
                }}

                onMouseEnter={e => {
                    e.currentTarget.style.background =
                        'rgba(26,158,109,0.12)'
                }}

                onMouseLeave={e => {
                    e.currentTarget.style.background =
                        'rgba(26,158,109,0.07)'
                }}
            >

                Continue with Tutor

                <ArrowRight size={13} />

            </motion.button>

        </motion.div>
    )
}