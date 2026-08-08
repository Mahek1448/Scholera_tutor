// Mock data service — adapts the existing mock files into React-friendly hooks/functions

import conversationData from '../../conversation.json'
import conversationEmptyData from '../../conversation-empty.json'
import responsesData from '../../responses.json'
import lecture01 from '../../lectures/lecture-01-linear-models.json'
import lecture02 from '../../lectures/lecture-02-gradient-descent.json'
import lecture03 from '../../lectures/lecture-03-regularization.json'

export const conversation = conversationData
export const conversationEmpty = conversationEmptyData
export const responses = responsesData

export const lectures = [lecture01, lecture02, lecture03]

// Find a lecture by name (partial match)
export function findLecture(lectureName) {
    return lectures.find((l) =>
        lectureName.toLowerCase().includes(l.title.toLowerCase()) ||
        l.title.toLowerCase().includes(lectureName.replace(/^Week \d+ — /i, '').toLowerCase())
    )
}

// Find a specific slide
export function findSlide(lectureName, slideNumber) {
    const lecture = findLecture(lectureName)
    if (!lecture) return null
    return lecture.slides.find((s) => s.slide_number === slideNumber) || null
}

// List all scenarios
export function listScenarios() {
    return responsesData.scenarios.map(({ id, prompt }) => ({ id, prompt }))
}

// Get a scenario
export function getScenario(id) {
    return responsesData.scenarios.find((s) => s.id === id) || null
}

// Simulate streaming a response — returns an async generator
export async function* streamResponse(id, opts = {}) {
    const { signal, speed = 1 } = opts
    const scenario = getScenario(id)
    if (!scenario) throw new Error(`Unknown scenario "${id}"`)

    const chunks = chunkify(scenario.text)
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

    await sleep(scenario.first_token_delay_ms * speed)
    if (signal?.aborted) return

    if (scenario.error && scenario.fails_before_first_token) {
        throw new Error(scenario.error)
    }

    for (const chunk of chunks) {
        if (signal?.aborted) return
        yield chunk
        await sleep(scenario.chunk_delay_ms * speed)
    }

    if (scenario.error) {
        throw new Error(scenario.error)
    }
}

// Find best matching scenario by prompt text
export function matchScenario(userInput) {
    const input = userInput.toLowerCase()
    const scenarios = responsesData.scenarios

    // Score each scenario
    const scored = scenarios.map((s) => {
        const promptWords = s.prompt.toLowerCase().split(/\s+/)
        const matches = promptWords.filter((w) => w.length > 3 && input.includes(w))
        return { ...s, score: matches.length }
    })

    scored.sort((a, b) => b.score - a.score)
    return scored[0]?.score > 0 ? scored[0] : scenarios[Math.floor(Math.random() * scenarios.length)]
}

// Chunkify text (matches mock-stream.mjs logic exactly)
function chunkify(text) {
    const chunks = []
    let i = 0
    let seed = 1337
    const next = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff)
    while (i < text.length) {
        const size = 2 + Math.floor(next() * 6)
        chunks.push(text.slice(i, i + size))
        i += size
    }
    return chunks
}

// Dashboard mock data
export const dashboardData = {
    student: { name: 'Ana Reyes', id: 'stu_0014' },
    course: { code: 'CS 4780', title: 'Machine Learning for Engineers', instructor: 'Dr. Elena Márquez' },
    streakDays: 12,
    totalTopics: 32,
    completedTopics: 18,
    todayMinutes: 47,
    todayTopics: 4,
    notesCreated: 6,
    questionsAsked: 11,
    lastTopic: {
        name: 'Vanishing Gradient Problem',
        lecture: 'Week 2 — Gradient Descent and Backpropagation',
        slide: 9,
        understanding: 78,
    },
    heatmapTopics: [
        { id: 1, name: 'Supervised Learning', understanding: 92, timesAsked: 5, lecture: 'Week 1', slide: 2, status: 'mastered', lastRevised: '2026-09-20' },
        { id: 2, name: 'Linear Model', understanding: 85, timesAsked: 4, lecture: 'Week 1', slide: 3, status: 'mastered', lastRevised: '2026-09-20' },
        { id: 3, name: 'Squared Error', understanding: 88, timesAsked: 3, lecture: 'Week 1', slide: 4, status: 'mastered', lastRevised: '2026-09-21' },
        { id: 4, name: 'Cross-Entropy', understanding: 72, timesAsked: 6, lecture: 'Week 1', slide: 10, status: 'learning', lastRevised: '2026-09-21' },
        { id: 5, name: 'Logistic Function', understanding: 79, timesAsked: 4, lecture: 'Week 1', slide: 8, status: 'learning', lastRevised: '2026-09-22' },
        { id: 6, name: 'Gradient Descent', understanding: 83, timesAsked: 7, lecture: 'Week 2', slide: 3, status: 'mastered', lastRevised: '2026-09-22' },
        { id: 7, name: 'Backpropagation', understanding: 68, timesAsked: 9, lecture: 'Week 2', slide: 6, status: 'learning', lastRevised: '2026-09-22' },
        { id: 8, name: 'Chain Rule', understanding: 75, timesAsked: 5, lecture: 'Week 2', slide: 6, status: 'learning', lastRevised: '2026-09-22' },
        { id: 9, name: 'Vanishing Gradient', understanding: 78, timesAsked: 8, lecture: 'Week 2', slide: 9, status: 'learning', lastRevised: '2026-09-22' },
        { id: 10, name: 'ReLU', understanding: 81, timesAsked: 6, lecture: 'Week 2', slide: 11, status: 'mastered', lastRevised: '2026-09-22' },
        { id: 11, name: 'Overfitting', understanding: 45, timesAsked: 3, lecture: 'Week 3', slide: 4, status: 'needs-revision', lastRevised: '2026-09-18' },
        { id: 12, name: 'L2 Regularization', understanding: 52, timesAsked: 4, lecture: 'Week 3', slide: 6, status: 'needs-revision', lastRevised: '2026-09-19' },
        { id: 13, name: 'L1 Regularization', understanding: 48, timesAsked: 3, lecture: 'Week 3', slide: 8, status: 'needs-revision', lastRevised: '2026-09-19' },
        { id: 14, name: 'Dropout', understanding: 35, timesAsked: 2, lecture: 'Week 3', slide: 9, status: 'needs-revision', lastRevised: '2026-09-17' },
        { id: 15, name: 'Early Stopping', understanding: 60, timesAsked: 3, lecture: 'Week 3', slide: 10, status: 'learning', lastRevised: '2026-09-22' },
        { id: 16, name: 'Batch Size', understanding: 70, timesAsked: 2, lecture: 'Week 2', slide: 5, status: 'learning', lastRevised: '2026-09-21' },
        { id: 17, name: 'Learning Rate', understanding: 88, timesAsked: 8, lecture: 'Week 2', slide: 4, status: 'mastered', lastRevised: '2026-09-22' },
        { id: 18, name: 'Normal Equation', understanding: 90, timesAsked: 3, lecture: 'Week 1', slide: 12, status: 'mastered', lastRevised: '2026-09-21' },
    ],
    learningMap: [
        { id: 'ml-intro', label: 'Machine Learning Intro', lecture: 'Week 1', slide: 2, understanding: 92, status: 'mastered', related: ['Linear Model', 'Loss Functions'] },
        { id: 'linear-model', label: 'Linear Regression', lecture: 'Week 1', slide: 3, understanding: 85, status: 'mastered', related: ['Squared Error', 'Normal Equation'] },
        { id: 'loss-fn', label: 'Loss Functions', lecture: 'Week 1', slide: 4, understanding: 80, status: 'mastered', related: ['Cross-Entropy', 'Squared Error'] },
        { id: 'gradient-descent', label: 'Gradient Descent', lecture: 'Week 2', slide: 3, understanding: 83, status: 'mastered', related: ['Learning Rate', 'Mini-batch'] },
        { id: 'learning-rate', label: 'Learning Rate', lecture: 'Week 2', slide: 4, understanding: 88, status: 'mastered', related: ['Gradient Descent', 'Adam'] },
        { id: 'backprop', label: 'Backpropagation', lecture: 'Week 2', slide: 6, understanding: 68, status: 'learning', related: ['Chain Rule', 'Forward Pass'] },
        { id: 'vanishing', label: 'Vanishing Gradient', lecture: 'Week 2', slide: 9, understanding: 78, status: 'learning', related: ['ReLU', 'Sigmoid'] },
        { id: 'relu', label: 'ReLU Activation', lecture: 'Week 2', slide: 11, understanding: 81, status: 'mastered', related: ['Dying ReLU', 'Leaky ReLU'] },
        { id: 'overfitting', label: 'Overfitting', lecture: 'Week 3', slide: 4, understanding: 45, status: 'needs-revision', related: ['Regularization', 'Early Stopping'] },
        { id: 'regularization', label: 'Regularization', lecture: 'Week 3', slide: 6, understanding: 52, status: 'needs-revision', related: ['L1', 'L2', 'Dropout'] },
    ],
}
