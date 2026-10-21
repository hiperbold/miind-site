# Responsividade mobile — páginas Bu1lders

Foco em telas < 640px (especialmente 390px iPhone). Sem mudar layout desktop.

## 1. `BuildersHeader` — botão "Quero ser um Bu1lder" estourando

Hoje na header (h=14, 56px) cabem: logo + "Bu1lder.com" (text-lg/xl) + ThemeToggle + CTA `Quero ser um Bu1lder` (px-4 h-9, ~180px). Em 390px isso fica colado ou empurra o logo.

**Fix:**
- Trocar o texto do CTA: mostrar `Cadastrar` no mobile, `Quero ser um Bu1lder` em `sm:`.
- Adicionar `min-w-0 truncate` ao bloco do nome da plataforma e reduzir o tamanho para `text-base sm:text-lg lg:text-xl` (estava text-lg/xl — grande demais no iPhone).
- Container do header: `gap-2 sm:gap-3` para folgar; CTA `px-3 sm:px-4 text-xs sm:text-sm`.
- Esconder ThemeToggle abaixo de `sm` (já existe ThemeToggle no rodapé/menu se necessário) — alternativa: manter, só reduzir gap.

## 2. `bu1lders.index.tsx` — hero / form / stats / segmentos

**Hero:**
- `pt-28` → `pt-24 sm:pt-28 lg:pt-32` (alivia distância no mobile).
- H1: `text-4xl` → `text-[2rem] leading-[1.08] sm:text-5xl lg:text-6xl` (evita estouro com "renda recorrente").
- Bullets: reduzir `space-y-3` → `space-y-2.5` e ícone `w-8 h-8` → `w-7 h-7` no mobile.
- Pills "Sem programar / Setup incluso…": deixar `text-[10px]` no mobile, reduzir padding `px-2.5 py-1`.

**Card de formulário:**
- `p-6 sm:p-8` → `p-5 sm:p-7`.
- H2 `text-2xl sm:text-3xl` → `text-xl sm:text-2xl lg:text-3xl`.

**Stats:**
- Mobile: trocar de empilhado para `grid-cols-3` desde mobile, com valores `text-2xl` (cabem 3 lado a lado no 390px com `gap-3`).
- Labels `text-[10px]` para caber.

**Segmentos (NicheCard grid):**
- Manter `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5` mas `gap-3 sm:gap-4`.
- No `NicheCard.tsx`: reduzir padding `p-5` → `p-4`, ícone `w-11 h-11` → `w-10 h-10`, esconder badge `marketStat` no mobile (`hidden sm:inline`), trocar "Ver soluções" → ícone-only no mobile (`hidden sm:inline` no texto, manter seta).

**CTA Final:**
- H2 `text-3xl sm:text-4xl lg:text-5xl` → `text-2xl sm:text-4xl lg:text-5xl`.

## 3. Páginas de segmento (`bu1lders.<slug>.tsx` × 10 + `bu1lders.$slug.tsx`)

**Hero:**
- H1 `text-4xl sm:text-5xl lg:text-7xl` → `text-3xl sm:text-5xl lg:text-7xl` (mobile mais leve, evita quebrar mal).
- Header row do hero (ícone 14×14 + eyebrow): no mobile reduzir ícone para `w-12 h-12` e eyebrow `text-[10px]`.
- Botões CTA do hero ("Quero atender X" + "Ver o que você entrega"): adicionar `w-full sm:w-auto justify-center` para virarem stack full-width no mobile.

**PhoneMockup:**
- Reduzir `max-w-[340px]` → `max-w-[300px] sm:max-w-[360px] lg:max-w-[380px]` para não dominar mobile.
- A altura interna do chat `h-[320px]` → `h-[280px] sm:h-[320px]`.

**SegmentNav:**
- Já scroll horizontal, ok. Adicionar `text-[11px] sm:text-sm` nos pills e reduzir altura `h-8 sm:h-9`.

## 4. Form (`LeadForm`)

Verificar e garantir:
- Inputs `h-11` full-width.
- Botão submit `w-full` (provavelmente já é).
- Padding interno reduzido em mobile se necessário.

## O que NÃO muda

- Layout desktop (tudo via breakpoints `sm:`/`lg:`).
- Cores, tokens, conteúdo, copy.
- Animação do celular.
- Estrutura de rotas.

## Arquivos tocados

- `src/components/bu1lders/BuildersHeader.tsx`
- `src/components/bu1lders/NicheCard.tsx`
- `src/components/bu1lders/SegmentNav.tsx`
- `src/components/bu1lders/PhoneMockup.tsx`
- `src/components/bu1lders/LeadForm.tsx` (apenas se precisar ajuste)
- `src/routes/bu1lders.index.tsx`
- `src/routes/bu1lders.$slug.tsx`
- `src/routes/bu1lders.{restaurantes,beleza,pet,oficinas,odontologia,imobiliarias,academias,contabilidade,saude,varejo}.tsx` (apenas H1 + botões CTA do hero)
