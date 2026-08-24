import { useEffect, useRef, useState } from 'react';
import { automaticPlans, detectSubject } from '../../data/aiPlans.js';

function FormattedText({ text }) {
  return text.split(/(\*\*.*?\*\*)/g).map((part, index) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>
      : part,
  );
}

export default function AutomaticMode({ resetToken, onStepChange, onFlash, onClose, onCompleteState }) {
  const [step, setStep] = useState(1);
  const [input, setInput] = useState('');
  const [subject, setSubject] = useState('retrato');
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Aguardando permissão...');
  const [isApplied, setIsApplied] = useState(false);
  const scanInterval = useRef(null);
  const finishTimer = useRef(null);
  const applyTimer = useRef(null);

  useEffect(() => {
    clearInterval(scanInterval.current);
    clearTimeout(finishTimer.current);
    clearTimeout(applyTimer.current);
    setStep(1);
    setInput('');
    setIsScanning(false);
    setProgress(0);
    setIsApplied(false);
    onStepChange(1);
    onCompleteState(false);
  }, [resetToken]);

  useEffect(() => () => {
    clearInterval(scanInterval.current);
    clearTimeout(finishTimer.current);
    clearTimeout(applyTimer.current);
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
    setIsApplied(false);
    setStatus('Aguardando permissão...');
    changeStep(2);
  }

  function startScan() {
    setIsScanning(true);
    let currentProgress = 0;
    const shortQuery = input.length > 20 ? `${input.substring(0, 18)}...` : (input || 'solicitação');
    const statusSteps = [
      { limit: 15, text: 'Iniciando câmera...' },
      { limit: 45, text: `Analisando: "${shortQuery}"...` },
      { limit: 70, text: 'Medindo luz e foco...' },
      { limit: 90, text: 'Calculando parâmetros ideais...' },
      { limit: 100, text: 'Otimização concluída...' },
    ];

    clearInterval(scanInterval.current);
    scanInterval.current = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      setStatus(statusSteps.find((item) => currentProgress <= item.limit)?.text || statusSteps.at(-1).text);

      if (currentProgress === 36 || currentProgress === 76) onFlash();

      if (currentProgress >= 100) {
        clearInterval(scanInterval.current);
        finishTimer.current = setTimeout(() => {
          changeStep(3);
          applyTimer.current = setTimeout(() => setIsApplied(true), 3000);
        }, 500);
      }
    }, 50);
  }

  function finishCapture() {
    onFlash();
    onClose();
  }

  return (
    <div className="ai-auto-view" style={{ display: 'flex' }}>
      {step === 1 && (
        <div className="auto-step">
          <h2 className="ai-auto-title">O que deseja fotografar?</h2>
          <p className="ai-auto-subtitle">Descreva em poucas palavras para que a IA otimize a câmera automaticamente.</p>
          <div className="auto-input-box">
            <textarea
              className="auto-textarea"
              value={input}
              placeholder="Ex: Foto de uma flor com fundo desfocado, ou grupo de pessoas sob pouca luz..."
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
        <div className="auto-step">
          <h2 className="ai-auto-title">Análise de Ambiente</h2>
          {!isScanning ? (
            <div className="scan-permission-box">
              <span className="material-symbols-outlined scan-icon-large">blur_on</span>
              <p className="ai-auto-text">A JOVI AI analisará o ambiente e aplicará as melhores configurações automaticamente.</p>
              <button className="action-btn primary" onClick={startScan}>
                <span className="material-symbols-outlined">check_circle</span>
                Permitir e Otimizar
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
        <div className="auto-step">
          <h2 className="ai-auto-title">Otimização Inteligente</h2>
          <p className="ai-auto-subtitle">Parâmetros que a IA está aplicando no dispositivo:</p>
          <div className="plan-steps-container">
            {automaticPlans[subject].map((item, index) => (
              <div className="guided-step-item" key={item}>
                <div className="step-badge">{index + 1}</div>
                <div className="step-text-card"><FormattedText text={item} /></div>
              </div>
            ))}
          </div>
          <div className="impl-status-box">
            {!isApplied ? (
              <div className="impl-loading">
                <div className="mini-spinner" />
                <span>Configurando câmera...</span>
              </div>
            ) : (
              <div className="impl-success">
                <span className="material-symbols-outlined success-icon">verified</span>
                <span>Configurações aplicadas com sucesso!</span>
              </div>
            )}
          </div>
          {isApplied && (
            <button className="action-btn primary" style={{ marginTop: '1rem' }} onClick={finishCapture}>
              <span className="material-symbols-outlined">photo_camera</span>
              Capturar Agora
            </button>
          )}
        </div>
      )}
    </div>
  );
}
