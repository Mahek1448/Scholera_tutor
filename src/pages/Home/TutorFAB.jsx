import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function TutorFAB() {
    const navigate = useNavigate()

    return (
        <motion.button
            onClick={() => navigate('/tutor')}
            whileHover={{
                scale: 1.03,
                boxShadow: '0 10px 32px rgba(26,158,109,0.35)',
            }}
            whileTap={{ scale: 0.97 }}
            className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full px-2.5 py-2 shadow-lg transition-all"
            style={{
                background: 'linear-gradient(135deg, #1A9E6D 0%, #137F57 100%)',
                color: 'white',
                boxShadow: '0 6px 24px rgba(26,158,109,0.30)',
            }}
            aria-label="Ask Me Buddy"
        >
            {/* Robot */}
            <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-white">
                <img
                    src="/buddy.jpg"
                    alt="Ask Me Buddy"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Text */}
            <span className="text-sm font-semibold whitespace-nowrap">
                Ask Me Buddy
            </span>

            {/* Arrow */}
            <ArrowRight
                size={17}
                strokeWidth={2.2}
                className="mr-1"
            />
        </motion.button>
    )
}