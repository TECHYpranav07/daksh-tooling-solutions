import { useTheme } from '@/context/ThemeContext'

/**
 * Returns a full palette of semantic color tokens that adapt to light/dark mode.
 * Components use these tokens in inline styles instead of hardcoded oklch values.
 */
export function useThemeColors() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return {
    isDark,

    // ── Backgrounds ──
    bg:            isDark ? 'oklch(0.11 0.01 250)' : 'oklch(0.97 0.005 250)',
    bgAlt:         isDark ? 'oklch(0.12 0.01 250)' : 'oklch(0.94 0.005 250)',
    bgCard:        isDark ? 'oklch(0.14 0.012 250 / 72%)' : 'oklch(1.0 0.0 0 / 85%)',
    bgCardHover:   isDark ? 'oklch(0.18 0.012 250 / 80%)' : 'oklch(0.98 0.003 250 / 95%)',
    bgElevated:    isDark ? 'oklch(0.17 0.012 250 / 65%)' : 'oklch(0.99 0.003 250 / 90%)',
    bgGlass:       isDark ? 'oklch(0.14 0.012 250 / 70%)' : 'oklch(1.0 0.0 0 / 70%)',
    bgDeep:        isDark ? 'oklch(0.09 0.01 250)' : 'oklch(0.96 0.003 250)',
    bgOverlay:     isDark ? 'oklch(0.09 0.01 250 / 85%)' : 'oklch(0.15 0.01 250 / 55%)',
    bgModal:       isDark ? 'oklch(0.15 0.012 250)' : 'oklch(0.98 0.003 250)',
    bgBadge:       isDark ? 'oklch(0.13 0.01 250 / 60%)' : 'oklch(0.96 0.003 250 / 80%)',
    bgCarousel:    isDark ? 'oklch(0.16 0.012 250 / 70%)' : 'oklch(1.0 0.0 0 / 80%)',

    // ── Text ──
    heading:       isDark ? 'oklch(0.93 0.005 250)' : 'oklch(0.18 0.01 250)',
    body:          isDark ? 'oklch(0.62 0.01 250)' : 'oklch(0.42 0.01 250)',
    muted:         isDark ? 'oklch(0.52 0.01 250)' : 'oklch(0.55 0.01 250)',
    bodyLight:     isDark ? 'oklch(0.62 0.01 250 / 0.6)' : 'oklch(0.42 0.01 250 / 0.6)',
    bodyLighter:   isDark ? 'oklch(0.62 0.01 250 / 0.5)' : 'oklch(0.42 0.01 250 / 0.5)',

    // ── Accents ──
    amber:         isDark ? 'oklch(0.72 0.19 45)' : 'oklch(0.55 0.19 45)',
    cyan:          isDark ? 'oklch(0.78 0.12 215)' : 'oklch(0.45 0.14 215)',
    green:         isDark ? 'oklch(0.75 0.17 150)' : 'oklch(0.45 0.15 150)',

    // ── Accent alphas ──
    amberA6:       isDark ? 'oklch(0.72 0.19 45 / 0.06)' : 'oklch(0.55 0.19 45 / 0.06)',
    amberA8:       isDark ? 'oklch(0.72 0.19 45 / 0.08)' : 'oklch(0.55 0.19 45 / 0.08)',
    amberA10:      isDark ? 'oklch(0.72 0.19 45 / 0.1)' : 'oklch(0.55 0.19 45 / 0.1)',
    amberA12:      isDark ? 'oklch(0.72 0.19 45 / 0.12)' : 'oklch(0.55 0.19 45 / 0.12)',
    amberA15:      isDark ? 'oklch(0.72 0.19 45 / 0.15)' : 'oklch(0.55 0.19 45 / 0.12)',
    amberA30:      isDark ? 'oklch(0.72 0.19 45 / 0.3)' : 'oklch(0.55 0.19 45 / 0.2)',
    amberA40:      isDark ? 'oklch(0.72 0.19 45 / 0.4)' : 'oklch(0.55 0.19 45 / 0.3)',
    amberA50:      isDark ? 'oklch(0.72 0.19 45 / 0.5)' : 'oklch(0.55 0.19 45 / 0.4)',
    amberA60:      isDark ? 'oklch(0.72 0.19 45 / 0.6)' : 'oklch(0.55 0.19 45 / 0.5)',
    amberA70:      isDark ? 'oklch(0.72 0.19 45 / 0.7)' : 'oklch(0.55 0.19 45 / 0.6)',

    cyanA6:        isDark ? 'oklch(0.78 0.12 215 / 0.06)' : 'oklch(0.45 0.14 215 / 0.06)',
    cyanA8:        isDark ? 'oklch(0.78 0.12 215 / 0.08)' : 'oklch(0.45 0.14 215 / 0.08)',
    cyanA20:       isDark ? 'oklch(0.78 0.12 215 / 0.2)' : 'oklch(0.45 0.14 215 / 0.15)',
    cyanA80:       isDark ? 'oklch(0.78 0.12 215 / 0.8)' : 'oklch(0.35 0.14 215)',

    greenA40:      isDark ? 'oklch(0.75 0.17 150 / 0.4)' : 'oklch(0.45 0.15 150 / 0.3)',

    // ── Borders ──
    borderSubtle:  isDark ? 'oklch(0.93 0.005 250 / 8%)' : 'oklch(0.18 0.01 250 / 6%)',
    border:        isDark ? 'oklch(0.93 0.005 250 / 12%)' : 'oklch(0.18 0.01 250 / 12%)',
    borderStrong:  isDark ? 'oklch(0.93 0.005 250 / 15%)' : 'oklch(0.18 0.01 250 / 18%)',
    borderDim:     isDark ? 'oklch(0.93 0.005 250 / 6%)' : 'oklch(0.18 0.01 250 / 5%)',
    borderHeading: isDark ? 'oklch(0.93 0.005 250 / 0.2)' : 'oklch(0.18 0.01 250 / 0.15)',

    // ── Gradients ──
    gradientAmberCyan: isDark
      ? 'linear-gradient(135deg, oklch(0.72 0.19 45), oklch(0.78 0.12 215))'
      : 'linear-gradient(135deg, oklch(0.55 0.19 45), oklch(0.45 0.14 215))',
    gradientAmberGreen: isDark
      ? 'linear-gradient(135deg, oklch(0.72 0.19 45), oklch(0.75 0.17 150))'
      : 'linear-gradient(135deg, oklch(0.55 0.19 45), oklch(0.45 0.15 150))',
    gradientGreenCyan: isDark
      ? 'linear-gradient(135deg, oklch(0.75 0.17 150), oklch(0.78 0.12 215))'
      : 'linear-gradient(135deg, oklch(0.45 0.15 150), oklch(0.45 0.14 215))',
    gradientCyanAmber: isDark
      ? 'linear-gradient(135deg, oklch(0.78 0.12 215), oklch(0.72 0.19 45))'
      : 'linear-gradient(135deg, oklch(0.45 0.14 215), oklch(0.55 0.19 45))',

    // ── Navbar ──
    navbarBg:      isDark ? 'oklch(0.13 0.01 250 / 0.85)' : 'oklch(0.97 0.005 250 / 0.88)',
    navbarBorder:  isDark ? 'oklch(0.93 0.005 250 / 0.08)' : 'oklch(0.18 0.01 250 / 0.08)',

    // ── Hero ──
    heroBg:        isDark ? 'oklch(0.11 0.01 250)' : 'oklch(0.97 0.005 250)',

    // ── Special ──
    logoBg:        'white',
    btnHoverText:  isDark ? 'oklch(0.13 0.01 250)' : 'oklch(0.98 0.005 250)',
    scanline:      isDark ? 'oklch(0.93 0.005 250 / 0.015)' : 'oklch(0.18 0.01 250 / 0.02)',
    shadowGlow:    isDark ? 'oklch(0.72 0.19 45 / 5%)' : 'oklch(0.55 0.19 45 / 8%)',
  }
}
