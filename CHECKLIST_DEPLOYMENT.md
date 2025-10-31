# ✅ Checklist de Deployment - Vercel

Use este checklist para garantir que tudo está configurado corretamente.

---

## 📋 PRÉ-DEPLOYMENT (Local)

- [ ] Código foi atualizado
  - [ ] `src/app/api/submit-form/route.ts` - Novo parser JSON
  - [ ] `src/lib/googleSheets.ts` - Suporte JSON
  
- [ ] Scripts foram criados
  - [ ] `setup-vercel-env.sh` - Existe e é executável
  
- [ ] Documentação foi criada
  - [ ] `RESOLVER_ERRO_OPENSSL.md`
  - [ ] `QUICK_START_VERCEL.md`
  - [ ] `RESUMO_SOLUCAO.md`

- [ ] Testes locais (opcional mas recomendado)
  ```bash
  # Crie .env.local
  echo "GOOGLE_SERVICE_ACCOUNT_JSON=$(cat river-pillar-466211-v1-7e41cadb78f1.json)" > .env.local
  
  # Rode localmente
  npm run dev
  
  # Teste o formulário
  ```

---

## 🌐 CONFIGURAÇÃO VERCEL

### Passo 1: Login
- [ ] Abra terminal
- [ ] Execute: `vercel login`
- [ ] Autentique-se com sua conta Vercel

### Passo 2: Copiar JSON
- [ ] Execute: `bash setup-vercel-env.sh`
- [ ] JSON foi copiado para clipboard
- [ ] Confirme a amostra do JSON exibida

### Passo 3: Adicionar Variáveis (Opção A - CLI)

#### OPÇÃO A1: Via CLI (Recomendado)
- [ ] Execute: `vercel env add GOOGLE_SERVICE_ACCOUNT_JSON`
- [ ] Cole o JSON quando solicitado (Cmd+V)
- [ ] Confirme que foi aceito
- [ ] ✅ Variável adicionada

#### OPÇÃO A2: Via Dashboard (Se preferir)
1. [ ] Acesse: https://vercel.com/dashboard
2. [ ] Selecione seu projeto `cognif`
3. [ ] Vá para: Settings → Environment Variables
4. [ ] Clique em: **Add New**
5. [ ] Preencha:
   - **Key:** `GOOGLE_SERVICE_ACCOUNT_JSON`
   - **Value:** Cole o JSON completo
   - **Environments:** ☑️ Production ☑️ Preview ☑️ Development
6. [ ] Clique em: **Save**

### Passo 4: Variáveis Adicionais
- [ ] Confirme que tem: `GOOGLE_SHEET_ID`
  - Se não tiver: `vercel env add GOOGLE_SHEET_ID`
  - Valor: seu Sheet ID (encontre na URL)
  
- [ ] Confirme que tem: `GOOGLE_SHEET_NAME`
  - Se não tiver: `vercel env add GOOGLE_SHEET_NAME`
  - Valor: `cogni`

### Passo 5: Verificar Configuração
- [ ] Execute: `vercel env ls`
- [ ] Aparecem as 3 variáveis? ✅
  ```
  GOOGLE_SERVICE_ACCOUNT_JSON (Production, Preview, Development)
  GOOGLE_SHEET_ID (Production, Preview, Development)
  GOOGLE_SHEET_NAME (Production, Preview, Development)
  ```

---

## 🚀 DEPLOY

### Deploy em Produção
- [ ] Execute: `vercel deploy --prod`
- [ ] Deploy iniciado
- [ ] Aguarde conclusão (2-5 minutos)
- [ ] Copie a URL da produção
- [ ] ✅ Deploy concluído

### Verificar Deploy
- [ ] Acesse: https://cognif.vercel.app
- [ ] Página carrega normalmente
- [ ] Sem erros de console
- [ ] ✅ Tudo OK

---

## ✅ PÓS-DEPLOYMENT (Testes)

### Teste 1: Verificar Logs
- [ ] Execute: `vercel logs cognif.vercel.app`
- [ ] Vê logs recentes?
- [ ] Sem erros aparentes?
- [ ] ✅ Logs OK

### Teste 2: Testar Formulário em Produção
- [ ] Acesse: https://cognif.vercel.app
- [ ] Preencha o formulário com dados de teste
- [ ] Clique em submeter
- [ ] Observe a resposta:
  - ✅ **Sucesso:** "Formulário enviado com sucesso!"
  - ❌ **Erro:** Veja próximo passo

### Teste 3: Verificar Google Sheets
- [ ] Abra sua planilha no Google Sheets
- [ ] Vá para a aba `cogni`
- [ ] Vê a nova linha de dados? ✅
- [ ] Dados estão corretos? ✅

### Teste 4: Logs de Debug (Se tiver erro)
- [ ] Execute: `vercel logs --follow`
- [ ] Procure por: `❌ Erro ao processar`
- [ ] Leia a mensagem de erro completa
- [ ] Se não entender, consulte `RESOLVER_ERRO_OPENSSL.md`

---

## 🆘 SE TIVER ERRO

### Erro: `ERR_OSSL_UNSUPPORTED` Persiste

1. [ ] Verifique variáveis: `vercel env ls`
2. [ ] Confirme que `GOOGLE_SERVICE_ACCOUNT_JSON` existe
3. [ ] Se não existir, adicione manualmente:
   ```bash
   vercel env add GOOGLE_SERVICE_ACCOUNT_JSON
   # Cole novamente o JSON
   ```
4. [ ] Faça novo deploy: `vercel deploy --prod`
5. [ ] Aguarde 60 segundos
6. [ ] Teste novamente

### Erro: `Invalid JSON`

1. [ ] Copie novamente o arquivo JSON
2. [ ] Garanta que NÃO tem caracteres extras
3. [ ] Remova a variável antiga: via Dashboard
4. [ ] Adicione novamente com novo JSON

### Erro: `Sheet not found`

1. [ ] Verifique `GOOGLE_SHEET_ID` está correto
2. [ ] Copie o ID direto da URL:
   - https://docs.google.com/spreadsheets/d/**{SHEET_ID}**/edit
3. [ ] Atualize a variável: `vercel env add GOOGLE_SHEET_ID`
4. [ ] Faça novo deploy

### Erro: Outro erro

1. [ ] Leia os logs: `vercel logs --follow`
2. [ ] Procure por mensagens de erro específicas
3. [ ] Consulte `RESOLVER_ERRO_OPENSSL.md` seção Troubleshooting
4. [ ] Se não resolver, revise a configuração completa

---

## 📊 VERIFICAÇÃO FINAL

Antes de considerar resolvido:

- [ ] ✅ Formulário carrega em https://cognif.vercel.app
- [ ] ✅ Submissão retorna sucesso (HTTP 200)
- [ ] ✅ Dados aparecem na Google Sheets em tempo real
- [ ] ✅ Sem erros de console (F12)
- [ ] ✅ Logs mostram: "✅ Dados salvos com sucesso"
- [ ] ✅ Testou com múltiplos formulários

---

## 🎉 SUCESSO!

Se todos os itens acima estão marcados, o problema foi resolvido!

### Próximos passos (Opcional)
- [ ] Testar com dados reais
- [ ] Configurar monitoramento
- [ ] Revisar logs regularmente
- [ ] Fazer backup regular da Sheets

---

## 📝 Notas

- **Tempo esperado:** 5-10 minutos para resolução completa
- **Primeira tentativa:** 80% de chance de sucesso
- **Se não funcionar:** Leia documentação detalhada
- **Suporte:** Arquivos de documentação estão em português

---

**Boa sorte! 🚀**
