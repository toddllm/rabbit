# First Principles Approach

## **CRITICAL: This is NOT a Fixed Tech Stack**

RABBIT is designed using a **first principles approach**, not a predetermined technology stack. Each service implementation is chosen based on **specific requirements and constraints**, not technology preferences or trends.

## Philosophy

### What This Means
- **No Technology Lock-In**: Technologies are selected based on the problem being solved
- **Requirements Drive Decisions**: Each service's needs dictate the implementation language/framework
- **Pragmatic Over Dogmatic**: The "best" technology is the one that best solves the specific problem
- **Evolution Over Time**: As requirements change, technology choices can evolve

### What This Is NOT
- ❌ "We use Language X for everything"
- ❌ "Our stack is Go + Elixir + Rust"
- ❌ "This is a [framework] project"
- ❌ Technology choices based on resume building or hype

## Decision Framework

When implementing a new service or component, ask:

### 1. **What are the core requirements?**
   - Performance characteristics (throughput, latency, memory)
   - Concurrency model (single-threaded, multi-threaded, actor-based)
   - State management needs (stateless, stateful, distributed)
   - Fault tolerance requirements
   - Integration points

### 2. **What are the constraints?**
   - Resource limits (CPU, memory, bandwidth)
   - Deployment environment
   - Team expertise
   - Time to market
   - Operational complexity

### 3. **What are the tradeoffs?**
   - Development speed vs runtime performance
   - Memory usage vs compute efficiency
   - Simplicity vs flexibility
   - Proven technology vs cutting edge

### 4. **Validate the choice**
   - Can it meet the performance requirements?
   - Can the team maintain it?
   - Does it integrate well with other services?
   - Is it sustainable long-term?

## Current Service Implementations (Examples, Not Prescriptions)

These are the **current** implementations based on **current** requirements. They can and should change if requirements change.

### Entity Service → Rust
**Why Rust?**
- **Requirement**: Handle 600,000+ entity operations/second (10,000 entities @ 60 FPS)
- **Requirement**: Zero-cost abstractions, no GC pauses
- **Requirement**: Memory safety with concurrent access
- **Result**: Rust's ownership system + DashMap provides lock-free concurrent access

**Could change to**: C++ if SIMD optimizations prove necessary, or Zig for simpler memory management

### Player Service → Go
**Why Go?**
- **Requirement**: Handle thousands of concurrent auth requests
- **Requirement**: Simple JWT handling and HTTP/REST
- **Requirement**: Single binary deployment
- **Result**: Go's goroutines + standard library provide excellent HTTP performance

**Could change to**: Rust for higher throughput, or Node.js if TypeScript type safety is prioritized

### Boss Service → Elixir/OTP
**Why Elixir?**
- **Requirement**: 10,000+ concurrent boss instances, each with independent state
- **Requirement**: Fault isolation (one boss crash shouldn't affect others)
- **Requirement**: Hot code swapping for AI updates without downtime
- **Result**: BEAM VM provides lightweight processes (1 per boss) with fault isolation

**Could change to**: Go with actor library, or even Erlang directly for maximum stability

### Evolution Service → Elixir/OTP
**Why Elixir?**
- **Requirement**: Complex state machines for evolution paths
- **Requirement**: Immutable state to prevent corruption
- **Requirement**: Hot code swapping for adding new evolution trees
- **Result**: Elixir's pattern matching + immutability simplifies state transitions

**Could change to**: Haskell for pure functional approach, or TypeScript with state machine library

### API Gateway → Go
**Why Go?**
- **Requirement**: 40K+ HTTP requests/second
- **Requirement**: 100K+ concurrent WebSocket connections
- **Requirement**: Low memory per connection
- **Result**: Go's net/http and gorilla/websocket are battle-tested for this use case

**Could change to**: Nginx for pure routing, or Rust for maximum performance

### Combat Service → Rust
**Why Rust?**
- **Requirement**: Deterministic performance (<5μs per calculation)
- **Requirement**: Zero GC pauses during combat
- **Requirement**: Mathematical correctness (no floating point surprises)
- **Result**: Rust provides deterministic execution without GC interference

**Could change to**: C for SIMD intrinsics, or Zig for explicit control flow

### Event Bus → NATS
**Why NATS?**
- **Requirement**: 11M+ messages/second throughput
- **Requirement**: Sub-millisecond pub/sub latency
- **Requirement**: Native clustering without complex setup
- **Result**: NATS is purpose-built for this exact use case

**Could change to**: Kafka if ordering guarantees become critical, or Redis Streams for simpler setup

## How to Propose a Technology Change

If you believe a service should use a different technology:

1. **Document the problem** with the current implementation
   - Performance metrics that don't meet requirements
   - Operational issues (crashes, memory leaks, etc.)
   - Development velocity problems

2. **Propose the alternative** with justification
   - How it addresses the specific problems
   - What new tradeoffs it introduces
   - Migration path and effort required

3. **Provide evidence**
   - Benchmarks comparing current vs proposed
   - Proof of concept implementation
   - Resource usage comparisons

4. **Get consensus**
   - Technical review from team
   - Impact analysis on other services
   - Decision documented in ADR (Architecture Decision Record)

## Example: Changing the Player Service

**Scenario**: Player Service (currently Go) is experiencing high memory usage during peak load.

**Analysis**:
1. **Problem**: Go's GC is causing 50-100ms pauses under load
2. **Requirement**: Auth service must respond in <10ms p99
3. **Options**:
   - Option A: Optimize Go (tune GOGC, reduce allocations)
   - Option B: Rewrite in Rust (no GC, but more complex)
   - Option C: Move to Elixir (BEAM scheduler, but slower raw performance)

**Decision Process**:
1. Try Option A (optimize Go) - least disruptive
2. If still not meeting requirements, benchmark Option B vs C
3. Choose based on data, not preference
4. Document decision in `docs/ADR/001-player-service-language.md`
5. Implement with metrics to validate improvement

## Anti-Patterns to Avoid

### ❌ "Let's rewrite everything in [Language]"
**Why wrong**: Technology for its own sake
**Instead**: Identify specific problems, solve them individually

### ❌ "We need a unified tech stack"
**Why wrong**: Forces suboptimal choices for some services
**Instead**: Accept polyglot architecture as a feature, not a bug

### ❌ "This worked at my last company"
**Why wrong**: Different requirements, different solutions
**Instead**: Validate that the requirements actually match

### ❌ "Everyone should learn [Language]"
**Why wrong**: Technology dictating team structure
**Instead**: Build team expertise around chosen technologies

## Guiding Principles

1. **Measure, Don't Assume**
   - Profile before optimizing
   - Benchmark before choosing
   - Monitor after deploying

2. **Simple Until Proven Necessary**
   - Start with simplest solution that could work
   - Add complexity only when requirements demand it
   - "Premature optimization is the root of all evil"

3. **Operational Excellence**
   - Can the team debug it in production?
   - Can it be deployed reliably?
   - Can it be monitored effectively?

4. **Long-Term Thinking**
   - Will this still be maintainable in 3 years?
   - Can we hire for this technology?
   - Is the ecosystem healthy and growing?

## Resources

- **Benchmarking**: Always benchmark your specific use case
- **Prototyping**: Build small proof-of-concepts before committing
- **Monitoring**: Instrument everything to validate assumptions
- **Documentation**: Record decisions in Architecture Decision Records (ADRs)

## Summary

RABBIT is **technology-agnostic** by design. The current implementations are examples of applying first principles thinking to specific problems. As the project evolves, technology choices should evolve based on:

- **Evidence** (metrics, benchmarks, production data)
- **Requirements** (performance, reliability, developer experience)
- **Tradeoffs** (explicit acknowledgment of what we're giving up)

Not based on:
- ❌ Technology trends or hype
- ❌ Resume building
- ❌ "Because we already use it"
- ❌ Religious preferences

**The only constant is change. Stay pragmatic.**
