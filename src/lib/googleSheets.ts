import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

export interface FormData {
  nome: string;
  email: string;
  whatsapp: string;
  tempo_valor: string;
  conquista: string;
  dominio: string;
  clientes_querem: string;
  diferencial: string;
  cliente_nao_quer: string;
  conforto_video: string;
  conforto_stories: string;
  conforto_posts: string;
  preferencia_conteudo: string;
  horas_semana: string;
  assessor_que: string;
  observacoes?: string;
  plano_assinatura: string;
}

export class GoogleSheetsService {
  private sheets: any;
  private auth: any;
  private spreadsheetId: string;
  private sheetName: string;

  constructor() {
    if (!process.env.GOOGLE_SHEET_ID) {
      throw new Error('GOOGLE_SHEET_ID não está configurado');
    }

    let credentials: any;
    
    // Tentar ler do arquivo JSON
    try {
      const jsonPath = path.join(process.cwd(), 'river-pillar-466211-v1-7e41cadb78f1.json');
      if (fs.existsSync(jsonPath)) {
        const fileContent = fs.readFileSync(jsonPath, 'utf-8');
        credentials = JSON.parse(fileContent);
      } else if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
        credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
      } else {
        throw new Error('Credenciais não encontradas');
      }
    } catch (e) {
      throw new Error('Erro ao carregar credenciais: ' + (e as Error).message);
    }

    this.spreadsheetId = process.env.GOOGLE_SHEET_ID;
    this.sheetName = process.env.GOOGLE_SHEET_NAME || 'cogni';
    
    this.auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    
    this.sheets = google.sheets({
      version: 'v4',
      auth: this.auth,
    });
  }

  async setupHeaders() {
    const headers = [
      'Data/Hora',
      'Nome',
      'Email', 
      'WhatsApp',
      'Tempo na Valor',
      'Maior Conquista',
      'Domínio de Conhecimento',
      'Clientes me procuram para',
      'Diferencial',
      'Cliente que NÃO quer',
      'Conforto - Vídeo',
      'Conforto - Stories',
      'Conforto - Posts',
      'Preferência Conteúdo',
      'Horas por Semana',
      'O Assessor que...',
      'Observações',
      'Plano Escolhido'
    ];

    try {
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `${this.sheetName}!A1:R1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [headers]
        }
      });
      
      return { success: true, message: 'Cabeçalhos configurados com sucesso!' };
    } catch (error) {
      console.error('Erro ao configurar cabeçalhos:', error);
      return { success: false, error: 'Erro ao configurar cabeçalhos' };
    }
  }

  async addFormData(formData: FormData) {
    const timestamp = new Date().toLocaleString('pt-BR');
    
    const row = [
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

    try {
      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `${this.sheetName}!A:R`,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [row]
        }
      });

      return { success: true, message: 'Dados salvos com sucesso!' };
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      return { success: false, error: 'Erro ao salvar dados na planilha' };
    }
  }

  async testConnection() {
    try {
      const response = await this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId
      });
      
      return { 
        success: true, 
        title: response.data.properties?.title,
        sheets: response.data.sheets?.map((sheet: any) => sheet.properties?.title)
      };
    } catch (error) {
      console.error('Erro ao testar conexão:', error);
      return { success: false, error: 'Erro na conexão com Google Sheets' };
    }
  }
}
