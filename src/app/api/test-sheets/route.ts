import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
  try {
    // Verificar variáveis de ambiente
    const sheetId = process.env.GOOGLE_SHEET_ID;
    const sheetName = process.env.GOOGLE_SHEET_NAME;
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!sheetId || !sheetName || !clientEmail || !privateKey) {
      return NextResponse.json({
        success: false,
        error: 'Variáveis de ambiente não configuradas',
        config: {
          hasSheetId: !!sheetId,
          hasSheetName: !!sheetName,
          hasClientEmail: !!clientEmail,
          hasPrivateKey: !!privateKey
        }
      }, { status: 500 });
    }

    // Configurar autenticação
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Teste 1: Verificar se a planilha existe
    const sheetInfo = await sheets.spreadsheets.get({
      spreadsheetId: sheetId,
    });

    // Teste 2: Tentar ler dados existentes
    const readResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${sheetName}!A1:R10`,
    });

    // Teste 3: Verificar permissões criando cabeçalhos se necessário
    if (!readResponse.data.values || readResponse.data.values.length === 0) {
      const headers = [
        'Timestamp', 'Nome', 'Email', 'WhatsApp', 'Tempo na Valor',
        'Conquista', 'Domínio', 'Clientes Querem', 'Diferencial',
        'Cliente Não Quer', 'Conforto Vídeo', 'Conforto Stories',
        'Conforto Posts', 'Preferência Conteúdo', 'Horas Semana',
        'Assessor Que', 'Observações', 'Plano Assinatura'
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: `${sheetName}!A1:R1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [headers]
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Conexão com Google Sheets funcionando perfeitamente!',
      data: {
        spreadsheetTitle: sheetInfo.data.properties?.title,
        sheetName: sheetName,
        availableSheets: sheetInfo.data.sheets?.map(sheet => sheet.properties?.title),
        existingRows: readResponse.data.values?.length || 0,
        lastUpdate: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error('❌ Erro no teste:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Erro na conexão com Google Sheets',
      details: {
        message: error.message,
        code: error.code,
        status: error.status
      }
    }, { status: 500 });
  }
}
