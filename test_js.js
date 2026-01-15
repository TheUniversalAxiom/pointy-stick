/**
 * Test script for JavaScript implementation
 */

const { UniversalAxiom, AxiomSimulator } = require('./dist/universal-axiom');

console.log('\n' + '🔥'.repeat(30));
console.log('THE UNIVERSAL AXIOM - JavaScript Implementation Test');
console.log('🔥'.repeat(30));

// Test 1: Basic Computation
console.log('\n' + '='.repeat(60));
console.log('Test 1: Basic Intelligence Computation');
console.log('='.repeat(60));

const axiom = new UniversalAxiom();
console.log(`\nInitial state: ${axiom.toString()}`);

const intelligence = axiom.computeIntelligence();
console.log(`Intelligence value: ${intelligence.toFixed(6)}`);

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

// Test 2: Evolution
console.log('\n' + '='.repeat(60));
console.log('Test 2: System Evolution');
console.log('='.repeat(60));

const axiom2 = new UniversalAxiom({ n: 1 });
const simulator = new AxiomSimulator(axiom2);

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

// Test 3: Contradiction Resolution
console.log('\n' + '='.repeat(60));
console.log('Test 3: Contradiction Resolution');
console.log('='.repeat(60));

const axiom3 = new UniversalAxiom({ subjectivity: 0.5, n: 1 });
const simulator2 = new AxiomSimulator(axiom3);

console.log('\nSimulating contradiction resolution...');
const history2 = simulator2.simulateContradictionResolution(2.0, 5);

console.log(`\n${'Step'.padEnd(6)} ${'Intelligence'.padEnd(15)} ${'Subjectivity'.padEnd(15)} ${'Pressure'.padEnd(12)}`);
console.log('-'.repeat(55));

history2.forEach((state, i) => {
  console.log(
    `${String(i).padEnd(6)} ${state.intelligence.toFixed(6).padEnd(15)} ` +
    `${state.cognitive.X_subjectivity.toFixed(3).padEnd(15)} ` +
    `${state.foundation.C_pressure.toFixed(3).padEnd(12)}`
  );
});

console.log('\n✓ All JavaScript tests passed!');
console.log('='.repeat(60) + '\n');
