'use client';

import { useState } from 'react';

interface FormData {
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
  observacoes: string;
  plano_assinatura: string;
}

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    whatsapp: '',
    tempo_valor: '',
    conquista: '',
    dominio: '',
    clientes_querem: '',
    diferencial: '',
    cliente_nao_quer: '',
    conforto_video: '',
    conforto_stories: '',
    conforto_posts: '',
    preferencia_conteudo: '',
    horas_semana: '',
    assessor_que: '',
    observacoes: '',
    plano_assinatura: 'silver'
  });

  const totalSteps = 6;

  const formatWhatsApp = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length > 11) return digits.substring(0, 11);
    
    if (digits.length > 10) {
      return digits.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (digits.length > 5) {
      return digits.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (digits.length > 2) {
      return digits.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
    } else {
      return digits.replace(/^(\d*)/, '($1');
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    if (field === 'whatsapp') {
      value = formatWhatsApp(value);
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0:
        return !!(formData.nome?.trim() && formData.email?.trim() && formData.whatsapp?.trim());
      case 1:
        return !!(formData.conquista?.trim() && formData.dominio?.trim() && formData.clientes_querem?.trim() && 
                 formData.diferencial?.trim() && formData.cliente_nao_quer?.trim());
      case 2:
        return !!(formData.conforto_video && formData.conforto_stories && 
                 formData.conforto_posts && formData.preferencia_conteudo);
      case 3:
        return !!(formData.horas_semana && formData.assessor_que?.trim());
      case 4:
        return !!formData.plano_assinatura;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
    } else {
      alert('Por favor, preencha todos os campos obrigatórios antes de continuar.');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const submitForm = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        setCurrentStep(totalSteps - 1);
      } else {
        alert(result.error || 'Erro ao enviar formulário');
      }
    } catch (error) {
      alert('Erro de rede ao enviar formulário');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden border border-white/20">
        
        <div className="p-8 md:p-12 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 text-white text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-6">
              <img 
                src="/4.png" 
                alt="Cogni Club Logo" 
                className="w-24 h-24 mx-auto mb-4 rounded-2xl shadow-xl border-2 border-white/20"
              />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Mapeamento de Perfil Digital
            </h1>
            <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
              Construção estratégica de autoridade para assessores de investimento
            </p>
            
            {/* Progress Bar Elegante */}
            <div className="w-full max-w-md mx-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-blue-200">Progresso</span>
                <span className="text-sm text-blue-200">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 backdrop-blur-sm">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-indigo-500 h-3 rounded-full transition-all duration-700 ease-out shadow-lg"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-3">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                      i <= currentStep
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-white/20 text-blue-200'
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-10 max-w-3xl mx-auto">
          {/* Etapa 1: Informações Básicas */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Informações Básicas
                </h2>
                <p className="text-gray-600">
                  Vamos começar conhecendo você melhor
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="seuemail@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                    required
                  />
                </div>
                
              </div>
            </div>
          )}

          {/* Etapa 2: Perfil e Autoridade */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Perfil Profissional
                </h2>
                <p className="text-gray-600">
                  Conte-nos sobre sua experiência e especialidade
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Descreva sua trajetória e suas conquistas profissionais <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.conquista}
                    onChange={(e) => handleInputChange('conquista', e.target.value)}
                    rows={4}
                    placeholder="Descreva sua trajetória..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                    required
                  />
                </div>
                
                <div className="bg-slate-50 rounded-lg p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Qual seu domínio de conhecimento/especialidade? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.dominio}
                    onChange={(e) => handleInputChange('dominio', e.target.value)}
                    placeholder="Ex: Renda fixa, Fundos imobiliários, Ações, Previdência..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                    required
                  />
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    O que você mais gosta de ensinar? Ex: planejamento, renda variável... <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.clientes_querem}
                    onChange={(e) => handleInputChange('clientes_querem', e.target.value)}
                    rows={3}
                    placeholder="Ex: planejamento, renda variável, fundos imobiliários..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                    required
                  />
                </div>
                
                <div className="bg-purple-50 rounded-lg p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Qual seu principal diferencial como assessor? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.diferencial}
                    onChange={(e) => handleInputChange('diferencial', e.target.value)}
                    rows={3}
                    placeholder="O que te diferencia dos outros assessores do mercado..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                    required
                  />
                </div>
                
                <div className="bg-orange-50 rounded-lg p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Que tipo de cliente você NÃO quer atrair? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.cliente_nao_quer}
                    onChange={(e) => handleInputChange('cliente_nao_quer', e.target.value)}
                    rows={3}
                    placeholder="Perfil de cliente que não combina com seu atendimento..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Etapa 3: Zona de Conforto */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Zona de Conforto Digital
                </h2>
                <p className="text-gray-600">
                  Queremos entender seu nível de conforto com diferentes tipos de conteúdo
                </p>
              </div>
              
              <div className="space-y-8">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <label className="block text-lg font-medium text-gray-800 mb-4">
                    Conforto para gravar vídeos <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Muito confortável', 'Confortável', 'Pouco confortável', 'Desconfortável'].map((option) => (
                      <label key={option} className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.conforto_video === option 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}>
                        <input
                          type="radio"
                          name="conforto_video"
                          value={option}
                          checked={formData.conforto_video === option}
                          onChange={(e) => handleInputChange('conforto_video', e.target.value)}
                          className="mr-3 text-blue-500"
                        />
                        <span className="text-gray-800 font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <label className="block text-lg font-medium text-gray-800 mb-4">
                    Conforto para postar stories <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Muito confortável', 'Confortável', 'Pouco confortável', 'Desconfortável'].map((option) => (
                      <label key={option} className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.conforto_stories === option 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}>
                        <input
                          type="radio"
                          name="conforto_stories"
                          value={option}
                          checked={formData.conforto_stories === option}
                          onChange={(e) => handleInputChange('conforto_stories', e.target.value)}
                          className="mr-3 text-blue-500"
                        />
                        <span className="text-gray-800 font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <label className="block text-lg font-medium text-gray-800 mb-4">
                    Conforto para criar posts <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Muito confortável', 'Confortável', 'Pouco confortável', 'Desconfortável'].map((option) => (
                      <label key={option} className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.conforto_posts === option 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}>
                        <input
                          type="radio"
                          name="conforto_posts"
                          value={option}
                          checked={formData.conforto_posts === option}
                          onChange={(e) => handleInputChange('conforto_posts', e.target.value)}
                          className="mr-3 text-blue-500"
                        />
                        <span className="text-gray-800 font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-6">
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Preferência de conteúdo <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.preferencia_conteudo}
                    onChange={(e) => handleInputChange('preferencia_conteudo', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    required
                  >
                    <option value="">Selecione seu foco...</option>
                    <option value="educacional">Conteúdo educacional</option>
                    <option value="pessoal">Conteúdo pessoal</option>
                    <option value="mercado">Análises de mercado</option>
                    <option value="cases">Cases de sucesso</option>
                    <option value="misto">Conteúdo misto</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Etapa 4: Visão de Futuro */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Visão de Futuro
                </h2>
                <p className="text-gray-600">
                  Vamos alinhar suas expectativas e objetivos
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Quantas horas por semana você dedicaria ao marketing digital? <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.horas_semana}
                    onChange={(e) => handleInputChange('horas_semana', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    required
                  >
                    <option value="">Selecione o tempo disponível...</option>
                    <option value="1-2">1 a 2 horas por semana</option>
                    <option value="3-5">3 a 5 horas por semana</option>
                    <option value="6-10">6 a 10 horas por semana</option>
                    <option value="mais_10">Mais de 10 horas por semana</option>
                  </select>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-6">
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Complete: "O assessor que eu quero ser é aquele que..." <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.assessor_que}
                    onChange={(e) => handleInputChange('assessor_que', e.target.value)}
                    rows={4}
                    placeholder="...sempre se posiciona como referência no mercado, construindo relacionamentos sólidos baseados em confiança e conhecimento técnico..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                    required
                  />
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Observações adicionais
                  </label>
                  <textarea
                    value={formData.observacoes}
                    onChange={(e) => handleInputChange('observacoes', e.target.value)}
                    rows={3}
                    placeholder="Compartilhe qualquer informação adicional que julgar relevante para personalizarmos melhor sua estratégia..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Etapa 5: Plano */}
          {currentStep === 4 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  Escolha seu Plano de Crescimento
                </h2>
                <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                  Selecione a solução ideal para acelerar sua autoridade digital no mercado financeiro
                </p>
              </div>
              
              {/* Cards de Planos - Empilhados Verticalmente */}
              <div className="space-y-6 max-w-2xl mx-auto">
                
                {/* Plano Basic */}
                <div 
                  className={`relative rounded-2xl p-6 lg:p-8 cursor-pointer transition-all duration-300 border-2 ${
                    formData.plano_assinatura === 'basic' 
                      ? 'border-emerald-500 bg-emerald-50 shadow-xl transform scale-105' 
                      : 'border-gray-200 hover:border-emerald-300 hover:shadow-lg bg-white'
                  }`}
                  onClick={() => handleInputChange('plano_assinatura', 'basic')}
                >
                  {/* Header do Card */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        formData.plano_assinatura === 'basic' ? 'bg-emerald-500' : 'bg-emerald-100'
                      }`}>
                        <svg className={`w-6 h-6 ${
                          formData.plano_assinatura === 'basic' ? 'text-white' : 'text-emerald-600'
                        }`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-gray-800">Basic</h3>
                        <p className="text-sm text-gray-500">Início estratégico</p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="plano_assinatura"
                      value="basic"
                      checked={formData.plano_assinatura === 'basic'}
                      onChange={(e) => handleInputChange('plano_assinatura', e.target.value)}
                      className="w-5 h-5 text-emerald-500"
                    />
                  </div>
                  
                  {/* Preço */}
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-gray-800">R$ 700</span>
                      <span className="text-lg text-gray-500 ml-2">/mês</span>
                    </div>
                    <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium mt-2">
                      Preço promocional
                    </span>
                  </div>
                  
                  {/* Descrição */}
                  <p className="text-gray-600 mb-6 text-base">
                    Para assessores que querem começar a construir presença digital consistente
                  </p>
                  
                  {/* Benefícios */}
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">2 conteúdos por semana</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Legendas profissionais</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Hashtags estratégicas</span>
                    </li>
                  </ul>
                </div>

                {/* Plano Silver - MAIS POPULAR */}
                <div 
                  className={`relative rounded-2xl p-6 lg:p-8 cursor-pointer transition-all duration-300 border-2 ${
                    formData.plano_assinatura === 'silver' 
                      ? 'border-blue-500 bg-blue-50 shadow-xl transform scale-105' 
                      : 'border-blue-200 hover:border-blue-400 hover:shadow-lg bg-white'
                  }`}
                  onClick={() => handleInputChange('plano_assinatura', 'silver')}
                >
                  {/* Badge Mais Popular */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                      MAIS POPULAR
                    </span>
                  </div>
                  
                  {/* Header do Card */}
                  <div className="flex items-center justify-between mb-6 mt-4">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        formData.plano_assinatura === 'silver' ? 'bg-blue-500' : 'bg-blue-100'
                      }`}>
                        <svg className={`w-6 h-6 ${
                          formData.plano_assinatura === 'silver' ? 'text-white' : 'text-blue-600'
                        }`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-gray-800">Silver</h3>
                        <p className="text-sm text-gray-500">Crescimento acelerado</p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="plano_assinatura"
                      value="silver"
                      checked={formData.plano_assinatura === 'silver'}
                      onChange={(e) => handleInputChange('plano_assinatura', e.target.value)}
                      className="w-5 h-5 text-blue-500"
                    />
                  </div>
                  
                  {/* Preço */}
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-gray-800">R$ 850</span>
                      <span className="text-lg text-gray-500 ml-2">/mês</span>
                    </div>
                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mt-2">
                      Preço promocional
                    </span>
                  </div>
                  
                  {/* Descrição */}
                  <p className="text-gray-600 mb-6 text-base">
                    Para assessores que buscam maior engajamento e gestão profissional
                  </p>
                  
                  {/* Benefícios */}
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">3 conteúdos por semana</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Gestão completa do Instagram</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Relatório de performance</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Suporte prioritário</span>
                    </li>
                  </ul>
                </div>

                {/* Plano Gold - PREMIUM */}
                <div 
                  className={`relative rounded-2xl p-6 lg:p-8 cursor-pointer transition-all duration-300 border-2 ${
                    formData.plano_assinatura === 'gold' 
                      ? 'border-amber-500 bg-amber-50 shadow-xl transform scale-105' 
                      : 'border-amber-200 hover:border-amber-400 hover:shadow-lg bg-gradient-to-br from-amber-50 to-yellow-50'
                  }`}
                  onClick={() => handleInputChange('plano_assinatura', 'gold')}
                >
                  {/* Badge Premium */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      PREMIUM
                    </span>
                  </div>
                  
                  {/* Header do Card */}
                  <div className="flex items-center justify-between mb-6 mt-4">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        formData.plano_assinatura === 'gold' ? 'bg-amber-500' : 'bg-amber-100'
                      }`}>
                        <svg className={`w-6 h-6 ${
                          formData.plano_assinatura === 'gold' ? 'text-white' : 'text-amber-600'
                        }`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-gray-800">Gold</h3>
                        <p className="text-sm text-gray-500">Solução completa</p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="plano_assinatura"
                      value="gold"
                      checked={formData.plano_assinatura === 'gold'}
                      onChange={(e) => handleInputChange('plano_assinatura', e.target.value)}
                      className="w-5 h-5 text-amber-500"
                    />
                  </div>
                  
                  {/* Preço */}
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-gray-800">R$ 1.200</span>
                      <span className="text-lg text-gray-500 ml-2">/mês</span>
                    </div>
                    <span className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium mt-2">
                      Preço promocional
                    </span>
                  </div>
                  
                  {/* Descrição */}
                  <p className="text-gray-600 mb-6 text-base">
                    Para assessores que desejam dominância total no digital
                  </p>
                  
                  {/* Benefícios */}
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-amber-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">5 conteúdos por semana</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-amber-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Roteiros personalizados</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-amber-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Gestão feed + stories</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-amber-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Planejamento estratégico</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-amber-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Relatórios avançados</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Etapa 6: Sucesso */}
          {currentStep === 5 && submitSuccess && (
            <div className="text-center py-8">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Formulário Enviado com Sucesso!
                </h2>
                <p className="text-gray-600">
                  Obrigado por compartilhar suas informações conosco. Nossa equipe entrará em contato em breve.
                </p>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-800 font-medium">
                  Próximos passos:
                </p>
                <ul className="text-orange-700 text-sm mt-2 text-left max-w-md mx-auto">
                  <li>• Análise do seu perfil pela nossa equipe</li>
                  <li>• Contato via WhatsApp em até 24 horas</li>
                  <li>• Apresentação da estratégia personalizada</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center p-8 md:p-10 pt-0 bg-gradient-to-r from-slate-50 to-blue-50">
          <button
            type="button"
            onClick={prevStep}
            className="group py-3 px-8 bg-white text-slate-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 font-medium border border-slate-200 disabled:cursor-not-allowed"
            disabled={currentStep === 0 || currentStep === totalSteps - 1}
          >
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Anterior
            </span>
          </button>
          
          {currentStep < totalSteps - 2 && (
            <button
              type="button"
              onClick={nextStep}
              className="group py-3 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-medium"
            >
              <span className="flex items-center">
                Continuar
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          )}
          
          {currentStep === totalSteps - 2 && (
            <button
              type="button"
              onClick={submitForm}
              disabled={isSubmitting}
              className="group py-3 px-8 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-green-700 transition-all duration-300 disabled:opacity-50 font-medium"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processando...
                </span>
              ) : (
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Finalizar Cadastro
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}