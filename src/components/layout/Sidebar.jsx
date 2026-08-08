import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Home, MessageSquare, FileText, RotateCcw,
    ChevronLeft, ChevronRight, Plus, X, Sun, Moon
} from 'lucide-react'

const navItems = [
    { to: '/', icon: Home, label: 'Learning Hub' },
    { to: '/tutor', icon: MessageSquare, label: 'AI Tutor' },
    { to: '/notes', icon: FileText, label: 'My Notes' },
    { to: '/revision', icon: RotateCcw, label: 'Revision' },
]

export default function Sidebar({ isOpen, setIsOpen, isMobile, theme, onToggleTheme }) {
    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate()

    // Load recent chats from localStorage
    const recentChats = (() => {
        try { return JSON.parse(localStorage.getItem('scholera_chats') || '[]') } catch { return [] }
    })()

    if (isMobile) {
        return (
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                            className="fixed inset-y-0 left-0 w-72 z-50 flex flex-col overflow-hidden shadow-xl theme-transition"
                            style={{ background: 'var(--surface)', borderRight: '1px solid var(--border)' }}
                        >
                            <SidebarContent
                                collapsed={false}
                                setCollapsed={setCollapsed}
                                setIsOpen={setIsOpen}
                                isMobile={true}
                                navigate={navigate}
                                recentChats={recentChats}
                                theme={theme}
                                onToggleTheme={onToggleTheme}
                            />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        )
    }

    return (
        <motion.aside
            animate={{ width: collapsed ? 64 : 256 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative flex-shrink-0 h-screen flex flex-col overflow-hidden shadow-sidebar theme-transition"
            style={{ background: 'var(--surface)', borderRight: '1px solid var(--border)' }}
        >
            <SidebarContent
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                setIsOpen={setIsOpen}
                isMobile={false}
                navigate={navigate}
                recentChats={recentChats}
                theme={theme}
                onToggleTheme={onToggleTheme}
            />
        </motion.aside>
    )
}

function SidebarContent({ collapsed, setCollapsed, setIsOpen, isMobile, navigate, recentChats, theme, onToggleTheme }) {
    return (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 py-5 flex-shrink-0"
                style={{ borderBottom: '1px solid var(--border)' }}>
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center flex-shrink-0 shadow-glow-sm">
                    <span className="text-white font-bold text-sm">S</span>
                </div>
                {!collapsed && (
                    <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1 min-w-0"
                    >
                        <div className="font-semibold text-sm tracking-tight" style={{ color: 'var(--text-primary)' }}>
                            Scholera
                        </div>
                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            Your Learning Hub
                        </div>
                    </motion.div>
                )}
                {isMobile && (
                    <button
                        onClick={() => setIsOpen(false)}
                        className="ml-auto p-1.5 rounded-lg transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                        aria-label="Close sidebar"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* New Chat Button */}
            <div className="px-3 pt-4 pb-2 flex-shrink-0">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/tutor')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-primary-600 text-white hover:bg-primary-700 transition-all text-sm font-medium shadow-glow-sm ${collapsed ? 'justify-center' : ''}`}
                >
                    <Plus size={16} />
                    {!collapsed && <span>New Chat</span>}
                </motion.button>
            </div>

            {/* Nav */}
            <nav className="px-3 py-2 space-y-0.5 flex-shrink-0">
                {navItems.map(({ to, icon: Icon, label }) => (
                    <NavLink key={to} to={to} end={to === '/'}>
                        {({ isActive }) => (
                            <motion.div
                                whileHover={{ x: collapsed ? 0 : 2 }}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${isActive ? '' : ''} ${collapsed ? 'justify-center' : ''}`}
                                style={{
                                    background: isActive ? 'rgba(26,158,109,0.1)' : 'transparent',
                                    border: isActive ? '1px solid rgba(26,158,109,0.2)' : '1px solid transparent',
                                    color: isActive ? '#1A9E6D' : 'var(--text-secondary)',
                                }}
                                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--surface-2)' }}
                                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                            >
                                <Icon size={17} className="flex-shrink-0" />
                                {!collapsed && <span>{label}</span>}
                                {isActive && !collapsed && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500" />
                                )}
                            </motion.div>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Recent Chats */}
            {!collapsed && (
                <div className="flex-1 overflow-y-auto px-3 py-2 mt-1">
                    <div className="text-xs font-semibold uppercase tracking-wider px-2 mb-2"
                        style={{ color: 'var(--text-muted)' }}>
                        Recent
                    </div>
                    {recentChats.length === 0 ? (
                        <p className="text-xs px-2 py-1 italic" style={{ color: 'var(--text-muted)' }}>
                            No conversations yet
                        </p>
                    ) : (
                        <div className="space-y-0.5">
                            {recentChats.slice(0, 8).map((chat) => (
                                <motion.button
                                    key={chat.id}
                                    whileHover={{ x: 2 }}
                                    onClick={() => navigate('/tutor')}
                                    className="w-full flex flex-col px-3 py-2 rounded-lg text-left transition-colors group"
                                    style={{ color: 'var(--text-secondary)' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <span className="text-xs truncate w-full block">{chat.title}</span>
                                    <span className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{chat.time}</span>
                                </motion.button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Bottom: Theme toggle */}
            <div className="px-3 py-3 flex-shrink-0 space-y-1"
                style={{ borderTop: '1px solid var(--border)' }}>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onToggleTheme}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${collapsed ? 'justify-center' : ''}`}
                    style={{ color: 'var(--text-secondary)', background: 'var(--surface-2)', border: '1px solid var(--border)' }}
                    aria-label="Toggle theme"
                >
                    {theme === 'dark'
                        ? <Sun size={16} className="text-golden-400 flex-shrink-0" />
                        : <Moon size={16} className="flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
                    }
                    {!collapsed && (
                        <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                    )}
                </motion.button>
            </div>

            {/* Collapse toggle (desktop only) */}
            {!isMobile && (
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute top-1/2 -right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all z-10"
                    style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-muted)',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                    }}
                    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
                </button>
            )}
        </div>
    )
}
