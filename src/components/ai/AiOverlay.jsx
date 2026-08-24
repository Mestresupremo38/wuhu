import { useEffect, useRef, useState } from 'react';
import AiChat from './AiChat.jsx';
import AiMenu from './AiMenu.jsx';
import AutomaticMode from './AutomaticMode.jsx';
import GuidedMode from './GuidedMode.jsx';

export default function AiOverlay({ isOpen, messages, onChangeMessages, onClose, onFlash }) {
  const [view, setView] = useState('menu');
  const [guidedStep, setGuidedStep] = useState(1);
  const [automaticStep, setAutomaticStep] = useState(1);
  const [guidedReset, setGuidedReset] = useState(0);
  const [automaticReset, setAutomaticReset] = useState(0);
  const [guidedComplete, setGuidedComplete] = useState(false);
  const [automaticComplete, setAutomaticComplete] = useState(false);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (isOpen && !wasOpen.current) {
      const keepGuided = view === 'guided' && guidedComplete;
      const keepAutomatic = view === 'auto' && automaticComplete;
      if (!keepGuided && !keepAutomatic) setView('menu');
    }
    wasOpen.current = isOpen;
  }, [isOpen, view, guidedComplete, automaticComplete]);

  function selectView(nextView) {
    setView(nextView);
    if (nextView === 'guided') setGuidedReset((value) => value + 1);
    if (nextView === 'auto') setAutomaticReset((value) => value + 1);
  }

  function goBack() {
    if (view === 'chat') {
      setView('menu');
      return;
    }

    if (view === 'guided' && guidedStep > 1) {
      setGuidedReset((value) => value + 1);
      return;
    }

    if (view === 'auto' && automaticStep > 1) {
      setAutomaticReset((value) => value + 1);
      return;
    }

    setView('menu');
  }

  return (
    <section className={`ai-overlay${isOpen ? ' ai-overlay-visible' : ''}`} id="ai-overlay">
      <div className="ai-panel">
        <div className="ai-header">
          <div className="ai-header-left">
            {view !== 'menu' && (
              <button className="ai-back-btn" aria-label="Voltar" onClick={goBack}>
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
            )}
            {view === 'menu' && <span className="ai-logo">AI</span>}
            <span className="ai-title">JOVI AI</span>
          </div>
          <button className="ai-close-btn" aria-label="Close AI" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {view === 'menu' && <AiMenu onSelect={selectView} />}
        {view === 'chat' && <AiChat messages={messages} onChangeMessages={onChangeMessages} />}
        {view === 'guided' && (
          <GuidedMode
            resetToken={guidedReset}
            onStepChange={setGuidedStep}
            onCompleteState={setGuidedComplete}
            onFlash={onFlash}
          />
        )}
        {view === 'auto' && (
          <AutomaticMode
            resetToken={automaticReset}
            onStepChange={setAutomaticStep}
            onCompleteState={setAutomaticComplete}
            onFlash={onFlash}
            onClose={onClose}
          />
        )}
      </div>
    </section>
  );
}
