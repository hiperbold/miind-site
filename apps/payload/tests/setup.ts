import fs from 'fs'
import path from 'path'

// Carrega o .env do app (DATABASE_URI, PAYLOAD_SECRET) para os testes de integração.
const arquivo = path.resolve(__dirname, '../.env')
if (fs.existsSync(arquivo)) process.loadEnvFile(arquivo)
