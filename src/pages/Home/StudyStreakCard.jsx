import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const DAY_LABELS = ['Mon', '', 'Wed', '', 'Fri', '', 'Sun']

const LEVEL_COLORS = [
    'var(--surface-2)',
    'rgba(26,158,109,0.18)',
    'rgba(26,158,109,0.38)',
    'rgba(26,158,109,0.62)',
    'rgba(26,158,109,0.92)',
]

function generateStreakData(newStudent=false) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const totalDays = 182

    const start = new Date(today)
    start.setDate(today.getDate() - totalDays + 1)

    // Start from Monday
    const day = start.getDay()
    const mondayOffset = day === 0 ? 6 : day - 1
    start.setDate(start.getDate() - mondayOffset)

    const data = []
    if (newStudent) {
    for (let i = 0; i < 196; i++) {
        const date = new Date(start)
        date.setDate(start.getDate() + i)

        if (date > today) break

        data.push({
            date,
            level: 0,
        })
    }

    return data
}

    for (let i = 0; i < 196; i++) {
        const date = new Date(start)
        date.setDate(start.getDate() + i)

        if (date > today) break

        // Deterministic activity pattern
        const seed =
            date.getDate() +
            date.getMonth() * 7 +
            date.getDay() * 13

        let level = 0

        if (seed % 7 !== 0) {
            if (seed % 11 === 0) {
                level = 4
            } else if (seed % 5 === 0) {
                level = 3
            } else if (seed % 3 === 0) {
                level = 2
            } else {
                level = 1
            }
        }

        data.push({
            date,
            level,
        })
    }

    return data
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
}

function Stat({ label, value }) {
    return (
        <div className="text-right">
            <div
                className="text-sm font-bold"
                style={{ color: 'var(--text-primary)' }}
            >
                {value}
            </div>

            <div
                className="text-[10px]"
                style={{ color: 'var(--text-muted)' }}
            >
                {label}
            </div>
        </div>
    )
}

export default function StudyStreakCard({ newStudent = false }) {

    const data = useMemo(
    () => generateStreakData(newStudent),
    [newStudent]
)
    const [hovered, setHovered] = useState(null)

    const weeks = useMemo(() => {

        const result = []

        for (let i = 0; i < data.length; i += 7) {

            const week = data.slice(i, i + 7)

            while (week.length < 7) {
                week.push(null)
            }

            result.push(week)
        }

        return result

    }, [data])

    const totalDays =
        data.filter(day => day.level > 0).length

    let currentStreak = 0

    for (let i = data.length - 1; i >= 0; i--) {

        if (data[i].level > 0) {
            currentStreak++
        } else {
            break
        }
    }

    return (

        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="card p-5 w-full"
        >

            {/* ================= HEADER ================= */}

            <div className="flex items-start justify-between mb-5">

                <div>

                    <h3
                        className="text-sm font-semibold"
                        style={{
                            color: 'var(--text-primary)',
                        }}
                    >
                        Study Streak
                    </h3>

                    <p
                        className="text-xs mt-1"
                        style={{
                            color: 'var(--text-muted)',
                        }}
                    >
                        {newStudent
    ? 'Start studying to build your streak'
    : 'Your study activity over the last 6 months'
}
                    </p>

                </div>

                <div className="flex items-center gap-6">

                    <Stat
                        label="Current streak"
                        value={`${currentStreak}d`}
                    />

                    <Stat
                        label="Study days"
                        value={`${totalDays}`}
                    />

                </div>

            </div>


            {/* ================= CONTRIBUTION GRAPH ================= */}

            <div className="w-full">

                {/* Main graph layout */}

                <div
                    className="grid w-full"
                    style={{
                        gridTemplateColumns:
                            '38px minmax(0, 1fr)',
                        columnGap: '10px',
                    }}
                >

                    {/* DAY LABELS */}

                    <div
                        className="flex flex-col"
                        style={{
                            paddingTop: '24px',
                            gap: '5px',
                        }}
                    >

                        {DAY_LABELS.map((label, index) => (

                            <div
                                key={index}
                                className="text-[10px] leading-none"
                                style={{
                                    color: 'var(--text-muted)',
                                    height: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                {label}
                            </div>

                        ))}

                    </div>


                    {/* GRAPH */}

                    <div className="min-w-0">

                        {/* MONTH LABELS */}

                        <div
                            className="grid w-full mb-2"
                            style={{
                                gridTemplateColumns:
                                    `repeat(${weeks.length}, minmax(0, 1fr))`,
                                columnGap: '5px',
                            }}
                        >

                            {weeks.map((week, index) => {

                                const firstDay = week.find(Boolean)

                                const showMonth =
                                    firstDay &&
                                    firstDay.date.getDate() <= 7

                                return (

                                    <div
                                        key={index}
                                        className="text-[10px]"
                                        style={{
                                            color: 'var(--text-muted)',
                                            minWidth: 0,
                                        }}
                                    >

                                        {showMonth
                                            ? firstDay.date.toLocaleDateString(
                                                'en-US',
                                                {
                                                    month: 'short',
                                                }
                                            )
                                            : ''
                                        }

                                    </div>

                                )

                            })}

                        </div>


                        {/* CONTRIBUTION CELLS */}

                        <div
                            className="grid w-full"
                            style={{
                                gridTemplateColumns:
                                    `repeat(${weeks.length}, minmax(0, 1fr))`,
                                columnGap: '5px',
                            }}
                        >

                            {weeks.map((week, weekIndex) => (

                                <div
                                    key={weekIndex}
                                    className="flex flex-col"
                                    style={{
                                        gap: '5px',
                                    }}
                                >

                                    {week.map((day, dayIndex) => {

                                        if (!day) {

                                            return (
                                                <div
                                                    key={dayIndex}
                                                    className="w-full"
                                                    style={{
                                                        height: '16px',
                                                    }}
                                                />
                                            )
                                        }

                                        const key =
                                            `${weekIndex}-${dayIndex}`

                                        return (

                                            <div
                                                key={key}
                                                className="relative w-full"
                                                onMouseEnter={() =>
                                                    setHovered({
                                                        key,
                                                        day,
                                                    })
                                                }
                                                onMouseLeave={() =>
                                                    setHovered(null)
                                                }
                                            >

                                                <motion.div
                                                    whileHover={{
                                                        scale: 1.25,
                                                        zIndex: 20,
                                                    }}
                                                    className="w-full rounded-[3px] cursor-pointer"
                                                    style={{
                                                        height: '16px',
                                                        background:
                                                            LEVEL_COLORS[
                                                                day.level
                                                            ],
                                                        border:
                                                            day.level === 0
                                                                ? '1px solid var(--border)'
                                                                : '1px solid rgba(26,158,109,0.18)',
                                                    }}
                                                />


                                                {/* TOOLTIP */}

                                                {hovered?.key === key && (

                                                    <motion.div
                                                        initial={{
                                                            opacity: 0,
                                                            y: 3,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        className="absolute z-50 left-1/2 -translate-x-1/2 bottom-6 whitespace-nowrap px-2.5 py-1.5 rounded-md shadow-lg text-[10px]"
                                                        style={{
                                                            background:
                                                                'var(--surface)',
                                                            border:
                                                                '1px solid var(--border)',
                                                            color:
                                                                'var(--text-primary)',
                                                        }}
                                                    >

                                                        <div className="font-semibold">
                                                            {formatDate(day.date)}
                                                        </div>

                                                        <div
                                                            style={{
                                                                color:
                                                                    'var(--text-muted)',
                                                            }}
                                                        >
                                                            {day.level === 0
                                                                ? 'No study activity'
                                                                : `${day.level * 15} minutes studied`
                                                            }
                                                        </div>

                                                    </motion.div>

                                                )}

                                            </div>

                                        )

                                    })}

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>


            {/* ================= LEGEND ================= */}

            <div className="flex items-center justify-end gap-1.5 mt-5">

                <span
                    className="text-[10px]"
                    style={{
                        color: 'var(--text-muted)',
                    }}
                >
                    Less
                </span>

                {LEVEL_COLORS.map(
                    (color, index) => (

                        <div
                            key={index}
                            className="w-[14px] h-[14px] rounded-[3px]"
                            style={{
                                background: color,
                                border:
                                    '1px solid var(--border)',
                            }}
                        />

                    )
                )}

                <span
                    className="text-[10px]"
                    style={{
                        color: 'var(--text-muted)',
                    }}
                >
                    More
                </span>

            </div>

        </motion.div>
    )
}