# LIRIAS — Design Baseline

> Fonte operacional: [`design-system/lirias/MASTER.md`](design-system/lirias/MASTER.md).
> Este arquivo preserva o racional histórico; o MASTER e seus overrides orientam novas implementações e revisões.

This document records the current visual system and the constraints for future refinement. It is a baseline, not permission to redesign every surface at once.

## Design intent

LIRIAS should feel like a serious Brazilian infrastructure product: controlled, transparent, technically capable and approachable. It must not look like a generic AI landing page or a decorative concept that cannot support real operations.

## Brand

- Name: LIRIAS
- Primary accent: violet
- Primary neutral world: graphite in dark mode and cool neutral gray in light mode
- Display type: Sora Variable
- Interface type: Inter Variable
- Voice: direct, calm, transparent and technically precise

Purple is a brand accent. It is not a default background for every card, glow, gradient or chart.

## Visual modes

### Marketing

Marketing may use a stronger composition, larger type and one signature motion. Product interface fragments should be real enough to look operational, with data that adds up and is explicitly demonstrative when necessary.

### Dashboard

Dashboard surfaces are quiet and dense. Brand appears in active navigation, focus, primary actions and selected data. Status colors communicate state and are not decoration.

### Documentation and support

Reading surfaces use restrained widths, clear hierarchy, practical examples and predictable navigation. Code may use monospace; decorative labels should not.

## Typography

- One display family and one interface family only.
- Sora is reserved for major titles, key values and selected brand moments.
- Inter is used for navigation, body, forms, tables, labels and controls.
- Monospace is reserved for code, commands, identifiers, IP addresses and aligned technical data.
- Avoid decorative uppercase eyebrow labels with excessive letter spacing.
- Marketing body text should normally be at least 16px.
- Important text uses full foreground contrast; muted color is secondary information only.
- Headings should be concise and normally fit in two lines.

## Color rules

### Dark

- Near-black neutral background.
- Cards use a small neutral tone step.
- Violet marks action and selection.
- Green, amber and red are reserved for semantic status.
- Glows are exceptional, not a default surface treatment.

### Light

- Neutral light-gray page background.
- White or near-white primary surfaces.
- Dark violet for accessible primary actions.
- Avoid large pink or lilac surface areas.
- Avoid purple shadows and low-contrast lavender text.

## Layout

- Equal page margins at each breakpoint.
- Shared maximum widths and alignment anchors.
- Marketing sections should not all use the same card grid.
- Dashboard uses compact spacing and aligned numerical columns.
- Empty space must be intentional and balanced by content, media or a second column.
- Tables may scroll on small screens, but priority content should gain a mobile card or reduced-column composition when practical.

## Components

### Buttons

- One clear primary action per region.
- Secondary actions are neutral.
- Destructive actions use semantic danger styling and explicit confirmation.
- Avoid decorative gradients as the default button treatment.
- Every icon-only button needs an accessible name.

### Cards

- Cards group information or actions; they are not the default wrapper for every piece of content.
- Avoid cards nested inside cards unless hierarchy requires it.
- Avoid repeated icon-in-tinted-square feature grids.
- Dashboard cards use quiet borders and minimal shadow.

### Badges

- Use for status, availability, plan labels and compact metadata.
- Do not use a pill badge as a decorative heading on every section.
- “Demo” and “Em breve” labels must reflect real product state.

### Forms

- Labels remain visible.
- Validation is placed next to the relevant control.
- Requirements are connected with accessible descriptions.
- Backend errors must be supported without layout shift.
- Passwords, private keys and tokens are never persisted casually.

## Motion

- Motion explains hierarchy, feedback or state change.
- Interaction feedback: approximately 140–180ms.
- Panel and route-level transitions: approximately 200–260ms.
- Entrances should normally travel no more than 16–24px.
- One signature motion per marketing page is enough.
- Avoid multiple infinite floating, pulsing and glowing elements in one viewport.
- All content remains available when JavaScript animation fails.
- Reduced-motion mode removes travel, looping and scroll-linked effects.

## Responsive targets

Required review widths:

- 320px
- 390px
- 768px
- 1024px
- 1440px

Mobile is its own composition, not a compressed desktop. Drawers, modals and fixed actions must use dynamic viewport units and safe-area padding. Navigation and content scrolling must not block each other.

## Accessibility baseline

- Visible focus on all interactive elements.
- Keyboard access in reading order.
- Focus trapping and restoration for modal interfaces.
- Background content becomes inert while a modal or drawer is active.
- Semantic headings without skipped structure.
- Table captions and header associations where appropriate.
- Accessible names for charts and icon controls.
- WCAG AA contrast as minimum.
- Reduced-motion behavior tested, not assumed.

## Product truth

- Demonstrative values are labeled.
- Marketing claims must be verifiable before publication.
- Status Center must never present mocked incidents as real incidents.
- Pricing displayed by the browser is an estimate; Laravel is authoritative.
- Real domains and IP addresses are not used as fictional customer data without permission.

## Patterns to reduce

- Repeated eyebrow labels.
- Decorative monospace.
- Purple-to-black or purple-to-white gradients as default actions.
- Excessive glow and glassmorphism.
- Repeated identical card grids.
- Icons in colored squares above every heading.
- Cards nested several levels deep.
- Animating every section with the same fade.
- Large decorative graphs with invented values.
- Tiny gray text carrying important information.

## Change rule

Refinements preserve product behavior and brand. A redesign of a page requires a documented direction, before screenshots, acceptance criteria and explicit approval before implementation.
