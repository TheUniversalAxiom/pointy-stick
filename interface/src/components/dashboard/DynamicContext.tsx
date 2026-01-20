import './DynamicContext.css';
import { Scenario } from '../scenarios/scenarios';
import { AxiomParams } from '../../hooks/useAxiom';

interface DynamicContextProps {
    scenario: Scenario | null;
    currentParams: AxiomParams;
}

export function DynamicContext({ scenario, currentParams }: DynamicContextProps) {
    const title = scenario ? scenario.title : 'The Architecture of Organic Intelligence';
    const subtitle = scenario ? scenario.subtitle : 'Principles of The Universal Axiom';

    // Default narrative
    const defaultText = 'At its core, organic intelligence is a living balance. It starts with raw "Impulses" (Your Drive) and "Elements" (Your Facts). These are your raw materials. The "Cognitive Layer" then filters these through "Objectivity" and "Purpose." When everything aligns, intelligence flows. When they clash, you get "Internal Friction" or bias.';

    const content = scenario ? scenario.detailedContext : defaultText;
    const cta = scenario ? scenario.cta : 'Experiment with the "Growth Stage (n)" slider to see how intelligence compounds over time.';

    // Reactive Commentary Logic
    const getReactiveInsight = () => {
        if (scenario) {
            const base = scenario.params;
            const diffs = {
                impulses: currentParams.impulses - base.impulses,
                pressure: currentParams.pressure - base.pressure,
                subjectivity: currentParams.subjectivity - base.subjectivity,
                purpose: currentParams.purpose - base.purpose
            };

            if (diffs.pressure > 3) return `⚠️ High Pressure Alert: You've added a lot of internal friction to this ${scenario.title}. It's getting harder for the cognitive layer to synthesize a clear output.`;
            if (diffs.subjectivity > 0.4) return `🔍 Bias Warning: By increasing Subjectivity, you're "clouding" the ${scenario.title}. Notice how the Intelligence Sum drops as your "lens" gets darker.`;
            if (diffs.impulses < -3) return `📉 Power Loss: The foundation is weakening. Without drive, even a ${scenario.title} starts to stall out.`;
            if (diffs.purpose > 0.5) return `✨ Purpose Boost: You've aligned this state even further. Watch how a small increase in "Why" leads to a massive jump in "Intelligence."`;
            if (diffs.purpose < -0.4) return `🧭 Drift: You're losing site of the "Purpose" for this scenario. The alignment is breaking down.`;

            return `🎯 Live State: Currently tracking close to the ${scenario.title} ideal. Keep exploring!`;
        } else {
            // General balance feedback
            if (currentParams.pressure > 7 && currentParams.subjectivity > 0.6) return "🧱 Stuck State: High Pressure and High Bias usually mean you're in a rabbit hole. Try lowering both to see clearly.";
            if (currentParams.purpose > 1.2) return "🏹 Focused Drive: Your Purpose is exceptionally high. This is where breakthroughs happen.";
            if (currentParams.impulses < 1) return "💤 Dormant Mind: Without foundational impulse, the multipliers have nothing to work with.";
            if (currentParams.pressure < 1 && currentParams.subjectivity < 0.1 && currentParams.purpose > 0.9) return "💎 Peak Coherence: You've found a state of high clarity. Everything is flowing perfectly.";
            return "🌱 Balanced Flux: The system is in a healthy state of discovery. Tune the dials to find a specific scenario.";
        }
    };

    const reactiveInsight = getReactiveInsight();

    return (
        <div className="dynamic-context">
            <div className="dynamic-context__header">
                <div className="dynamic-context__icon">
                    {scenario ? scenario.icon : '🧠'}
                </div>
                <div className="dynamic-context__titles">
                    <h3 className="dynamic-context__title">{title}</h3>
                    <p className="dynamic-context__subtitle">{subtitle}</p>
                </div>
            </div>

            <div className="dynamic-context__body">
                <p className="dynamic-context__text">{content}</p>

                <div className="dynamic-context__reactive">
                    <span>{reactiveInsight}</span>
                </div>

                <div className="dynamic-context__cta">
                    <span className="dynamic-context__cta-icon">💡</span>
                    <span className="dynamic-context__cta-text">{cta}</span>
                </div>
            </div>

            <div className="dynamic-context__footer">
                <div className="dynamic-context__tags">
                    <span className="dynamic-context__tag">{scenario ? 'Scenario Analysis' : 'System Overview'}</span>
                    <span className="dynamic-context__tag dynamic-context__tag--live">Live Intelligence Feed</span>
                </div>
            </div>
        </div>
    );
}
