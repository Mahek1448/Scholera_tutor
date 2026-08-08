import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, BookOpen, Code, Calculator, Table2, MessageCircle } from 'lucide-react'
import ChatInput from './ChatInput'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import { streamResponse, matchScenario, getScenario } from '../../services/mockApi'

const SUGGESTED = [
    { icon: MessageCircle, text: 'What is the vanishing gradient problem?', scenario: 'plain' },
    { icon: Code, text: 'Show me how gradient descent is implemented.', scenario: 'code' },
    { icon: Calculator, text: 'Why is the sigmoid derivative at most 0.25?', scenario: 'math' },
    { icon: Table2, text: 'Compare the regularization techniques we covered.', scenario: 'table' },
]

const pageVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
}

let msgCounter = 1000

export default function Tutor() {
    const [messages, setMessages] = useState([])
    const [isStreaming, setIsStreaming] = useState(false)
    const [showTyping, setShowTyping] = useState(false)
    const [savedAnswers, setSavedAnswers] = useState(() => {
        try { return JSON.parse(localStorage.getItem('scholera_saved') || '[]') } catch { return [] }
    })
    const scrollRef = useRef(null)
    const abortRef = useRef(null)

    // Auto-scroll
    useEffect(() => {
        const el = scrollRef.current
        if (!el) return
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
    }, [messages, showTyping])

    const send = useCallback(async (text, scenarioId = null) => {
        if (isStreaming) return

        const userMsg = { id: ++msgCounter, role: 'user', content: text }
        setMessages(prev => [...prev, userMsg])
        setShowTyping(true)
        setIsStreaming(true)

        const scenario = scenarioId ? getScenario(scenarioId) : matchScenario(text)
        const id = scenario?.id || 'plain'

        const aiMsgId = ++msgCounter
        const aiMsg = { id: aiMsgId, role: 'assistant', content: '', citations: [], streaming: true }

        const ctrl = new AbortController()
        abortRef.current = ctrl

        try {
            let firstChunk = true
            for await (const chunk of streamResponse(id, { signal: ctrl.signal, speed: 1 })) {
                if (firstChunk) {
                    firstChunk = false
                    setShowTyping(false)
                    setMessages(prev => [...prev, aiMsg])
                }
                setMessages(prev =>
                    prev.map(m => m.id === aiMsgId ? { ...m, content: m.content + chunk } : m)
                )
            }

            const citations = scenario?.citations || []
            setMessages(prev =>
                prev.map(m => m.id === aiMsgId ? { ...m, streaming: false, citations } : m)
            )
        } catch (err) {
            const isAbort = err?.name === 'AbortError' || ctrl.signal.aborted
            setShowTyping(false)
            setMessages(prev => {
                const hasMsg = prev.find(m => m.id === aiMsgId)
                if (hasMsg) {
                    return prev.map(m => m.id === aiMsgId
                        ? { ...m, streaming: false, error: isAbort ? null : err.message, citations: scenario?.citations || [] }
                        : m
                    )
                }
                if (!isAbort) {
                    return [...prev, { id: aiMsgId, role: 'assistant', content: '', streaming: false, error: err.message, citations: [] }]
                }
                return prev
            })
        } finally {
            setIsStreaming(false)
            setShowTyping(false)
            abortRef.current = null
        }
    }, [isStreaming])

    const handleStop = () => abortRef.current?.abort()

    const handleRetry = (msgId) => {
        const idx = messages.findIndex(m => m.id === msgId)
        const userMsg = messages[idx - 1]
        if (userMsg) {
            setMessages(prev => prev.filter(m => m.id !== msgId))
            send(userMsg.content)
        }
    }

    const handleSave = (msgId, saved) => {
        const msg = messages.find(m => m.id === msgId)
        if (!msg) return
        setSavedAnswers(prev => {
            const newArr = saved
                ? [...prev, { ...msg, savedAt: new Date().toISOString() }]
                : prev.filter(m => m.id !== msgId)
            localStorage.setItem('scholera_saved', JSON.stringify(newArr))
            return newArr
        })
    }

    const handleConceptClick = (concept) => send(`Explain ${concept} from the lecture materials.`)
    const handleSuggestion = (s) => send(s.text, s.scenario)

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col h-full bg-background"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border bg-white shadow-sm flex-shrink-0 gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow-sm flex-shrink-0">
                        <Sparkles size={16} className="text-white" />
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-sm font-semibold text-text-primary">AI Tutor</h1>
                        <p className="text-[11px] text-text-muted truncate">Answers sourced from your lecture materials</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[11px] text-emerald-600 font-medium hidden sm:block">Online</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-surface-2 border border-border rounded-full px-2.5 py-1">
                        <BookOpen size={11} className="text-text-muted" />
                        <span className="text-[11px] text-text-muted hidden sm:block">3 Lectures</span>
                    </div>
                </div>
            </div>

            {/* Chat area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                {messages.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col items-center justify-center h-full text-center max-w-xl mx-auto pt-8"
                    >
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow mb-6"
                        >
                            <Sparkles size={28} className="text-white" />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-text-primary mb-2">Ask your AI Tutor</h2>
                        <p className="text-text-secondary text-sm leading-relaxed mb-8">
                            I only answer from your uploaded lecture materials.<br />
                            Every answer includes the exact lecture and slide it came from.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
                            {SUGGESTED.map((s, i) => (
                                <motion.button
                                    key={i}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 + i * 0.07 }}
                                    whileHover={{ scale: 1.02, y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleSuggestion(s)}
                                    className="flex items-start gap-3 p-3.5 bg-white border border-border hover:border-primary-300 hover:bg-primary-50 rounded-xl text-left group transition-all shadow-card"
                                >
                                    <div className="w-7 h-7 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary-100 transition-colors">
                                        <s.icon size={14} className="text-primary-500" />
                                    </div>
                                    <span className="text-xs text-text-secondary group-hover:text-text-primary leading-relaxed transition-colors">
                                        {s.text}
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <div className="max-w-3xl mx-auto w-full space-y-6">
                        <AnimatePresence initial={false}>
                            {messages.map((msg) => (
                                <MessageBubble
                                    key={msg.id}
                                    message={msg}
                                    onRetry={msg.role === 'assistant' ? () => handleRetry(msg.id) : undefined}
                                    onSave={handleSave}
                                    onConceptClick={handleConceptClick}
                                />
                            ))}
                        </AnimatePresence>

                        <AnimatePresence>
                            {showTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                >
                                    <TypingIndicator />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="max-w-3xl mx-auto w-full flex-shrink-0 px-4">
                <ChatInput onSend={send} isStreaming={isStreaming} onStop={handleStop} />
            </div>
        </motion.div>
    )
}
