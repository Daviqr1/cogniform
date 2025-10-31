import { google } from 'googleapis';

export interface FormData {
  // Etapa 1: Informações Básicas
  nome: string;
  email: string;
  whatsapp: string;
  tempo_valor: string;
  
  // Etapa 2: Perfil e Autoridade
  conquista: string;
  dominio: string;
  clientes_querem: string;
  diferencial: string;
  cliente_nao_quer: string;
  
  // Etapa 3: Zona de Conforto
  conforto_video: string;
  conforto_stories: string;
  conforto_posts: string;
  preferencia_conteudo: string;
  
  // Etapa 4: Visão de Futuro
  horas_semana: string;
  assessor_que: string;
  observacoes?: string;
  
  // Etapa 5: Plano
  plano_assinatura: string;
}

export class GoogleSheetsService {
  private sheets: any;
  private auth: any;
  private spreadsheetId: string;
  private sheetName: string;

  constructor() {
    this.spreadsheetId = process.env.GOOGLE_SHEET_ID!;
    this.sheetName = process.env.GOOGLE_SHEET_NAME!;
    
    // Configurar autenticação com Service Account
    this.auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      version: 'v4',
      auth: process.env.GOOGLE_SHEETS_API_KEY
    });
    
    this.spreadsheetId = process.env.GOOGLE_SHEET_ID;
    this.sheetName = process.env.GOOGLE_SHEET_NAME || 'cogni';
  }

  // Método para adicionar cabeçalhos na planilha (executar apenas uma vez)
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

  // Método para adicionar dados do formulário
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

  // Método para testar a conexão
  async testConnection() {
    try {
      const response = await this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId
      });
      
      return { 
        success: true, 
        title: response.data.properties?.title,
        sheets: response.data.sheets?.map(sheet => sheet.properties?.title)
      };
    } catch (error) {
      console.error('Erro ao testar conexão:', error);
      return { success: false, error: 'Erro na conexão com Google Sheets' };
    }
  }
}
