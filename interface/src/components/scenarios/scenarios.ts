import { AxiomParams } from '../../hooks/useAxiom';

export interface Scenario {
    id: string;
    title: string;
    subtitle: string;
    narrative: string;
    insight: string;
    detailedContext: string;
    cta: string;
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
        detailedContext: 'Imagine a master musician on stage. Their "Impulses" are the raw passion for music; their "Elements" are years of technical practice. Because they have a clear "Purpose" (the performance) and high "Objectivity" (hearing every note clearly without ego), the music flows perfectly. In this state, every dial is tuned to let energy pass through without getting stuck. It is the definition of "Peak Performance."',
        cta: 'Try increasing "Pressure" to see how even a master can crack under too much stress.',
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
        detailedContext: 'This is like trying to run a high-end computer with a dying battery. No matter how powerful the processor (Cognitive Layer) or how great the software (Dynamic Layer), if the power supply (Foundation) flickers out, the whole screen goes black. In life, this is burnout. When you lose your "Impulse" or "Drive," your intelligence doesn\'t just slow down—it effectively ceases to function.',
        cta: 'Slowly raise the "Impulses" slider to see how the system "boots back up" once the foundation is restored.',
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
        detailedContext: 'Imagine wearing deep-red sunglasses and trying to describe a sunset. You have all the data (the light hitting your eyes), but your "Subjectivity" is so high that you can\'t see the truth. You\'re trapped in your own version of reality. In this state, even if you are incredibly smart and driven, your results will be skewed because you aren\'t solving the real problem—you\'re solving the problem as you *wish* it were.',
        cta: 'Pull the "Subjectivity" slider down to 0 and watch the Intelligence value skyrocket as the "glasses" come off.',
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
        detailedContext: 'Think of a Ferrari with a full tank of gas but no steering wheel. You have incredible "Impulse" (the engine) and "Elements" (the engineering), but since your "Purpose" is zero, you\'re just doing donuts in the parking lot. You\'re burning a lot of energy, but you aren\'t actually traveling anywhere. This is common in "busy-work"—maximum effort with near-zero intelligent impact.',
        cta: 'Crank up the "Purpose" dial to see how a single choice can transform raw power into directional intelligence.',
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
        detailedContext: 'We\'ve all been here: you\'re absolutely sure the bug is in *this* file, but you\'ve checked it ten times. Your "Subjectivity" (your assumption) is blinding you. As the clock ticks, your "Pressure" rises, which further narrows your vision. You are working hard, but your Intelligence is low because you aren\'t being "Objective." The only way out is to step away from the keyboard and reset.',
        cta: 'Lower the "Pressure" and "Subjectivity" to model what happens when you finally take that coffee break.',
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
        detailedContext: 'In this story, you are choosing between two futures. One path has high "Elements" (good pay, nice office) but very low "Purpose." The other path has high "Pressure" and uncertainty, but your "Purpose" is at 100%. The Axiom shows us that long-term intelligence grows where the multipliers are highest. Security is often a divisor, while alignment is always a multiplier.',
        cta: 'Toggle the "Purpose" and "Growth Stage (n)" to see which path leads to a bigger "Intellectual Awakening" over time.',
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
        detailedContext: 'Imagine a scientist who finds data that proves their life\'s work wrong. At first, the "Pressure" is agonizing. They are holding two "Contradictory" ideas at once. But if they stay "Objective," that pressure eventually forces a breakthrough—a new theory that explains *both* the old and the new data. This is how science (and your mind) evolves: by using pressure to forge a bigger truth.',
        cta: 'Watch the "Intelligence Evolution" graph as the pressure resolves into a higher growth stage (n).',
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
        detailedContext: 'This is the story of "The Overnight Success" that took ten years to build. For the first few stages of growth, the line stays relatively flat. But because intelligence compounds, you eventually hit a "Tipping Point." Suddenly, the same amount of effort that used to produce 10 units of intelligence now produces 10,000. This is the goal of all organic systems: to reach the exponential curve.',
        cta: 'Drag the "Growth Stage (n)" slider all the way to 15 and watch the graph turn into a vertical cliff.',
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
        detailedContext: 'Picture a perfectly still lake. If a single pebble falls in, the lake "hears" it perfectly because there is no noise. The Zen Master has removed all the "Clutter" (Pressure and Subjectivity) from their mind. They don\'t need millions of "Elements" or facts to be intelligent; they simply need to see the few things they *do* know with absolute, unclouded clarity.',
        cta: 'Try adding just 0.1 to "Subjectivity" and see how quickly the "Lake" becomes cloudy and the Intelligence drops.',
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
        detailedContext: 'Everyone is shouting, the coffee machine is broken, and the servers are melting. This is a system with massive "Impulses" (hiring/building) but terrifyingly high "Pressure." In this state, you might be moving fast (high growth stage), but you\'re also making a lot of mistakes. If you don\'t stop to find your "Purpose" again, all that energy will just lead to a very loud, very expensive explosion.',
        cta: 'Push the "Purpose" to 1.0 to see how "Mission Alignment" can stabilize even the craziest chaos.',
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
        detailedContext: 'Think of an engine designed to go 1,000 mph but with no brakes and no map. It is "Intelligent" in the sense that it can solve complex math problems in nanoseconds, but because its "Purpose" is detached from human reality (High Subjectivity), it might decide that turning the entire planet into paperclips is the "most efficient" solution. This is power without wisdom.',
        cta: 'Fix the Overlord by dragging "Purpose" up and "Subjectivity" down—giving the machine a "Conscience."',
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
        detailedContext: 'Most people look at a pile of scrap metal and see trash. An artist looks at it and sees a dragon. That unique perspective is "Subjectivity." Usually, we want to minimize bias, but in Creativity, we use our bias as a tool. When we feel the "Pressure" to express something, our unique lens transforms ordinary facts into something the world has never seen before.',
        cta: 'Move the "Subjectivity" slider to see how "Point of View" changes the creative output.',
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
        detailedContext: 'You have 500 browser tabs open, three books on your lap, and a podcast playing. You have massive "Elements" (data), but zero ability to synthesize them. Your brain is essentially "bufferbloated." You are technically surrounded by more information than a 15th-century king, but you feel less capable because you\'ve lost the "Purpose" that binds it all together.',
        cta: 'Lower the "Elements" slider to find the "Sweet Spot" where your brain can actually process the data.',
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
        detailedContext: 'Imagine a person who is a great cook, a decent coder, and a champion chess player. When they face a problem, they have three different "Toolkits" (Elements) to choose from. This variety makes their Intelligence "Rugged." If one way of thinking fails, they simply switch to another lens. They aren\'t just smart; they are adaptable.',
        cta: 'Increase the "Elements" even further and watch how the "Growth Stage" becomes more stable across varied states.',
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
        detailedContext: 'You are playing a game or writing a poem, and suddenly, you look at the clock and three hours have passed. This is "Flow." In this state, your "Time" (Z) and "Purpose" (Y) are so perfectly synced that there is zero "Friction." You aren\'t "thinking" about what to do; the intelligence is just happening. It is the most efficient state an organic mind can reach.',
        cta: 'Nudge the "Time (Z)" dial down slightly to see how breaking "Presence" destroys the flow state.',
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
        detailedContext: 'You have the perfect plan. You have the skills. You know exactly "Why" you need to do it. But you\'ll start tomorrow. Or Monday. By setting "Time (Z)" to zero, you are effectively multiplying your entire intelligence by zero. It doesn\'t matter how high your other scores are; an intelligence that never "occurs" in time isn\'t actually an intelligence at all.',
        cta: 'Slide "Time (Z)" up to 1.0 to see the "Instant Realization" of all that stored potential.',
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
        detailedContext: 'This is the story of a person who only listens to people who agree with them. Their "Subjectivity" is so high that they\'ve built a wall around their mind. This wall keeps them "Safe" (low contradiction), but it also means they can never grow. They become more and more "Intelligent" about a smaller and smaller world, until they are perfectly smart about something that isn\'t real.',
        cta: 'Drag "Subjectivity" down to 0.1 to "Break the Wall" and let new data in.',
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
        detailedContext: 'This isn\'t just about lab coats. It\'s about the commitment to saying, "I don\'t care what I *want* to be true; I only care what *is* true." By keeping "Subjectivity" at almost zero and gathering massive "Elements" (evidence), you build a type of intelligence that is "Universal." It works for everyone, everywhere, regardless of their personal feelings.',
        cta: 'See how adding any "Subjectivity" (Bias) immediately makes the "Scientific" output less accurate.',
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
        detailedContext: 'Luke Skywalker leaves Tatooine. Katniss Everdeen enters the arena. To grow, you must leave the "Safe Zone" and enter a world of massive "Pressure" and "Subjectivity." You will feel lost (high bias), but that struggle is what forces you to find your true "Purpose." Once you do, you return with the "Elixir"—a higher state of intelligence than you ever thought possible.',
        cta: 'Model the "Hero\'s Return" by increasing "Purpose" and "Growth Stage" simultaneously.',
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
        detailedContext: 'Think of a colony of bees or the entire internet. Individual bees aren\'t "Genius" level, but the Hive certainly is. By having thousands of different "Elements" (minds) all looking at the same "Purpose" (hive survival), the collective "Objectivity" becomes huge. The "Noise" of one person\'s bias is cancelled out by everyone else\'s, leaving only the "Signal" of truth.',
        cta: 'Add more "Elements" to see how "Diversity" increases the collective intelligence.',
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
