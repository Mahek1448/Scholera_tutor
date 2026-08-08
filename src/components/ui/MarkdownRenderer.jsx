import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import CodeBlock from './CodeBlock'

export default function MarkdownRenderer({ content }) {
    return (
        <div className="prose-scholera">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        const lang = match ? match[1] : 'text'
                        const code = String(children).replace(/\n$/, '')

                        if (inline) {
                            return (
                                <code
                                    className="bg-primary-500/10 text-accent-300 px-1.5 py-0.5 rounded font-mono text-[0.85em] border border-primary-500/20"
                                    {...props}
                                >
                                    {children}
                                </code>
                            )
                        }
                        return <CodeBlock code={code} language={lang} />
                    },
                    table({ children }) {
                        return (
                            <div className="overflow-x-auto my-4">
                                <table className="w-full border-collapse text-sm">{children}</table>
                            </div>
                        )
                    },
                    th({ children }) {
                        return (
                            <th className="bg-primary-500/15 text-primary-200 font-semibold px-4 py-2.5 text-left border border-border text-xs uppercase tracking-wide">
                                {children}
                            </th>
                        )
                    },
                    td({ children }) {
                        return (
                            <td className="px-4 py-2.5 border border-border text-text-secondary text-sm">
                                {children}
                            </td>
                        )
                    },
                    tr({ children }) {
                        return (
                            <tr className="even:bg-surface-2/40">{children}</tr>
                        )
                    },
                    h1({ children }) {
                        return <h1 className="text-xl font-bold text-text-primary mt-5 mb-3">{children}</h1>
                    },
                    h2({ children }) {
                        return <h2 className="text-lg font-semibold text-text-primary mt-4 mb-2 pb-1 border-b border-border">{children}</h2>
                    },
                    h3({ children }) {
                        return <h3 className="text-base font-semibold text-text-primary mt-3 mb-1.5">{children}</h3>
                    },
                    p({ children }) {
                        return <p className="text-[0.925rem] text-text-secondary leading-[1.78] mb-3.5">{children}</p>
                    },
                    ul({ children }) {
                        return <ul className="text-[0.925rem] text-text-secondary leading-relaxed mb-3.5 pl-5 space-y-1 list-disc">{children}</ul>
                    },
                    ol({ children }) {
                        return <ol className="text-[0.925rem] text-text-secondary leading-relaxed mb-3.5 pl-5 space-y-1 list-decimal">{children}</ol>
                    },
                    li({ children }) {
                        return <li className="text-[0.925rem] text-text-secondary">{children}</li>
                    },
                    strong({ children }) {
                        return <strong className="text-text-primary font-semibold">{children}</strong>
                    },
                    em({ children }) {
                        return <em className="italic text-text-secondary">{children}</em>
                    },
                    blockquote({ children }) {
                        return (
                            <blockquote className="border-l-2 border-primary-500/60 pl-4 italic text-text-muted my-3">
                                {children}
                            </blockquote>
                        )
                    },
                    hr() {
                        return <hr className="border-border my-4" />
                    },
                    a({ href, children }) {
                        return (
                            <a href={href} className="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer">
                                {children}
                            </a>
                        )
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
}
