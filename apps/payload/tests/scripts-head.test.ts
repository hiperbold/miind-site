import { afterEach, describe, expect, it, vi } from 'vitest'

import { separarHead } from '@/lib/scripts-head'

afterEach(() => vi.restoreAllMocks())

describe('separarHead', () => {
  it('link com style vira objeto de estilo do React', () => {
    const [link] = separarHead('<link rel="preload" href="/f.woff2" as="font" crossorigin style="display: none; --x: 1">')
    expect(link.tag).toBe('link')
    expect(link.props).toMatchObject({ rel: 'preload', href: '/f.woff2', as: 'font', crossOrigin: '' })
    expect(link.props.style).toEqual({ display: 'none', '--x': '1' })
    expect(link.html).toBeUndefined()
  })

  it('meta com ">" dentro do content preserva o valor inteiro', () => {
    const els = separarHead('<meta name="descricao" content="a > b e c < d"><meta http-equiv="x-ua-compatible" content="ie=edge">')
    expect(els).toHaveLength(2)
    expect(els[0].props).toEqual({ name: 'descricao', content: 'a > b e c < d' })
    expect(els[1].props).toEqual({ httpEquiv: 'x-ua-compatible', content: 'ie=edge' })
  })

  it('pixel do Meta completo: script inline e noscript com img', () => {
    const pixel = `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '123456789');
fbq('track', 'PageView');
if (1 < 2 && 3 > 2) { console.log("</div>") }
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=123456789&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->`
    const els = separarHead(pixel)
    expect(els.map((e) => e.tag)).toEqual(['script', 'noscript'])
    expect(els[0].html).toContain("fbq('init', '123456789');")
    expect(els[0].html).toContain('if (1 < 2 && 3 > 2) { console.log("</div>") }')
    expect(els[1].html).toContain('<img')
    expect(els[1].html).toContain('src="https://www.facebook.com/tr?id=123456789&amp;ev=PageView&amp;noscript=1"')
  })

  it('GA/gtag: script src async e script inline', () => {
    const els = separarHead(`<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-ABC123');
</script>`)
    expect(els).toHaveLength(2)
    expect(els[0].props).toEqual({ async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-ABC123' })
    expect(els[0].html).toBe('')
    expect(els[1].html).toContain("gtag('config', 'G-ABC123');")
  })

  it('HTML inválido ou tags não aceitas não quebram: só o que é válido entra', () => {
    const aviso = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const els = separarHead(
      '<div>solto</div> texto <script onload="x()" class="a" 1bad="y" data-id="7">ok()</script><meta content="sem fim" <<<<script',
    )
    expect(els[0]).toMatchObject({ tag: 'script', html: 'ok()' })
    expect(els[0].props).toEqual({ className: 'a', 'data-id': '7' })
    expect(els.every((e) => ['script', 'noscript', 'style', 'meta', 'link'].includes(e.tag))).toBe(true)
    expect(aviso).toHaveBeenCalled()
    expect(() => separarHead('<<<>>></script></noscript><style>')).not.toThrow()
    expect(separarHead('')).toEqual([])
    expect(separarHead(null)).toEqual([])
  })
})
