# REDESIGN.md

# Local Website — Front-End Redesign Specification

## 0. Mission

Redesign the existing **local website** into a polished, modern, production-quality front-end experience.

This is a **front-end-only redesign for now**.

The result should:

- Preserve the useful **tree/component structure** of the local implementation.
- Preserve the existing functionality where practical.
- Extract/reuse the necessary **content, information architecture, terminology, and structural ideas** from the live website.
- Significantly improve the live site's visual quality, UX, information hierarchy, responsiveness, accessibility, and interaction design.
- Feel approximately **3 major design iterations ahead of the current live website**, without becoming unnecessarily complex.
- Remain extremely easy to modify and extend as a side project.
- Avoid premature backend/API/database/authentication work.
- Use realistic static/mock data wherever dynamic functionality is not yet implemented.

The objective is **not** to copy the live website.

The objective is:

> **Local site's maintainable architecture + live site's real content/information + substantially better product design.**

---

# 1. Agent Operating Mode

You are acting as a:

- Senior Product Designer
- Senior Front-End Engineer
- UX Architect
- Design Systems Engineer
- Accessibility Reviewer
- Responsive UI Specialist

Do not behave like a code-generation-only agent.

Before modifying code, inspect and understand the existing project.

---

# 2. Non-Negotiable Rules

## 2.1 Inspect First

Before writing implementation code:

1. Inspect the complete local repository.
2. Identify the framework/build system.
3. Identify the entry points.
4. Identify existing routes/pages.
5. Identify reusable components.
6. Identify styles/theme files.
7. Identify assets.
8. Identify current data structures.
9. Identify the existing tree structure.
10. Run the application if possible.
11. Inspect the current UI in a browser if browser tooling is available.
12. Determine what should be preserved versus redesigned.

Do not immediately replace the existing application.

---

# 3. Live Website Reference

The live website is a **reference source**, not the design target.

Use it to understand:

- Real content
- Navigation
- Page hierarchy
- Terminology
- Existing user flows
- Important sections
- Existing categories
- Existing calls-to-action
- Existing information architecture
- Relevant metadata
- Business/product terminology
- Content relationships

If the live website is accessible:

1. Inspect it.
2. Extract only the information necessary to reproduce the site's useful content structure.
3. Do not blindly copy its HTML/CSS.
4. Do not reproduce its visual design.
5. Do not copy proprietary implementation details unnecessarily.
6. Do not make the new UI dependent on the live website.

The final application must work independently.

---

# 4. Design Objective

The design should feel like a **serious modern product**, not a template.

Avoid:

- Generic Bootstrap-looking pages
- Excessive gradients
- Random glassmorphism
- Excessive rounded cards
- Huge unnecessary hero sections
- Decorative UI without purpose
- Over-animation
- Excessive shadows
- Tiny unreadable text
- Dense walls of information
- Fake dashboards
- Artificial AI-generated visual clutter
- Design trends that hurt usability

Prefer:

- Strong typography
- Clear hierarchy
- Excellent spacing
- Intentional composition
- Strong navigation
- Clean surfaces
- Consistent component behavior
- Subtle depth
- Purposeful color
- Excellent responsive behavior
- Clear CTAs
- Strong empty/loading/error states
- Accessible interaction patterns

---

# 5. Design Philosophy

Use the following principle:

> **Make the interface feel expensive without making it complicated.**

The user should immediately understand:

1. Where they are.
2. What they can do.
3. What matters most.
4. What happens next.
5. How to navigate somewhere else.

Every UI element should have a reason to exist.

---

# 6. Preserve the Tree Architecture

The local website's tree structure is considered a strength.

Do not flatten it merely because a different architecture looks more conventional.

The redesign should maintain a logical hierarchy such as:

```text
Application
│
├── Layout
│   ├── Header
│   ├── Navigation
│   ├── Breadcrumbs
│   └── Footer
│
├── Page
│   ├── Page Header
│   ├── Primary Content
│   ├── Secondary Content
│   └── Related Content
│
├── Feature
│   ├── Section
│   ├── Component
│   └── Subcomponent
│
└── Shared
    ├── Button
    ├── Card
    ├── Modal
    ├── Input
    ├── Badge
    ├── Table
    └── Feedback
```

The exact structure should follow the existing repository.

Improve the tree where necessary, but do not introduce unnecessary abstraction.

---

# 7. Component Architecture

Build reusable components.

Prefer:

```text
components/
├── layout/
├── navigation/
├── typography/
├── forms/
├── feedback/
├── content/
├── data-display/
└── shared/
```

Use the project's existing conventions if they are already good.

Do not create a component for every `<div>`.

Create components when they provide:

- Reusability
- Clear responsibility
- Consistent styling
- Meaningful behavior
- Easier maintenance

---

# 8. Design System

Create or improve a lightweight design system.

Define:

## Typography

Establish:

- Display
- H1
- H2
- H3
- H4
- Body
- Small
- Caption
- Label

Typography must have a clear hierarchy.

Do not randomly assign font sizes per component.

---

## Spacing

Use a consistent spacing scale.

Example:

```text
4
8
12
16
20
24
32
40
48
64
80
96
```

Adapt this to the existing technology/design system if appropriate.

---

## Radius

Use a restrained radius system.

Example:

```text
small
medium
large
pill
```

Do not make everything a pill.

---

## Shadows

Use depth sparingly.

Example:

```text
none
subtle
medium
elevated
```

Most UI should not require a shadow.

---

## Colors

Establish semantic colors:

```text
background
surface
surface-muted
text-primary
text-secondary
text-muted
border
primary
primary-hover
success
warning
error
info
```

Do not hard-code arbitrary colors throughout the application.

---

# 9. Layout System

Use a consistent layout system.

Define:

- Maximum content width
- Page gutters
- Section spacing
- Grid behavior
- Sidebar behavior
- Navigation behavior
- Mobile breakpoints

The site should feel aligned.

Major content should share consistent left/right boundaries.

---

# 10. Navigation

Redesign navigation carefully.

Navigation should answer:

> "Where am I and where can I go?"

Depending on the actual site structure, consider:

- Primary navigation
- Secondary navigation
- Breadcrumbs
- Context navigation
- Sidebar/tree navigation
- Mobile navigation
- Search
- Account/action area

Do not add navigation elements simply because modern websites commonly have them.

Use the site's actual information architecture.

---

# 11. Tree Navigation

If the local site's tree structure represents meaningful hierarchy, make it a first-class UX pattern.

Tree navigation should support:

- Clear parent/child relationships
- Expand/collapse
- Current location
- Hover state
- Keyboard navigation
- Accessible labels
- Visual indentation
- Persistent context where useful

Example:

```text
▾ Products
    ▾ Category A
        • Product 1
        • Product 2
    ▸ Category B

▸ Resources

▸ Company
```

Avoid making the tree visually heavy.

---

# 12. Page Design

Every major page should have a predictable structure.

Recommended skeleton:

```text
Page
│
├── Breadcrumb / Context
│
├── Page Header
│   ├── Eyebrow
│   ├── Title
│   ├── Description
│   └── Primary Actions
│
├── Main Content
│   ├── Primary Section
│   ├── Secondary Section
│   └── Supporting Information
│
└── Related / Next Step
```

Not every page needs every section.

---

# 13. Hero Sections

Use hero sections only where they provide value.

A good hero should communicate:

- What this page/product is
- Why it matters
- What the user should do next

Avoid:

```text
Huge headline
+
giant gradient
+
random image
+
three buttons
+
floating cards
```

unless the actual content genuinely benefits from it.

---

# 14. Cards

Cards should represent meaningful groups of information.

Use cards for:

- Related content
- Products
- Services
- Features
- Summaries
- Actions
- Data groups

Avoid putting every piece of content inside a card.

Pages should breathe.

---

# 15. Forms

Forms should prioritize usability.

Implement:

- Clear labels
- Helpful placeholders only where appropriate
- Validation states
- Error messages
- Success states
- Disabled states
- Loading states
- Keyboard navigation
- Accessible focus states

Never rely exclusively on color to communicate errors.

---

# 16. Buttons

Create a clear hierarchy.

Example:

```text
Primary
Secondary
Tertiary
Destructive
Icon
```

Buttons should communicate importance.

Do not make every button primary.

---

# 17. Tables / Data

If the website contains data-heavy pages:

- Improve column hierarchy.
- Improve row spacing.
- Support responsive behavior.
- Provide useful sorting/filtering UI where appropriate.
- Keep important information visible.
- Avoid forcing desktop tables onto mobile.

For static implementation, interactions may use mock state.

---

# 18. Search

If search exists in the live/local website:

Design:

```text
Search trigger
      ↓
Search interface
      ↓
Results
      ↓
Result context
      ↓
Empty state
```

Static/mock search is acceptable for this phase.

---

# 19. Responsive Design

The website must be designed mobile-first or genuinely responsive.

Required states:

```text
Mobile
Tablet
Desktop
Wide desktop
```

Do not simply shrink desktop layouts.

Consider:

- Navigation transformation
- Tree behavior
- Grid changes
- Typography scaling
- Content priority
- Touch targets
- Table behavior
- Modal behavior
- Sticky elements

---

# 20. Accessibility

Target WCAG-conscious implementation.

At minimum:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Proper labels
- Accessible buttons
- Accessible links
- Appropriate heading hierarchy
- Sufficient contrast
- Reduced-motion consideration
- Meaningful alt text
- ARIA only where necessary

Do not use ARIA to compensate for incorrect HTML.

---

# 21. Interaction Design

Interactions should feel deliberate.

Implement appropriate:

- Hover
- Focus
- Active
- Selected
- Expanded
- Collapsed
- Loading
- Disabled
- Success
- Error
- Empty
- Skeleton

Animations should be:

- Short
- Subtle
- Purposeful

Prefer transitions over elaborate animation.

---

# 22. Static Data Strategy

Backend work is explicitly out of scope.

Create a clean mock/static data layer.

For example:

```text
data/
├── navigation
├── pages
├── products
├── categories
├── users
└── content
```

Use realistic data derived from the actual site where appropriate.

Avoid hard-coding the same content in multiple components.

---

# 23. Content Strategy

Content should be based on the real website where available.

Do not invent large amounts of fake business content.

If information is unavailable:

- Use concise placeholders.
- Mark mock data internally.
- Keep the structure ready for real data later.

Do not expose developer placeholder language such as:

```text
Lorem ipsum
Test product
Foo
Bar
Sample text
```

unless explicitly required.

---

# 24. UX Improvements

Do not only redesign visual styling.

Look for opportunities to improve:

### Information hierarchy

Make important information easier to find.

### Navigation

Reduce unnecessary clicks.

### Scannability

Use:

- Headings
- Grouping
- Spacing
- Labels
- Short descriptions
- Visual hierarchy

### User confidence

Make actions and system states obvious.

### Error prevention

Prevent invalid actions where possible.

### Discoverability

Important capabilities should not be hidden.

---

# 25. Existing Functionality

Preserve existing functionality unless there is a strong UX reason to change it.

Before removing functionality:

1. Identify what it does.
2. Determine whether it is still relevant.
3. Determine whether it can be represented better.
4. Preserve the underlying behavior where possible.

The redesign is not permission to randomly remove functionality.

---

# 26. What NOT To Build

Do not spend time on:

- Backend APIs
- Databases
- Authentication systems
- Production payments
- Real user management
- Real email sending
- Real analytics pipelines
- Complex state management
- Infrastructure changes
- Deployment architecture

Unless required for the current front-end to run.

---

# 27. Mock Interactions

Where backend functionality is absent, create believable front-end interactions.

Examples:

```text
button click
→ modal

form submit
→ validation
→ success state

search
→ mock results

filter
→ local filtering

tree node
→ expand/collapse

navigation
→ local route/state

delete
→ confirmation modal

save
→ simulated success
```

The UI should feel complete even though the backend does not exist.

---

# 28. Visual Quality Bar

Before considering the redesign complete, compare every major page against:

### Typography

- Does hierarchy feel intentional?
- Are line lengths comfortable?
- Are headings visually strong?

### Spacing

- Is whitespace consistent?
- Are sections clearly separated?

### Alignment

- Do major elements share common boundaries?

### Color

- Is color purposeful?

### Components

- Do repeated components look identical?

### Interaction

- Are hover/focus/active states obvious?

### Responsiveness

- Does the layout genuinely adapt?

### Content

- Can users scan the page quickly?

---

# 29. Design Direction

The desired aesthetic is:

```text
Modern
+
Premium
+
Clean
+
Functional
+
Confident
+
Editorial where appropriate
+
Technically sophisticated
```

Not:

```text
Generic SaaS
+
Template
+
Dribbble concept
+
Over-designed dashboard
```

The final product should look like something a strong product/design team could plausibly ship.

---

# 30. Implementation Workflow

Follow this sequence.

## Phase 1 — Reconnaissance

Inspect:

```text
Repository
→ framework
→ routes
→ components
→ styles
→ assets
→ data
→ existing functionality
```

Then inspect the live website if accessible.

Create a mental map of:

```text
Current Local Site
        ↓
Live Site Content / IA
        ↓
Desired New UX
```

---

# 31. Phase 2 — Architecture Map

Before implementation, identify:

```text
Routes
Components
Shared Components
Page-specific Components
Data
Assets
Design Tokens
```

Do not rewrite architecture unnecessarily.

---

# 32. Phase 3 — Design System

Establish:

```text
Typography
Colors
Spacing
Radius
Shadows
Breakpoints
Buttons
Inputs
Cards
Navigation
Feedback
```

Implement these centrally.

---

# 33. Phase 4 — Global Shell

Build first:

```text
App shell
Header
Navigation
Tree/sidebar
Breadcrumb
Main content container
Footer
Responsive behavior
```

The shell should establish the visual language.

---

# 34. Phase 5 — Highest-Value Page

Choose the most important page.

Do not start by redesigning every page simultaneously.

Build one page to establish:

- Typography
- Spacing
- Components
- Navigation
- Interactions
- Responsive behavior

Then propagate the design language.

---

# 35. Phase 6 — Remaining Pages

Apply the established system.

Do not duplicate one-off CSS.

If a pattern appears twice, evaluate whether it should become a reusable component.

---

# 36. Phase 7 — Interaction Pass

Add:

- Hover
- Focus
- Active
- Loading
- Empty
- Error
- Success
- Expand/collapse
- Modal states
- Responsive transitions

---

# 37. Phase 8 — Quality Pass

Check:

```text
Desktop
Tablet
Mobile
Keyboard
Accessibility
Visual consistency
Console errors
Broken links
Missing assets
Overflow
Typography
Spacing
```

---

# 38. Browser Validation

If browser tooling is available:

1. Start the local site.
2. Visit every major route.
3. Inspect desktop.
4. Inspect mobile.
5. Test navigation.
6. Test interactive controls.
7. Check console errors.
8. Check layout overflow.
9. Check broken images/assets.
10. Fix issues found.

Do not assume the UI works because the code compiles.

---

# 39. Code Quality

Code should be:

- Readable
- Modular
- Predictable
- Easy to modify
- Consistent with the existing project
- Free of unnecessary abstractions

Avoid:

- Giant components
- Giant CSS files
- Duplicate markup
- Duplicate data
- Magic numbers everywhere
- Inline styles everywhere
- Unused dependencies
- Dead code
- Temporary hacks

---

# 40. Dependency Discipline

Do not install libraries merely because they are popular.

Before adding a dependency ask:

1. Is it necessary?
2. Does the project already have an equivalent?
3. Can this be implemented simply with existing tools?
4. Does the dependency materially improve the result?

Prefer the existing stack.

---

# 41. Asset Strategy

Inspect existing assets before replacing them.

Reuse assets when they are appropriate.

For missing visuals:

- Prefer existing project assets.
- Use simple CSS/HTML compositions where possible.
- Avoid adding huge image libraries.
- Avoid unnecessary external dependencies.

---

# 42. Performance

The redesign must not become unnecessarily heavy.

Consider:

- Image sizing
- Lazy loading
- Component complexity
- Animation cost
- Bundle size
- Unnecessary dependencies
- Excessive DOM nesting

A beautiful website that feels slow is not a successful redesign.

---

# 43. SEO / Semantics

Where applicable:

- Use semantic headings.
- Use meaningful page titles.
- Use descriptive links.
- Use semantic sections.
- Avoid div-based everything.

Do not over-engineer SEO at this stage.

---

# 44. Decision-Making Rule

When there are multiple possible implementations:

Prefer the option that is:

1. More maintainable
2. More accessible
3. More reusable
4. More responsive
5. Simpler
6. More visually polished

Do not optimize for novelty.

---

# 45. Do Not Ask Unnecessary Questions

If requirements are ambiguous but a reasonable implementation can be inferred:

**Make the decision and continue.**

Do not stop the entire redesign to ask about:

- Minor colors
- Small spacing decisions
- Component naming
- Whether a 16px gap should be 20px
- Minor layout details

Use professional judgment.

Ask only when the decision would materially change the product.

---

# 46. Preserve User Control

Do not perform destructive operations without clear necessity.

Do not:

- Delete large portions of the project
- Replace the entire framework
- Remove existing functionality
- Delete assets
- Rewrite configuration unnecessarily

Prefer incremental changes.

---

# 47. Git Awareness

Before major changes:

Understand the current state of the repository.

After implementation:

Review changed files.

Avoid unrelated modifications.

The final diff should tell a coherent story:

> "This commit redesigned the local website."

Not:

> "This commit redesigned the website and randomly changed 40 unrelated things."

---

# 48. Final Acceptance Criteria

The redesign is complete only when:

## Architecture

- [ ] Existing project structure understood
- [ ] Tree/component architecture preserved or improved
- [ ] Shared components identified
- [ ] Static data separated appropriately

## Design

- [ ] Modern visual system
- [ ] Consistent typography
- [ ] Consistent spacing
- [ ] Consistent colors
- [ ] Consistent components
- [ ] Strong information hierarchy

## UX

- [ ] Navigation improved
- [ ] Tree navigation is intuitive
- [ ] Important actions are obvious
- [ ] Pages are scannable
- [ ] Empty/error/loading states exist where appropriate
- [ ] Interactions feel intentional

## Responsive

- [ ] Mobile
- [ ] Tablet
- [ ] Desktop
- [ ] Wide desktop

## Accessibility

- [ ] Keyboard usable
- [ ] Focus visible
- [ ] Semantic HTML
- [ ] Labels present
- [ ] Contrast acceptable

## Engineering

- [ ] No unnecessary dependencies
- [ ] No obvious duplicated logic
- [ ] No dead code
- [ ] No console errors
- [ ] No broken routes
- [ ] No obvious overflow issues

## Content

- [ ] Live website content/reference structure incorporated
- [ ] No unnecessary fake content
- [ ] No lorem ipsum
- [ ] Static data is easy to replace later

---

# 49. Final Report

At the end of the implementation, provide a concise report containing:

```text
## Redesigned

- Major pages redesigned
- Major components created
- Design system changes
- Navigation changes
- Responsive improvements
- Accessibility improvements

## Preserved

- Existing architecture
- Existing functionality
- Existing useful assets

## Added

- Mock/static interactions
- New components
- New states

## Deferred

- Backend
- APIs
- Authentication
- Database
- Other intentionally deferred work

## Validation

- Build status
- Routes checked
- Responsive checks
- Console status
```

---

# 50. Most Important Instruction

Do not interpret this specification as:

> "Make the website prettier."

Interpret it as:

> **Reverse-engineer the useful structure of the existing local and live websites, then redesign the local product as if a highly competent product design and engineering team were given the project for a major UX modernization — while keeping the implementation simple enough that one developer can comfortably maintain and evolve it.**

The final result should be:

```text
LIVE WEBSITE
     │
     │ content / IA / domain knowledge
     ▼
┌─────────────────────────┐
│      NEW UX SYSTEM      │
│                         │
│  Design System          │
│  Navigation             │
│  Information Hierarchy  │
│  Responsive Layout      │
│  Interaction Model      │
└────────────┬────────────┘
             │
             ▼
     LOCAL IMPLEMENTATION
             │
             ├── Maintainable
             ├── Componentized
             ├── Static for now
             ├── Easy to extend
             └── Ready for backend later
```

**Do not copy the live website.**

**Do not destroy the local tree architecture.**

**Do not over-engineer.**

**Do not stop at visual polish.**

**Build the better product.**