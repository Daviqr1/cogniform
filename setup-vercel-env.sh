#!/bin/bash

# Script para configurar variáveis de ambiente na Vercel
# Este script lê o arquivo JSON do Google Service Account e o codifica como variável de ambiente

echo "🔧 Configurando variáveis de ambiente na Vercel..."
echo ""

# Verificar se o arquivo JSON existe
if [ ! -f "river-pillar-466211-v1-7e41cadb78f1.json" ]; then
    echo "❌ Erro: Arquivo 'river-pillar-466211-v1-7e41cadb78f1.json' não encontrado!"
    echo "Certifique-se de estar na raiz do projeto."
    exit 1
fi

# Ler o arquivo JSON e armazená-lo em uma variável (sem quebras de linha)
SERVICE_ACCOUNT_JSON=$(cat river-pillar-466211-v1-7e41cadb78f1.json | tr -d '\n' | tr -d '\r')

echo "✅ Arquivo JSON lido com sucesso"
echo ""
echo "Próximas opções para configurar as variáveis de ambiente:"
echo ""
echo "OPÇÃO 1️⃣  - Usar o CLI da Vercel (recomendado):"
echo "   Execute este comando para definir a variável:"
echo ""
echo "   vercel env add GOOGLE_SERVICE_ACCOUNT_JSON"
echo ""
echo "   Depois cole este conteúdo JSON (será copiado para o clipboard):"
echo ""

# Copiar para clipboard no macOS
if command -v pbcopy &> /dev/null; then
    echo "$SERVICE_ACCOUNT_JSON" | pbcopy
    echo "✅ JSON copiado para o clipboard! (Cmd+V para colar)"
    echo ""
    # Mostrar uma amostra do JSON
    echo "Amostra do conteúdo:"
    cat river-pillar-466211-v1-7e41cadb78f1.json | head -3
    echo "..."
else
    # Linux ou outros sistemas
    echo "$SERVICE_ACCOUNT_JSON" | xclip -selection clipboard 2>/dev/null || true
    echo "📋 Aqui está o JSON para colar no Vercel:"
    echo "$SERVICE_ACCOUNT_JSON"
fi

echo ""
echo "OPÇÃO 2️⃣  - Extrair variáveis individuais (se preferir):"
echo ""
echo "   vercel env add GOOGLE_CLIENT_EMAIL"
echo "   $(cat river-pillar-466211-v1-7e41cadb78f1.json | grep -o '"client_email":"[^"]*' | cut -d'"' -f4)"
echo ""
echo "   vercel env add GOOGLE_SHEET_ID"
echo "   {seu_sheet_id}"
echo ""
echo "   vercel env add GOOGLE_SHEET_NAME"
echo "   cogni"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "ℹ️  Instruções para a Vercel:"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "1. Faça login na Vercel:"
echo "   vercel login"
echo ""
echo "2. Vá para o dashboard do seu projeto:"
echo "   vercel"
echo ""
echo "3. Ou acesse: https://vercel.com/dashboard"
echo ""
echo "4. Settings → Environment Variables"
echo ""
echo "5. Adicione a variável GOOGLE_SERVICE_ACCOUNT_JSON com o JSON completo"
echo ""
echo "✨ Após configurar, faça deploy novamente:"
echo "   vercel deploy --prod"
echo ""
