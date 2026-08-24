import { useEffect, useRef, useState } from 'react';
import { detectSubject, guidedPlans } from '../../data/aiPlans.js';

function FormattedText({ text }) {
  return text.split(/(\*\*.*?\*\*)/g).map((part, index) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>
      : part,
  );
}

export default function GuidedMode({ resetToken, onStepChange, onFlash, onCompleteState }) {
  const [step, setStep] = useState(1);
  const [input, setInput] = useState('');
  const [subject, setSubject] = useState('retrato');
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Aguardando permissão...');
  const scanInterval = useRef(null);
  const finishTimer = useRef(null);

  useEffect(() => {
    clearInterval(scanInterval.current);
    clearTimeout(finishTimer.current);
    setStep(1);
    setInput('');
    setIsScanning(false);
    setProgress(0);
    setStatus('Aguardando permissão...');
    onStepChange(1);
    onCompleteState(false);
  }, [resetToken]);

  useEffect(() => () => {
    clearInterval(scanInterval.current);
    clearTimeout(finishTimer.current);
  }, []);

  function changeStep(nextStep) {
    setStep(nextStep);
    onStepChange(nextStep);
    onCompleteState(nextStep === 3);
  }

  function continueToScan() {
    setSubject(detectSubject(input));
    setIsScanning(false);
    setProgress(0);
    setStatus('Aguardando permissão...');
    changeStep(2);
  }

  function startScan() {
    setIsScanning(true);
    let currentProgress = 0;
    const shortQuery = input.length > 20 ? `${input.substring(0, 18)}...` : (input || 'solicitação');
    const statusSteps = [
      { limit: 15, text: 'Iniciando câmera...' },
      { limit: 45, text: `Analisando objetivo: "${shortQuery}"...` },
      { limit: 70, text: 'Analisando iluminação do ambiente...' },
      { limit: 90, text: 'Calculando enquadramento ideal...' },
      { limit: 100, text: 'Gerando plano de captura...' },
    ];

    clearInterval(scanInterval.current);
    scanInterval.current = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      setStatus(statusSteps.find((item) => currentProgress <= item.limit)?.text || statusSteps.at(-1).text);

      if (currentProgress === 36 || currentProgress === 76) onFlash();

      if (currentProgress >= 100) {
        clearInterval(scanInterval.current);
        finishTimer.current = setTimeout(() => changeStep(3), 500);
      }
    }, 50);
  }

  return (
    <div className="ai-guided-view" style={{ display: 'flex' }}>
      {step === 1 && (
        <div className="guided-step">
          <h2 className="ai-guided-title">O que você deseja fotografar?</h2>
          <p className="ai-guided-subtitle">Descreva o seu objetivo em poucas palavras para receber instruções personalizadas da IA.</p>
          <div className="guided-input-box">
            <textarea
              className="guided-textarea"
              value={input}
              placeholder="Ex: Uma foto de um prato de macarrão na mesa, ou uma selfie com meus amigos na praia..."
              onChange={(event) => setInput(event.target.value)}
            />
            <button className="action-btn primary" onClick={continueToScan}>
              <span className="material-symbols-outlined">arrow_forward</span>
              Continuar
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="guided-step">
          <h2 className="ai-guided-title">Análise de Ambiente</h2>
          {!isScanning ? (
            <div className="scan-permission-box">
              <span className="material-symbols-outlined scan-icon-large">photo_camera_back</span>
              <p className="ai-guided-text">A JOVI AI precisa analisar as condições de iluminação e distância para criar o plano perfeito.</p>
              <button className="action-btn primary" onClick={startScan}>
                <span className="material-symbols-outlined">check_circle</span>
                Permitir Escaneamento
              </button>
            </div>
          ) : (
            <div className="scanning-status-box" style={{ display: 'flex' }}>
              <div className="spinner-glow" />
              <p className="scan-status-text">{status}</p>
              <div className="scan-progress-bar">
                <div className="scan-progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="guided-step">
          <h2 className="ai-guided-title">Como Configurar a Câmera</h2>
          <p className="ai-guided-subtitle">Siga este passo a passo para preparar o seu disparo:</p>
          <div className="plan-steps-container">
            {guidedPlans[subject].map((item, index) => (
              <div className="guided-step-item" key={item}>
                <div className="step-badge">{index + 1}</div>
                <div className="step-text-card"><FormattedText text={item} /></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
