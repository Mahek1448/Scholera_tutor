import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Send, Square, Sparkles } from 'lucide-react'

export default function ChatInput({ onSend, isStreaming, onStop }) {
    const [value, setValue] = useState('')
    const textareaRef = useRef(null)

    const autoResize = useCallback(() => {
        const ta = textareaRef.current
        if (!ta) return
        ta.style.height = 'auto'
        ta.style.height = Math.min(ta.scrollHeight, 200) + 'px'
    }, [])

    useEffect(() => {
        autoResize()
    }, [value, autoResize])

    const handleSubmit = (e) => {
        e?.preventDefault()
        if (!value.trim() || isStreaming) return
        onSend(value.trim())
        setValue('')
        if (textareaRef.current) textareaRef.current.style.height = 'auto'
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    return (
        <div className="px-0 py-4">
            <motion.div
                initial={false}
                animate={{
                    boxShadow: value.length > 0
                        ? '0 0 0 2px rgba(21,101,192,0.25), 0 4px 16px rgba(21,101,192,0.08)'
                        : '0 1px 4px rgba(0,0,0,0.06), 0 0 0 1px #DDE1EB'
                }}
                className="relative flex items-end gap-2 bg-white border border-border rounded-2xl overflow-hidden"
            >
                {/* Sparkle icon */}
                <div className="absolute left-4 bottom-3.5 pointer-events-none">
                    <Sparkles size={16} className="text-text-muted" />
                </div>

                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything from your lecture materials…"
                    disabled={isStreaming}
                    rows={1}
                    className="flex-1 bg-transparent text-text-primary placeholder-text-muted text-sm resize-none pl-10 pr-4 py-3.5 outline-none disabled:opacity-50 disabled:cursor-not-allowed leading-relaxed"
                    style={{ maxHeight: '200px' }}
                />

                <div className="flex-shrink-0 p-2">
                    {isStreaming ? (
                        <motion.button
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onStop}
                            className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500 hover:bg-rose-100 transition-colors"
                        >
                            <Square size={14} />
                        </motion.button>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSubmit}
                            disabled={!value.trim()}
                            className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed shadow-glow-sm hover:shadow-glow transition-shadow"
                        >
                            <Send size={14} />
                        </motion.button>
                    )}
                </div>
            </motion.div>
            <div className="flex items-center justify-between mt-2 px-1">
                <p className="text-[11px] text-text-muted">
                    Sourced from <span className="text-primary-500">your lecture materials</span>
                </p>
                <p className="text-[11px] text-text-muted">↵ Send · ⇧↵ Newline</p>
            </div>
        </div>
    )
}
