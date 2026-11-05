# UX/UI Audit and Improvement Roadmap

Date: 2026-10-29  
Scope: current private front-end prototype on `main`  
Pilot surfaces: Home and VPS Overview

## Executive summary

LIRIAS already demonstrates an unusually complete VPS journey. Its main UX risk is no longer missing pages; it is visual and behavioral inconsistency as the prototype grows. The next phase should reduce generated-interface patterns, normalize operational states and prepare components to receive authoritative Inertia props without replacing the established identity.

No external design skill is installed by this document. Impeccable, Designlang, Superpowers and Taste Skill remain references for a later, separately approved tool evaluation.

## Audit method

Review each selected route at 320, 390, 768, 1024 and 1440 pixels, in light and dark themes where available.

Required surfaces:

- `/`
- `/pricing`
- `/deploy`
- `/login`
- `/register`
- `/dashboard`
- `/dashboard/servers`
- `/dashboard/servers/:serverId`
- monitoring
- backups
- operating system
- firewall
- DNS

For every surface record:

- first-screen clarity
- hierarchy and primary action
- content density
- repeated visual patterns
- contrast and typography
- keyboard path
- loading, empty, error and forbidden states
- horizontal overflow
- fixed and sticky behavior
- reduced motion
- light/dark parity

## Priority definitions

- **P0:** blocks use, creates a security or truth risk, or prevents backend integration.
- **P1:** serious usability, accessibility or responsive problem.
- **P2:** inconsistency or maintainability issue that degrades quality.
- **P3:** final polish.

## Current findings

### P0 — product truth and backend authority

1. Replace or explicitly label unverified marketing metrics such as customer count, international reach, historical deployments, DDoS capacity and uptime.
2. Ensure price, discount, coupon, resources and compatibility are recalculated by Laravel; URL parameters are never authoritative.
3. Require server ownership and permission policies for every server-scoped route.
4. Define one destructive-action contract covering idempotency, confirmation, progress, result and audit identity.
5. Keep browser code isolated from gRPC and infrastructure credentials.

### P1 — UX and accessibility

1. Add complete focus management to mobile navigation: trap focus, make the background inert and restore focus to the opener.
2. Add standardized loading, empty, error, offline, forbidden and partial-success states.
3. Replace silent or non-functional prototype buttons with explicit demo feedback, disabled states or a real destination.
4. Audit tables on narrow screens; provide reduced-column or card variants for high-priority tasks.
5. Add a global reduced-motion policy and remove global transitions from elements that do not need them.
6. Standardize confirmation dialogs for backup restore, OS reinstall, token revocation, firewall changes and power actions.
7. Ensure charts expose useful accessible text, period and current value.

### P2 — visual consistency and architecture

1. Reduce decorative monospace, uppercase tracking, repeated eyebrow labels and icon-in-square patterns.
2. Use violet for brand, selection and action rather than as a universal surface.
3. Reduce nested cards, repeated card grids, glow and idle animation.
4. Split large page modules by product domain.
5. Consolidate plans, regions, operating systems, status mappings, date formats and currency formats.
6. Convert direct demo-data imports into page contracts or repositories that can later receive Inertia props.
7. Resolve navigation labels that say “Em breve” for existing pages.

### P3 — polish

1. Align numerical columns and use tabular figures in operational screens.
2. Improve copy consistency between marketing, checkout, Status Center and dashboard.
3. Add intentional skeletons rather than full-screen generic loading for every route.
4. Standardize clipboard feedback, toast language and action completion messages.
5. Review heading length, line measure and section rhythm.

## Pilot A — Home

### Goal

Communicate what LIRIAS is, why national VPS infrastructure matters and how the visitor starts, without depending on decorative effects or generic feature-card sequences.

### Preserve

- LIRIAS identity and violet accent.
- Dark/light themes.
- Animated grid as a restrained signature.
- LIRIAS Deploy as the main product path.
- Product interface preview.
- National operation and Linux/Windows breadth.

### Improve

- Make the first screen understandable in five seconds.
- Keep one primary and one secondary action.
- Give the real product interface more visual authority than the background effect.
- Replace repeated card grids with varied evidence-led sections.
- Use claims with proof: workload, region, activation flow, security and operational visibility.
- Remove unverified scale claims.
- Ensure every section has a distinct role and composition.
- Reduce repeated badges, tiny uppercase labels and decorative technical captions.

### Acceptance criteria

- One `h1`, concise at all required widths.
- No horizontal overflow at required widths.
- Primary CTA visible without competing actions.
- Light mode has neutral surfaces and accessible violet.
- Reduced-motion mode preserves all content.
- The main product preview reads as a working VPS interface.
- No unverified production metric remains.

## Pilot B — VPS Overview

### Goal

Let an operator identify server state, resource pressure, risk and next action within a few seconds.

### Preserve

- Existing navigation and route structure.
- CPU, memory, disk and network data.
- Server identity, OS, region and plan.
- Backups, firewall, access and recent operations.
- Demo notices until real backend data exists.

### Improve

- Establish a clear order: identity and state, critical actions, resources, alerts, recent activity, recovery and technical details.
- Reduce marketing-scale headings and decorative presentation.
- Use semantic color only for status and thresholds.
- Align values and units.
- Separate safe, sensitive and destructive actions.
- Show timestamp and freshness for every metric group.
- Add loading, stale, unavailable and permission-denied states.
- Make mobile content task-first rather than table-first.

### Acceptance criteria

- Online/offline state and last update are immediately visible.
- Restart, stop, console and recovery actions have clear risk levels.
- Every metric has value, unit, period and accessible summary.
- No color is the only carrier of status.
- Destructive actions cannot run from a single accidental click.
- Mobile users can reach all actions without horizontal page scrolling.
- The page can receive a typed Inertia prop contract without importing demo data directly.

## Planned sequence

### Phase 1 — Foundation

- [x] Create `PRODUCT.md`.
- [x] Create `DESIGN.md`.
- [x] Record audit priorities and pilot acceptance criteria.
- [x] Create the LIRIAS master design system and page overrides.
- [x] Add a multi-route, multi-viewport design audit command.
- [x] Add the GitHub Actions design quality gate.
- [ ] Capture current rendered baselines at required widths.
- [x] Inventory reusable components and repeated patterns (`docs/UI-BASELINE-2026-11-01.md`).

### Phase 2 — Home pilot

- [ ] Present three visual directions using the same product truth.
- [ ] Select one direction with explicit approval.
- [ ] Implement on a dedicated branch.
- [ ] Compare before and after at every required width.
- [ ] Run accessibility, type-check and production build checks.

### Phase 2A — Interaction system

- [x] Create shared Select and Textarea form controls.
- [x] Create SegmentedControl for compact filtering.
- [x] Create an accessible Dialog contract with focus trap, Escape and focus restoration.
- [x] Create reusable loading, empty, error, offline, stale, forbidden and success states.
- [x] Create a responsive DataList composition.
- [x] Apply the system to mobile navigation, catalog, dashboard overview and firewall deletion.
- [x] Expand the visual audit to light and dark themes.
- [ ] Execute the complete visual matrix in CI and resolve any reported P1 finding.

### Phase 3A — Domain consolidation

- [x] Migrate monitoring periods and activity filters to shared controls.
- [x] Protect backup restore and OS reinstall with the shared dialog contract.
- [x] Migrate support choices and diagnostic authorization.
- [x] Migrate Status Center notification channels to semantic switches.
- [x] Extract shared Linux and Windows presentation components.
- [x] Verify the changed routes in the browser and production build.

### Phase 3 — VPS Overview pilot

- [ ] Define typed page props and operational states.
- [ ] Present the compact information hierarchy.
- [ ] Implement without changing backend ownership boundaries.
- [ ] Verify keyboard, mobile and destructive-action behavior.

### Phase 4 — System extraction

- [ ] Consolidate approved tokens and components.
- [ ] Update `DESIGN.md` with the selected direction.
- [ ] Define migration rules for remaining pages.
- [ ] Expand in order: Pricing, Deploy, Auth, Linux/Windows, dashboard modules, Docs/Support.

### Phase 5 — Quality gates

- [x] Add source lint and formatting-policy checks.
- [x] Add component and flow contract tests.
- [x] Add automated accessibility checks.
- [x] Add CI for type-check, lint, tests and build.
- [x] Add performance budgets and responsive regression captures.

## External repository policy

The four reviewed repositories are references, not dependencies by default.

- Impeccable: candidate design audit and documentation tool.
- Designlang: candidate local measurement and comparison tool.
- Superpowers: candidate planning and verification process.
- Taste Skill: candidate creative direction and anti-generic review.

Before installing any of them:

1. Review scripts, hooks, telemetry and network behavior.
2. Prefer project-local installation on a temporary branch.
3. Disable telemetry where available.
4. Run against localhost, not a publicly shared private preview.
5. Do not use cloning features to reproduce a competitor.
6. Keep LIRIAS product truth, palette and accessibility requirements authoritative.
7. Remove the tool cleanly if its generated files or rules conflict with the repository.

# Progresso de implementação

- [x] Etapa 1 — inventário e linha de base
- [x] Etapa 2 — primitivas de interação
- [x] Etapa 3 — consolidação dos domínios
- [x] Etapa 4 — dados responsivos, estados vazios e confirmações críticas
- [x] Etapa 5 — quality gates, contratos e orçamento de desempenho
- [ ] Gate de publicação — matriz visual completa e correção de P1
