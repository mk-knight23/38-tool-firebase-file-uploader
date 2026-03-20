# EnterpriseDrive — Corporate/Enterprise Design System

## Theme Identity: Corporate Enterprise

A professional, business-focused interface inspired by enterprise file management systems. Clean, data-driven design with corporate color palette and formal typography.

---

## Color Palette (Corporate Navy)

### Primary Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--corp-primary` | `#1e40af` | Primary blue (enterprise navy) |
| `--corp-primary-dark` | `#1e3a8a` | Darker navy |
| `--corp-primary-light` | `#3b82f6` | Lighter blue |

### Background Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--corp-bg` | `#f8fafc` | Page background (light gray) |
| `--corp-surface` | `#ffffff` | Card/panel background |
| `--corp-header` | `#0f172a` | Header background (dark navy) |
| `--corp-border` | `#e2e8f0` | Border color |

### Text Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--corp-text` | `#0f172a` | Primary text |
| `--corp-text-secondary` | `#475569` | Secondary text |
| `--corp-text-muted` | `#94a3b8` | Muted text |

### Status Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--corp-success` | `#059669` | Success state |
| `--corp-warning` | `#d97706` | Warning state |
| `--corp-error` | `#dc2626` | Error state |
| `--corp-info` | `#0284c7` | Info state |

---

## Typography

### Font Families

```css
--font-sans: "Inter", system-ui, -apple-system, sans-serif;
--font-mono: "IBM Plex Mono", "Consolas", monospace;
```

### Type Scale

| Size | rem | px | Usage |
|------|-----|-----|-------|
| XS | 0.75rem | 12px | Labels, metadata |
| SM | 0.875rem | 14px | Body text |
| Base | 1rem | 16px | Default |
| LG | 1.125rem | 18px | Subheadings |
| XL | 1.5rem | 24px | Section headings |
| 2XL | 2rem | 32px | Page headings |

### Typography Rules

- Use `Inter` for UI elements
- Use uppercase for labels and buttons
- Letter-spacing: 0.05em for uppercase text
- Font weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

---

## Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `--space-2` | 8px | Tight spacing |
| `--space-3` | 12px | Small gaps |
| `--space-4` | 16px | Default padding |
| `--space-6` | 24px | Medium spacing |
| `--space-8` | 32px | Large spacing |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Small elements |
| `--radius-md` | 8px | Cards, buttons |
| `--radius-lg` | 12px | Large containers |

**Note:** Conservative rounding for enterprise feel.

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | Cards |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |

---

## Components

### Buttons

**Primary Button:**
```css
background: var(--corp-primary);
color: white;
border: none;
border-radius: var(--radius-md);
padding: 12px 24px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.05em;
```

**Secondary Button:**
```css
background: white;
color: var(--corp-text);
border: 1px solid var(--corp-border);
border-radius: var(--radius-md);
padding: 12px 24px;
font-weight: 500;
text-transform: uppercase;
```

### Cards

```css
background: var(--corp-surface);
border: 1px solid var(--corp-border);
border-radius: var(--radius-lg);
padding: var(--space-6);
box-shadow: var(--shadow-sm);
```

### Inputs

```css
background: var(--corp-surface);
border: 1px solid var(--corp-border);
border-radius: var(--radius-md);
padding: 12px 16px;
font-size: 14px;
```

**Focus State:**
```css
border-color: var(--corp-primary);
box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
```

---

## Data Tables

| Element | Style |
|---------|-------|
| Header | Bold, uppercase, 12px |
| Row | Border bottom |
| Hover | Light gray background |
| Sort | Icon indicator |

---

## Progress Bars

```css
background: var(--corp-border);
border-radius: 4px;
overflow: hidden;
height: 8px;
```

**Fill:**
```css
background: var(--corp-primary);
height: 100%;
transition: width 300ms ease-out;
```

---

## Badges & Tags

```css
background: var(--corp-bg);
color: var(--corp-text-secondary);
border: 1px solid var(--corp-border);
border-radius: 4px;
padding: 4px 8px;
font-size: 12px;
font-weight: 500;
text-transform: uppercase;
letter-spacing: 0.05em;
```

---

## Icons

- Use Lucide icons
- Stroke width: 2
- Sizes: 16px, 20px, 24px
- Color: Inherit from text

---

## Layout

| Breakpoint | Max Width | Usage |
|------------|-----------|-------|
| Mobile | 100% | Default |
| Tablet | 768px | Medium container |
| Desktop | 1024px | Large container |
| Wide | 1280px | Max content |

---

## Motion & Transitions

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | 150ms | Hover states |
| `--duration-base` | 300ms | Default transitions |
| `--ease-out` | ease-out | Smooth deceleration |

---

## Accessibility

- Minimum contrast ratio: 4.5:1 for body text
- Focus visible: 2px solid var(--corp-primary)
- Touch targets: Minimum 44x44px
- Keyboard navigation: Full support

---

## Anti-Patterns

### Don't Use

- Bright, vibrant colors
- Large rounded corners (>12px)
- Gradient backgrounds
- Playful animations
- Emoji icons
- Dark mode by default

### Use Instead

- Corporate navy blues
- Conservative rounding (4-8px)
- Subtle borders and shadows
- Minimal animations
- Professional icons
- Light, clean interface

---

## Header Style

```css
background: var(--corp-header);
color: white;
border-bottom: 1px solid rgba(255,255,255,0.1);
height: 64px;
```

---

## Sidebar Style

```css
background: var(--corp-surface);
border-right: 1px solid var(--corp-border);
width: 256px;
```

---

## Print Styles

```css
@media print {
  background: white;
  color: black;
  box-shadow: none;
  max-width: 100%;
}
```
