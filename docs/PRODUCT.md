# LIRIAS — Product Context

## Status

LIRIAS is currently a private front-end prototype for a Brazilian VPS platform. It demonstrates the product experience and operational flows, but does not provision servers, charge customers, authenticate real accounts or expose production infrastructure.

## Product vision

Make VPS infrastructure understandable and controllable without hiding technical details. LIRIAS should serve beginners who need guidance and technical users who need speed, transparency and operational depth.

## Primary audiences

1. Developers and small teams deploying websites, APIs and SaaS products.
2. Agencies and freelancers managing multiple customer environments.
3. Businesses running e-commerce, automation and internal tools.
4. Technical users who want root access, Docker and observable infrastructure.
5. Beginners who need a guided recommendation instead of a wall of specifications.

## Core jobs

- Understand which VPS configuration fits a workload.
- Compare resources, price, operating system and region.
- Contract and follow provisioning without uncertainty.
- See server health and resource consumption quickly.
- Perform common operations safely.
- Recover from incidents with backups, access tools and support.
- Audit who performed each sensitive action.

## Product principles

- **Brazil first:** regions, language, billing and support are designed for national operation.
- **Operational clarity:** show state, impact, progress and next action.
- **Progressive complexity:** guide beginners without limiting expert access.
- **Evidence over decoration:** real product interface and truthful data have priority over visual effects.
- **Safe by default:** destructive actions require explicit confirmation, authorization and audit.
- **No false claims:** customer counts, uptime, capacity, protection and history must be demonstrative or verifiable.
- **Backend authority:** price, permission, ownership and infrastructure state are never trusted from the browser.

## Differentiators

- Guided LIRIAS Deploy flow based on workload and priority.
- National infrastructure and region-aware experience.
- Linux and Windows journeys in one product.
- Operational dashboard covering monitoring, backups, security, DNS, Docker and applications.
- Transparent asynchronous operations with progress and history.
- Support flow that can attach diagnostics without exposing secrets.
- Prepared path for automation and AI workloads without making AI the visual identity of the entire product.

## Surface modes

### Persuade

Marketing pages, Home, Pricing, Linux, Windows, Applications and solution pages. These surfaces should explain value, establish trust and move visitors toward a configuration or plan.

### Operate

Dashboard, monitoring, backups, security, DNS, billing and account. These surfaces prioritize density, scanability, predictable controls and safe actions.

### Read

Documentation, support articles, legal pages and Status Center. These surfaces prioritize comprehension, hierarchy and truthful operational information.

## Current functional scope

- Marketing and product pages.
- VPS recommendation and configuration.
- Demonstrative checkout.
- Demonstrative provisioning.
- First-access guidance.
- VPS management dashboard.
- Monitoring, activity, backups and operating system.
- Firewall, malware, access and DNS.
- Docker and application catalog.
- API tokens, account, billing and support.
- Documentation and national Status Center.

## Future backend boundary

Laravel with InertiaJS owns routes, authentication, sessions, validation, authorization, billing and page props. Infrastructure services and gRPC remain behind Laravel and are never called directly by the browser.

The React layer owns presentation, local interaction, accessibility and optimistic feedback only when the backend contract explicitly supports it.

## Non-goals for the current prototype

- Real payment processing.
- Real account creation.
- Real infrastructure control.
- Public API credentials.
- Production SLA claims.
- Production incident reporting.
- Automatic collection of passwords, private SSH keys or secrets.

## Success criteria

A visitor should understand what LIRIAS offers and reach a suitable configuration without VPS expertise. A signed-in user should identify server health and the next safe action within a few seconds. Every critical operation must communicate consequence, progress, result and audit identity.
