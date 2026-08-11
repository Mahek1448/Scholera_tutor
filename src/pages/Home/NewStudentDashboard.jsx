import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import TopicsLeftCard from './TopicsLeftCard'
import ContinueLearningCard from './ContinueLearningCard'
import StudyStreakCard from './StudyStreakCard'
import TodayProgressCard from './TodayProgressCard'

export default function NewStudentDashboard() {
    const navigate = useNavigate()

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-5"
        >

            {/* Welcome */}
            <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="card p-6 relative overflow-hidden"
            >
                <div
                    className="absolute -top-16 -right-16 w-32 h-32 rounded-full pointer-events-none"
                    style={{
                        background: 'rgba(21,101,192,0.06)',
                        filter: 'blur(20px)'
                    }}
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative">

                    <div className="flex items-start gap-4">

                        <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{
                                background: 'rgba(21,101,192,0.1)',
                                border: '1px solid rgba(21,101,192,0.2)'
                            }}
                        >
                            <Sparkles
                                size={22}
                                style={{ color: '#1565C0' }}
                            />
                        </div>

                        <div>
                            <h2
                                className="text-lg font-semibold"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Welcome to your learning journey!
                            </h2>

                            <p
                                className="text-sm mt-1 max-w-xl"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                You haven't started studying yet. Start your
                                first session and we'll build your personalized
                                learning dashboard as you progress.
                            </p>
                        </div>

                    </div>

                    <motion.button
                        whileHover={{ scale: 1.03, x: 2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/tutor')}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white flex-shrink-0"
                        style={{
                            background: 'linear-gradient(135deg, #1565C0, #0D47A1)',
                            boxShadow: '0 4px 16px rgba(21,101,192,0.22)'
                        }}
                    >
                        Start Learning
                    </motion.button>

                </div>
            </motion.div>


            {/* Existing Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                <TopicsLeftCard newStudent={true} />

                <ContinueLearningCard newStudent={true} />

                <StudyStreakCard newStudent={true} />

                <TodayProgressCard newStudent={true} />

            </div>

        </motion.div>
    )
}