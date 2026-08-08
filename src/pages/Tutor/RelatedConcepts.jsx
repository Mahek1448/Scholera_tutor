import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'

const RELATED_CONCEPTS = {
    'vanishing gradient': ['ReLU Activation', 'Sigmoid Derivative', 'Deep Networks', 'Batch Normalization'],
    'relu': ['Dying ReLU', 'Leaky ReLU', 'Activation Functions', 'Vanishing Gradient'],
    'gradient': ['Learning Rate', 'Backpropagation', 'Momentum', 'Adam Optimizer'],
    'regularization': ['Overfitting', 'L1 vs L2', 'Dropout', 'Early Stopping'],
    'backpropagation': ['Chain Rule', 'Forward Pass', 'Vanishing Gradient', 'ReLU'],
    'default': ['Gradient Descent', 'Bias-Variance Tradeoff', 'Cross-Entropy Loss', 'Overfitting'],
}

function getRelatedConcepts(text) {
    const lower = (text || '').toLowerCase()
    for (const [key, concepts] of Object.entries(RELATED_CONCEPTS)) {
        if (key !== 'default' && lower.includes(key)) return concepts
    }
    return RELATED_CONCEPTS.default
}

export default function RelatedConcepts({ content, onConceptClick }) {
    const concepts = getRelatedConcepts(content)

    return (
        <div className="mt-3 pt-3 border-t border-border/50">
            <div className="flex items-center gap-1.5 mb-2">
                <Lightbulb size={11} className="text-text-muted" />
                <span className="text-[11px] text-text-muted font-semibold uppercase tracking-wide">Related Concepts</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
                {concepts.map((concept, i) => (
                    <motion.button
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.06 * i }}
                        whileHover={{ scale: 1.04, y: -1 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => onConceptClick(concept)}
                        className="text-[12px] font-medium text-primary-600 bg-primary-50 border border-primary-200 hover:bg-primary-100 hover:border-primary-300 px-3 py-1 rounded-full transition-all"
                    >
                        {concept}
                    </motion.button>
                ))}
            </div>
        </div>
    )
}
