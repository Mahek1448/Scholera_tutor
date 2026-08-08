import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'

export default function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    return (
        <div className="flex h-screen overflow-hidden" style={{ background: '#F5F7FA' }}>
            {/* Sidebar — always rendered, handles mobile/desktop internally */}
            <Sidebar
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
                isMobile={isMobile}
            />

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile top bar */}
                {isMobile && (
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-white shadow-sm flex-shrink-0">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-2 transition-colors"
                        >
                            <Menu size={20} />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                <span className="text-white font-bold text-xs">S</span>
                            </div>
                            <span className="font-semibold text-text-primary text-sm">Scholera</span>
                        </div>
                    </div>
                )}

                {/* Page content */}
                <main className="flex-1 overflow-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
