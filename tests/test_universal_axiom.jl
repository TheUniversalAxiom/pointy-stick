"""
Test suite for The Universal Axiom (Julia)
Tests the core formula: Intelligence_n = E_n⋅(1+F_n)⋅X⋅Y⋅Z⋅(A⋅B⋅C)
Based on PROMPT.md principles and The Epiphany Engine specifications
"""

using Test

# Load the module
include("../src/julia/UniversalAxiom.jl")
using .UniversalAxiom

@testset "Foundation Layer (A·B·C)" begin
    @testset "Initialization" begin
        foundation = FoundationLayer(1.0, 1.0, 1.0)
        @test foundation.impulses == 1.0
        @test foundation.elements == 1.0
        @test foundation.pressure == 1.0
    end

    @testset "Compute product" begin
        foundation = FoundationLayer(2.0, 3.0, 1.5)
        @test compute(foundation) == 2.0 * 3.0 * 1.5
    end
end

@testset "Dynamic Layer (E_n·(1+F_n))" begin
    @testset "Fibonacci sequence generation" begin
        sequence = fibonacci_sequence(12)
        expected = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
        @test sequence == expected
    end

    @testset "Fibonacci at specific n values" begin
        dynamic1 = DynamicLayer(1)
        @test fibonacci(dynamic1) == 1

        dynamic10 = DynamicLayer(10)
        @test fibonacci(dynamic10) == 55
    end

    @testset "Exponential growth" begin
        dynamic = DynamicLayer(1)
        @test isapprox(exponential_growth(dynamic), ℯ, atol=1e-6)

        dynamic2 = DynamicLayer(2)
        @test isapprox(exponential_growth(dynamic2), ℯ^2, atol=1e-5)
    end

    @testset "E_n·(1+F_n) product" begin
        dynamic = DynamicLayer(1)
        E_n = ℯ
        F_n = 1
        expected = E_n * (1 + F_n)
        @test isapprox(compute(dynamic), expected, atol=1e-6)
    end
end

@testset "Cognitive Layer (X·Y·Z)" begin
    @testset "Subjectivity and objectivity relationship" begin
        cognitive = CognitiveLayer(0.3, 1.0, 1.0)
        obj = objectivity(cognitive)
        @test obj == 0.7
    end

    @testset "X·Y·Z product" begin
        cognitive = CognitiveLayer(0.2, 1.5, 2.0)
        expected = 0.8 * 1.5 * 2.0  # objectivity * purpose * time
        @test compute(cognitive) == expected
    end
end

@testset "Universal Axiom Core Formula" begin
    @testset "Initialization" begin
        axiom = Axiom()
        @test axiom.n == 1
    end

    @testset "Core formula computation" begin
        axiom = Axiom(impulses=1.0, elements=1.0, pressure=1.0, n=1)

        # Manual calculation per PROMPT.md
        A_B_C = 1.0 * 1.0 * 1.0
        E_n = ℯ^1
        F_n = 1
        E_F = E_n * (1 + F_n)
        X_Y_Z = 1.0 * 1.0 * 1.0
        expected = E_F * X_Y_Z * A_B_C

        intelligence = compute_intelligence(axiom)
        @test isapprox(intelligence, expected, atol=1e-6)
    end

    @testset "Intelligence at n=1" begin
        axiom = Axiom(n=1)
        intelligence = compute_intelligence(axiom)
        @test isapprox(intelligence, 5.436564, atol=0.001)
    end

    @testset "Intelligence at n=10" begin
        axiom = Axiom(n=1)
        for _ in 1:9
            evolve!(axiom)
        end
        intelligence = compute_intelligence(axiom)
        @test intelligence > 12_000_000
        @test intelligence < 13_000_000
    end

    @testset "Evolution increases intelligence" begin
        axiom = Axiom(n=1)
        intelligence_before = compute_intelligence(axiom)
        evolve!(axiom)
        intelligence_after = compute_intelligence(axiom)
        @test intelligence_after > intelligence_before
    end

    @testset "Pressure application affects foundation" begin
        axiom = Axiom(pressure=1.0)
        intelligence_before = compute_intelligence(axiom)
        apply_pressure!(axiom, 1.0)
        intelligence_after = compute_intelligence(axiom)
        @test intelligence_after > intelligence_before
    end

    @testset "Pressure clamping to minimum" begin
        axiom = Axiom(pressure=1.0)
        apply_pressure!(axiom, -10.0)
        @test axiom.foundation.pressure == 0.01
    end

    @testset "Adjusting subjectivity changes objectivity" begin
        axiom = Axiom(subjectivity=0.5)
        intelligence_before = compute_intelligence(axiom)
        adjust_subjectivity!(axiom, -0.2)
        intelligence_after = compute_intelligence(axiom)
        @test intelligence_after > intelligence_before
        @test axiom.cognitive.subjectivity == 0.3
    end

    @testset "Subjectivity clamping to [0.0, 1.0]" begin
        axiom = Axiom(subjectivity=0.5)
        adjust_subjectivity!(axiom, 1.0)
        @test axiom.cognitive.subjectivity == 1.0

        adjust_subjectivity!(axiom, -2.0)
        @test axiom.cognitive.subjectivity == 0.0
    end

    @testset "Strengthening purpose uses multiplier" begin
        axiom = Axiom(purpose=1.0)
        intelligence_before = compute_intelligence(axiom)
        strengthen_purpose!(axiom, 1.5)
        @test axiom.cognitive.purpose == 1.5
        intelligence_after = compute_intelligence(axiom)
        @test intelligence_after > intelligence_before
    end

    @testset "Get state completeness" begin
        axiom = Axiom()
        state = get_state(axiom)
        @test state.n == 1
        @test state.intelligence > 0.0
    end

    @testset "Negative impulses" begin
        axiom = Axiom(impulses=-1.0)
        intelligence = compute_intelligence(axiom)
        @test intelligence < 0.0
    end

    @testset "Extreme subjectivity" begin
        axiom = Axiom(subjectivity=1.0)
        intelligence = compute_intelligence(axiom)
        @test intelligence == 0.0
    end

    @testset "Extreme objectivity" begin
        axiom = Axiom(subjectivity=0.0)
        intelligence = compute_intelligence(axiom)
        @test intelligence > 0.0
    end
end

@testset "AxiomSimulator" begin
    @testset "Initialization" begin
        axiom = Axiom()
        simulator = AxiomSimulator(axiom)
        @test simulator.axiom == axiom
    end

    @testset "Evolution tracks history" begin
        axiom = Axiom(n=1)
        simulator = AxiomSimulator(axiom)
        history = simulate_evolution(simulator, 5)

        @test length(history) == 6  # initial + 5 steps
        @test history[1].n == 1
        @test history[6].n == 6
    end

    @testset "Contradiction resolution reduces subjectivity" begin
        axiom = Axiom(subjectivity=0.5, pressure=1.0)
        initial_subjectivity = axiom.cognitive.subjectivity
        simulator = AxiomSimulator(axiom)

        history = simulate_contradiction_resolution(simulator, 2.0, 5)
        final_subjectivity = history[end].cognitive.X_subjectivity

        @test final_subjectivity < initial_subjectivity
    end

    @testset "High objectivity produces high coherence" begin
        axiom = Axiom(subjectivity=0.1, purpose=2.0, pressure=1.0)
        simulator = AxiomSimulator(axiom)
        coherence = get_coherence_metric(simulator)
        @test coherence > 0.8
    end

    @testset "Coherence decreases with subjectivity" begin
        axiom_objective = Axiom(subjectivity=0.1)
        coherence_objective = get_coherence_metric(AxiomSimulator(axiom_objective))

        axiom_subjective = Axiom(subjectivity=0.8)
        coherence_subjective = get_coherence_metric(AxiomSimulator(axiom_subjective))

        @test coherence_objective > coherence_subjective
    end

    @testset "No stagnation with evolution" begin
        axiom = Axiom(n=1)
        simulator = AxiomSimulator(axiom)
        history = simulate_evolution(simulator, 10)

        intelligences = [state.intelligence for state in history]

        # Verify monotonic increase
        for i in 2:length(intelligences)
            @test intelligences[i] > intelligences[i-1]
        end
    end
end

@testset "PROMPT.md Compliance" begin
    @testset "Axiom is deterministic" begin
        axiom1 = Axiom(n=5, impulses=1.0, elements=1.0)
        axiom2 = Axiom(n=5, impulses=1.0, elements=1.0)
        @test compute_intelligence(axiom1) == compute_intelligence(axiom2)
    end

    @testset "Fibonacci sequence regulates system dynamics" begin
        axiom = Axiom(n=1)
        simulator = AxiomSimulator(axiom)
        history = simulate_evolution(simulator, 10)

        fib_values = [state.dynamic.F_n for state in history[1:10]]
        expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]

        @test fib_values == expected
    end

    @testset "Pressure reveals contradictions" begin
        axiom = Axiom(subjectivity=0.5, pressure=1.0)
        apply_pressure!(axiom, 2.0)
        @test axiom.foundation.pressure == 3.0
    end

    @testset "TimeSphere advances over time" begin
        axiom = Axiom(time=1.0)
        simulator = AxiomSimulator(axiom)
        history = simulate_evolution(simulator, 5)

        times = [state.cognitive.Z_time for state in history]
        expected = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0]

        for (i, time) in enumerate(times)
            @test isapprox(time, expected[i], atol=1e-6)
        end
    end

    @testset "Foundation Layer ABC variables" begin
        axiom = Axiom(impulses=2.0, elements=3.0, pressure=1.5)
        state = get_state(axiom)

        # A = Impulses (Current)
        @test state.foundation.A_impulses == 2.0

        # B = Elements (Energy, Matter, State)
        @test state.foundation.B_elements == 3.0

        # C = Pressure (Direction, Momentum, Integrity)
        @test state.foundation.C_pressure == 1.5

        # Product = A·B·C
        @test state.foundation.product == 2.0 * 3.0 * 1.5
    end

    @testset "Cognitive Layer XYZ variables" begin
        axiom = Axiom(subjectivity=0.3, purpose=1.5, time=2.0)
        state = get_state(axiom)

        # X = subjectivity scaling aggregate
        @test state.cognitive.X_subjectivity == 0.3
        @test state.cognitive.X_objectivity == 0.7

        # Y = The Why Axis scale (purpose)
        @test state.cognitive.Y_purpose == 1.5

        # Z = flux of Time (TimeSphere)
        @test state.cognitive.Z_time == 2.0
    end

    @testset "Large n Fibonacci growth" begin
        axiom = Axiom(n=1)
        for _ in 1:19
            evolve!(axiom)
        end

        intelligence = compute_intelligence(axiom)
        @test intelligence > 0.0
        @test isfinite(intelligence)
    end
end

# Run all tests
println("\n" * "=" ^60)
println("Running Universal Axiom Test Suite (Julia)")
println("=" ^ 60 * "\n")
