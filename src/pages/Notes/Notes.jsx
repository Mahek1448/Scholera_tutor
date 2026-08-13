import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Folder, FileText, Save, Eye, Edit3, Trash2 } from 'lucide-react'
import MarkdownRenderer from '../../components/ui/MarkdownRenderer'

const INITIAL_NOTES = [
    {
        id: 1,
        title: 'Vanishing Gradient — Key Points',
        content: `## Vanishing Gradient Problem\n\nBackpropagation multiplies one activation derivative **per layer**. For sigmoid that's at most **0.25**, so through 10 layers gradients can shrink by a factor of ~$10^{-6}$.\n\n### Why this matters\n- Early layers receive almost no training signal\n- They effectively stop learning\n- Later layers train normally\n\n### Solution\nUse **ReLU** — its derivative is exactly 1 for positive inputs:\n$$\\text{ReLU}'(z) = \\begin{cases} 1 & z > 0 \\\\ 0 & z \\leq 0 \\end{cases}$$\n\n> Source: Week 2 — Gradient Descent and Backpropagation, Slide 9`,
        folder: 'Week 2',
        createdAt: '2026-09-22T19:00:00Z',
        updatedAt: '2026-09-22T20:00:00Z',
    },
    {
        id: 2,
        title: 'L1 vs L2 Regularization',
        content: `## Regularization Comparison\n\n| Method | Penalty | Effect |\n|---|---|---|\n| L2 (Ridge) | $\\lambda \\sum w_j^2$ | Shrinks weights toward zero |\n| L1 (Lasso) | $\\lambda \\sum |w_j|$ | Sets some weights to exactly 0 |\n\n### Geometric intuition\n- L2 constraint region is a **circle** — touches loss contours off-axis\n- L1 constraint region is a **diamond** — corners lie on axes, creating exact zeros\n\n> Use L1 for feature selection, L2 as the default.`,
        folder: 'Week 3',
        createdAt: '2026-09-22T19:30:00Z',
        updatedAt: '2026-09-22T19:30:00Z',
    },
]

const pageVariants = {
    initial: { opacity: 0, x: -12 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 12, transition: { duration: 0.2 } },
}

export default function Notes() {
    const [notes, setNotes] = useState(() => {
        try {
            const saved = localStorage.getItem('scholera_notes')
            return saved ? JSON.parse(saved) : INITIAL_NOTES
        } catch { return INITIAL_NOTES }
    })
    const [selected, setSelected] = useState(notes[0] || null)
    const [mode, setMode] = useState('split') // 'edit' | 'preview' | 'split'
    const [search, setSearch] = useState('')
    const [editContent, setEditContent] = useState(notes[0]?.content || '')
    const [editTitle, setEditTitle] = useState(notes[0]?.title || '')
    const saveTimer = useRef(null)

    // When selected note changes, update editor
    useEffect(() => {
        if (selected) {
            setEditContent(selected.content)
            setEditTitle(selected.title)
        }
    }, [selected?.id])

    // Autosave
    const autosave = useCallback(() => {
        if (!selected) return
        clearTimeout(saveTimer.current)
        saveTimer.current = setTimeout(() => {
            const updated = notes.map(n =>
                n.id === selected.id
                    ? { ...n, content: editContent, title: editTitle, updatedAt: new Date().toISOString() }
                    : n
            )
            setNotes(updated)
            setSelected(prev => prev ? { ...prev, content: editContent, title: editTitle } : null)
            localStorage.setItem('scholera_notes', JSON.stringify(updated))
        }, 800)
    }, [editContent, editTitle, notes, selected])

    useEffect(() => {
        autosave()
        return () => clearTimeout(saveTimer.current)
    }, [editContent, editTitle])

    const createNote = () => {
        const note = {
            id: Date.now(),
            title: 'Untitled Note',
            content: '## New Note\n\nStart writing here…',
            folder: 'General',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        const updated = [note, ...notes]
        setNotes(updated)
        setSelected(note)
        localStorage.setItem('scholera_notes', JSON.stringify(updated))
    }

    const deleteNote = (id) => {
        const updated = notes.filter(n => n.id !== id)
        setNotes(updated)
        setSelected(updated[0] || null)
        localStorage.setItem('scholera_notes', JSON.stringify(updated))
    }

    const filtered = notes.filter(n =>
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.content.toLowerCase().includes(search.toLowerCase())
    )

    const folders = [...new Set(notes.map(n => n.folder))]

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex h-full bg-background"
        >
            {/* Note list sidebar */}
            <div className="w-64 flex-shrink-0 border-r border-border flex flex-col bg-surface">
                {/* Header */}
                <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-text-primary">My Notes</h2>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={createNote}
                            className="w-6 h-6 rounded-lg bg-primary-50 border border-primary-200 text-primary-600 flex items-center justify-center hover:bg-primary-100 transition-colors"
                        >
                            <Plus size={14} />
                        </motion.button>
                    </div>
                    <div className="relative">
                        <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search notes…"
                            className="w-full bg-surface-2 border border-border rounded-lg pl-7 pr-3 py-1.5 text-xs text-text-primary placeholder-text-muted outline-none focus:border-primary-400 transition-colors"
                        />
                    </div>
                </div>

                {/* Note list */}
                <div className="flex-1 overflow-y-auto p-2">
                    {folders.map(folder => {
                        const folderNotes = filtered.filter(n => n.folder === folder)
                        if (folderNotes.length === 0) return null
                        return (
                            <div key={folder} className="mb-3">
                                <div className="flex items-center gap-1.5 px-2 py-1 mb-1">
                                    <Folder size={11} className="text-text-muted" />
                                    <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">{folder}</span>
                                </div>
                                {folderNotes.map(note => (
                                    <motion.button
                                        key={note.id}
                                        whileHover={{ x: 2 }}
                                        onClick={() => setSelected(note)}
                                        className={`w-full text-left flex items-start gap-2 px-2 py-2 rounded-lg mb-0.5 group transition-colors ${selected?.id === note.id
                                            ? 'bg-[var(--onhovernotes)] border border-primary-200'
                                            : 'hover:bg-[var(--onhovernotes)] border border-transparent'
                                            }`}
                                    >
                                        <FileText size={12} className="text-text-muted mt-0.5 flex-shrink-0" />
                                        <div className="min-w-0 flex-1">
                                            <div className="text-xs font-medium text-text-primary truncate">{note.title}</div>
                                            <div className="text-[10px] text-text-muted mt-0.5 truncate">
                                                {note.content.slice(0, 40).replace(/[#*\n]/g, ' ')}…
                                            </div>
                                        </div>
                                        <button
                                            onClick={e => { e.stopPropagation(); deleteNote(note.id) }}
                                            className="opacity-0 group-hover:opacity-100 p-0.5 text-text-muted hover:text-rose-400 transition-all"
                                        >
                                            <Trash2 size={11} />
                                        </button>
                                    </motion.button>
                                ))}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Editor area */}
            {selected ? (
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between px-6 py-3 border-b border-border glass flex-shrink-0">
                        <input
                            value={editTitle}
                            onChange={e => setEditTitle(e.target.value)}
                            className="text-base font-semibold text-text-primary bg-transparent outline-none flex-1 mr-4"
                            placeholder="Note title…"
                        />
                        <div className="flex items-center gap-1 bg-surface-2 border border-border rounded-lg p-0.5">
                            {[
                                { id: 'edit', icon: Edit3, label: 'Edit' },
                                { id: 'split', icon: Eye, label: 'Split' },
                                { id: 'preview', icon: Eye, label: 'Preview' },
                            ].map(({ id, icon: Icon, label }) => (
                                <button
                                    key={id}
                                    onClick={() => setMode(id)}
                                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${mode === id
                                        ? 'bg-primary-100 text-primary-700'
                                        : 'text-text-muted hover:text-text-primary'
                                        }`}
                                >
                                    <Icon size={12} />
                                    <span>{label}</span>
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-1.5 ml-3 text-[11px] text-text-muted">
                            <Save size={11} />
                            <span>Autosaved</span>
                        </div>
                    </div>

                    {/* Editor / Preview */}
                    <div className="flex-1 flex min-h-0">
                        {(mode === 'edit' || mode === 'split') && (
                            <div className={`flex-1 flex flex-col ${mode === 'split' ? 'border-r border-border' : ''}`}>
                                <textarea
                                    value={editContent}
                                    onChange={e => setEditContent(e.target.value)}
                                    className="flex-1 w-full bg-transparent text-text-secondary text-sm font-mono leading-relaxed resize-none outline-none p-6 placeholder-text-muted"
                                    placeholder="Write your notes in Markdown…"
                                    spellCheck={false}
                                />
                            </div>
                        )}
                        {(mode === 'preview' || mode === 'split') && (
                            <div className="flex-1 overflow-y-auto p-6">
                                <MarkdownRenderer content={editContent} />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center text-center">
                    <div>
                        <FileText size={36} className="text-primary-300 mx-auto mb-3" />
                        <p className="text-sm font-medium text-text-primary mb-1">No note selected</p>
                        <p className="text-xs text-text-muted mb-4">Select a note from the sidebar or create a new one</p>
                        <button
                            onClick={createNote}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 px-3 py-2 rounded-lg transition-colors"
                        >
                            <Plus size={12} /> New Note
                        </button>
                    </div>
                </div>
            )}
        </motion.div>
    )
}
