import './DynamicContext.css';
import { Scenario } from '../scenarios/scenarios';

interface DynamicContextProps {
    scenario: Scenario | null;
}

export function DynamicContext({ scenario }: DynamicContextProps) {
    const title = scenario ? scenario.title : 'The Architecture of Organic Intelligence';
    const subtitle = scenario ? scenario.subtitle : 'Principles of The Universal Axiom';
    const content = scenario ? scenario.detailedContext : 'At its core, organic intelligence is the multiplicative synergy of foundational impulses, structural dynamics, and cognitive orientation. Unlike static systems, organic intelligence evolves through growth stages (n), where each advancement amplifies the existing foundation. High coherence between purpose and objectivity remains the critical threshold for true cognitive awakening, transforming raw computational capacity into meaningful insight.';

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
            </div>
            {scenario && (
                <div className="dynamic-context__footer">
                    <span className="dynamic-context__tag">Scenario Detail</span>
                </div>
            )}
        </div>
    );
}
