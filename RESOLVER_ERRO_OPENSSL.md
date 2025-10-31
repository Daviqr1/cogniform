# 🔧 Guia para Resolver Erro OpenSSL na Vercel

## ❌ Problema Identificado

```
Error: error:1E08010C:DECODER routines::unsupported
code: 'ERR_OSSL_UNSUPPORTED'
```

Este erro ocorre quando a **chave privada do Google Service Account não está sendo parseada corretamente** na Vercel.

### Por que acontece?

1. A chave privada contém quebras de linha (`\n`)
2. Ao passar como variável de ambiente em texto simples, os escapes podem ficar inconsistentes
3. OpenSSL não consegue decodificar a chave deformada
4. Resultado: erro ao tentar assinar JWTs para autenticação Google

---

## ✅ SOLUÇÃO 1: Usar JSON Completo (Recomendado)

Esta é a forma mais robusta e confiável.

### Passo 1: Preparar o arquivo
Você já tem `river-pillar-466211-v1-7e41cadb78f1.json` na raiz do projeto.

### Passo 2: Configurar na Vercel (via CLI)

```bash
# 1. Login na Vercel
vercel login

# 2. Execute o script de setup (automático)
bash setup-vercel-env.sh

# Ou manualmente:
# 3. Copie o conteúdo completo do arquivo JSON
cat river-pillar-466211-v1-7e41cadb78f1.json

# 4. Execute
vercel env add GOOGLE_SERVICE_ACCOUNT_JSON

# 5. Cole o JSON completo quando solicitado
```

### Passo 3: Verificar no Dashboard (Web)

1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto
3. Settings → Environment Variables
4. Adicione:
   - **Nome:** `GOOGLE_SERVICE_ACCOUNT_JSON`
   - **Valor:** Cole o JSON completo do arquivo
   - **Environments:** Production, Preview, Development

### Passo 4: Configurar as variáveis auxiliares
```bash
vercel env add GOOGLE_SHEET_ID
# Digite seu Sheet ID (ex: 1A2B3C4D5E6F7G8H9)

vercel env add GOOGLE_SHEET_NAME
# Digite: cogni
```

### Passo 5: Deploy
```bash
vercel deploy --prod
```

---

## ✅ SOLUÇÃO 2: Usar Variáveis Individuais (Se Solução 1 Falhar)

Se a solução 1 não funcionar, tente com variáveis separadas mas com formato correto.

### Passo 1: Extrair valores

```bash
# Client Email
cat river-pillar-466211-v1-7e41cadb78f1.json | grep client_email

# Private Key (com \n preservados)
cat river-pillar-466211-v1-7e41cadb78f1.json | grep private_key
```

### Passo 2: Configurar na Vercel

```bash
# 1. Email
vercel env add GOOGLE_CLIENT_EMAIL
# Cole: cogni-804@river-pillar-466211-v1.iam.gserviceaccount.com

# 2. ID da Sheet
vercel env add GOOGLE_SHEET_ID
# Cole seu Sheet ID

# 3. Nome da Sheet
vercel env add GOOGLE_SHEET_NAME
# Digite: cogni

# 4. Private Key - ⚠️ IMPORTANTE: incluir com \n literais
vercel env add GOOGLE_PRIVATE_KEY
# Cole a chave exatamente como está no arquivo JSON
```

### Passo 3: Deploy
```bash
vercel deploy --prod
```

---

## 🧪 Testar Localmente Primeiro

### Com JSON completo:

```bash
# 1. Crie um arquivo .env.local
cat > .env.local << 'EOF'
GOOGLE_SERVICE_ACCOUNT_JSON=$(cat river-pillar-466211-v1-7e41cadb78f1.json)
GOOGLE_SHEET_ID=seu_sheet_id
GOOGLE_SHEET_NAME=cogni
EOF

# 2. Execute localmente
npm run dev

# 3. Teste o formulário
curl -X POST http://localhost:3000/api/submit-form \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","email":"teste@example.com","plano_assinatura":"basic",...}'
```

---

## 📝 Verificação de Variáveis

Depois de configurar, verifique na Vercel:

```bash
# Ver todas as variáveis de ambiente configuradas
vercel env ls

# Deve aparecer algo como:
# GOOGLE_SERVICE_ACCOUNT_JSON (Production, Preview, Development)
# GOOGLE_SHEET_ID (Production, Preview, Development)
# GOOGLE_SHEET_NAME (Production, Preview, Development)
```

---

## 🚀 Após Resolver

1. **Fazer novo deploy:**
   ```bash
   vercel deploy --prod
   ```

2. **Esperar 30-60 segundos** para as variáveis serem aplicadas

3. **Testar o formulário** na URL de produção

4. **Verificar logs:**
   ```bash
   vercel logs cognif.vercel.app
   ```

---

## 🔍 Logs de Debug

Se ainda tiver erros, verifique o log com:

```bash
# Ver logs em tempo real
vercel logs --follow

# Ver últimos logs
vercel logs
```

Procure por:
- ✅ `✅ Dados salvos com sucesso` = Funcionando!
- ❌ `❌ Erro ao processar formulário` = Ainda tem problema

---

## 🛡️ Segurança

⚠️ **IMPORTANTE:**

1. **Nunca commite o arquivo JSON** no Git (já está no `.gitignore`)
2. **A chave privada é sensível** - não compartilhe em público
3. **Use variáveis de ambiente** da Vercel, não hardcode
4. **Revogue a chave** se achar que foi exposta:
   - Google Cloud Console → Service Accounts → Manage Keys → Delete

---

## ❌ Troubleshooting

| Erro | Causa | Solução |
|------|-------|---------|
| `ERR_OSSL_UNSUPPORTED` | Chave privada mal formatada | Usar JSON completo (Solução 1) |
| `GOOGLE_SERVICE_ACCOUNT_JSON not defined` | Variável não configurada | Adicionar via `vercel env add` |
| `Invalid JSON` | Espaços/quebras extras | Copiar arquivo inteiro sem edições |
| `Authentication failed` | Chave expirou | Gerar nova no Google Cloud Console |
| `Sheet not found` | GOOGLE_SHEET_ID incorreto | Verificar ID da planilha |

---

## 📞 Próximos Passos

1. Execute o script de setup:
   ```bash
   bash setup-vercel-env.sh
   ```

2. Siga as instruções na tela

3. Faça deploy:
   ```bash
   vercel deploy --prod
   ```

4. Teste o formulário em produção

Sucesso! 🎉
