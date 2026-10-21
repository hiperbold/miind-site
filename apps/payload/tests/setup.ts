import fs from 'fs'
import path from 'path'

// Carrega o .env do app (DATABASE_URI, PAYLOAD_SECRET) para os testes de integração.
const arquivo = path.resolve(__dirname, '../.env')
if (fs.existsSync(arquivo)) process.loadEnvFile(arquivo)

// Nenhum teste fala com o webhook real do n8n: a URL do .env é descartada.
// Os testes de envio sobem um servidor falso local e passam a URL dele.
delete process.env.N8N_WEBHOOK_URL
