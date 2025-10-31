# 🚀 COGNI - FORMULÁRIO GOOGLE SHEETS

## ✅ CONFIGURAÇÃO IMPLEMENTADA

### 🔧 **DEPENDÊNCIAS INSTALADAS:**
```bash
npm install googleapis
```

### 🔑 **CONFIGURAÇÃO DE PERMISSÕES:**

**1. COMPARTILHAR A PLANILHA:**
- Abra: https://docs.google.com/spreadsheets/d/1SElgRKbmd1saNYkush6pnqHpmnwZSGqvPeobRAbAalk
- Clique em "Compartilhar" (canto superior direito)
- Adicione o email: `cogni-804@river-pillar-466211-v1.iam.gserviceaccount.com`
- Permissão: **Editor**
- Clique em "Enviar"

**2. VERIFICAR ABA:**
- Certifique-se que existe uma aba chamada "cogni" (exatamente assim, minúsculo)
- Se não existir, crie uma nova aba com esse nome

### 🧪 **TESTANDO A CONEXÃO:**

```bash
# 1. Instalar dependências
chmod +x install-deps.sh
./install-deps.sh

# 2. Executar o projeto
npm run dev

# 3. Testar conexão
# Acesse: http://localhost:3000/api/test-sheets

# 4. Testar formulário completo
# Acesse: http://localhost:3000
```

### 📊 **ESTRUTURA DOS DADOS:**

A planilha receberá as seguintes colunas:
1. Timestamp
2. Nome
3. Email
4. WhatsApp
5. Tempo na Valor
6. Conquista
7. Domínio
8. Clientes Querem
9. Diferencial
10. Cliente Não Quer
11. Conforto Vídeo
12. Conforto Stories
13. Conforto Posts
14. Preferência Conteúdo
15. Horas Semana
16. Assessor Que
17. Observações
18. Plano Assinatura

### 🔥 **STATUS:**
- ✅ Service Account configurado
- ✅ Credenciais no .env.local
- ✅ API de teste criada
- ✅ API de submissão atualizada
- ✅ Validações implementadas
- ⏳ **AGUARDANDO: Permissões da planilha**

### 🚨 **PRÓXIMOS PASSOS:**
1. Execute `./install-deps.sh`
2. Compartilhe a planilha com o service account
3. Teste em `/api/test-sheets`
4. Se funcionou, teste o formulário completo!