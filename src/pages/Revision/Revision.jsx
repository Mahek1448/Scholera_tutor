import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Bookmark, FileText, ChevronDown, ChevronUp, Tag, Calendar } from 'lucide-react'
import MarkdownRenderer from '../../components/ui/MarkdownRenderer'
import { lectures } from '../../services/mockApi'

const pageVariants = {
    initial: { opacity: 0, x: 12 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -12, transition: { duration: 0.2 } },
}

function SavedAnswerCard({ answer, idx }) {
    const [expanded, setExpanded] = useState(false)
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx }}
            className="bg-white rounded-2xl border border-border overflow-hidden shadow-card"
        >
            {/* Header */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-start gap-3 p-4 text-left hover:bg-surface-3/30 transition-colors"
            >
                <div className="w-7 h-7 rounded-lg bg-primary-50 border border-primary-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bookmark size={13} className="text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-text-primary truncate">
                        {answer.content?.slice(0, 80).replace(/[#*`]/g, '').trim() || 'Saved Answer'}…
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        {answer.citations?.map((c, i) => (
                            <span key={i} className="text-[11px] text-primary-600 bg-primary-50 border border-primary-200 px-2 py-0.5 rounded-full">
                                {c.lecture.split(' — ')[0]} · Slide {c.slide}
                            </span>
                        ))}
                        {answer.savedAt && (
                            <span className="text-[11px] text-text-muted flex items-center gap-1">
                                <Calendar size={10} />
                                {new Date(answer.savedAt).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                </div>
                {expanded ? <ChevronUp size={16} className="text-text-muted flex-shrink-0 mt-1" /> : <ChevronDown size={16} className="text-text-muted flex-shrink-0 mt-1" />}
            </button>

            {/* Expanded content */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-border"
                    >
                        <div className="p-4">
                            <MarkdownRenderer content={answer.content || ''} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

function LectureSummaryCard({ lecture, idx }) {
    const [expanded, setExpanded] = useState(false)
    const keySlides = lecture.slides.filter(s => s.formulas || s.bullets?.length > 2)

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * idx }}
            className="bg-white rounded-2xl border border-border overflow-hidden shadow-card"
        >
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-start gap-3 p-5 text-left hover:bg-primary-50 transition-colors"
            >
                <div className="w-10 h-10 rounded-xl bg-primary-50 border border-primary-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-700 font-bold text-sm">W{lecture.week}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-text-primary">{lecture.title}</div>
                    <div className="text-xs text-text-muted mt-0.5">{lecture.slides.length} slides · {lecture.course_code}</div>
                    <div className="flex flex-wrap gap-1 mt-2">
                        {keySlides.slice(0, 4).map(s => (
                            <span key={s.slide_number} className="text-[10px] bg-surface-2 border border-border text-text-muted px-2 py-0.5 rounded-full">
                                Slide {s.slide_number}: {s.title.slice(0, 20)}{s.title.length > 20 ? '…' : ''}
                            </span>
                        ))}
                    </div>
                </div>
                {expanded ? <ChevronUp size={16} className="text-text-muted flex-shrink-0 mt-1" /> : <ChevronDown size={16} className="text-text-muted flex-shrink-0 mt-1" />}
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-border"
                    >
                        <div className="p-5">
                            {/* Key slides */}
                            <div className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">Key Concepts</div>
                            <div className="space-y-3">
                                {lecture.slides.filter(s => s.bullets || s.formulas).slice(0, 6).map((slide) => (
                                    <div key={slide.slide_number} className="bg-surface-2 rounded-xl p-3 border border-border">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[10px] bg-primary-50 text-primary-600 border border-primary-200 px-1.5 py-0.5 rounded font-medium">
                                                Slide {slide.slide_number}
                                            </span>
                                            <span className="text-xs font-semibold text-text-primary">{slide.title}</span>
                                        </div>
                                        {slide.bullets && (
                                            <ul className="space-y-1">
                                                {slide.bullets.slice(0, 3).map((b, i) => (
                                                    <li key={i} className="text-[11px] text-text-secondary flex gap-2">
                                                        <span className="text-primary-500 mt-1">·</span>
                                                        <span>{b}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        {slide.formulas && (
                                            <div className="mt-2 overflow-x-auto">
                                                {slide.formulas.slice(0, 1).map((f, i) => (
                                                    <MarkdownRenderer key={i} content={`$${f}$`} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

const TABS = ['Saved Answers', 'Lecture Summaries']

export default function Revision() {
    const [tab, setTab] = useState('Saved Answers')
    const savedAnswers = (() => {
        try { return JSON.parse(localStorage.getItem('scholera_saved') || '[]') } catch { return [] }
    })()

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="h-full overflow-y-auto"
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-text-primary mb-1">Revision</h1>
                    <p className="text-text-secondary text-sm">Your saved answers and lecture summaries in one place.</p>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 bg-surface-2 border border-border rounded-xl p-1 mb-6 w-fit">
                    {TABS.map(t => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'
                                }`}
                        >
                            {tab === t && (
                                <motion.div
                                    layoutId="revision-tab"
                                    className="absolute inset-0 bg-primary-100 border border-primary-200 rounded-lg"
                                />
                            )}
                            <span className="relative z-10">{t}</span>
                        </button>
                    ))}
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {tab === 'Saved Answers' && (
                        <motion.div key="saved" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {savedAnswers.length === 0 ? (
                                <div className="text-center py-16 text-text-muted">
                                    <Bookmark size={32} className="mx-auto mb-3 opacity-30" />
                                    <p className="text-sm">No saved answers yet</p>
                                    <p className="text-xs mt-1 opacity-60">Save responses in the AI Tutor to see them here</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {savedAnswers.map((a, i) => <SavedAnswerCard key={a.id} answer={a} idx={i} />)}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {tab === 'Lecture Summaries' && (
                        <motion.div key="lectures" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="space-y-3">
                                {lectures.map((lec, i) => (
                                    <LectureSummaryCard key={lec.lecture_id} lecture={lec} idx={i} />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}
