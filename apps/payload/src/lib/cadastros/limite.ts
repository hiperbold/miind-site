// Limites de envio em memória (um processo). Reiniciam com o servidor; servem
// para conter repetição e robôs simples, não substituem um WAF.

export class LimitePorChave {
  private registros = new Map<string, number[]>()

  constructor(
    private readonly maximo: number,
    private readonly janelaMs: number,
    // teto de chaves guardadas: acima dele, descarta as mais antigas
    private readonly maxChaves = 10000,
  ) {}

  // true: pode seguir (e conta a tentativa); false: passou do limite.
  permitir(chave: string, agoraMs = Date.now()): boolean {
    const inicio = agoraMs - this.janelaMs
    const anteriores = (this.registros.get(chave) ?? []).filter((t) => t > inicio)
    // reinsere no fim: a ordem do Map fica da chave menos para a mais recente
    this.registros.delete(chave)
    if (anteriores.length >= this.maximo) {
      this.registros.set(chave, anteriores)
      return false
    }
    anteriores.push(agoraMs)
    this.registros.set(chave, anteriores)
    while (this.registros.size > this.maxChaves) {
      const maisAntiga = this.registros.keys().next().value
      if (maisAntiga === undefined) break
      this.registros.delete(maisAntiga)
    }
    return true
  }

  get tamanho() {
    return this.registros.size
  }

  zerar() {
    this.registros.clear()
  }
}

// Contador de envios aceitos no processo inteiro (todas as origens).
export class LimiteGlobal {
  private tempos: number[] = []

  constructor(
    private readonly maximo: number,
    private readonly janelaMs: number,
  ) {}

  podeAceitar(agoraMs = Date.now()): boolean {
    const inicio = agoraMs - this.janelaMs
    this.tempos = this.tempos.filter((t) => t > inicio)
    return this.tempos.length < this.maximo
  }

  registrar(agoraMs = Date.now()) {
    this.tempos.push(agoraMs)
  }

  zerar() {
    this.tempos = []
  }
}

const DEZ_MINUTOS = 10 * 60 * 1000

function inteiroDoAmbiente(nome: string, padrao: number): number {
  const v = Number(process.env[nome])
  return Number.isInteger(v) && v > 0 ? v : padrao
}

// 5 envios por IP a cada 10 minutos (conta todo pedido, inclusive inválido ou honeypot).
export const limiteEnvios = new LimitePorChave(5, DEZ_MINUTOS)

// Envios aceitos (gravados) por processo a cada 10 minutos. FORM_LIMITE_GLOBAL muda o teto (padrão 60).
export const limiteGlobal = new LimiteGlobal(inteiroDoAmbiente('FORM_LIMITE_GLOBAL', 60), DEZ_MINUTOS)
