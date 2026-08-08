import { motion } from 'framer-motion'
import { X, BookOpen, ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react'
import { useState } from 'react'
import MarkdownRenderer from '../../components/ui/MarkdownRenderer'

export default function LectureDrawer({ lecture, slide, citation, onClose }) {
    const [currentSlideIdx, setCurrentSlideIdx] = useState(
        lecture ? lecture.slides.findIndex(s => s.slide_number === slide?.slide_number) : 0
    )

    const currentSlide = lecture?.slides[currentSlideIdx] || slide

    const handlePrev = () => setCurrentSlideIdx(i => Math.max(0, i - 1))
    const handleNext = () => setCurrentSlideIdx(i => Math.min(lecture.slides.length - 1, i + 1))

    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Drawer */}
            <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                className="fixed right-0 top-0 bottom-0 w-full max-w-lg z-50 flex flex-col bg-white border-l border-border shadow-xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center">
                            <BookOpen size={15} className="text-primary-500" />
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-text-primary">
                                {lecture?.title || citation?.lecture?.replace('Week ', 'Week ')}
                            </div>
                            <div className="text-xs text-text-muted flex items-center gap-1.5">
                                <GraduationCap size={11} />
                                <span>{lecture?.course_title || 'CS 4780'} · Week {lecture?.week}</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-2 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Slide navigation */}
                {lecture && (
                    <div className="flex items-center justify-between px-6 py-2.5 bg-surface-2 border-b border-border flex-shrink-0">
                        <button
                            onClick={handlePrev}
                            disabled={currentSlideIdx === 0}
                            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <span className="text-xs text-text-muted">
                            Slide {currentSlide?.slide_number} of {lecture.slides.length}
                        </span>
                        <button
                            onClick={handleNext}
                            disabled={currentSlideIdx === lecture.slides.length - 1}
                            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                )}

                {/* Slide content */}
                <div className="flex-1 overflow-y-auto px-6 py-5">
                    {currentSlide ? (
                        <motion.div
                            key={currentSlide.slide_number}
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Slide number badge */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="text-xs bg-primary-50 text-primary-600 border border-primary-200 px-2.5 py-1 rounded-full font-medium">
                                    Slide {currentSlide.slide_number}
                                </div>
                                {citation?.slide === currentSlide.slide_number && (
                                    <div className="text-xs bg-accent-50 text-accent-600 border border-accent-200 px-2.5 py-1 rounded-full font-medium">
                                        Referenced
                                    </div>
                                )}
                            </div>

                            {/* Title */}
                            <h2 className="text-lg font-bold text-text-primary mb-4 leading-tight">
                                {currentSlide.title}
                            </h2>

                            {/* Bullets */}
                            {currentSlide.bullets && currentSlide.bullets.length > 0 && (
                                <div className="bg-surface-2 rounded-xl p-4 border border-border mb-4">
                                    <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Key Points</div>
                                    <ul className="space-y-2.5">
                                        {currentSlide.bullets.map((b, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -8 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.05 * i }}
                                                className="flex gap-2.5 text-sm text-text-secondary leading-relaxed"
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                                                <span>{b}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Formulas */}
                            {currentSlide.formulas && currentSlide.formulas.length > 0 && (
                                <div className="bg-primary-50 rounded-xl p-4 border border-primary-100 mb-4">
                                    <div className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-3">Formulas</div>
                                    <div className="space-y-3">
                                        {currentSlide.formulas.map((f, i) => (
                                            <div key={i} className="overflow-x-auto">
                                                <MarkdownRenderer content={`$$${f}$$`} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Figure */}
                            {currentSlide.figure && (
                                <div className="bg-surface-2 rounded-xl p-4 border border-border mb-4">
                                    <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Figure</div>
                                    <div className="w-full aspect-video bg-surface-3 rounded-lg flex items-center justify-center border border-border mb-3">
                                        <div className="text-center p-6">
                                            <div className="w-10 h-10 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center mx-auto mb-2">
                                                <BookOpen size={18} className="text-primary-500" />
                                            </div>
                                            <div className="text-xs text-text-muted">Lecture Figure</div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-text-muted leading-relaxed italic">
                                        {currentSlide.figure.description}
                                    </p>
                                </div>
                            )}

                            {/* Professor Notes */}
                            {currentSlide.notes && (
                                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                                    <div className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">Professor Notes</div>
                                    <p className="text-xs text-text-secondary leading-relaxed">{currentSlide.notes}</p>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-text-muted">
                            <BookOpen size={32} className="mb-3 opacity-40" />
                            <p className="text-sm">Slide not found in lecture data</p>
                            <p className="text-xs mt-1 opacity-60">{citation?.lecture} · Slide {citation?.slide}</p>
                        </div>
                    )}
                </div>

                {/* Slide picker dots */}
                {lecture && (
                    <div className="flex items-center justify-center gap-1 px-6 py-3 border-t border-border flex-shrink-0">
                        {lecture.slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentSlideIdx(i)}
                                className={`transition-all rounded-full ${i === currentSlideIdx
                                    ? 'w-4 h-1.5 bg-primary-500'
                                    : 'w-1.5 h-1.5 bg-border hover:bg-text-muted'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </motion.div>
        </>
    )
}
