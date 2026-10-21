import { z } from 'zod'

import type { ConfigCadastro, ConfigContato, ConfigFormulario } from './formularios'
import { CAMPOS_OCULTOS, TAMANHO_MAXIMO_PARAMETRO, type CampoOculto } from './parametros'

// Regras do servidor, as mesmas do formulário no navegador (LeadForm e
// FormularioContato), mais limite de tamanho em todo campo.

export const TAMANHO_MAXIMO_CORPO = 32 * 1024
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const valorCampo = z.union([z.string().max(2000), z.array(z.string().max(200)).max(30)])

// Corpo enviado pelo navegador: formulario, pagina e os campos do FormData.
// ip e user_agent nunca são lidos daqui.
export const esquemaCorpo = z.object({
  formulario: z.string().min(1).max(100),
  pagina: z.string().min(1).max(100),
  campos: z
    .record(z.string().max(64), valorCampo)
    .refine((c) => Object.keys(c).length <= 80, 'campos demais'),
})

export type CorpoEnvio = z.infer<typeof esquemaCorpo>

export type Ocultos = Record<CampoOculto, string | null>

export type DadosCadastro = {
  nome: string
  email: string
  whatsapp: string
  cidade_uf: string | null
  perfil: string | null
  segmento: string | null
  empresas_atendidas: string | null
  clientes_atendidos: string | null
  segmentos: string[]
  uso: string | null
  extras: Record<string, string | string[]>
  contato: { empresa: string; cargo: string; volume: string; desafio: string } | null
  consentimento: { aceito: boolean; texto: string | null }
  ocultos: Ocultos
}

export type ResultadoValidacao =
  | { ok: true; dados: DadosCadastro }
  | { ok: false; erros: Record<string, string>; honeypot?: boolean }

const um = (v: unknown): string => (Array.isArray(v) ? String(v[0] ?? '') : typeof v === 'string' ? v : '').trim()
const varios = (v: unknown): string[] =>
  (Array.isArray(v) ? v : typeof v === 'string' && v ? [v] : []).map((x) => String(x).trim()).filter(Boolean)
const vazioParaNull = (v: string) => (v ? v : null)

function lerOcultos(campos: Record<string, unknown>): Ocultos {
  const saida = {} as Ocultos
  for (const nome of CAMPOS_OCULTOS) {
    const max = nome === 'origem' ? 2000 : TAMANHO_MAXIMO_PARAMETRO
    saida[nome] = vazioParaNull(um(campos[nome]).slice(0, max))
  }
  return saida
}

function texto(min: number, max: number, mensagem: string) {
  return z.string().trim().min(min, mensagem).max(max, mensagem)
}

function errosDe(r: { success: boolean; error?: z.ZodError }): Record<string, string> {
  const erros: Record<string, string> = {}
  for (const issue of r.error?.issues ?? []) {
    const chave = String(issue.path[0] ?? '_')
    if (!erros[chave]) erros[chave] = issue.message
  }
  return erros
}

function validarCadastro(config: ConfigCadastro, campos: Record<string, unknown>): ResultadoValidacao {
  const opcao = (lista: string[], obrigatorio: boolean, mensagem: string) =>
    z
      .string()
      .max(200)
      .refine((v) => (v ? lista.length === 0 || lista.includes(v) : !obrigatorio), mensagem)

  const base = z.object({
    nome: texto(2, 100, 'Informe seu nome'),
    email: z
      .string()
      .trim()
      .max(255, 'E-mail inválido')
      .refine((v) => EMAIL_RE.test(v), 'E-mail inválido'),
    whatsapp: texto(8, 30, 'WhatsApp inválido'),
    cidade_uf: texto(2, 100, 'Cidade/UF obrigatória'),
    perfil: opcao(config.perfis, config.perfilObrigatorio, 'Selecione seu perfil'),
    segmento: z
      .string()
      .max(100)
      .refine(
        (v) => (config.segmentoFixo ? true : !v || config.segmentosPermitidos.includes(v)),
        'Segmento inválido',
      ),
    consent: z.literal('on', { error: 'Confirme o consentimento LGPD' }),
  })

  const r = base.safeParse({
    nome: um(campos.nome),
    email: um(campos.email),
    whatsapp: um(campos.whatsapp),
    cidade_uf: um(campos.cidade_uf),
    perfil: um(campos.perfil),
    segmento: um(campos.segmento),
    consent: um(campos.consent),
  })
  const erros = errosDe(r)

  const extras: Record<string, string | string[]> = {}
  for (const q of config.extras) {
    const valores = varios(campos[q.nome])
    const invalido = valores.some((v) => v.length > 200 || (q.opcoes.length > 0 && !q.opcoes.includes(v)))
    if (invalido || (q.tipo === 'unica' && valores.length > 1)) {
      erros[q.nome] = 'Opção inválida'
      continue
    }
    if (q.obrigatoria && valores.length === 0) {
      erros[q.nome] = q.tipo === 'multipla' ? 'Marque ao menos uma opção' : 'Selecione uma opção'
      continue
    }
    extras[q.nome] = q.tipo === 'multipla' ? valores : (valores[0] ?? '')
  }

  if (!r.success || Object.keys(erros).length > 0) return { ok: false, erros }
  const d = r.data
  const extraTexto = (nome: string) => {
    const v = extras[nome]
    return vazioParaNull(Array.isArray(v) ? v.join(', ') : (v ?? ''))
  }
  const segs = extras.segmentos
  return {
    ok: true,
    dados: {
      nome: d.nome,
      email: d.email,
      whatsapp: d.whatsapp,
      cidade_uf: d.cidade_uf,
      perfil: vazioParaNull(d.perfil),
      segmento: config.segmentoFixo ?? vazioParaNull(d.segmento),
      empresas_atendidas: extraTexto('empresas_atendidas'),
      clientes_atendidos: extraTexto('clientes_atendidos'),
      segmentos: Array.isArray(segs) ? segs : segs ? [segs] : [],
      uso: extraTexto('uso'),
      extras,
      contato: null,
      consentimento: { aceito: true, texto: config.textoConsentimento },
      ocultos: lerOcultos(campos),
    },
  }
}

function validarContato(config: ConfigContato, campos: Record<string, unknown>): ResultadoValidacao {
  const esquema = z.object({
    name: texto(2, 100, 'Informe seu nome'),
    company: texto(2, 100, 'Informe a empresa'),
    role: texto(2, 100, 'Informe seu cargo'),
    email: z
      .string()
      .trim()
      .max(255, 'E-mail inválido')
      .refine((v) => EMAIL_RE.test(v), 'E-mail inválido'),
    phone: texto(8, 30, 'Telefone inválido'),
    volume: z
      .string()
      .max(100)
      .refine((v) => !!v && (config.volumes.length === 0 || config.volumes.includes(v)), 'Selecione uma opção'),
    challenge: texto(10, 1000, 'Descreva o desafio'),
  })
  const r = esquema.safeParse(
    Object.fromEntries(['name', 'company', 'role', 'email', 'phone', 'volume', 'challenge'].map((k) => [k, um(campos[k])])),
  )
  if (!r.success) return { ok: false, erros: errosDe(r) }
  const d = r.data
  return {
    ok: true,
    dados: {
      nome: d.name,
      email: d.email,
      whatsapp: d.phone,
      cidade_uf: null,
      perfil: null,
      segmento: null,
      empresas_atendidas: null,
      clientes_atendidos: null,
      segmentos: [],
      uso: null,
      extras: {},
      contato: { empresa: d.company, cargo: d.role, volume: d.volume, desafio: d.challenge },
      // o formulário de contato da homepage não tem caixa de consentimento
      consentimento: { aceito: false, texto: null },
      ocultos: lerOcultos(campos),
    },
  }
}

export function validarEnvio(config: ConfigFormulario, campos: Record<string, unknown>): ResultadoValidacao {
  // Honeypot: campo invisível preenchido = robô. Nada é gravado.
  if (um(campos.website)) return { ok: false, erros: { _: 'Não foi possível enviar.' }, honeypot: true }
  return config.tipo === 'contato-plataforma' ? validarContato(config, campos) : validarCadastro(config, campos)
}
