#!/bin/bash

# 🔐 Script de verificação de segurança antes de fazer push
# Este script verifica se há dados sensíveis no commit

echo "🔍 Verificando dados sensíveis..."
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0

# 1. Verificar se há arquivos JSON sensíveis
echo "📋 Verificando arquivos JSON..."
if git diff --cached --name-only | grep -E "\.json$" | grep -v "tsconfig\|eslint\|next\.config\|postcss"; then
    echo -e "${RED}❌ Encontrados arquivos JSON que não deveriam estar sendo commitados!${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✅ Nenhum arquivo JSON sensível encontrado${NC}"
fi

# 2. Verificar se há variáveis de ambiente
echo ""
echo "🔑 Verificando variáveis de ambiente..."
if git diff --cached | grep -i "GOOGLE_PRIVATE_KEY\|GOOGLE_CLIENT_EMAIL\|\.env"; then
    echo -e "${RED}❌ Encontradas variáveis de ambiente sensíveis no commit!${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✅ Nenhuma variável de ambiente sensível encontrada${NC}"
fi

# 3. Verificar se node_modules está sendo commitado
echo ""
echo "📦 Verificando node_modules..."
if git diff --cached --name-only | grep "^node_modules"; then
    echo -e "${RED}❌ node_modules está sendo commitado!${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✅ node_modules não está no commit${NC}"
fi

# 4. Verificar credenciais do Google Cloud
echo ""
echo "🔒 Verificando credenciais do Google Cloud..."
if git diff --cached | grep -i "river-pillar\|service_account\|private_key"; then
    echo -e "${RED}❌ Encontradas credenciais do Google Cloud!${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✅ Nenhuma credencial do Google Cloud encontrada${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ Tudo pronto! Você pode fazer push com segurança.${NC}"
    exit 0
else
    echo -e "${RED}❌ Encontrados $ERRORS problema(s) de segurança!${NC}"
    echo ""
    echo "Para resolver:"
    echo "1. Execute: git reset HEAD <arquivo>"
    echo "2. Adicione o arquivo ao .gitignore"
    echo "3. Execute: git add .gitignore && git commit --amend"
    exit 1
fi
