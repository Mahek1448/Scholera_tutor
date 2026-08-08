import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AppLayout from './components/layout/AppLayout'
import Home from './pages/Home/Home'
import Tutor from './pages/Tutor/Tutor'
import Notes from './pages/Notes/Notes'
import Revision from './pages/Revision/Revision'

export default function App() {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/tutor" element={<Tutor />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/revision" element={<Revision />} />
                </Route>
            </Routes>
        </AnimatePresence>
    )
}
