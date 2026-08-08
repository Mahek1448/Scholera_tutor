import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AppLayout from './components/layout/AppLayout'
import Home from './pages/Home/Home'
import Tutor from './pages/Tutor/Tutor'
import Notes from './pages/Notes/Notes'
import Revision from './pages/Revision/Revision'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'

function isLoggedIn() {
    try { return !!localStorage.getItem('scholera_current_user') } catch { return false }
}

function ProtectedRoute({ children }) {
    return isLoggedIn() ? children : <Navigate to="/login" replace />
}

export default function App() {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                    <Route path="/" element={<Home />} />
                    <Route path="/tutor" element={<Tutor />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/revision" element={<Revision />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AnimatePresence>
    )
}
