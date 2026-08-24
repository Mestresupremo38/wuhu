export const guidedPlans = {
  retrato: [
    'Deslize o seletor de modos inferior e selecione o **Modo Retrato**.',
    'Posicione a pessoa a aproximadamente **1.5 metros** de distância da câmera.',
    'A IA detectará o rosto automaticamente; toque na tela para focar nos olhos do assunto.',
    'Utilize uma iluminação suave (de preferência vinda de uma lateral) para suavizar sombras.',
    'Segure firme o celular e aperte o botão de disparo (shutter) para capturar.',
  ],
  paisagem: [
    'Mantenha o seletor de modos inferior na opção de **Foto** padrão ou **Pro**.',
    'Clique no indicador de resolução na barra superior e selecione **4K 60**.',
    'Ative a função **HDR** tocando no botão superior para balancear a luz do céu e da terra.',
    'Alinhe a linha do horizonte com as guias inferiores do visor da câmera.',
    'Mantenha o dispositivo firme com as duas mãos e pressione o obturador para capturar.',
  ],
  comida: [
    'Selecione **Mais** no seletor de modos inferior e ative o modo **Comida**.',
    'Aproxime a câmera do prato a cerca de **30 a 40 centímetros**.',
    'Toque no visor sobre o ingrediente principal do prato para direcionar o ponto de foco.',
    'Incline o celular em um **ângulo de 45°** ou fique totalmente por cima (zenital).',
    'Verifique se a iluminação natural está preenchendo as cores e dispare a captura.',
  ],
  objeto: [
    'Mantenha o seletor de modos na opção **Foto** padrão.',
    'Posicione o objeto bem centralizado no visor utilizando a grade sutil.',
    'Utilize um fundo limpo e de cor neutra para realçar os detalhes do produto.',
    'Toque e segure sobre o objeto na tela para travar o foco (Bloqueio AE/AF).',
    'Ajuste o controle deslizante de brilho se necessário e realize o disparo.',
  ],
};

export const automaticPlans = {
  retrato: [
    'Modo: **Modo Retrato (Bokeh)**',
    'Abertura Virtual: **f/2.2 (Suave)**',
    'Rastreamento Ocular: **Ativado (Foco Contínuo)**',
    'Balanço de Cores: **Retrato Quente (Tons Naturais)**',
  ],
  paisagem: [
    'Modo: **Foto Padrão**',
    'Resolução: **4K 60fps**',
    'Foco: **Lock Foco Infinito**',
    'HDR Inteligente: **Ativado (Max Range)**',
  ],
  comida: [
    'Modo: **Comida (Macro Seletivo)**',
    'Saturação: **+15% (Cores Vivas)**',
    'Balanço de Brancos: **5500K (Quente)**',
    'Filtro de Nitidez: **Ativado (+10%)**',
  ],
  objeto: [
    'Modo: **Profissional**',
    'Abertura Física: **f/4.0 (Nítido)**',
    'Sensibilidade ISO: **Automático (Baixo Ruído)**',
    'Estabilização Digital: **Super Steady Lock**',
  ],
};

export function detectSubject(value) {
  const query = value.toLowerCase().trim();
  const hasAny = (words) => words.some((word) => query.includes(word));

  if (hasAny(['retrato', 'pessoa', 'selfie', 'rosto', 'gente', 'amigo', 'humano', 'foto minha', 'minha foto'])) {
    return 'retrato';
  }

  if (hasAny(['paisagem', 'natureza', 'ceu', 'céu', 'montanha', 'praia', 'mar', 'árvore', 'arvore', 'viagem'])) {
    return 'paisagem';
  }

  if (hasAny(['comida', 'prato', 'macarrão', 'macarrao', 'doce', 'bebida', 'restaurante', 'café', 'cafe', 'almoço', 'almoco'])) {
    return 'comida';
  }

  return 'objeto';
}
