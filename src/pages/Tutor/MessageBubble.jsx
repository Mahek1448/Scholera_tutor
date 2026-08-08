import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bookmark, BookmarkCheck, RotateCcw, User } from 'lucide-react'
import MarkdownRenderer from '../../components/ui/MarkdownRenderer'
import Citation from './Citation'
import RelatedConcepts from './RelatedConcepts'

export default function MessageBubble({ message, onRetry, onSave, onConceptClick }) {
    const [saved, setSaved] = useState(message.saved || false)
    const isUser = message.role === 'user'

    const handleSave = () => {
        const newSaved = !saved
        setSaved(newSaved)
        onSave?.(message.id, newSaved)
    }

    if (isUser) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 12, x: 20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex items-start gap-3 justify-end"
            >
                <div className="max-w-[80%] bg-primary-500 rounded-2xl rounded-tr-md px-4 py-3 shadow-sm">
                    <p className="text-sm text-white leading-relaxed">{message.content}</p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-surface-2 border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User size={15} className="text-text-muted" />
                </div>
            </motion.div>
        )
    }

    // AI message
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex items-start gap-3"
        >
            {/* AI avatar */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 shadow-glow-sm mt-0.5">
                <span className="text-white text-xs font-bold">S</span>
            </div>

            {/* Content card */}
            <div className="flex-1 min-w-0">
                <div className={`bg-white rounded-2xl rounded-tl-md border border-border shadow-card p-4 ${message.error ? 'border-rose-200 bg-rose-50' : ''}`}>
                    {message.error && !message.content ? (
                        <div className="text-sm text-rose-600">{message.error}</div>
                    ) : (
                        <>
                            <MarkdownRenderer content={message.content || ''} />
                            {message.error && (
                                <div className="mt-3 pt-3 border-t border-rose-200">
                                    <p className="text-xs text-rose-600 flex items-center gap-1.5">
                                        <span>⚠</span>
                                        <span>{message.error}</span>
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Citations */}
                {message.citations && message.citations.length > 0 && (
                    <Citation citations={message.citations} />
                )}

                {/* Related concepts */}
                {!message.streaming && message.content && message.role === 'assistant' && (
                    <div className="mt-2 px-1">
                        <RelatedConcepts content={message.content} onConceptClick={onConceptClick} />
                    </div>
                )}

                {/* Action buttons — Save & Retry */}
                {!message.streaming && (
                    <div className="flex items-center gap-2 mt-2 px-1">
                        {/* Save */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSave}
                            className={`flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-lg border transition-all ${saved
                                ? 'text-primary-600 bg-primary-50 border-primary-200'
                                : 'text-text-muted bg-white border-border hover:text-text-primary hover:border-border-light hover:bg-surface-2'
                                }`}
                        >
                            {saved ? <BookmarkCheck size={12} /> : <Bookmark size={12} />}
                            <span>{saved ? 'Saved' : 'Save'}</span>
                        </motion.button>

                        {/* Retry */}
                        {onRetry && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onRetry}
                                className="flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-lg border text-text-muted bg-white border-border hover:text-text-primary hover:bg-surface-2 hover:border-border-light transition-all"
                            >
                                <RotateCcw size={12} />
                                <span>Retry</span>
                            </motion.button>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    )
}
