import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Validação básica
    if (!formData.nome || !formData.email) {
      return NextResponse.json({
        success: false,
        error: 'Nome e email são obrigatórios'
      }, { status: 400 });
    }

    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json({
        success: false,
        error: 'Email inválido'
      }, { status: 400 });
    }

    // Validação dos planos válidos
    const validPlanos = ['basic', 'silver', 'gold'];
    if (!validPlanos.includes(formData.plano_assinatura)) {
      return NextResponse.json({
        success: false,
        error: 'Plano de assinatura inválido'
      }, { status: 400 });
    }

    // Configurar Google Sheets - com suporte a múltiplos formatos
    let credentials: any;
    
    // Verificar se está usando JSON completo do service account
    if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
      try {
        credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
      } catch (e) {
        console.error('❌ Erro ao parsear JSON do service account:', e);
        return NextResponse.json({
          success: false,
          error: 'Configuração inválida do Google Service Account'
        }, { status: 500 });
      }
    } else {
      // Fallback para variáveis individuais com tratamento correto de escape
      const privateKey = process.env.GOOGLE_PRIVATE_KEY;
      if (!privateKey) {
        return NextResponse.json({
          success: false,
          error: 'GOOGLE_PRIVATE_KEY não configurada'
        }, { status: 500 });
      }
      
      credentials = {
        type: 'service_account',
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey.replace(/\\n/g, '\n').replace(/\\r/g, ''),
      };
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const sheetName = process.env.GOOGLE_SHEET_NAME;

    if (!spreadsheetId || !sheetName) {
      return NextResponse.json({
        success: false,
        error: 'Configuração da planilha incompleta'
      }, { status: 500 });
    }

    // Preparar dados para inserção
    const timestamp = new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo'
    });

    const rowData = [
      timestamp,
      formData.nome,
      formData.email,
      formData.whatsapp,
      formData.tempo_valor,
      formData.conquista,
      formData.dominio,
      formData.clientes_querem,
      formData.diferencial,
      formData.cliente_nao_quer,
      formData.conforto_video,
      formData.conforto_stories,
      formData.conforto_posts,
      formData.preferencia_conteudo,
      formData.horas_semana,
      formData.assessor_que,
      formData.observacoes || '',
      formData.plano_assinatura
    ];

    console.log('🔄 Salvando dados na planilha...');

    // Salvar na planilha
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:R`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData]
      },
    });

    console.log('✅ Dados salvos com sucesso:', {
      updatedRange: response.data.updates?.updatedRange,
      updatedRows: response.data.updates?.updatedRows
    });

    return NextResponse.json({
      success: true,
      message: 'Formulário enviado com sucesso!',
      data: {
        timestamp,
        nome: formData.nome,
        email: formData.email,
        plano: formData.plano_assinatura,
        updatedRange: response.data.updates?.updatedRange
      }
    });

  } catch (error: any) {
    console.error('❌ Erro ao processar formulário:', error);
    
    // Log detalhado do erro
    if (error.response?.data) {
      console.error('Detalhes do erro Google:', error.response.data);
    }
    
    return NextResponse.json({
      success: false,
      error: 'Erro ao salvar dados na planilha',
      details: error.message
    }, { status: 500 });
  }
}
