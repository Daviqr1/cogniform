# ⚡ QUICK START - Resolver Erro OpenSSL na Vercel

## 🔴 Problema
```
Error: error:1E08010C:DECODER routines::unsupported
POST /api/submit-form → 500
```

## ✅ Solução em 3 Passos

### 1️⃣ Copiar o JSON
```bash
# Copie o arquivo JSON para a Vercel
cat river-pillar-466211-v1-7e41cadb78f1.json
```

### 2️⃣ Adicionar na Vercel (CLI)
```bash
# Login
vercel login

# Adicionar variável (JSON completo)
vercel env add GOOGLE_SERVICE_ACCOUNT_JSON

# Cole todo o conteúdo do JSON quando solicitado
# (use Cmd+V no Mac ou Ctrl+V no Windows/Linux)
```

### 3️⃣ Fazer Deploy
```bash
vercel deploy --prod
```

---

## 🌐 Ou Usar Dashboard Web

1. Acesse: **https://vercel.com/dashboard**
2. Selecione seu projeto
3. Vá para **Settings → Environment Variables**
4. Clique em **Add New**
   - **Key:** `GOOGLE_SERVICE_ACCOUNT_JSON`
   - **Value:** Cole todo o JSON
   - **Environments:** Marque Production, Preview, Development
5. Clique em **Save**
6. Faça novo deploy

---

## ✨ Código Atualizado

O código foi atualizado para suportar:
- ✅ `GOOGLE_SERVICE_ACCOUNT_JSON` (recomendado)
- ✅ Fallback para variáveis individuais

Arquivos modificados:
- `src/app/api/submit-form/route.ts` - Novo parser JSON
- `src/lib/googleSheets.ts` - Suporte a JSON completo

---

## 🧪 Testar Localmente
```bash
# 1. Crie .env.local
echo 'GOOGLE_SERVICE_ACCOUNT_JSON='$(cat river-pillar-466211-v1-7e41cadb78f1.json) > .env.local
echo 'GOOGLE_SHEET_ID=seu_id' >> .env.local
echo 'GOOGLE_SHEET_NAME=cogni' >> .env.local

# 2. Execute
npm run dev

# 3. Teste em http://localhost:3000
```

---

## 📊 Verificar Logs
```bash
# Ver logs em tempo real
vercel logs --follow

# Ver últimos logs
vercel logs cognif.vercel.app
```

Procure por: ✅ `✅ Dados salvos com sucesso` 

---

## 🚨 Se Ainda Não Funcionar

1. **Verificar variáveis:**
   ```bash
   vercel env ls
   ```

2. **Verificar JSON:**
   ```bash
   # Validar JSON
   cat river-pillar-466211-v1-7e41cadb78f1.json | jq .
   ```

3. **Ler guia completo:**
   - `RESOLVER_ERRO_OPENSSL.md` - Todas as opções e troubleshooting

---

✅ **Pronto!** O erro deve ser resolvido em ~5-10 minutos.
