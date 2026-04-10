# Project UI Rules

This project uses a shared component system for all landing pages and homepages.
Always follow these rules when writing or refactoring HTML/CSS.

---

## CSS Architecture

Three layers in this order:
1. **Design Tokens** — all values on `:root` as CSS custom properties
2. **Base/Reset** — defaults on HTML elements
3. **Components** — BEM classes with native CSS nesting

---

## Core Components (always include)

### `.eyebrow`
Small uppercase label above headings.
- Default: plain uppercase text in accent color
- `--pill` modifier: pill shape with background — use for SaaS/Playful contexts only

```html
<span class="eyebrow">Features</span>
<span class="eyebrow eyebrow--pill">New in v2.0</span>
```

### `.section-header`
Eyebrow + bare heading + body text + optional btn-group. Use inside any `.section__container`.
- Heading is always a bare `<h2>` or `<h3>` — never add a class to the heading itself
- `--centered` modifier for centered layouts

```html
<div class="section-header section-header--centered">
  <span class="eyebrow">Why it works</span>
  <h2>Heading here</h2>
  <p class="section-header__body">Supporting copy.</p>
  <div class="btn-group">
    <a class="btn btn--primary" href="#">Get started</a>
    <a class="btn btn--ghost" href="#">Learn more</a>
  </div>
</div>
```

### `.btn-group`
Wrapping row of buttons. Use whenever two or more buttons appear together.
- `--centered` modifier to center the row

```html
<div class="btn-group">
  <a class="btn btn--primary" href="#">Primary</a>
  <a class="btn btn--ghost" href="#">Secondary</a>
</div>
```

### `.section` + `.section__container`
Spacing shell only — no header logic inside it.
- `--alt`: alternate background
- `--dark`: dark background
- `--flush`: no block padding (for edge-to-edge media)

```html
<section class="section section--alt">
  <div class="section__container">
    <!-- .section-header goes here -->
    <!-- content goes here -->
  </div>
</section>
```

---

## Rules

- **Never** redefine `.eyebrow` styles locally inside cards, sections, or other components — use `.eyebrow` directly
- **Never** add a class to section headings — bare `<h2>` gets its size from the base reset tokens
- **Never** use raw hex or px values in component CSS — always use tokens (`var(--space-s)`, `var(--clr-action)`, etc.)
- **Never** nest BEM deeper than one level: `.card__title` ✓ — `.card__content__title` ✗
- **Never** use `system-ui`, `Inter`, `Roboto`, or `Arial` as the final font choice
- **Never** pair pure `#FFFFFF` with generic blue `#3B82F6`

---

## Content Components (include as needed)

- `.card` — surface + optional media + content. `--featured` modifier. Uses `.eyebrow` directly, no `card__eyebrow`
- `.btn` — variants: `--primary`, `--secondary`, `--ghost`. Sizes: `--sm`, `--lg`
- `.header` + `.nav` — sticky nav with mobile drawer
- `.footer` — brand + link columns + legal row
