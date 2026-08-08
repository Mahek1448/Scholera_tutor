import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CodeBlock({ code, language = 'python' }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="relative group my-3 rounded-xl overflow-hidden border border-border">
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-surface-2 border-b border-border">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                    </div>
                    <span className="text-xs text-text-muted font-mono ml-1">{language}</span>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors opacity-0 group-hover:opacity-100"
                >
                    <AnimatePresence mode="wait">
                        {copied ? (
                            <motion.div
                                key="check"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="flex items-center gap-1 text-emerald-400"
                            >
                                <Check size={12} />
                                <span>Copied!</span>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="copy"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="flex items-center gap-1"
                            >
                                <Copy size={12} />
                                <span>Copy</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>

            {/* Code */}
            <SyntaxHighlighter
                language={language}
                style={oneDark}
                customStyle={{
                    margin: 0,
                    padding: '16px',
                    background: '#0D1117',
                    fontSize: '0.82rem',
                    lineHeight: '1.65',
                    borderRadius: 0,
                }}
                showLineNumbers={code.split('\n').length > 5}
                lineNumberStyle={{ color: '#4E5F78', marginRight: '1em', fontSize: '0.75rem' }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}
