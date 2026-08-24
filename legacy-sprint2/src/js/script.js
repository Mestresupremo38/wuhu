document.addEventListener('DOMContentLoaded', () => {

    const app = document.getElementById('camera-app');
    const modeItems = document.querySelectorAll('.mode-item');
    const shutterBtn = document.querySelector('.shutter-btn');
    const flipBtn = document.querySelector('.flip-btn');
    const cameraView = document.getElementById('camera-view');
    const galleryBtn = document.querySelector('.gallery-btn');
    const galleryOverlay = document.getElementById('gallery-overlay');
    const galleryCloseBtn = document.getElementById('gallery-close');
    const btnGalleryAi = document.getElementById('btn-gallery-ai');
    const galleryAiSheet = document.getElementById('gallery-ai-sheet');
    const galleryAiSheetClose = document.getElementById('gallery-ai-sheet-close');

    let isFrontCamera = false;

    // Gerencia troca de modos
    modeItems.forEach(item => {
        item.addEventListener('click', () => {
            const modeText = item.textContent.trim().toUpperCase();

            // Tratamento especial para "MAIS"
            if (modeText === 'MAIS' || modeText === 'MORE') {
                app.classList.add('mode-transitioning');
                setTimeout(() => {
                    window.location.href = 'more.html';
                }, 400);
                return;
            }

            // Remove o estado ativo de todos
            modeItems.forEach(i => i.classList.remove('active'));

            // Define o estado ativo
            item.classList.add('active');

            // Dispara efeito de transição
            app.classList.add('mode-transitioning');
            setTimeout(() => {
                app.classList.remove('mode-transitioning');
            }, 500);

            // Centraliza o item na tela
            item.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        });
    });

    // Gerencia troca de câmera
    if (flipBtn) {
        flipBtn.addEventListener('click', () => {
            isFrontCamera = !isFrontCamera;

            // Adiciona efeito de transição
            app.classList.add('mode-transitioning');

            setTimeout(() => {
                // Altera a imagem da câmera
                if (cameraView) {
                    cameraView.src = isFrontCamera ? 'src/assets/imagem2.png' : 'src/assets/imagem1.png';
                    cameraView.style.transform = isFrontCamera ? 'scaleX(-1)' : 'scaleX(1)';
                }
            }, 250);

            setTimeout(() => {
                app.classList.remove('mode-transitioning');
            }, 500);
        });
    }

    // Centraliza o modo ativo ao carregar a página
    const activeMode = document.querySelector('.mode-item.active');
    if (activeMode) {
        activeMode.scrollIntoView({ inline: 'center' });
    }

    function triggerFlash() {
        if (!app) return;
        const flash = document.createElement('div');
        flash.style.position = 'absolute';
        flash.style.inset = '0';
        flash.style.backgroundColor = 'white';
        flash.style.zIndex = '500';
        flash.style.opacity = '0';
        flash.style.transition = 'opacity 0.1s ease-out';

        app.appendChild(flash);

        requestAnimationFrame(() => {
            flash.style.opacity = '0.8';
            setTimeout(() => {
                flash.style.opacity = '0';
                setTimeout(() => flash.remove(), 100);
            }, 50);
        });
    }

    // Animação simples do botão de captura
    if (shutterBtn) {
        shutterBtn.addEventListener('click', triggerFlash);
    }

    // ========================
    // Overlay do Chat IA
    // ========================
    const aiBtn = document.querySelector('.ai-btn');
    const aiOverlay = document.getElementById('ai-overlay');
    const aiCloseBtn = document.getElementById('ai-close');
    const aiInput = document.getElementById('ai-input');
    const aiSendBtn = document.getElementById('ai-send');
    const aiMessages = document.getElementById('ai-messages');

    // Elementos das telas da IA
    const aiBackBtn = document.getElementById('ai-back');
    const aiLogoHeader = document.getElementById('ai-logo-header');
    const aiMenuView = document.getElementById('ai-menu-view');
    const aiChatView = document.getElementById('ai-chat-view');
    const aiGuidedView = document.getElementById('ai-guided-view');
    const aiAutoView = document.getElementById('ai-auto-view');
    const btnDuvidas = document.getElementById('btn-duvidas');
    const btnGuiado = document.getElementById('btn-guiado');
    const btnAutomatico = document.getElementById('btn-automatico');

    // Elementos do modo automático
    const btnNextAuto = document.getElementById('btn-next-auto');
    const btnStartAutoScan = document.getElementById('btn-start-auto-scan');
    const btnFinishAuto = document.getElementById('btn-finish-auto');
    const autoInput = document.getElementById('auto-input');

    // Estado de navegação interna da IA
    let currentView = 'menu'; // 'menu', 'chat', 'guided', 'auto'
    let guidedStep = 1;
    let autoStep = 1;
    let selectedSubject = '';

    // Respostas simuladas do bot
    const botResponses = [
        'Posso ajudar a melhorar a iluminação da sua foto!',
        'Tente usar o modo retrato para fotos com fundo desfocado.',
        'O modo noite funciona melhor com o celular estabilizado.',
        'Use o HDR para capturar mais detalhes nas sombras.',
        'Quer que eu sugira o melhor modo para esta cena?',
        'A resolução 4K é ideal para fotos com muitos detalhes.',
        'Para panoramas, mova o celular lentamente da esquerda para a direita.',
        'O modo Astro precisa de pelo menos 15 segundos de exposição.',
    ];

    function showAiMenu() {
        currentView = 'menu';
        if (aiMenuView) aiMenuView.style.display = 'flex';
        if (aiChatView) aiChatView.style.display = 'none';
        if (aiGuidedView) aiGuidedView.style.display = 'none';
        if (aiAutoView) aiAutoView.style.display = 'none';
        if (aiBackBtn) aiBackBtn.style.display = 'none';
        if (aiLogoHeader) aiLogoHeader.style.display = 'flex';
    }

    function showAiChat() {
        currentView = 'chat';
        if (aiMenuView) aiMenuView.style.display = 'none';
        if (aiChatView) aiChatView.style.display = 'flex';
        if (aiGuidedView) aiGuidedView.style.display = 'none';
        if (aiAutoView) aiAutoView.style.display = 'none';
        if (aiBackBtn) aiBackBtn.style.display = 'flex';
        if (aiLogoHeader) aiLogoHeader.style.display = 'none';
    }

    function showAiGuided() {
        currentView = 'guided';
        if (aiMenuView) aiMenuView.style.display = 'none';
        if (aiChatView) aiChatView.style.display = 'none';
        if (aiGuidedView) aiGuidedView.style.display = 'flex';
        if (aiAutoView) aiAutoView.style.display = 'none';
        if (aiBackBtn) aiBackBtn.style.display = 'flex';
        if (aiLogoHeader) aiLogoHeader.style.display = 'none';
        showGuidedStep(1);
    }

    function showAiAuto() {
        currentView = 'auto';
        if (aiMenuView) aiMenuView.style.display = 'none';
        if (aiChatView) aiChatView.style.display = 'none';
        if (aiGuidedView) aiGuidedView.style.display = 'none';
        if (aiAutoView) aiAutoView.style.display = 'flex';
        if (aiBackBtn) aiBackBtn.style.display = 'flex';
        if (aiLogoHeader) aiLogoHeader.style.display = 'none';
        showAutoStep(1);
    }

    function showAutoStep(step) {
        autoStep = step;
        const s1 = document.getElementById('auto-step-1');
        const s2 = document.getElementById('auto-step-2');
        const s3 = document.getElementById('auto-step-3');

        if (s1) s1.style.display = step === 1 ? 'flex' : 'none';
        if (s2) s2.style.display = step === 2 ? 'flex' : 'none';
        if (s3) s3.style.display = step === 3 ? 'flex' : 'none';

        if (step === 1) {
            if (autoInput) autoInput.value = '';
        }

        if (step === 2) {
            const permBox = document.getElementById('auto-scan-permission-box');
            const statusBox = document.getElementById('auto-scanning-status-box');
            const progressFill = document.getElementById('auto-scan-progress-fill');
            const statusText = document.getElementById('auto-scan-status-text');
            if (permBox) permBox.style.display = 'flex';
            if (statusBox) statusBox.style.display = 'none';
            if (progressFill) progressFill.style.width = '0%';
            if (statusText) statusText.textContent = 'Aguardando permissão...';
        }

        if (step === 3) {
            // Inicializa estados dos indicadores de impl da automação
            const loadingInd = document.getElementById('impl-loading-indicator');
            const successInd = document.getElementById('impl-success-indicator');
            const finishBtn = document.getElementById('btn-finish-auto');
            if (loadingInd) loadingInd.style.display = 'flex';
            if (successInd) successInd.style.display = 'none';
            if (finishBtn) finishBtn.style.display = 'none';
        }
    }

    function showGuidedStep(step) {
        guidedStep = step;
        const s1 = document.getElementById('guided-step-1');
        const s2 = document.getElementById('guided-step-2');
        const s3 = document.getElementById('guided-step-3');

        if (s1) s1.style.display = step === 1 ? 'flex' : 'none';
        if (s2) s2.style.display = step === 2 ? 'flex' : 'none';
        if (s3) s3.style.display = step === 3 ? 'flex' : 'none';

        if (step === 1) {
            const guidedInput = document.getElementById('guided-input');
            if (guidedInput) guidedInput.value = '';
        }

        if (step === 2) {
            const permBox = document.getElementById('scan-permission-box');
            const statusBox = document.getElementById('scanning-status-box');
            const progressFill = document.getElementById('scan-progress-fill');
            const statusText = document.getElementById('scan-status-text');
            if (permBox) permBox.style.display = 'flex';
            if (statusBox) statusBox.style.display = 'none';
            if (progressFill) progressFill.style.width = '0%';
            if (statusText) statusText.textContent = 'Aguardando permissão...';
        }
    }

    function generatePlan() {
        const container = document.getElementById('plan-steps-container');
        if (!container) return;

        const plans = {
            retrato: [
                'Deslize o seletor de modos inferior e selecione o **Modo Retrato**.',
                'Posicione a pessoa a aproximadamente **1.5 metros** de distância da câmera.',
                'A IA detectará o rosto automaticamente; toque na tela para focar nos olhos do assunto.',
                'Utilize uma iluminação suave (de preferência vinda de uma lateral) para suavizar sombras.',
                'Segure firme o celular e aperte o botão de disparo (shutter) para capturar.'
            ],
            paisagem: [
                'Mantenha o seletor de modos inferior na opção de **Foto** padrão ou **Pro**.',
                'Clique no indicador de resolução na barra superior e selecione **4K 60**.',
                'Ative a função **HDR** tocando no botão superior para balancear a luz do céu e da terra.',
                'Alinhe a linha do horizonte com as guias inferiores do visor da câmera.',
                'Mantenha o dispositivo firme com as duas mãos e pressione o obturador para capturar.'
            ],
            comida: [
                'Selecione **Mais** no seletor de modos inferior e ative o modo **Comida**.',
                'Aproxime a câmera do prato a cerca de **30 a 40 centímetros**.',
                'Toque no visor sobre o ingrediente principal do prato para direcionar o ponto de foco.',
                'Incline o celular em um **ângulo de 45°** ou fique totalmente por cima (zenital).',
                'Verifique se a iluminação natural está preenchendo as cores e dispare a captura.'
            ],
            objeto: [
                'Mantenha o seletor de modos na opção **Foto** padrão.',
                'Posicione o objeto bem centralizado no visor utilizando a grade sutil.',
                'Utilize um fundo limpo e de cor neutra para realçar os detalhes do produto.',
                'Toque e segure sobre o objeto na tela para travar o foco (Bloqueio AE/AF).',
                'Ajuste o controle deslizante de brilho se necessário e realize o disparo.'
            ]
        };

        const currentSteps = plans[selectedSubject] || plans['retrato'];
        container.innerHTML = ''; // Limpa antes de renderizar

        currentSteps.forEach((stepText, index) => {
            const stepItem = document.createElement('div');
            stepItem.className = 'guided-step-item';
            
            // Substitui marcas de negrito **texto** por tag strong correspondente
            const formattedText = stepText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

            stepItem.innerHTML = `
                <div class="step-badge">${index + 1}</div>
                <div class="step-text-card">${formattedText}</div>
            `;
            container.appendChild(stepItem);
        });
    }

    function generateAutoPlan() {
        const container = document.getElementById('auto-config-list');
        if (!container) return;

        const configSets = {
            retrato: [
                'Modo: **Modo Retrato (Bokeh)**',
                'Abertura Virtual: **f/2.2 (Suave)**',
                'Rastreamento Ocular: **Ativado (Foco Contínuo)**',
                'Balanço de Cores: **Retrato Quente (Tons Naturais)**'
            ],
            paisagem: [
                'Modo: **Foto Padrão**',
                'Resolução: **4K 60fps**',
                'Foco: **Lock Foco Infinito**',
                'HDR Inteligente: **Ativado (Max Range)**'
            ],
            comida: [
                'Modo: **Comida (Macro Seletivo)**',
                'Saturação: **+15% (Cores Vivas)**',
                'Balanço de Brancos: **5500K (Quente)**',
                'Filtro de Nitidez: **Ativado (+10%)**'
            ],
            objeto: [
                'Modo: **Profissional**',
                'Abertura Física: **f/4.0 (Nítido)**',
                'Sensibilidade ISO: **Automático (Baixo Ruído)**',
                'Estabilização Digital: **Super Steady Lock**'
            ]
        };

        const currentConfigs = configSets[selectedSubject] || configSets['retrato'];
        container.innerHTML = '';

        currentConfigs.forEach((configText, index) => {
            const stepItem = document.createElement('div');
            stepItem.className = 'guided-step-item';

            const formattedText = configText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

            stepItem.innerHTML = `
                <div class="step-badge">${index + 1}</div>
                <div class="step-text-card">${formattedText}</div>
            `;
            container.appendChild(stepItem);
        });
    }

    function openAiOverlay() {
        if (aiOverlay) {
            // Se estiver na tela final do modo guiado ou automático, preserva o estado.
            // Caso contrário, reinicia para o menu principal.
            const isGuidedSuccess = currentView === 'guided' && guidedStep === 3;
            const isAutoSuccess = currentView === 'auto' && autoStep === 3;
            if (!isGuidedSuccess && !isAutoSuccess) {
                showAiMenu();
            }
            aiOverlay.classList.add('ai-overlay-visible');
        }
    }

    function closeAiOverlay() {
        if (aiOverlay) {
            aiOverlay.classList.remove('ai-overlay-visible');
        }
    }

    function addMessage(text, isUser) {
        if (!aiMessages) return;

        const msg = document.createElement('div');
        msg.className = `ai-msg ${isUser ? 'ai-msg-user' : 'ai-msg-bot'}`;
        msg.innerHTML = `
            <div class="ai-avatar">${isUser ? 'EU' : 'AI'}</div>
            <div class="ai-bubble">${text}</div>
        `;
        aiMessages.appendChild(msg);
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }

    function sendMessage() {
        if (!aiInput) return;

        const text = aiInput.value.trim();
        if (!text) return;

        // Adiciona mensagem do usuário
        addMessage(text, true);
        aiInput.value = '';

        // Simula resposta do bot após um atraso
        setTimeout(() => {
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
            addMessage(randomResponse, false);
        }, 800 + Math.random() * 700);
    }

    // Listeners de eventos do chat IA
    if (aiBtn) {
        aiBtn.addEventListener('click', openAiOverlay);
    }

    if (aiCloseBtn) {
        aiCloseBtn.addEventListener('click', closeAiOverlay);
    }

    if (aiBackBtn) {
        aiBackBtn.addEventListener('click', () => {
            if (currentView === 'chat') {
                showAiMenu();
            } else if (currentView === 'guided') {
                if (guidedStep === 1) {
                    showAiMenu();
                } else {
                    showGuidedStep(1);
                }
            } else if (currentView === 'auto') {
                if (autoStep === 1) {
                    showAiMenu();
                } else {
                    showAutoStep(1);
                }
            }
        });
    }

    if (btnDuvidas) {
        btnDuvidas.addEventListener('click', showAiChat);
    }

    if (btnGuiado) {
        btnGuiado.addEventListener('click', showAiGuided);
    }

    if (btnAutomatico) {
        btnAutomatico.addEventListener('click', showAiAuto);
    }

    // Botões do Passo 1 do Modo Automático
    if (btnNextAuto) {
        btnNextAuto.addEventListener('click', () => {
            const query = (document.getElementById('auto-input')?.value || '').toLowerCase().trim();
            
            // Define o tema com base em palavras-chave para fingir análise da IA
            if (query.includes('retrato') || query.includes('pessoa') || query.includes('selfie') || query.includes('rosto') || query.includes('gente') || query.includes('amigo') || query.includes('humano') || query.includes('foto minha') || query.includes('minha foto')) {
                selectedSubject = 'retrato';
            } else if (query.includes('paisagem') || query.includes('natureza') || query.includes('ceu') || query.includes('céu') || query.includes('montanha') || query.includes('praia') || query.includes('mar') || query.includes('árvore') || query.includes('arvore') || query.includes('viagem')) {
                selectedSubject = 'paisagem';
            } else if (query.includes('comida') || query.includes('prato') || query.includes('macarrão') || query.includes('macarrao') || query.includes('doce') || query.includes('bebida') || query.includes('restaurante') || query.includes('café') || query.includes('cafe') || query.includes('almoço') || query.includes('almoco')) {
                selectedSubject = 'comida';
            } else {
                selectedSubject = 'objeto';
            }
            
            showAutoStep(2);
        });
    }

    // Passo 2 do Modo Automático: Escaneamento
    if (btnStartAutoScan) {
        btnStartAutoScan.addEventListener('click', () => {
            const permBox = document.getElementById('auto-scan-permission-box');
            const statusBox = document.getElementById('auto-scanning-status-box');
            const progressFill = document.getElementById('auto-scan-progress-fill');
            const statusText = document.getElementById('auto-scan-status-text');

            if (permBox) permBox.style.display = 'none';
            if (statusBox) statusBox.style.display = 'flex';

            const query = document.getElementById('auto-input')?.value || 'solicitação';
            const shortQuery = query.length > 20 ? query.substring(0, 18) + '...' : query;

            let progress = 0;
            const stepsText = [
                { limit: 15, text: 'Iniciando câmera...' },
                { limit: 45, text: `Analisando: "${shortQuery}"...` },
                { limit: 70, text: 'Medindo luz e foco...' },
                { limit: 90, text: 'Calculando parâmetros ideais...' },
                { limit: 100, text: 'Otimização concluída...' }
            ];

            const interval = setInterval(() => {
                progress += 2;
                if (progressFill) progressFill.style.width = `${progress}%`;

                const activeText = stepsText.find(s => progress <= s.limit);
                if (activeText && statusText) {
                    statusText.textContent = activeText.text;
                }

                // Micro-interação: flashes rápidos simulando captura na câmera
                if (progress === 36 || progress === 76) {
                    triggerFlash();
                }

                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        // Transiciona para o passo 3
                        showAutoStep(3);
                        generateAutoPlan();
                        
                        // Espera 3 segundos fingindo que está aplicando as configs e depois mostra sucesso
                        setTimeout(() => {
                            const loadingInd = document.getElementById('impl-loading-indicator');
                            const successInd = document.getElementById('impl-success-indicator');
                            const finishBtn = document.getElementById('btn-finish-auto');
                            if (loadingInd) loadingInd.style.display = 'none';
                            if (successInd) successInd.style.display = 'flex';
                            if (finishBtn) finishBtn.style.display = 'flex';
                        }, 3000);
                    }, 500);
                }
            }, 50);
        });
    }

    // Passo 3 do Modo Automático: Botão de fechar e capturar
    if (btnFinishAuto) {
        btnFinishAuto.addEventListener('click', () => {
            triggerFlash();
            closeAiOverlay();
        });
    }

    // Passo 1: Captura e análise da entrada de texto do usuário
    const btnNextGuided = document.getElementById('btn-next-guided');
    if (btnNextGuided) {
        btnNextGuided.addEventListener('click', () => {
            const query = (document.getElementById('guided-input')?.value || '').toLowerCase().trim();
            
            // Define o tema com base em palavras-chave para fingir análise da IA
            if (query.includes('retrato') || query.includes('pessoa') || query.includes('selfie') || query.includes('rosto') || query.includes('gente') || query.includes('amigo') || query.includes('humano') || query.includes('foto minha') || query.includes('minha foto')) {
                selectedSubject = 'retrato';
            } else if (query.includes('paisagem') || query.includes('natureza') || query.includes('ceu') || query.includes('céu') || query.includes('montanha') || query.includes('praia') || query.includes('mar') || query.includes('árvore') || query.includes('arvore') || query.includes('viagem')) {
                selectedSubject = 'paisagem';
            } else if (query.includes('comida') || query.includes('prato') || query.includes('macarrão') || query.includes('macarrao') || query.includes('doce') || query.includes('bebida') || query.includes('restaurante') || query.includes('café') || query.includes('cafe') || query.includes('almoço') || query.includes('almoco')) {
                selectedSubject = 'comida';
            } else {
                selectedSubject = 'objeto';
            }
            
            showGuidedStep(2);
        });
    }

    // Passo 2: Início do escaneamento simulado
    const btnStartScan = document.getElementById('btn-start-scan');
    if (btnStartScan) {
        btnStartScan.addEventListener('click', () => {
            const permBox = document.getElementById('scan-permission-box');
            const statusBox = document.getElementById('scanning-status-box');
            const progressFill = document.getElementById('scan-progress-fill');
            const statusText = document.getElementById('scan-status-text');

            if (permBox) permBox.style.display = 'none';
            if (statusBox) statusBox.style.display = 'flex';

            const query = document.getElementById('guided-input')?.value || 'solicitação';
            const shortQuery = query.length > 20 ? query.substring(0, 18) + '...' : query;

            let progress = 0;
            const stepsText = [
                { limit: 15, text: 'Iniciando câmera...' },
                { limit: 45, text: `Analisando objetivo: "${shortQuery}"...` },
                { limit: 70, text: 'Analisando iluminação do ambiente...' },
                { limit: 90, text: 'Calculando enquadramento ideal...' },
                { limit: 100, text: 'Gerando plano de captura...' }
            ];

            const interval = setInterval(() => {
                progress += 2;
                if (progressFill) progressFill.style.width = `${progress}%`;

                const activeText = stepsText.find(s => progress <= s.limit);
                if (activeText && statusText) {
                    statusText.textContent = activeText.text;
                }

                // Micro-interação: Disparar flashes rápidos simulando captura na câmera
                if (progress === 36 || progress === 76) {
                    triggerFlash();
                }

                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        generatePlan();
                        showGuidedStep(3);
                    }, 500);
                }
            }, 50);
        });
    }


    if (aiSendBtn) {
        aiSendBtn.addEventListener('click', sendMessage);
    }

    if (aiInput) {
        aiInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // ========================
    // Galeria & Sugestões IA
    // ========================
    if (galleryBtn) {
        galleryBtn.addEventListener('click', () => {
            if (galleryOverlay) {
                galleryOverlay.classList.add('gallery-overlay-visible');
            }
        });
    }

    if (galleryCloseBtn) {
        galleryCloseBtn.addEventListener('click', () => {
            if (galleryOverlay) {
                galleryOverlay.classList.remove('gallery-overlay-visible');
            }
            if (galleryAiSheet) {
                galleryAiSheet.classList.remove('gallery-ai-sheet-visible');
            }
        });
    }

    if (btnGalleryAi) {
        btnGalleryAi.addEventListener('click', () => {
            if (galleryAiSheet) {
                galleryAiSheet.classList.add('gallery-ai-sheet-visible');
            }
        });
    }

    if (galleryAiSheetClose) {
        galleryAiSheetClose.addEventListener('click', () => {
            if (galleryAiSheet) {
                galleryAiSheet.classList.remove('gallery-ai-sheet-visible');
            }
        });
    }
});
