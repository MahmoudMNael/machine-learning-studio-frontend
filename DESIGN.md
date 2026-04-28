---
name: Machine Learning Platform System
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#424754'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#727785'
  outline-variant: '#c2c6d6'
  surface-tint: '#005ac2'
  primary: '#0058be'
  on-primary: '#ffffff'
  primary-container: '#2170e4'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#545f73'
  on-secondary: '#ffffff'
  secondary-container: '#d5e0f8'
  on-secondary-container: '#586377'
  tertiary: '#924700'
  on-tertiary: '#ffffff'
  tertiary-container: '#b75b00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.015em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is rooted in **Minimalism** and **Corporate Modern** aesthetics, specifically tailored for the high-performance requirements of a machine learning platform. The brand personality is intellectual, precise, and sophisticated, aiming to evoke a sense of calm reliability amidst complex data processing.

The visual strategy focuses on extreme clarity and "breathing room." By utilizing significant whitespace and a restrained color palette, the interface reduces cognitive load for data scientists and engineers. This high-end approach mimics the utilitarian elegance of industry leaders like Vercel and Stripe, where the UI recedes to let the user's work and data insights take center stage.

## Colors

The palette is anchored by a neutral off-white background to ensure the interface feels expansive and light. The **Soft Primary Blue** (#3B82F6) is reserved for primary actions, progress indicators, and active states, providing a clear functional signal.

**Deep Navy** (#1E293B) serves as the primary typographic color for headings, creating a strong contrast and professional weight. Secondary and body text utilizes a scale of slate grays to maintain hierarchy without competing with the headlines. High-contrast white is used for card surfaces to create distinct "islands" of information against the off-white background.

## Typography

This design system utilizes **Inter** for all typographic needs to leverage its exceptional legibility and systematic feel. The hierarchy is intentionally dramatic; large, bold headings in Navy provide immediate orientation, while descriptions use a smaller, lighter slate tone to provide context without clutter.

For technical data and metrics—common in ML platforms—tabular figures should be enabled via OpenType features to ensure columns of numbers align perfectly. Use "body-sm" for dense data tables and "label-caps" for metadata or small identifiers.

## Layout & Spacing

The system employs a **Fixed Grid** philosophy for primary dashboards to maintain a structured, high-end feel, while utilizing fluid components within those grid containers. The standard layout uses a 12-column grid with a 24px gutter.

Spacing follows a linear 4px scale. "Generous padding" is the guiding principle: cards should never feel cramped. Use `xl` (32px) or `xxl` (48px) padding for primary dashboard sections and `lg` (24px) for standard card internals. This creates a luxurious sense of space that distinguishes the platform from "busy" legacy data tools.

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and **Tonal Layering**. Surfaces are never "flat" but rather exist in a 3D space with a soft light source from the top.

- **Level 0 (Background):** #F9FAFB.
- **Level 1 (Cards/Panels):** Pure White (#FFFFFF) with a very soft, diffused shadow (Blur: 20px, Y: 4px, Color: rgba(30, 41, 59, 0.05)).
- **Level 2 (Dropdowns/Modals):** Pure White with a more pronounced shadow (Blur: 40px, Y: 12px, Color: rgba(30, 41, 59, 0.08)) and a subtle 1px border (#E2E8F0).

Avoid heavy blacks in shadows; instead, use the deep navy heading color at very low opacities to maintain color harmony.

## Shapes

The shape language is consistently **Rounded**, using a 12px-16px radius for primary elements to soften the technical nature of the platform.

- **Cards/Containers:** 16px (`rounded-xl`)
- **Buttons/Inputs:** 8px (`rounded-lg`)
- **Chips/Badges:** Pill-shaped (Full radius)

This curvature creates a friendly, approachable interface that feels "engineered" yet modern. Avoid sharp corners except for extremely small utility icons or dividers.

## Components

### Buttons

Primary buttons use the Soft Blue (#3B82F6) with white text. Hover states must be "smooth," utilizing a 200ms transition to a slightly darker shade or a subtle lift via shadow. Secondary buttons use a light gray ghost style with a 1px border.

### Cards

The centerpiece of the ML dashboard. Cards must feature 24px-32px padding and 16px rounded corners. They should have a subtle hover effect where the shadow deepens slightly, suggesting interactivity.

### Inputs & Fields

Use a clean, 1px border (#E2E8F0) that transitions to the Primary Blue on focus. Labels should be placed above the field in "body-sm" slate.

### ML-Specific Components

- **Model Status Chips:** High-radius (pill) badges with subtle background tints (e.g., light green for "Training Complete").
- **Metric Micro-charts:** Simplified sparklines integrated into cards to show model performance over time.
- **Code Blocks:** Monospaced snippets with a darker #1E293B background to contrast against the light UI.
