import { useEffect, useRef, useState } from 'react';
import AiOverlay from '../ai/AiOverlay.jsx';
import GalleryOverlay from '../gallery/GalleryOverlay.jsx';
import CameraControls from './CameraControls.jsx';
import CameraHeader from './CameraHeader.jsx';
import ModePicker from './ModePicker.jsx';
import Viewfinder from './Viewfinder.jsx';
import { initialMessages, loadCameraState, saveCameraState } from '../../utils/storage.js';

function FlashEffect() {
  return (
    <div
      aria-hidden="true"
      className="capture-flash"
      style={{
        position: 'absolute',
        inset: 0,
        background: '#fff',
        opacity: 0.8,
        pointerEvents: 'none',
        zIndex: 100,
        animation: 'captureFlash 200ms ease-out forwards',
      }}
    />
  );
}

export default function CameraScreen() {
  const savedState = useRef(loadCameraState()).current;
  const [activeMode, setActiveMode] = useState(savedState.activeMode || 'Photo');
  const [isMoreScreen, setIsMoreScreen] = useState(savedState.activeMode === 'Mais');
  const [isFrontCamera, setIsFrontCamera] = useState(savedState.isFrontCamera || false);
  const [messages, setMessages] = useState(savedState.messages?.length ? savedState.messages : initialMessages);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [flashId, setFlashId] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const transitionTimers = useRef([]);
  const flashTimer = useRef(null);

  useEffect(() => {
    saveCameraState({ activeMode, isFrontCamera, messages });
  }, [activeMode, isFrontCamera, messages]);

  useEffect(() => () => {
    transitionTimers.current.forEach(clearTimeout);
    clearTimeout(flashTimer.current);
  }, []);

  function runTransition(action) {
    transitionTimers.current.forEach(clearTimeout);
    setIsTransitioning(true);
    transitionTimers.current = [
      setTimeout(action, 300),
      setTimeout(() => setIsTransitioning(false), 600),
    ];
  }

  function handleModeChange(mode) {
    if (mode === activeMode && isMoreScreen === (mode === 'Mais')) return;
    runTransition(() => {
      setActiveMode(mode);
      setIsMoreScreen(mode === 'Mais');
    });
  }

  function handleFlipCamera() {
    runTransition(() => setIsFrontCamera((current) => !current));
  }

  function triggerFlash() {
    setFlashId((current) => current + 1);
    setIsFlashing(true);
    clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setIsFlashing(false), 220);
  }

  return (
    <main className={`app-container${isTransitioning ? ' mode-transitioning' : ''}`} id="camera-app">
      <Viewfinder isFrontCamera={isFrontCamera} isMoreScreen={isMoreScreen} />
      <CameraHeader />
      <ModePicker activeMode={activeMode} onSelectMode={handleModeChange} />
      <CameraControls
        isMoreScreen={isMoreScreen}
        onGallery={() => setIsGalleryOpen(true)}
        onShutter={triggerFlash}
        onFlip={handleFlipCamera}
        onAi={() => setIsAiOpen(true)}
      />

      {!isMoreScreen && (
        <>
          <AiOverlay
            isOpen={isAiOpen}
            messages={messages}
            onChangeMessages={setMessages}
            onClose={() => setIsAiOpen(false)}
            onFlash={triggerFlash}
          />
          <GalleryOverlay isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
        </>
      )}

      {isFlashing && <FlashEffect key={flashId} />}
    </main>
  );
}
