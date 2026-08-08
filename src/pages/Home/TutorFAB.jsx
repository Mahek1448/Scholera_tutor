import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export default function TutorFAB() {
    const [hovered, setHovered] = useState(false)
    const navigate = useNavigate()

    return (
        <motion.div
            className="fixed bottom-6 right-6 z-30 flex items-center"
            style={{ pointerEvents: 'auto' }}
        >
            <AnimatePresence>
                {hovered && (
                    <motion.span
                        initial={{ opacity: 0, x: 8, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 8, scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className="mr-2 text-sm font-medium text-white rounded-full px-3 py-1.5 pointer-events-none"
                        style={{ background: 'rgba(26,158,109,0.92)', backdropFilter: 'blur(8px)' }}
                    >
                        Ask Tutor
                    </motion.span>
                )}
            </AnimatePresence>

            <motion.button
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                whileHover={{ scale: 1.08, boxShadow: '0 8px 32px rgba(26,158,109,0.35)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/tutor')}
                className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-glow"
                style={{
                    background: 'linear-gradient(135deg, #1A9E6D 0%, #137F57 100%)',
                    boxShadow: '0 4px 20px rgba(26,158,109,0.3)',
                }}
                aria-label="Ask AI Tutor"
            >
                <Sparkles size={22} />
            </motion.button>
        </motion.div>
    )
}
