import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import StudyStreakCard from './StudyStreakCard'
import HeatmapCard from './HeatmapCard'
import LearningMapCard from './LearningMapCard'
import TopicsLeftCard from './TopicsLeftCard'
import ContinueLearningCard from './ContinueLearningCard'
import TodayProgressCard from './TodayProgressCard'
import { dashboardData } from '../../services/mockApi'
import { Sparkles, ArrowRight, GraduationCap } from 'lucide-react'

const pageVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
}

export default function Home() {
    const navigate = useNavigate()
    const { student, course } = dashboardData

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative h-full overflow-y-auto"
            style={{ background: '#F5F7FA' }}
        >
            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="mb-6"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1.5 bg-primary-50 border border-primary-100 rounded-full px-3 py-1">
                            <GraduationCap size={12} className="text-primary-500" />
                            <span className="text-xs text-primary-600 font-medium">{course.code} · {course.instructor}</span>
                        </div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mt-2">
                        Good evening, <span className="gradient-text">{student.name.split(' ')[0]}</span> 👋
                    </h1>
                    <p className="text-text-secondary mt-2 text-base">
                        Ready to continue with <span className="text-text-primary font-medium">{course.title}</span>?
                        You're making great progress.
                    </p>
                </motion.div>

                {/* Open Tutor CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                >
                    <motion.button
                        whileHover={{ scale: 1.01, y: -2 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => navigate('/tutor')}
                        className="relative w-full overflow-hidden rounded-2xl border border-primary-200 bg-white shadow-card hover:shadow-card-hover transition-all"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-50 via-transparent to-accent-50 opacity-60" />
                        <div className="relative px-6 py-5 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow-sm flex-shrink-0">
                                    <Sparkles size={22} className="text-white" />
                                </div>
                                <div className="text-left">
                                    <div className="text-lg font-bold text-text-primary">Open AI Tutor</div>
                                    <div className="text-sm text-text-secondary">Ask anything from your lecture materials</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl text-white text-sm font-semibold shadow-glow-sm flex-shrink-0">
                                <span>Ask Now</span>
                                <ArrowRight size={16} />
                            </div>
                        </div>
                    </motion.button>
                </motion.div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {/* Row 1: Streak + Today Progress */}
                    <div className="col-span-1 md:col-span-2 xl:col-span-2">
                        <StudyStreakCard />
                    </div>
                    <div className="col-span-1">
                        <TodayProgressCard />
                    </div>

                    {/* Row 2: Heatmap + Side cards */}
                    <div className="col-span-1 md:col-span-2 xl:col-span-2">
                        <HeatmapCard />
                    </div>
                    <div className="col-span-1 flex flex-col gap-4">
                        <ContinueLearningCard />
                        <TopicsLeftCard />
                    </div>

                    {/* Row 3: Learning Map (full width) */}
                    <div className="col-span-1 md:col-span-2 xl:col-span-3">
                        <LearningMapCard />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
