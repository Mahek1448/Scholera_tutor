import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'

export default function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const [theme, setTheme] = useState(() => {
        try { return localStorage.getItem('scholera_theme') || 'light' } catch { return 'light' }
    })

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    useEffect(() => {
        const root = document.documentElement
        if (theme === 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
        try { localStorage.setItem('scholera_theme', theme) } catch { /* noop */ }
    }, [theme])

    const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

    return (
        <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>
            <Sidebar
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
                isMobile={isMobile}
                theme={theme}
                onToggleTheme={toggleTheme}
            />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile top bar */}
                {isMobile && (
                    <div className="flex items-center gap-3 px-4 py-3 border-b flex-shrink-0 theme-transition"
                        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: 'var(--text-muted)' }}
                            aria-label="Open menu"
                        >
                            <Menu size={20} />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                                <span className="text-white font-bold text-xs">S</span>
                            </div>
                            <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Scholera</span>
                        </div>
                    </div>
                )}

                <main className="flex-1 overflow-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
