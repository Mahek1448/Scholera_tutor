import { motion } from 'framer-motion'
import StudyStreakCard from './StudyStreakCard'
import HeatmapCard from './HeatmapCard'
import LearningMapCard from './LearningMapCard'
import TopicsLeftCard from './TopicsLeftCard'
import ContinueLearningCard from './ContinueLearningCard'
import TodayProgressCard from './TodayProgressCard'
import TutorFAB from './TutorFAB'
import AnimatedBackground from './AnimatedBackground'

const pageVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
}

function getGreeting() {
    const h = new Date().getHours()
    if (h < 5) return 'Late night study session 🌙'
    if (h < 12) return 'Good morning 🌅'
    if (h < 17) return 'Good afternoon ☀️'
    if (h < 21) return 'Good evening 👋'
    return 'Evening study time 🌙'
}

function getCurrentUser() {
    try {
        const u = localStorage.getItem('scholera_current_user')
        return u ? JSON.parse(u) : null
    } catch { return null }
}

export default function Home() {
    const user = getCurrentUser()
    const firstName = user?.name?.split(' ')[0] || 'there'

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative h-full overflow-y-auto"
            style={{ background: 'var(--bg)' }}
        >
            {/* Animated background — mouse repulsion effect */}
            <AnimatedBackground />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="mb-8"
                >
                    <p className="text-sm font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                        {getGreeting()}
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
                        Hello, <span className="gradient-text">{firstName}</span>
                    </h1>
                    <p className="mt-2 text-base" style={{ color: 'var(--text-secondary)' }}>
                        Continue your learning journey. Here's where you stand.
                    </p>
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

            {/* Floating Tutor button */}
            <TutorFAB />
        </motion.div>
    )
}
