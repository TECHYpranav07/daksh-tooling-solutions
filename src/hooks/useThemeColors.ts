import { useTheme } from '@/context/ThemeContext'

/**
 * Returns a full palette of semantic color tokens that adapt to light/dark mode.
 * Components use these tokens in inline styles instead of hardcoded oklch values.
 *
 * LIGHT palette: "Sri Devi Tools Corporate Precision"
 * — Clean crisp off-white canvas, Pure White elevated cards, Royal Blue & Amber accents,
 * deep slate navy typography.
 */
export function useThemeColors() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return {
    isDark,

    // ── Backgrounds ──
    bg:            isDark ? 'oklch(0.11 0.01 250)' : 'oklch(0.89 0.015 245)',
    bgAlt:         isDark ? 'oklch(0.12 0.01 250)' : 'oklch(0.86 0.016 245)',
    bgCard:        isDark ? 'oklch(0.14 0.012 250 / 72%)' : 'oklch(0.945 0.008 245)',
    bgCardHover:   isDark ? 'oklch(0.18 0.012 250 / 80%)' : 'oklch(0.96 0.006 245)',
    bgElevated:    isDark ? 'oklch(0.17 0.012 250 / 65%)' : 'oklch(0.945 0.008 245)',
    bgGlass:       isDark ? 'oklch(0.14 0.012 250 / 70%)' : 'oklch(0.945 0.008 245 / 0.88)',
    bgDeep:        isDark ? 'oklch(0.09 0.01 250)' : 'oklch(0.86 0.016 245)',
    bgOverlay:     isDark ? 'oklch(0.09 0.01 250 / 85%)' : 'rgba(15, 23, 42, 0.55)',
    bgModal:       isDark ? 'oklch(0.15 0.012 250)' : 'oklch(0.95 0.008 245)',
    bgBadge:       isDark ? 'oklch(0.13 0.01 250 / 60%)' : 'oklch(0.91 0.012 245)',
    bgCarousel:    isDark ? 'oklch(0.16 0.012 250 / 70%)' : 'oklch(0.945 0.008 245)',

    // ── Text ──
    heading:       isDark ? 'oklch(0.93 0.005 250)' : 'oklch(0.12 0.02 250)',
    body:          isDark ? 'oklch(0.62 0.01 250)' : 'oklch(0.34 0.018 250)',
    muted:         isDark ? 'oklch(0.52 0.01 250)' : 'oklch(0.44 0.015 250)',
    bodyLight:     isDark ? 'oklch(0.62 0.01 250 / 0.6)' : 'oklch(0.34 0.018 250 / 0.6)',
    bodyLighter:   isDark ? 'oklch(0.62 0.01 250 / 0.5)' : 'oklch(0.34 0.018 250 / 0.5)',

    // ── Accents ──
    amber:         isDark ? 'oklch(0.72 0.19 45)' : 'oklch(0.52 0.18 45)',
    cyan:          isDark ? 'oklch(0.78 0.12 215)' : 'oklch(0.45 0.18 255)',
    green:         isDark ? 'oklch(0.75 0.17 150)' : 'oklch(0.46 0.16 150)',

    // ── Accent alphas ──
    amberA6:       isDark ? 'oklch(0.72 0.19 45 / 0.06)' : 'oklch(0.52 0.18 45 / 0.07)',
    amberA8:       isDark ? 'oklch(0.72 0.19 45 / 0.08)' : 'oklch(0.52 0.18 45 / 0.09)',
    amberA10:      isDark ? 'oklch(0.72 0.19 45 / 0.1)' : 'oklch(0.52 0.18 45 / 0.1)',
    amberA12:      isDark ? 'oklch(0.72 0.19 45 / 0.12)' : 'oklch(0.52 0.18 45 / 0.12)',
    amberA15:      isDark ? 'oklch(0.72 0.19 45 / 0.15)' : 'oklch(0.52 0.18 45 / 0.14)',
    amberA30:      isDark ? 'oklch(0.72 0.19 45 / 0.3)' : 'oklch(0.52 0.18 45 / 0.25)',
    amberA40:      isDark ? 'oklch(0.72 0.19 45 / 0.4)' : 'oklch(0.52 0.18 45 / 0.35)',
    amberA50:      isDark ? 'oklch(0.72 0.19 45 / 0.5)' : 'oklch(0.52 0.18 45 / 0.45)',
    amberA60:      isDark ? 'oklch(0.72 0.19 45 / 0.6)' : 'oklch(0.52 0.18 45 / 0.5)',
    amberA70:      isDark ? 'oklch(0.72 0.19 45 / 0.7)' : 'oklch(0.52 0.18 45 / 0.6)',

    cyanA6:        isDark ? 'oklch(0.78 0.12 215 / 0.06)' : 'oklch(0.45 0.18 255 / 0.07)',
    cyanA8:        isDark ? 'oklch(0.78 0.12 215 / 0.08)' : 'oklch(0.45 0.18 255 / 0.09)',
    cyanA20:       isDark ? 'oklch(0.78 0.12 215 / 0.2)' : 'oklch(0.45 0.18 255 / 0.2)',
    cyanA80:       isDark ? 'oklch(0.78 0.12 215 / 0.8)' : 'oklch(0.45 0.18 255)',

    greenA40:      isDark ? 'oklch(0.75 0.17 150 / 0.4)' : 'oklch(0.46 0.16 150 / 0.35)',

    // ── Borders ──
    borderSubtle:  isDark ? 'oklch(0.93 0.005 250 / 8%)' : 'oklch(0.82 0.018 245)',
    border:        isDark ? 'oklch(0.93 0.005 250 / 12%)' : 'oklch(0.79 0.02 245)',
    borderStrong:  isDark ? 'oklch(0.93 0.005 250 / 15%)' : 'oklch(0.68 0.025 245)',
    borderDim:     isDark ? 'oklch(0.93 0.005 250 / 6%)' : 'oklch(0.82 0.018 245)',
    borderHeading: isDark ? 'oklch(0.93 0.005 250 / 0.2)' : 'oklch(0.72 0.022 245)',

    // ── Gradients ──
    gradientAmberCyan: isDark
      ? 'linear-gradient(135deg, oklch(0.72 0.19 45), oklch(0.78 0.12 215))'
      : 'linear-gradient(135deg, oklch(0.50 0.18 45), oklch(0.44 0.18 255))',
    gradientAmberGreen: isDark
      ? 'linear-gradient(135deg, oklch(0.72 0.19 45), oklch(0.75 0.17 150))'
      : 'linear-gradient(135deg, oklch(0.50 0.18 45), oklch(0.44 0.16 150))',
    gradientGreenCyan: isDark
      ? 'linear-gradient(135deg, oklch(0.75 0.17 150), oklch(0.78 0.12 215))'
      : 'linear-gradient(135deg, oklch(0.44 0.16 150), oklch(0.44 0.18 255))',
    gradientCyanAmber: isDark
      ? 'linear-gradient(135deg, oklch(0.78 0.12 215), oklch(0.72 0.19 45))'
      : 'linear-gradient(135deg, oklch(0.44 0.18 255), oklch(0.50 0.18 45))',

    // ── Navbar ──
    navbarBg:      isDark ? 'oklch(0.13 0.01 250 / 0.85)' : 'oklch(0.91 0.014 245 / 0.94)',
    navbarBorder:  isDark ? 'oklch(0.93 0.005 250 / 0.08)' : 'oklch(0.79 0.02 245)',

    // ── Hero ──
    heroBg:        isDark ? 'oklch(0.11 0.01 250)' : 'oklch(0.89 0.015 245)',

    // ── Special ──
    logoBg:        'white',
    btnHoverText:  isDark ? 'oklch(0.13 0.01 250)' : '#ffffff',
    scanline:      isDark ? 'oklch(0.93 0.005 250 / 0.015)' : 'oklch(0.12 0.02 250 / 0.02)',
    shadowGlow:    isDark ? 'oklch(0.72 0.19 45 / 5%)' : 'rgba(30, 64, 175, 0.08)',

    // ── Card elevation shadow ──
    cardShadow:    isDark ? 'none' : '0 2px 4px rgba(15, 23, 42, 0.06), 0 6px 16px rgba(15, 23, 42, 0.04)',
  }
}
