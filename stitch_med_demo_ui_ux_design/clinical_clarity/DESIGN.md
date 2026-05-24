---
name: Clinical Clarity
colors:
  surface: '#f8f9ff'
  surface-dim: '#d0dbed'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dee9fc'
  surface-container-highest: '#d9e3f6'
  on-surface: '#121c2a'
  on-surface-variant: '#3c4947'
  inverse-surface: '#27313f'
  inverse-on-surface: '#eaf1ff'
  outline: '#6c7a77'
  outline-variant: '#bbcac6'
  surface-tint: '#006b5f'
  primary: '#006b5f'
  on-primary: '#ffffff'
  primary-container: '#14b8a6'
  on-primary-container: '#00423b'
  inverse-primary: '#4fdbc8'
  secondary: '#b61722'
  on-secondary: '#ffffff'
  secondary-container: '#da3437'
  on-secondary-container: '#fffbff'
  tertiary: '#9b4426'
  on-tertiary: '#ffffff'
  tertiary-container: '#f38764'
  on-tertiary-container: '#6c2106'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#71f8e4'
  primary-fixed-dim: '#4fdbc8'
  on-primary-fixed: '#00201c'
  on-primary-fixed-variant: '#005048'
  secondary-fixed: '#ffdad7'
  secondary-fixed-dim: '#ffb3ad'
  on-secondary-fixed: '#410004'
  on-secondary-fixed-variant: '#930013'
  tertiary-fixed: '#ffdbd0'
  tertiary-fixed-dim: '#ffb59e'
  on-tertiary-fixed: '#3a0b00'
  on-tertiary-fixed-variant: '#7c2d11'
  background: '#f8f9ff'
  on-background: '#121c2a'
  surface-variant: '#d9e3f6'
typography:
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  h1-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  body:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  small:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  button:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
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
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

This design system is engineered for the healthcare sector, prioritizing trust, hygiene, and rapid information retrieval. The brand personality is professional yet empathetic, utilizing a clean, high-utility aesthetic to reduce cognitive load for patients and practitioners alike.

The design style leans into **Corporate / Modern** minimalism with a mobile-first focus. It utilizes generous whitespace, a restricted color palette for critical signaling, and soft depth to create a sterile but welcoming digital environment. The interface avoids unnecessary decorative elements, ensuring that functional components remain the primary focus.

## Colors

The palette is anchored by a calming Turquoise primary, chosen for its associations with health, clarity, and stability. A vibrant Red is reserved exclusively for high-priority status indicators, alerts, and destructive actions to ensure immediate user recognition.

- **Primary (#14B8A6):** Used for branding, active states, and primary calls to action.
- **Accent/Status (#EF4444):** Used for emergencies, errors, and critical health alerts.
- **Grayscale Architecture:** The system uses a pure White background to maintain a "clinical" feel, with a Light Gray surface for grouping content. Primary text uses a deep Navy-Gray for high legibility, while secondary text is muted to establish a clear information hierarchy.

## Typography

This design system utilizes **Inter** exclusively to ensure maximum legibility across all screen sizes and resolutions. The typographic scale is optimized for readability in stressful or fast-paced environments.

Headings (H1-H3) are set in bold weights with tighter letter-spacing to command attention and anchor the page layout. Body text is prioritized for comfort, while the "Small" style is specifically tinted to the secondary text color (#9CA3AF) to handle metadata, timestamps, and supporting details without cluttering the view.

## Layout & Spacing

The system follows an 8px grid system to maintain rhythmic consistency. For mobile devices, a fluid 4-column layout is used with 16px side margins. On tablet and desktop, the system expands to an 8 or 12-column grid respectively, with content containers capped at 1200px for optimal line lengths.

Spacing between related elements (labels and inputs) should use `sm` (8px), while distinct sections of a form or card-based layout should utilize `lg` (24px) to ensure the interface remains airy and accessible.

## Elevation & Depth

Depth is handled through **Ambient Shadows** and tonal layering. To maintain a modern, flat-plus look, shadows are extremely subtle to avoid "muddying" the interface.

- **Level 1 (Cards):** Uses a light 4px vertical offset shadow with a 12px blur at 5% opacity. This gently lifts patient data and appointment cards from the background.
- **Level 2 (Modals/Pop-overs):** Uses a more pronounced shadow to indicate significant separation from the main flow.
- **Tonal Layers:** The Surface color (#F3F4F6) is used for background regions to group related cards, creating a clear distinction between the canvas and the interactive elements.

## Shapes

The shape language is characterized by organic, friendly curves that soften the clinical nature of the content. 

- **Interactive Elements:** Buttons utilize a full pill-shape (40px) to maximize the tap target area and provide a distinct "clicky" feel.
- **Containers:** Cards use a 16px radius to maintain a modern look.
- **Overlays:** Modals and bottom sheets utilize a larger 24px radius on top corners to signify a transition in the user journey.

## Components

### Buttons
Primary buttons are pill-shaped (40px radius) with a solid Turquoise fill and white text. Secondary buttons should use a Turquoise outline or a light gray ghost style for lower emphasis.

### Cards
Cards are the primary vessel for information. They feature the #FFFFFF background, a 16px corner radius, and the 0 4px 12px (5% alpha) shadow. Padding within cards is fixed at 16px (md) or 24px (lg).

### Tab Bar (Mobile)
A bottom-anchored navigation bar. Active states are indicated by the Turquoise primary color for both the icon and the label. Inactive states use the Secondary Text color (#9CA3AF).

### Input Fields
Inputs use a 12px corner radius (Medium Soft) with a 1px border in #F3F4F6. On focus, the border transitions to Turquoise. Labels are placed above the field using the "Small" typography style.

### Chips & Badges
Small, rounded containers for status (e.g., "Confirmed," "Pending"). Use light tinted backgrounds with darker text for better accessibility. For example, a "Confirmed" chip uses a light teal background with Turquoise text.