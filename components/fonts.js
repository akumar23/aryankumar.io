const Fonts = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

    /* Preload hints for better performance */
    @supports (font-variation-settings: normal) {
      :root {
        font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
      }
    }

    /* Support for reduced motion preferences */
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `}</style>
)

export default Fonts