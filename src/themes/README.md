# Theme System

This directory contains the theme configuration and constants for the banking platform.

## Structure

- `theme-constants.ts`: Exports the `BANKING_THEME` object which contains the raw HSL color values and other design tokens. This is useful for JavaScript-based styling needs or dynamic theme switching.

## Global Styles

The actual CSS variables that power the application's theme are defined in `src/styles/globals.css`. This file uses Tailwind CSS directives and CSS variables to enable the design system.

## Color Palette (Trust & Authority)

The current theme is designed to convey trust, stability, and professionalism, which are critical for a banking application.

- **Primary**: Deep Vivid Blue (Trust, Competence)
- **Background**: Soft Gray/Blue (Cleanliness, Modernity)
- **Foreground**: Dark Navy (Authority, Readability)
- **Accent**: Dark Teal/Blue (Sophistication)
