import { useEffect, useRef } from 'react'

const SYMBOLS = [
    '∑', '∇', 'π', 'θ', 'λ', 'f(x)', '∂', '∈', '≈', 'σ',
    'α', 'β', 'ε', 'μ', '∞', '∫', '√', '⊕', '∧', '∨',
    'Δ', '∀', '∃', '≤', '≥', '±', '÷', '×', 'ℝ', 'ℕ',
]

const COLORS = [
    'rgba(26,158,109,', // teal primary
    'rgba(196,98,45,',  // terracotta
    'rgba(93,135,100,', // sage
]

export default function AnimatedBackground() {
    const canvasRef = useRef(null)
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    useEffect(() => {
        if (prefersReducedMotion) return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animId
        let mouse = { x: -999, y: -999 }

        // Build particles
        const PARTICLE_COUNT = Math.min(38, Math.floor(window.innerWidth / 30))

        function resize() {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            sym: SYMBOLS[i % SYMBOLS.length],
            size: 11 + Math.floor(Math.random() * 10),
            alpha: 0.12 + Math.random() * 0.16,
            colorBase: COLORS[i % COLORS.length],
            phase: Math.random() * Math.PI * 2,
            speed: 0.008 + Math.random() * 0.012,
        }))

        // Also add floating checkbox/dot particles
        const dots = Array.from({ length: 18 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: 1.5 + Math.random() * 2,
            alpha: 0.08 + Math.random() * 0.10,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
        }))

        const onMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect()
            mouse.x = e.clientX - rect.left
            mouse.y = e.clientY - rect.top
        }
        canvas.addEventListener('mousemove', onMouseMove)
        canvas.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999 })

        function draw(t) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw dots
            for (const dot of dots) {
                dot.x += dot.vx
                dot.y += dot.vy
                if (dot.x < 0) dot.x = canvas.width
                if (dot.x > canvas.width) dot.x = 0
                if (dot.y < 0) dot.y = canvas.height
                if (dot.y > canvas.height) dot.y = 0

                ctx.beginPath()
                ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(26,158,109,${dot.alpha})`
                ctx.fill()
            }

            // Draw symbol particles with repulsion
            for (const p of particles) {
                // Float up gently
                p.phase += p.speed
                const yOffset = Math.sin(p.phase) * 6

                // Drift
                p.x += p.vx
                p.y += p.vy

                // Mouse repulsion
                const dx = p.x - mouse.x
                const dy = p.y - mouse.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                const repulseRadius = 90
                if (dist < repulseRadius && dist > 0) {
                    const force = (repulseRadius - dist) / repulseRadius
                    p.x += (dx / dist) * force * 2.8
                    p.y += (dy / dist) * force * 2.8
                }

                // Wrap
                if (p.x < -40) p.x = canvas.width + 40
                if (p.x > canvas.width + 40) p.x = -40
                if (p.y < -40) p.y = canvas.height + 40
                if (p.y > canvas.height + 40) p.y = -40

                // Pulse alpha
                const alpha = p.alpha * (0.8 + 0.2 * Math.sin(p.phase * 1.5))

                ctx.save()
                ctx.globalAlpha = alpha
                ctx.font = `${p.size}px 'JetBrains Mono', monospace`
                ctx.fillStyle = `${p.colorBase}1)`
                ctx.fillText(p.sym, p.x, p.y + yOffset)
                ctx.restore()
            }

            animId = requestAnimationFrame(draw)
        }

        animId = requestAnimationFrame(draw)

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
            canvas.removeEventListener('mousemove', onMouseMove)
        }
    }, [])

    if (prefersReducedMotion) return null

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-auto"
            style={{ zIndex: 0, opacity: 1 }}
            aria-hidden="true"
        />
    )
}
