# 🔐 Guia de Segurança para Submeter no Git

## ✅ Checklist Antes de Fazer Push

- [ ] `.gitignore` está configurado corretamente
- [ ] Não há arquivos `.json` com credenciais no repositório
- [ ] Arquivo `.env.local` está no `.gitignore`
- [ ] `.env.example` existe com template de variáveis
- [ ] `river-pillar-466211-v1-7e41cadb78f1.json` está ignorado
- [ ] Nenhuma chave privada aparece no histórico
- [ ] `node_modules/` está ignorado
- [ ] `.next/` e arquivos de build estão ignorados

## 🔑 Dados Sensíveis Protegidos

### Arquivos JSON
- `river-pillar-466211-v1-7e41cadb78f1.json` ✅ Ignorado
- Qualquer arquivo com credentials ✅ Ignorado

### Variáveis de Ambiente
- `GOOGLE_CLIENT_EMAIL` ✅ Em `.env.local`
- `GOOGLE_PRIVATE_KEY` ✅ Em `.env.local`
- `GOOGLE_SHEET_ID` ✅ Em `.env.local`
- `GOOGLE_SHEETS_API_KEY` ✅ Em `.env.local`

## 📋 Como Configurar Localmente

### 1. Clone o repositório
```bash
git clone <seu_repositorio>
cd cogni
```

### 2. Crie o arquivo `.env.local`
```bash
cp .env.example .env.local
```

### 3. Preencha as variáveis sensíveis
Edite `.env.local` com suas credenciais reais:
- Copie o conteúdo de `river-pillar-466211-v1-7e41cadb78f1.json`
- Preencha `GOOGLE_SHEET_ID`, `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`

### 4. Instale dependências
```bash
npm install
# ou
chmod +x install-deps.sh
./install-deps.sh
```

### 5. Execute o projeto
```bash
npm run dev
```

## 🚫 O Que NÃO Fazer

❌ Nunca commitar arquivos com credenciais
❌ Nunca fazer push de `node_modules/`
❌ Nunca incluir `.env` ou `.env.local`
❌ Nunca expor IDs do Google Cloud
❌ Nunca compartilhar chaves privadas em comentários

## ✨ O Que Será Ignorado Automaticamente

- `.env*` (todos os arquivos de ambiente)
- `node_modules/` (dependências)
- `.next/` (build do Next.js)
- `*.json` (exceto configurações necessárias)
- `coverage/` (testes)
- `.vscode/`, `.idea/` (IDEs)
- `*.log` (logs)
- `.DS_Store` (arquivos do macOS)

## 🔍 Verificar se Tudo Está OK

```bash
# Ver arquivos que serão commitados
git status

# Ver arquivos ignorados
git status --ignored

# Verificar se há credenciais expostas
git grep -i "GOOGLE_PRIVATE_KEY" -- ':!.env.example'
```

## 📚 Referências

- [Git Ignore Documentation](https://git-scm.com/docs/gitignore)
- [GitHub Secret Scanning](https://docs.github.com/pt/code-security/secret-scanning)
- [Google Cloud Security Best Practices](https://cloud.google.com/docs/authentication/best-practices)

---

**Última atualização:** 2025-10-31
**Status:** ✅ Segurança Configurada
