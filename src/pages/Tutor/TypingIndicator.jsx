import { motion } from 'framer-motion'

export default function TypingIndicator() {
    return (
        <div className="flex items-start gap-3 px-1">
            {/* Avatar */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center flex-shrink-0 shadow-glow-sm mt-0.5">
                <span className="text-white text-xs font-bold">S</span>
            </div>

            {/* Dots */}
            <div className="glass rounded-2xl rounded-tl-md px-4 py-3 border border-border">
                <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-primary-400/70"
                            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
