/** Skip-to-content link — only visible when focused. */
const SkipToContent = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-foreground focus:text-background focus:text-sm focus:font-semibold focus:shadow-lg"
  >
    Pular para o conteúdo
  </a>
);

export default SkipToContent;
