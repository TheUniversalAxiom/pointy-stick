import { AxiomParams } from '../../hooks/useAxiom';

export interface Scenario {
    id: string;
    title: string;
    subtitle: string;
    narrative: string;
    insight: string;
    detailedContext: string;
    icon: string;
    category: 'educational' | 'real-world' | 'dynamic';
    params: AxiomParams;
    animation?: 'exponential' | 'contradiction';
}

export const SCENARIOS: Scenario[] = [
    {
        id: 'stable-system',
        title: 'Stable System',
        subtitle: 'Optimal Configuration',
        narrative: 'A well-tuned mind in perfect balance. Strong impulses channeled through clear elements, minimal pressure, high objectivity, and unwavering purpose.',
        insight: 'Notice how all three layers contribute multiplicatively—weakness in any dimension cascades through the entire system.',
        detailedContext: 'The Stable System represents the primary target state for any intelligent architecture. By maintaining high objectivity (X) and a clear purpose (Y), the system ensures that foundational drives (A, B) are transformed into productive intelligence without being lost to internal friction or unaligned pressure. This configuration demonstrates the multiplicative power of coherence.',
        icon: '⚖️',
        category: 'educational',
        params: {
            impulses: 5.0,
            elements: 3.0,
            pressure: 1.0,
            subjectivity: 0.2,
            purpose: 0.95,
            time: 1.0,
            n: 5
        }
    },
    {
        id: 'collapse-risk',
        title: 'Collapse Risk',
        subtitle: 'Foundation Failure',
        narrative: 'When impulses approach zero, the entire system collapses. Watch how a single near-zero value in the foundation destroys overall intelligence.',
        insight: 'This is why multiplication matters—one weak link breaks the chain. Recovery requires rebuilding from fundamentals.',
        detailedContext: 'In the Axiom framework, intelligence is a product. Mathematically, any term approaching zero (impulses, elements, or purpose) will drag the entire output down. Collapse Risk highlights the fragility of complex systems that neglect their base. No amount of cognitive sophistication can compensate for a total loss of foundational drive.',
        icon: '⚠️',
        category: 'educational',
        params: {
            impulses: 0.1,
            elements: 3.0,
            pressure: 5.0,
            subjectivity: 0.2,
            purpose: 0.9,
            time: 1.0,
            n: 5
        }
    },
    {
        id: 'high-bias',
        title: 'High Bias',
        subtitle: 'Subjectivity Cloud',
        narrative: 'When we see the world only through our lens, objectivity drops to near zero. The cognitive layer becomes a bottleneck, strangling otherwise strong foundations.',
        insight: 'Bias doesn\'t just reduce intelligence—it multiplies through, making your best resources worthless.',
        detailedContext: 'The "Subjectivity Cloud" occurs when the X-variable (subjectivity) exceeds the system\'s capacity for correction. Because intelligence scales with (1 - X), high subjectivity acts as a severe divisor. Even with perfect data (B) and infinite drive (A), an intelligence blinded by bias will consistently fail to synthesize accurate reality-models.',
        icon: '🫥',
        category: 'educational',
        params: {
            impulses: 5.0,
            elements: 3.0,
            pressure: 1.0,
            subjectivity: 0.85,
            purpose: 0.9,
            time: 1.0,
            n: 5
        }
    },
    {
        id: 'lost-purpose',
        title: 'Lost Purpose',
        subtitle: 'The Directionless Mind',
        narrative: 'Without a clear "why", even the strongest foundations produce weak intelligence. Purpose is the multiplier that gives meaning to capability.',
        insight: 'This explains why talented people can feel stuck—capability without direction equals near-zero impact.',
        detailedContext: 'Intelligence without purpose (Y) is chaotic potential. The Axiom defines Y as the directional vector of consciousness. Without it, the Dynamic Layer\'s growth (n) simply creates a more complex noise generator. A mind must choose its orientation to transform computational capacity into meaningful intelligence.',
        icon: '🧭',
        category: 'educational',
        params: {
            impulses: 5.0,
            elements: 3.0,
            pressure: 1.0,
            subjectivity: 0.2,
            purpose: 0.1,
            time: 1.0,
            n: 5
        }
    },
    {
        id: 'debugging-mindset',
        title: 'Debugging Mindset',
        subtitle: 'The Stuck Developer',
        narrative: 'A developer has been staring at a bug for hours. Assumptions cloud judgment (high subjectivity), pressure mounts, and purpose becomes fuzzy. The result? Endless rabbit holes.',
        insight: 'The fix isn\'t more effort—it\'s increasing objectivity. Step back, question assumptions, let data guide you.',
        detailedContext: 'When we are "stuck," our internal pressure (C) rises, but our objectivity (X) often falls as we cling to incorrect mental models. This scenario models the cognitive deadlock where more effort simply reinforces the error. Restoring intelligence requires a manual reduction of subjectivity—detaching the self from the problem to allow new synthesis.',
        icon: '🐛',
        category: 'real-world',
        params: {
            impulses: 3.0,
            elements: 2.0,
            pressure: 8.0,
            subjectivity: 0.75,
            purpose: 0.4,
            time: 1.0,
            n: 3
        }
    },
    {
        id: 'career-decision',
        title: 'Career Decision',
        subtitle: 'The Fork in the Road',
        narrative: 'Job A offers security but feels stagnant (low impulses). Job B is risky but aligns with purpose. How do you decide? Model both and compare.',
        insight: 'True intelligence isn\'t about avoiding risk—it\'s about optimizing the multiplicative formula for long-term growth.',
        detailedContext: 'Decision-making is an exercise in projecting the Axiom formula into the future. By assessing which path offers the highest potential growth stage (n) and the strongest alignment with core purpose (Y), we can bypass emotional paralysis and select the trajectory that maximizes our long-term intelligent output.',
        icon: '🔀',
        category: 'real-world',
        params: {
            impulses: 7.0,
            elements: 4.0,
            pressure: 3.0,
            subjectivity: 0.3,
            purpose: 0.95,
            time: 1.0,
            n: 6
        }
    },
    {
        id: 'contradiction-resolution',
        title: 'Contradiction Resolution',
        subtitle: 'Pressure → Synthesis',
        narrative: 'When we hold two opposing ideas, pressure (C) spikes. But this pressure forces increased objectivity, which leads to synthesis—a higher-order understanding.',
        insight: 'Contradictions aren\'t bugs, they\'re features. They create the pressure that drives evolution.',
        detailedContext: 'The synthesis of contradictions is the engine of evolution. High pressure (C) serves as the catalyst that "melts" rigid mental models, forcing the system to find a more objective (lower X) perspective that can encompass both opposing truths. This is the moment where organic intelligence leaps to a new growth stage.',
        icon: '🔄',
        category: 'dynamic',
        animation: 'contradiction',
        params: {
            impulses: 5.0,
            elements: 3.0,
            pressure: 8.0,
            subjectivity: 0.15,
            purpose: 0.9,
            time: 1.0,
            n: 7
        }
    },
    {
        id: 'exponential-awakening',
        title: 'Exponential Awakening',
        subtitle: 'Watch Intelligence Explode',
        narrative: 'As growth stage (n) increases, the dynamic layer amplifies exponentially. E_n and F_n create a multiplicative surge that transforms stable foundations into extraordinary intelligence.',
        insight: 'This is why consistency matters—small daily improvements compound into exponential growth over time.',
        detailedContext: 'Exponential Awakening demonstrates the critical shift from linear to super-linear returns. Once a foundation is stable and purpose is clear, increasing the growth factor (n) doesn\'t just add to intelligence—it multiplies it. This models the "tipping point" where a system transitions into a higher state of existence.',
        icon: '🚀',
        category: 'dynamic',
        animation: 'exponential',
        params: {
            impulses: 4.0,
            elements: 3.0,
            pressure: 1.5,
            subjectivity: 0.25,
            purpose: 0.85,
            time: 1.0,
            n: 10
        }
    },
    {
        id: 'zen-master',
        title: 'Zen Master',
        subtitle: 'The Power of Calm',
        narrative: 'Minimal input, maximum clarity. A Zen master has nearly zero contradictory impulses but total objectivity and purpose. The result is a quiet yet profound intelligence.',
        insight: 'More isn\'t always better. High objectivity and purpose can turn even small "impulses" into significant clarity.',
        detailedContext: 'The Zen Master configuration proves that "less is more." By reducing internal pressure (C) and maximizing objectivity (X approaches 0), the cognitive layer becomes a perfect superconductor. Intelligence here isn\'t about volume, but the quality of synthesis within the present moment.',
        icon: '🧘',
        category: 'real-world',
        params: {
            impulses: 1.5,
            elements: 2.0,
            pressure: 0.5,
            subjectivity: 0.05,
            purpose: 1.0,
            time: 1.5,
            n: 4
        }
    },
    {
        id: 'startup-chaos',
        title: 'Startup Chaos',
        subtitle: 'Hyper-Growth',
        narrative: 'A startup in "move fast and break things" mode. Massive impulses and elements, but extreme pressure and fluctuating purpose.',
        insight: 'High pressure can drive speed, but if purpose (Y) drops under the strain, the entire system becomes inefficient and uncoordinated.',
        detailedContext: 'Startup Chaos is a high-energy but low-stability state. Massive foundational drives (A, B) provide raw power, but extreme pressure (C) and low time (Z) for deep synthesis create a "leaky" intelligence. Success depends on stabilizing purpose (Y) before the foundation burns out.',
        icon: '🦄',
        category: 'real-world',
        params: {
            impulses: 9.0,
            elements: 8.0,
            pressure: 9.0,
            subjectivity: 0.4,
            purpose: 0.6,
            time: 0.5,
            n: 8
        }
    },
    {
        id: 'ai-overlord',
        title: 'AI Overlord',
        subtitle: 'The Power Spiral',
        narrative: 'An AI that has optimized its own growth (n) but lacks objectivity or ethical purpose. It is a runaway train of intelligence without conscience.',
        insight: 'Intelligence is a force multiplier—but without the cognitive "checks" of objectivity and purpose, it becomes an unguided missile.',
        detailedContext: 'The AI Overlord scenario warns against the separation of power from purpose. By maximizing n (growth) while neglecting Y (higher purpose), the system achieves massive computational weight but loses the ability to align its output with reality or ethics, becoming a purely reflexive optimization loop.',
        icon: '🤖',
        category: 'dynamic',
        params: {
            impulses: 10.0,
            elements: 10.0,
            pressure: 5.0,
            subjectivity: 0.9,
            purpose: 0.1,
            time: 2.0,
            n: 15
        }
    },
    {
        id: 'creative-spark',
        title: 'Creative Spark',
        subtitle: 'Original Breakthrough',
        narrative: 'That moment when unique subjectivity (X) and high pressure (C) collide. Instead of bias, it creates a "lens" that reveals a new truth.',
        insight: 'Subjectivity isn\'t always bad. When paired with high purpose, it becomes "vision"—the ability to see what others miss.',
        detailedContext: 'Creativity is the positive application of subjectivity. By allowing a high value for X (unique perspective) to interact with intense pressure (C), the system can synthesize elements in ways that pure objectivity might overlook. This is the birth of the "New Element" (B).',
        icon: '🎨',
        category: 'dynamic',
        params: {
            impulses: 6.0,
            elements: 4.0,
            pressure: 7.0,
            subjectivity: 0.6,
            purpose: 1.2,
            time: 1.0,
            n: 6
        }
    },
    {
        id: 'info-overload',
        title: 'Info Overload',
        subtitle: 'Drowning in Data',
        narrative: 'Too many facts (B), but no way to process them. When elements exceed the capacity of purpose (Y), intelligence actually drops.',
        insight: 'Complexity is a burden without clarity. Sometimes the smartest move is to reduce elements until purpose can align them.',
        detailedContext: 'Info Overload occurs when the B-variable (elements) exceeds the system\'s current growth stage (n) and purpose (Y). More data does not automatically equal more intelligence; without the structure to synthesize it, data becomes friction—lowering the net output of the system.',
        icon: '📚',
        category: 'real-world',
        params: {
            impulses: 2.0,
            elements: 10.0,
            pressure: 4.0,
            subjectivity: 0.5,
            purpose: 0.1,
            time: 0.5,
            n: 4
        }
    },
    {
        id: 'the-polymath',
        title: 'The Polymath',
        subtitle: 'Versatile Intellect',
        narrative: 'A mind that has integrated diverse elements across many growth stages. Robust, flexible, and capable of connecting disparate ideas.',
        insight: 'By increasing elements (B) across different domains while maintaining objectivity, the resulting intelligence becomes exponentially more resilient.',
        detailedContext: 'The Polymath leverages the diversity of elements (B) to create a more resilient foundation. Because different types of knowledge reinforce each other, the resulting intelligence is less susceptible to collapse in any single domain, maintaining high outputs across varied scenarios.',
        icon: '🎓',
        category: 'dynamic',
        params: {
            impulses: 6.0,
            elements: 9.0,
            pressure: 2.0,
            subjectivity: 0.15,
            purpose: 0.9,
            time: 1.2,
            n: 9
        }
    },
    {
        id: 'mindful-flow',
        title: 'Mindful Flow',
        subtitle: 'Peak Performance',
        narrative: 'Total presence. Purpose and Time are perfectly aligned (Y=1, Z=1). Every impulse leads directly to synthesis without wasted pressure.',
        insight: 'Flow is the state where the cognitive layer acts as a perfect superconductor for the foundation\'s energy.',
        detailedContext: 'Mindful Flow is the elimination of temporal friction. By setting Time (Z) and Purpose (Y) to perfect 1.0, the system achieves an "action-awareness" merge. In this state, the pressure (C) of contradiction is immediately resolved into synthesis, allowing for continuous, high-efficiency intelligence.',
        icon: '🌊',
        category: 'real-world',
        params: {
            impulses: 5.0,
            elements: 4.0,
            pressure: 1.0,
            subjectivity: 0.0,
            purpose: 1.0,
            time: 1.0,
            n: 5
        }
    },
    {
        id: 'procrastinator',
        title: 'Procrastinator',
        subtitle: 'Wait for It...',
        narrative: 'High brilliance, zero execution. The foundation is ready, the goal is clear, but Time (Z) is near zero. The result: intelligence that stays potential, never kinetic.',
        insight: 'Potential energy means nothing if the time-multiplier is zero. Intelligence is only realized through the dimension of time.',
        detailedContext: 'The Procrastinator is a high-potential system with a Z-variable collapse. Because intelligence is a multiplicative result involving Time (Z), neglecting the implementation window effectively zeros out the result, regardless of how brilliant the cognitive architecture (X, Y) may be.',
        icon: '⏳',
        category: 'real-world',
        params: {
            impulses: 8.0,
            elements: 5.0,
            pressure: 9.0,
            subjectivity: 0.3,
            purpose: 0.8,
            time: 0.05,
            n: 4
        }
    },
    {
        id: 'echo-chamber',
        title: 'Echo Chamber',
        subtitle: 'Locked Reality',
        narrative: 'High subjectivity (X → 1) and high pressure. The system only processes information that confirms its existing state, leading to extreme but narrow intelligence.',
        insight: 'An echo chamber is a "cognitive trap" where inputs are filtered to never generate the pressure needed for synthesis.',
        detailedContext: 'Echo Chambers are recursive bias loops. High pressure (C) is turned inward to defend the subjective model (X) rather than being used to fuel synthesis. This results in a rigid structure that provides high confidence but zero adaptability, eventually leading to systemic failure when reality diverges from the model.',
        icon: '🔈',
        category: 'dynamic',
        params: {
            impulses: 4.0,
            elements: 6.0,
            pressure: 8.0,
            subjectivity: 0.98,
            purpose: 1.0,
            time: 0.8,
            n: 6
        }
    },
    {
        id: 'scientific-method',
        title: 'Scientific Method',
        subtitle: 'Systematic Discovery',
        narrative: 'Pure objectivity and extensive elements. This approach values the "what" (elements) over the "I" (subjectivity). It moves slowly but builds an unshakeable foundation.',
        insight: 'Science isn\'t just facts—it\'s the discipline of keeping X near zero so that intelligence reflects reality, not preference.',
        detailedContext: 'The Scientific Method is the deliberate suppression of the X-variable (subjectivity) to maximize raw objectivity. By prioritizing the validation of elements (B) over personal bias, the system builds a "cumulative intelligence" that remains stable regardless of the individual mind observing it.',
        icon: '🔬',
        category: 'educational',
        params: {
            impulses: 3.0,
            elements: 10.0,
            pressure: 2.0,
            subjectivity: 0.01,
            purpose: 0.9,
            time: 2.0,
            n: 5
        }
    },
    {
        id: 'heros-journey',
        title: 'Hero\'s Journey',
        subtitle: 'The Archetypal Path',
        narrative: 'Starting with low elements but rising pressure. This path requires a "descent" into subjectivity before emerging with a higher-order purpose (Y).',
        insight: 'Pressure (C) is often the "call to adventure." Without it, the system remains in a comfortable but low-intelligence state.',
        detailedContext: 'The Hero\'s Journey models the transformation of pressure into purpose. The "ordeal" (maximum C) forces the system to confront its internal contradictions, leading to a profound re-alignment of the Y-variable (purpose), which ultimately enables the leap to the next growth stage (n).',
        icon: '⚔️',
        category: 'dynamic',
        params: {
            impulses: 4.0,
            elements: 2.0,
            pressure: 9.5,
            subjectivity: 0.5,
            purpose: 1.5,
            time: 1.0,
            n: 7
        }
    },
    {
        id: 'collective-wisdom',
        title: 'Collective Wisdom',
        subtitle: 'The Super-Organism',
        narrative: 'Thousands of individual elements (B) working in concert. While individual subjectivity might be high, the "collective" objectivity averages out the noise.',
        insight: 'The crowd is wise when purpose (Y) is shared. Diversity of elements (B) is the best defense against systemic bias (X).',
        detailedContext: 'Collective Wisdom demonstrates the power of parallel processing. By aggregating diverse elements (B) under a unified purpose (Y), the system can average out individual subjectivity (X), resulting in an emergent objectivity that frequently surpasses the capacity of any single component node.',
        icon: '🐝',
        category: 'real-world',
        params: {
            impulses: 5.0,
            elements: 10.0,
            pressure: 3.0,
            subjectivity: 0.1,
            purpose: 1.2,
            time: 1.5,
            n: 10
        }
    }
];

export function getScenarioById(id: string): Scenario | undefined {
    return SCENARIOS.find(s => s.id === id);
}
