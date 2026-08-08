import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const SYMBOLS = [
    '∇', 'Σ', 'θ', 'λ', 'π', 'μ', 'σ', 'α', 'β', 'ε',
    'AI', 'ML', 'CNN', 'RNN', 'GAN',
    '∂', '∫', '∞', '≈', '⊕',
    '010', '101', '∈', '∝',
    'f(x)', 'w·x', 'η∇', 'argmin',
]

const SVG_ICONS = [
    // Book
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
  </svg>`,
    // Light bulb
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="9" y1="18" x2="15" y2="18"/>
    <line x1="10" y1="22" x2="14" y2="22"/>
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14"/>
  </svg>`,
    // Pencil
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
  </svg>`,
]

function createParticles(count) {
    return Array.from({ length: count }, (_, i) => {
        const isIcon = i < 6
        const isSymbol = !isIcon
        return {
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            vx: (Math.random() - 0.5) * 0.015,
            vy: (Math.random() - 0.5) * 0.015,
            size: isIcon ? 14 : (Math.random() * 10 + 10),
            opacity: Math.random() * 0.2 + 0.05,
            symbol: isSymbol ? SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)] : null,
            iconIdx: isIcon ? i % SVG_ICONS.length : null,
            isIcon,
            baseX: Math.random() * 100,
            baseY: Math.random() * 100,
            floatOffset: Math.random() * Math.PI * 2,
            floatSpeed: 0.0003 + Math.random() * 0.0004,
            fadePhase: Math.random() * Math.PI * 2,
            fadeSpeed: 0.0005 + Math.random() * 0.001,
        }
    })
}

function createNodes(count) {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.008,
        vy: (Math.random() - 0.5) * 0.008,
        size: Math.random() * 3 + 2,
        pulsePhase: Math.random() * Math.PI * 2,
    }))
}

export default function AnimatedBackground() {
    const canvasRef = useRef(null)
    const particlesRef = useRef(createParticles(35))
    const nodesRef = useRef(createNodes(12))
    const mouseRef = useRef({ x: -9999, y: -9999 })
    const rafRef = useRef(null)
    const tRef = useRef(0)

    const handleMouseMove = useCallback((e) => {
        const rect = canvasRef.current?.getBoundingClientRect()
        if (!rect) return
        mouseRef.current = {
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        }
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio
            canvas.height = canvas.offsetHeight * window.devicePixelRatio
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
        }
        resize()
        window.addEventListener('resize', resize)

        const draw = () => {
            const W = canvas.offsetWidth
            const H = canvas.offsetHeight
            tRef.current++
            const t = tRef.current
            ctx.clearRect(0, 0, W, H)

            const mx = mouseRef.current.x
            const my = mouseRef.current.y

            // ── Neural nodes ──────────────────────────────────────────────
            const nodes = nodesRef.current
            nodes.forEach((n) => {
                n.x += n.vx
                n.y += n.vy
                if (n.x < 0 || n.x > 100) n.vx *= -1
                if (n.y < 0 || n.y > 100) n.vy *= -1
            })

            // Draw edges
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const a = nodes[i]
                    const b = nodes[j]
                    const dx = a.x - b.x
                    const dy = a.y - b.y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 22) {
                        const alpha = (1 - dist / 22) * 0.12
                        ctx.beginPath()
                        ctx.moveTo((a.x / 100) * W, (a.y / 100) * H)
                        ctx.lineTo((b.x / 100) * W, (b.y / 100) * H)
                        ctx.strokeStyle = `rgba(99,102,241,${alpha})`
                        ctx.lineWidth = 1
                        ctx.stroke()
                    }
                }
            }

            // Draw nodes
            nodes.forEach((n) => {
                const pulse = (Math.sin(t * 0.02 + n.pulsePhase) + 1) / 2
                const r = n.size + pulse * 1.5
                const nx = (n.x / 100) * W
                const ny = (n.y / 100) * H

                const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, r * 3)
                g.addColorStop(0, `rgba(99,102,241,${0.3 + pulse * 0.2})`)
                g.addColorStop(1, 'rgba(99,102,241,0)')
                ctx.beginPath()
                ctx.arc(nx, ny, r * 3, 0, Math.PI * 2)
                ctx.fillStyle = g
                ctx.fill()

                ctx.beginPath()
                ctx.arc(nx, ny, r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(139,92,246,${0.4 + pulse * 0.3})`
                ctx.fill()
            })

            // ── Floating particles ─────────────────────────────────────────
            const REPEL_RADIUS = 12
            const REPEL_STRENGTH = 0.006

            particlesRef.current.forEach((p) => {
                // Float motion
                const floatX = Math.sin(t * p.floatSpeed + p.floatOffset) * 1.5
                const floatY = Math.cos(t * p.floatSpeed * 0.7 + p.floatOffset) * 1.5
                let targetX = p.baseX + floatX
                let targetY = p.baseY + floatY

                // Mouse repel
                const dx = targetX - mx
                const dy = targetY - my
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < REPEL_RADIUS && dist > 0) {
                    const force = (REPEL_RADIUS - dist) / REPEL_RADIUS
                    targetX += (dx / dist) * force * REPEL_STRENGTH * 800
                    targetY += (dy / dist) * force * REPEL_STRENGTH * 800
                }

                p.x = p.x + (targetX - p.x) * 0.04
                p.y = p.y + (targetY - p.y) * 0.04

                const fade = (Math.sin(t * p.fadeSpeed + p.fadePhase) + 1) / 2
                const alpha = p.opacity * (0.4 + fade * 0.6)

                const px = (p.x / 100) * W
                const py = (p.y / 100) * H

                ctx.save()
                ctx.globalAlpha = alpha
                ctx.fillStyle = '#A78BFA'
                ctx.font = `${p.isIcon ? p.size * 1.2 : p.size}px "Inter", monospace`
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'

                if (!p.isIcon) {
                    ctx.fillText(p.symbol, px, py)
                }
                ctx.restore()
            })

            rafRef.current = requestAnimationFrame(draw)
        }

        rafRef.current = requestAnimationFrame(draw)
        return () => {
            cancelAnimationFrame(rafRef.current)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" onMouseMove={handleMouseMove} style={{ pointerEvents: 'auto' }}>
            {/* Deep gradient base */}
            <div className="absolute inset-0 bg-gradient-radial from-primary-900/20 via-background to-background" />
            {/* Top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-primary-600/10 to-transparent rounded-full blur-3xl" />
            {/* Bottom corner glows */}
            <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-gradient-radial from-accent-600/8 to-transparent rounded-full blur-3xl" />

            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ pointerEvents: 'auto' }}
                onMouseMove={handleMouseMove}
            />

            {/* Floating text symbols as DOM elements for better GPU rendering */}
            {SYMBOLS.slice(0, 16).map((sym, i) => (
                <motion.div
                    key={i}
                    className="absolute text-primary-400/10 font-mono select-none"
                    style={{
                        left: `${5 + (i * 6.2) % 90}%`,
                        top: `${8 + (i * 7.3) % 80}%`,
                        fontSize: `${10 + (i % 5) * 3}px`,
                    }}
                    animate={{
                        y: [0, -10, 0],
                        opacity: [0.04, 0.12, 0.04],
                    }}
                    transition={{
                        duration: 5 + (i % 4),
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: 'easeInOut',
                    }}
                >
                    {sym}
                </motion.div>
            ))}
        </div>
    )
}
