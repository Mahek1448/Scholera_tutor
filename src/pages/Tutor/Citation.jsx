import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ChevronRight, ExternalLink, X } from 'lucide-react'
import { findSlide, findLecture } from '../../services/mockApi'
import LectureDrawer from './LectureDrawer'

export default function Citation({ citations }) {
    const [drawerSlide, setDrawerSlide] = useState(null)

    if (!citations || citations.length === 0) return null

    const handleViewSlide = (citation) => {
        const lec = findLecture(citation.lecture)
        const slide = findSlide(citation.lecture, citation.slide)
        setDrawerSlide({ lecture: lec, slide, citation })
    }

    return (
        <>
            <div className="flex flex-wrap gap-2 mt-3">
                {citations.map((c, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * i }}
                        className="flex items-center gap-2 bg-[var(--box)] border border-border rounded-xl px-3 py-2 group shadow-sm"
                    >
                        <div className="w-6 h-6 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center flex-shrink-0">
                            <BookOpen size={11} className="text-primary-500" />
                        </div>
                        <div className="min-w-0">
                            <div className="text-[11px] text-text-muted uppercase tracking-wide font-semibold leading-none mb-0.5">Source</div>
                            <div className="text-xs text-text-primary font-medium leading-tight">
                                {c.lecture.replace('Week ', 'Wk ').split(' — ')[0]}
                            </div>
                            <div className="text-[11px] text-primary-500">Slide {c.slide}</div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleViewSlide(c)}
                            className="ml-1 flex items-center gap-1 text-[11px] font-medium text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 border border-primary-200 px-2 py-1 rounded-lg transition-all"
                        >
                            <span>View</span>
                            <ChevronRight size={10} />
                        </motion.button>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {drawerSlide && (
                    <LectureDrawer
                        lecture={drawerSlide.lecture}
                        slide={drawerSlide.slide}
                        citation={drawerSlide.citation}
                        onClose={() => setDrawerSlide(null)}
                    />
                )}
            </AnimatePresence>
        </>
    )
}
