import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Home, MessageSquare, BookOpen, FileText, RotateCcw,
    Flame, Settings, ChevronLeft, ChevronRight, Plus, X
} from 'lucide-react'

const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/tutor', icon: MessageSquare, label: 'AI Tutor' },
    { to: '/notes', icon: FileText, label: 'My Notes' },
    { to: '/revision', icon: RotateCcw, label: 'Revision' },
]

const recentChats = [
    { id: 1, title: 'Vanishing gradient problem', time: '1h ago' },
    { id: 2, title: 'Why ReLU fixes gradient issues', time: '2h ago' },
    { id: 3, title: 'L1 vs L2 regularization', time: '3h ago' },
    { id: 4, title: 'Backward pass implementation', time: 'Yesterday' },
]

export default function Sidebar({ isOpen, setIsOpen, isMobile }) {
    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate()

    if (isMobile) {
        return (
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                        />
                        {/* Drawer */}
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                            className="fixed inset-y-0 left-0 w-72 z-50 flex flex-col bg-white border-r border-border shadow-xl overflow-hidden"
                        >
                            <SidebarContent
                                collapsed={false}
                                setCollapsed={setCollapsed}
                                setIsOpen={setIsOpen}
                                isMobile={true}
                                navigate={navigate}
                            />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        )
    }

    // Desktop
    return (
        <motion.aside
            animate={{ width: collapsed ? 64 : 256 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative flex-shrink-0 h-screen flex flex-col bg-white border-r border-border shadow-sidebar overflow-hidden"
        >
            <SidebarContent
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                setIsOpen={setIsOpen}
                isMobile={false}
                navigate={navigate}
            />
        </motion.aside>
    )
}

function SidebarContent({ collapsed, setCollapsed, setIsOpen, isMobile, navigate }) {
    return (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 py-5 border-b border-border flex-shrink-0">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 shadow-glow-sm">
                    <span className="text-white font-bold text-sm">S</span>
                </div>
                {!collapsed && (
                    <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1 min-w-0"
                    >
                        <div className="font-semibold text-text-primary text-sm tracking-tight">Scholera</div>
                        <div className="text-text-muted text-xs">CS 4780</div>
                    </motion.div>
                )}
                {isMobile && (
                    <button
                        onClick={() => setIsOpen(false)}
                        className="ml-auto p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-2 transition-colors"
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
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-primary-500 text-white hover:bg-primary-600 transition-all text-sm font-medium shadow-glow-sm ${collapsed ? 'justify-center' : ''}`}
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
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${isActive
                                    ? 'bg-primary-50 text-primary-600 border border-primary-100'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
                                    } ${collapsed ? 'justify-center' : ''}`}
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
                    <div className="text-xs font-semibold text-text-muted uppercase tracking-wider px-2 mb-2">
                        Recent
                    </div>
                    <div className="space-y-0.5">
                        {recentChats.map((chat) => (
                            <motion.button
                                key={chat.id}
                                whileHover={{ x: 2 }}
                                onClick={() => navigate('/tutor')}
                                className="w-full flex flex-col px-3 py-2 rounded-lg text-left hover:bg-surface-2 transition-colors group"
                            >
                                <span className="text-xs text-text-secondary group-hover:text-text-primary truncate transition-colors w-full block">
                                    {chat.title}
                                </span>
                                <span className="text-[10px] text-text-muted mt-0.5">{chat.time}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            )}

            {/* Bottom: Settings */}
            <div className="px-3 py-3 border-t border-border flex-shrink-0">
                <NavLink to="/settings">
                    <motion.div
                        whileHover={{ x: collapsed ? 0 : 2 }}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-all cursor-pointer ${collapsed ? 'justify-center' : ''}`}
                    >
                        <Settings size={17} className="flex-shrink-0" />
                        {!collapsed && <span>Settings</span>}
                    </motion.div>
                </NavLink>
            </div>

            {/* Collapse toggle (desktop only) */}
            {!isMobile && (
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-white border border-border flex items-center justify-center text-text-muted hover:text-primary-600 hover:border-primary-300 transition-all z-10 shadow-card"
                >
                    {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
                </button>
            )}
        </div>
    )
}
