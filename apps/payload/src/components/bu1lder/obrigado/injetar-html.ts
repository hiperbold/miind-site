'use client'

// Insere HTML colado no admin (scripts personalizados, embed da agenda) e faz
// os <script> rodarem, na ordem: um <script src> só segue para o próximo item
// depois de carregar (ou falhar). HTML inserido por innerHTML não roda script;
// por isso cada <script> é recriado.

function recriarScript(antigo: HTMLScriptElement): HTMLScriptElement {
  const novo = document.createElement('script')
  for (const attr of Array.from(antigo.attributes)) novo.setAttribute(attr.name, attr.value)
  novo.text = antigo.text
  return novo
}

function esperarCarregar(script: HTMLScriptElement): Promise<void> {
  return new Promise((resolve) => {
    script.addEventListener('load', () => resolve(), { once: true })
    script.addEventListener('error', () => resolve(), { once: true })
  })
}

export async function injetarHtml(destino: HTMLElement, html: string | null | undefined): Promise<void> {
  if (!html?.trim()) return
  const modelo = document.createElement('template')
  modelo.innerHTML = html
  for (const no of Array.from(modelo.content.childNodes)) {
    if (no instanceof HTMLScriptElement) {
      const script = recriarScript(no)
      const externo = Boolean(script.src)
      if (externo) script.async = false
      const carregou = externo ? esperarCarregar(script) : null
      destino.appendChild(script)
      if (carregou) await carregou
      continue
    }
    const copia = document.importNode(no, true)
    if (copia instanceof Element) {
      for (const interno of Array.from(copia.querySelectorAll('script'))) {
        interno.replaceWith(recriarScript(interno as HTMLScriptElement))
      }
    }
    destino.appendChild(copia)
  }
}
