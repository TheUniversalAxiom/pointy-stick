import { AxiomParams } from '../../hooks/useAxiom';

export interface Scenario {
    id: string;
    title: string;
    subtitle: string;
    narrative: string;
    insight: string;
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
    }
];

export function getScenarioById(id: string): Scenario | undefined {
    return SCENARIOS.find(s => s.id === id);
}
