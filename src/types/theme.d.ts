import '@mui/material/styles'

/**
 * MUI Theme Type Extensions for Podkrepi.bg
 *
 * This file extends MUI's theme types to include custom colors, shadows, and gradients
 * used across the platform. All theme-related values should be defined in common/theme.ts
 * and accessed via theme properties for consistency.
 *
 * Reference: https://mui.com/material-ui/customization/theming/#custom-variables
 */

declare module '@mui/material/styles' {
  // ============================================================================
  // Palette Extensions
  // ============================================================================

  interface Palette {
    /**
     * Accent colors for special UI elements like hearts, icons
     */
    accent: {
      heart: string
      heartLight: string
    }
    /**
     * Extended yellow color variants for buttons, backgrounds
     */
    yellowVariants: {
      light: string
      hover: string
      background: string
    }
  }

  interface PaletteOptions {
    accent?: {
      heart?: string
      heartLight?: string
    }
    yellowVariants?: {
      light?: string
      hover?: string
      background?: string
    }
  }

  // ============================================================================
  // Custom Theme Extensions
  // ============================================================================

  interface Theme {
    /**
     * Custom shadows for Podkrepi.bg components
     */
    podkrepiShadows: {
      drawer: string
      card: string
    }
    /**
     * Custom gradients for backgrounds and overlays
     */
    podkrepiGradients: {
      summary: string
    }
  }

  interface ThemeOptions {
    podkrepiShadows?: {
      drawer?: string
      card?: string
    }
    podkrepiGradients?: {
      summary?: string
    }
  }
}
