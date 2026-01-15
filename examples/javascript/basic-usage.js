/**
 * Basic Usage Examples for The Universal Axiom (JavaScript/Node.js)
 *
 * Note: Run with ts-node or compile TypeScript first
 * Example: npx ts-node examples/javascript/basic-usage.ts
 */

const { UniversalAxiom, AxiomSimulator, fibonacciSequence } = require('../../src/javascript/universal-axiom');

function exampleBasicComputation() {
  console.log('='.repeat(60));
  console.log('Example 1: Basic Intelligence Computation');
  console.log('='.repeat(60));

  // Create axiom with default values
  const axiom = new UniversalAxiom();
  console.log(`\nInitial state: ${axiom.toString()}`);

  // Compute intelligence
  const intelligence = axiom.computeIntelligence();
  console.log(`Intelligence value: ${intelligence.toFixed(6)}`);

  // Display full state
  const state = axiom.getState();
  console.log('\nDetailed State:');
  console.log(`  Foundation (A·B·C): ${state.foundation.product.toFixed(6)}`);
  console.log(`    A (Impulses): ${state.foundation.A_impulses}`);
  console.log(`    B (Elements): ${state.foundation.B_elements}`);
  console.log(`    C (Pressure): ${state.foundation.C_pressure}`);
  console.log(`  Dynamic (E_n·(1+F_n)): ${state.dynamic.product.toFixed(6)}`);
  console.log(`    E_n: ${state.dynamic.E_n.toFixed(6)}`);
  console.log(`    F_n: ${state.dynamic.F_n}`);
  console.log(`  Cognitive (X·Y·Z): ${state.cognitive.product.toFixed(6)}`);
  console.log(`    X (Objectivity): ${state.cognitive.X_objectivity}`);
  console.log(`    Y (Purpose): ${state.cognitive.Y_purpose}`);
  console.log(`    Z (Time): ${state.cognitive.Z_time}`);
}

function exampleEvolution() {
  console.log('\n' + '='.repeat(60));
  console.log('Example 2: System Evolution Over Time');
  console.log('='.repeat(60));

  const axiom = new UniversalAxiom({ impulses: 1.0, elements: 1.0, pressure: 1.0, n: 1 });
  const simulator = new AxiomSimulator(axiom);

  console.log('\nEvolving system over 10 steps...');
  const history = simulator.simulateEvolution(10, 1.0);

  console.log(`\n${'Step'.padEnd(6)} ${'Intelligence'.padEnd(15)} ${'F_n'.padEnd(8)} ${'Time'.padEnd(8)}`);
  console.log('-'.repeat(45));

  history.forEach((state, i) => {
    console.log(
      `${String(i).padEnd(6)} ${state.intelligence.toFixed(6).padEnd(15)} ` +
      `${String(state.dynamic.F_n).padEnd(8)} ${state.cognitive.Z_time.toFixed(1).padEnd(8)}`
    );
  });

  const fibValues = history.slice(0, 10).map(h => h.dynamic.F_n);
  console.log(`\nFibonacci Growth Pattern: [${fibValues.join(', ')}]`);
}

function exampleContradictionResolution() {
  console.log('\n' + '='.repeat(60));
  console.log('Example 3: Contradiction Resolution');
  console.log('='.repeat(60));

  // Start with some subjectivity
  const axiom = new UniversalAxiom({
    impulses: 1.0,
    elements: 1.0,
    pressure: 1.0,
    subjectivity: 0.5,  // Start with 50% subjectivity
    purpose: 1.0,
    n: 1
  });

  const simulator = new AxiomSimulator(axiom);

  console.log('\nSimulating contradiction encounter and resolution...');
  console.log('Initial subjectivity: 0.5 (50% subjective)');
  console.log('Applying pressure spike from contradiction...\n');

  const history = simulator.simulateContradictionResolution(2.0, 5);

  console.log(`${'Step'.padEnd(6)} ${'Intelligence'.padEnd(15)} ${'Subjectivity'.padEnd(15)} ${'Pressure'.padEnd(12)}`);
  console.log('-'.repeat(55));

  history.forEach((state, i) => {
    console.log(
      `${String(i).padEnd(6)} ${state.intelligence.toFixed(6).padEnd(15)} ` +
      `${state.cognitive.X_subjectivity.toFixed(3).padEnd(15)} ` +
      `${state.foundation.C_pressure.toFixed(3).padEnd(12)}`
    );
  });

  console.log('\nResult: Contradiction increases pressure → ');
  console.log('        Pressure reveals misalignment → ');
  console.log('        Misalignment corrects subjectivity → ');
  console.log('        System achieves higher-order synthesis ✓');
}

function exampleCoherenceTracking() {
  console.log('\n' + '='.repeat(60));
  console.log('Example 4: Coherence Tracking');
  console.log('='.repeat(60));

  console.log('\nDemonstrating coherence measurement across different states:\n');

  const scenarios = [
    { name: 'High Objectivity, Strong Purpose', subjectivity: 0.1, purpose: 2.0, pressure: 1.0 },
    { name: 'Moderate Subjectivity', subjectivity: 0.5, purpose: 1.5, pressure: 1.2 },
    { name: 'High Subjectivity, Weak Purpose', subjectivity: 0.8, purpose: 0.5, pressure: 1.5 },
    { name: 'Balanced State', subjectivity: 0.2, purpose: 1.0, pressure: 1.0 },
  ];

  console.log(`${'Scenario'.padEnd(35)} ${'Objectivity'.padEnd(15)} ${'Purpose'.padEnd(10)} ${'Coherence'.padEnd(12)}`);
  console.log('-'.repeat(75));

  scenarios.forEach(({ name, subjectivity, purpose, pressure }) => {
    const axiom = new UniversalAxiom({ subjectivity, purpose, pressure });
    const simulator = new AxiomSimulator(axiom);
    const coherence = simulator.getCoherenceMetric();

    console.log(
      `${name.padEnd(35)} ${(1 - subjectivity).toFixed(2).padEnd(15)} ` +
      `${purpose.toFixed(2).padEnd(10)} ${coherence.toFixed(4).padEnd(12)}`
    );
  });

  console.log('\nCoherence is high when objectivity is high, purpose is strong,');
  console.log('and pressure is moderate. The Axiom tracks this, not token count.');
}

function main() {
  console.log('\n' + '🔥'.repeat(30));
  console.log('THE UNIVERSAL AXIOM - JavaScript/TypeScript Implementation Examples');
  console.log('🔥'.repeat(30));

  const examples = [
    exampleBasicComputation,
    exampleEvolution,
    exampleContradictionResolution,
    exampleCoherenceTracking,
  ];

  examples.forEach(example => {
    try {
      example();
    } catch (error) {
      console.error(`\nError in ${example.name}: ${error.message}`);
    }
  });

  console.log('\n' + '='.repeat(60));
  console.log('All examples completed!');
  console.log('='.repeat(60) + '\n');
}

if (require.main === module) {
  main();
}

module.exports = {
  exampleBasicComputation,
  exampleEvolution,
  exampleContradictionResolution,
  exampleCoherenceTracking
};
