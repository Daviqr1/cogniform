# 🚀 Configuração Local do Projeto

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Uma conta do Google Cloud com credenciais de Service Account

## 🔧 Passos de Configuração

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/Daviqr1/cogniform.git
cd cogni
```

### 2️⃣ Crie o arquivo `.env.local`
```bash
cp .env.example .env.local
```

### 3️⃣ Configure as Variáveis de Ambiente

Edite `.env.local` e preencha:

```env
# ID da sua planilha Google Sheets
GOOGLE_SHEET_ID=seu_sheet_id_aqui

# Nome da aba (padrão: cogni)
GOOGLE_SHEET_NAME=cogni

# Email do Service Account (do arquivo JSON)
GOOGLE_CLIENT_EMAIL=seu_service_account@river-pillar-xxxxx.iam.gserviceaccount.com

# Chave privada (do arquivo JSON, com \n preservado)
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# (Opcional) Chave de API do Google
GOOGLE_SHEETS_API_KEY=sua_api_key
```

### 4️⃣ Instale as Dependências
```bash
npm install
# ou
chmod +x install-deps.sh
./install-deps.sh
```

### 5️⃣ Execute o Projeto
```bash
npm run dev
```

Acesse: http://localhost:3000

## 🧪 Testando a Conexão com Google Sheets

```bash
# Teste a conexão com a API
curl http://localhost:3000/api/test-sheets
```

## 📝 Notas Importantes

⚠️ **NUNCA commite o arquivo `.env.local`** - Ele contém dados sensíveis!

✅ O `.gitignore` já protege automaticamente:
- `.env.local`
- `node_modules/`
- `.next/` (build)
- Arquivos `.json` com credenciais

## 🔐 Segurança

Antes de fazer push:
```bash
bash scripts/pre-push-check.sh
```

## 🐛 Troubleshooting

### Erro: "Credenciais inválidas"
- Verifique se `GOOGLE_CLIENT_EMAIL` está correto
- Verifique se a planilha foi compartilhada com o email do Service Account

### Erro: "Sheet not found"
- Certifique-se que a aba "cogni" existe na planilha
- Verifique se `GOOGLE_SHEET_NAME` está correto

### Erro: "Private key is invalid"
- Copie exatamente a chave privada do arquivo JSON
- Mantenha as quebras de linha (`\n`) corretamente

## 📚 Referências

- [Google Sheets API](https://developers.google.com/sheets/api)
- [Service Account Setup](https://cloud.google.com/docs/authentication/provide-credentials-adc)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
