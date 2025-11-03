'use client';

import { useState } from 'react';

interface FormData {
  nome: string;
  email: string;
  whatsapp: string;
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
    } catch {
      alert('Erro de rede ao enviar formulário');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden border border-white/20">
        
        <div className="p-4 sm:p-6 md:p-12 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 text-white text-center relative overflow-hidden">
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
            <div className="text-center mb-4">
              <img 
                src="/4.png" 
                alt="Cogni Club Logo" 
                className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 mx-auto mb-3 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl border-2 border-white/20"
              />
            </div>
            
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2">
              Mapeamento de Perfil Digital
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm md:text-lg mb-4 md:mb-6 max-w-2xl mx-auto px-2">
              Construção estratégica de autoridade para assessores de investimento
            </p>
            
            {/* Progress Bar Elegante */}
            <div className="w-full max-w-md mx-auto px-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-blue-200">Progresso</span>
                <span className="text-xs text-blue-200">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 backdrop-blur-sm">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2 rounded-full transition-all duration-700 ease-out shadow-lg"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 gap-1">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
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

        <div className="p-4 sm:p-6 md:p-10 max-w-3xl mx-auto">
          {/* Etapa 1: Informações Básicas */}
          {currentStep === 0 && (
            <div className="space-y-5">
              <div className="text-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                  Informações Básicas
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  Vamos começar conhecendo você melhor
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-gray-200 rounded-lg md:rounded-xl shadow-sm hover:bg-gray-100 focus:bg-white focus:ring-0 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400 text-sm"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="seuemail@example.com"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-gray-200 rounded-lg md:rounded-xl shadow-sm hover:bg-gray-100 focus:bg-white focus:ring-0 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400 text-sm"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-gray-200 rounded-lg md:rounded-xl shadow-sm hover:bg-gray-100 focus:bg-white focus:ring-0 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400 text-sm"
                    required
                  />
                </div>
                
              </div>
            </div>
          )}

          {/* Etapa 2: Perfil e Autoridade */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div className="text-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                  Perfil Profissional
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  Conte-nos sobre sua experiência e especialidade
                </p>
              </div>
              
              <div className="space-y-4 md:space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg md:rounded-xl p-4 md:p-6 border-l-4 border-blue-500">
                  <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-2">
                    Descreva sua trajetória e suas conquistas profissionais <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.conquista}
                    onChange={(e) => handleInputChange('conquista', e.target.value)}
                    rows={3}
                    placeholder="Descreva sua trajetória..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:border-blue-300 focus:ring-0 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none text-sm"
                    required
                  />
                </div>
                
                <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-lg md:rounded-xl p-4 md:p-6 border-l-4 border-slate-500">
                  <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-2">
                    Qual seu domínio de conhecimento/especialidade? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.dominio}
                    onChange={(e) => handleInputChange('dominio', e.target.value)}
                    placeholder="Ex: Renda fixa, Fundos imobiliários, Ações, Previdência..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:border-slate-300 focus:ring-0 focus:border-slate-500 transition-all duration-200 text-gray-900 placeholder-gray-400 text-sm"
                    required
                  />
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-lg md:rounded-xl p-4 md:p-6 border-l-4 border-green-500">
                  <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-2">
                    O que você mais gosta de ensinar? Ex: planejamento, renda variável... <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.clientes_querem}
                    onChange={(e) => handleInputChange('clientes_querem', e.target.value)}
                    rows={3}
                    placeholder="Ex: planejamento, renda variável, fundos imobiliários..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:border-green-300 focus:ring-0 focus:border-green-500 transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none text-sm"
                    required
                  />
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-lg md:rounded-xl p-4 md:p-6 border-l-4 border-purple-500">
                  <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-2">
                    Qual seu principal diferencial como assessor? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.diferencial}
                    onChange={(e) => handleInputChange('diferencial', e.target.value)}
                    rows={3}
                    placeholder="O que te diferencia dos outros assessores do mercado..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:border-purple-300 focus:ring-0 focus:border-purple-500 transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none text-sm"
                    required
                  />
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-lg md:rounded-xl p-4 md:p-6 border-l-4 border-orange-500">
                  <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-2">
                    Que tipo de cliente você NÃO quer atrair? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.cliente_nao_quer}
                    onChange={(e) => handleInputChange('cliente_nao_quer', e.target.value)}
                    rows={3}
                    placeholder="Perfil de cliente que não combina com seu atendimento..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:border-orange-300 focus:ring-0 focus:border-orange-500 transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none text-sm"
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
                    Complete: &quot;O assessor que eu quero ser é aquele que...&quot; <span className="text-red-500">*</span>
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
              <div className="text-center mb-6 md:mb-10">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-3">
                  Escolha seu Plano de Crescimento
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-2">
                  Selecione a solução ideal para sua jornada digital
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 max-w-6xl mx-auto">
                
                {/* Plano Basic */}
                <div 
                  className={`relative rounded-lg md:rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 flex flex-col ${
                    formData.plano_assinatura === 'basic' 
                      ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100/50 shadow-xl' 
                      : 'border-gray-200 hover:border-emerald-300 hover:shadow-lg bg-white'
                  }`}
                  onClick={() => handleInputChange('plano_assinatura', 'basic')}
                >
                  <div className="h-1 bg-gradient-to-r from-emerald-400 to-emerald-500"></div>
                  
                  <div className="p-3 md:p-5 flex flex-col">
                    {/* SVG Icon */}
                    <div className="flex justify-center mb-3">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <svg className="w-7 h-7 md:w-8 md:h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="text-center mb-2">
                      <h3 className="text-base md:text-lg font-bold text-gray-800">Plano Basic</h3>
                      <p className="text-xs md:text-xs text-gray-600 mt-0.5">Início Estratégico</p>
                    </div>
                    
                    <div className="mb-3 pb-2.5 md:pb-3 border-b border-gray-200 text-center">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-2xl md:text-2xl font-bold text-gray-800">R$ 700</span>
                        <span className="text-xs text-gray-600">/mês</span>
                      </div>
                      <p className="text-xs text-emerald-600 font-medium mt-1">Foco: Transformar suas ideias</p>
                    </div>
                    
                    <div className="space-y-2 mb-3 flex-1">
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-xs md:text-xs font-medium leading-tight">2 Edições de Vídeo Profissionais/semana</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-xs md:text-xs font-medium leading-tight">Legendas Dinâmicas (viral)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-xs md:text-xs font-medium leading-tight">Legendas Profissionais</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
                      <input
                        type="radio"
                        name="plano_assinatura"
                        value="basic"
                        checked={formData.plano_assinatura === 'basic'}
                        onChange={(e) => handleInputChange('plano_assinatura', e.target.value)}
                        className="w-4 h-4 text-emerald-500 cursor-pointer"
                      />
                      <span className="font-medium text-xs">Selecionar</span>
                    </div>
                  </div>
                </div>

                {/* Plano Silver - DESTAQUE */}
                <div 
                  className={`relative rounded-lg md:rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 flex flex-col md:scale-105 ${
                    formData.plano_assinatura === 'silver' 
                      ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-100/50 shadow-xl' 
                      : 'border-blue-400 hover:border-blue-500 hover:shadow-lg bg-gradient-to-br from-white to-blue-50/50'
                  }`}
                  onClick={() => handleInputChange('plano_assinatura', 'silver')}
                >
                  <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                  
                  <div className="p-3 md:p-5 pt-3 md:pt-5 flex flex-col">
                    {/* SVG Icon */}
                    <div className="flex justify-center mb-3">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-7 h-7 md:w-8 md:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="text-center mb-2">
                      <h3 className="text-base md:text-lg font-bold text-gray-800">Plano Silver</h3>
                      <p className="text-xs md:text-xs text-gray-600 mt-0.5">Crescimento Acelerado</p>
                    </div>
                    
                    <div className="mb-3 pb-2.5 md:pb-3 border-b border-gray-200 text-center">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-2xl md:text-2xl font-bold text-gray-800">R$ 900</span>
                        <span className="text-xs text-gray-600">/mês</span>
                      </div>
                      <p className="text-xs text-blue-600 font-medium mt-1">Foco: Conteúdo estratégico</p>
                    </div>
                    
                    <div className="space-y-2 mb-3 flex-1">
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-xs md:text-xs font-medium leading-tight">3 Roteiros Virais/semana (ACEA)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-xs md:text-xs font-medium leading-tight">3 Vídeos Editados (Reels/TikTok)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-xs md:text-xs font-medium leading-tight">Legendas e Hashtags Estratégicas</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-xs md:text-xs font-medium leading-tight">Gestão Instagram/TikTok</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-xs md:text-xs font-medium leading-tight">Relatórios de Performance</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-600 pt-2 border-t border-gray-200">
                      <input
                        type="radio"
                        name="plano_assinatura"
                        value="silver"
                        checked={formData.plano_assinatura === 'silver'}
                        onChange={(e) => handleInputChange('plano_assinatura', e.target.value)}
                        className="w-4 h-4 text-blue-500 cursor-pointer"
                      />
                      <span className="font-medium text-xs">Selecionar</span>
                    </div>
                  </div>
                </div>

                {/* Plano Gold - PREMIUM */}
                <div 
                  className={`relative rounded-lg md:rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 flex flex-col ${
                    formData.plano_assinatura === 'gold' 
                      ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-yellow-100/50 shadow-xl' 
                      : 'border-gray-200 hover:border-amber-300 hover:shadow-lg bg-white'
                  }`}
                  onClick={() => handleInputChange('plano_assinatura', 'gold')}
                >
                  <div className="h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
                  
                  <div className="p-3 md:p-5 pt-3 md:pt-5 flex flex-col">
                    {/* SVG Icon */}
                    <div className="flex justify-center mb-3">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-amber-100 rounded-lg flex items-center justify-center">
                        <svg className="w-7 h-7 md:w-8 md:h-8 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                    </div>
                    
                    <div className="text-center mb-2">
                      <h3 className="text-base md:text-lg font-bold text-gray-800">Plano Gold</h3>
                      <p className="text-xs md:text-xs text-gray-600 mt-0.5">Dominância Completa</p>
                    </div>
                    
                    <div className="mb-3 pb-2.5 md:pb-3 border-b border-gray-200 text-center">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-2xl md:text-2xl font-bold text-gray-800">R$ 1.200</span>
                        <span className="text-xs text-gray-600">/mês</span>
                      </div>
                      <p className="text-xs text-amber-600 font-medium mt-1">Foco: Estratégia completa</p>
                    </div>
                    
                    <div className="space-y-2 mb-3 flex-1">
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-xs md:text-xs font-medium leading-tight">5 Conteúdos/semana (Mix)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-xs md:text-xs font-medium leading-tight">Roteiros Estratégicos Ilimitados</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-xs md:text-xs font-medium leading-tight">Cronograma Editorial Completo</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-xs md:text-xs font-medium leading-tight">Gestão COMPLETA Instagram</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-xs md:text-xs font-medium leading-tight">Gestão de Comunidade (DMs)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-xs md:text-xs font-medium leading-tight">Suporte VIP (WhatsApp)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-600 pt-2 border-t border-gray-200">
                      <input
                        type="radio"
                        name="plano_assinatura"
                        value="gold"
                        checked={formData.plano_assinatura === 'gold'}
                        onChange={(e) => handleInputChange('plano_assinatura', e.target.value)}
                        className="w-4 h-4 text-amber-500 cursor-pointer"
                      />
                      <span className="font-medium text-xs">Selecionar</span>
                    </div>
                  </div>
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

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 p-4 sm:p-6 md:p-10 pt-0 bg-gradient-to-r from-slate-50 to-blue-50">
          <button
            type="button"
            onClick={prevStep}
            className="group w-full sm:w-auto py-2.5 sm:py-3 px-6 sm:px-8 bg-white text-slate-700 rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 font-medium text-sm sm:text-base border border-slate-200 disabled:cursor-not-allowed"
            disabled={currentStep === 0 || currentStep === totalSteps - 1}
          >
            <span className="flex items-center justify-center">
              <svg className="w-4 sm:w-5 h-4 sm:h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Anterior
            </span>
          </button>
          
          {currentStep < totalSteps - 2 && (
            <button
              type="button"
              onClick={nextStep}
              className="group w-full sm:w-auto py-2.5 sm:py-3 px-6 sm:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg md:rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-medium text-sm sm:text-base"
            >
              <span className="flex items-center justify-center">
                Continuar
                <svg className="w-4 sm:w-5 h-4 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="group w-full sm:w-auto py-2.5 sm:py-3 px-6 sm:px-8 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg md:rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-green-700 transition-all duration-300 disabled:opacity-50 font-medium text-sm sm:text-base"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 sm:h-5 w-4 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processando...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="w-4 sm:w-5 h-4 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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