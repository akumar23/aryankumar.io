import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      /* Instrument Serif - Elegant display font for section headers */
      @font-face {
        font-family: 'Instrument Serif';
        src: url('https://fonts.gstatic.com/s/instrumentserif/v4/jizBRFtNs2ka5fXjeivQ4LroWlx-2zIZj1bIkNo.woff2') format('woff2');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }

      @font-face {
        font-family: 'Instrument Serif';
        src: url('https://fonts.gstatic.com/s/instrumentserif/v4/jizHRFtNs2ka5fXjeivQ4LroWlx-6zATi3TNgNq55w.woff2') format('woff2');
        font-weight: 400;
        font-style: italic;
        font-display: swap;
      }

      /* Inter - Clean readable body font */
      @font-face {
        font-family: 'Inter';
        src: url('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2') format('woff2');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }

      @font-face {
        font-family: 'Inter';
        src: url('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiJ-Ek-_EeA.woff2') format('woff2');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
      }

      @font-face {
        font-family: 'Inter';
        src: url('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiJ-Ek-_EeA.woff2') format('woff2');
        font-weight: 600;
        font-style: normal;
        font-display: swap;
      }

      /* JetBrains Mono - Primary display/heading and code font */
      @font-face {
        font-family: 'JetBrains Mono';
        src: url('https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.woff2') format('woff2');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }

      @font-face {
        font-family: 'JetBrains Mono';
        src: url('https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.woff2') format('woff2');
        font-weight: 700;
        font-style: normal;
        font-display: swap;
      }

      :root {
        --font-display: 'JetBrains Mono', 'Fira Code', monospace;
        --font-heading: 'JetBrains Mono', 'Fira Code', monospace;
        --font-serif: 'Instrument Serif', 'Georgia', serif;
        --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        --font-accent: 'JetBrains Mono', monospace;
        --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

        --focus-ring-color: rgba(26, 26, 26, 0.8);
      }

      [data-theme='dark'] {
        --focus-ring-color: rgba(245, 158, 11, 0.8);
      }

      @supports (font-variation-settings: normal) {
        :root {
          font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
        }
      }

      *:focus {
        outline: none;
      }

      *:focus-visible {
        outline: 2px solid var(--focus-ring-color);
        outline-offset: 2px;
      }

      .js-focus-visible :focus:not(.focus-visible) {
        outline: none;
      }

      .js-focus-visible .focus-visible {
        outline: 2px solid var(--focus-ring-color);
        outline-offset: 2px;
      }

      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }

        .parallax,
        .hero-3d-container,
        .webgl-background {
          transform: none !important;
        }
      }

      @media (prefers-contrast: high) {
        :root {
          --focus-ring-color: #000;
        }

        a, button {
          text-decoration: underline;
        }
      }

      body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
      }

      ::selection {
        background-color: rgba(245, 158, 11, 0.9);
        color: #18181B;
      }

      ::-moz-selection {
        background-color: rgba(245, 158, 11, 0.9);
        color: #18181B;
      }

      [data-theme='dark'] ::selection {
        background-color: rgba(245, 158, 11, 0.85);
        color: #18181B;
      }

      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      ::-webkit-scrollbar-track {
        background: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background: rgba(113, 113, 122, 0.5);
        border-radius: 3px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: rgba(113, 113, 122, 0.8);
      }

      * {
        scrollbar-width: thin;
        scrollbar-color: rgba(113, 113, 122, 0.5) transparent;
      }

      body {
        padding-left: env(safe-area-inset-left);
        padding-right: env(safe-area-inset-right);
      }

      html {
        -webkit-text-size-adjust: 100%;
        text-size-adjust: 100%;
      }

      @media print {
        nav,
        .custom-cursor,
        .scroll-indicator,
        .hero-3d-container,
        .webgl-background {
          display: none !important;
        }

        body {
          background: white !important;
          color: black !important;
        }

        a {
          text-decoration: underline;
        }

        a[href]:after {
          content: " (" attr(href) ")";
        }
      }
    `}
  />
)

export default Fonts
