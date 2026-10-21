// Limite simples de envios por IP, em memória (um processo). Reinicia com o
// servidor; serve para conter repetição, não substitui um WAF.
export class LimitePorChave {
  private registros = new Map<string, number[]>()

  constructor(
    private readonly maximo: number,
    private readonly janelaMs: number,
  ) {}

  // true: pode seguir (e conta a tentativa); false: passou do limite.
  permitir(chave: string, agoraMs = Date.now()): boolean {
    const inicio = agoraMs - this.janelaMs
    const anteriores = (this.registros.get(chave) ?? []).filter((t) => t > inicio)
    if (anteriores.length >= this.maximo) {
      this.registros.set(chave, anteriores)
      return false
    }
    anteriores.push(agoraMs)
    this.registros.set(chave, anteriores)
    if (this.registros.size > 10000) this.limpar(agoraMs)
    return true
  }

  limpar(agoraMs = Date.now()) {
    const inicio = agoraMs - this.janelaMs
    for (const [chave, tempos] of this.registros) {
      const vivos = tempos.filter((t) => t > inicio)
      if (vivos.length === 0) this.registros.delete(chave)
      else this.registros.set(chave, vivos)
    }
  }

  zerar() {
    this.registros.clear()
  }
}

// 5 envios por IP a cada 10 minutos.
export const limiteEnvios = new LimitePorChave(5, 10 * 60 * 1000)
