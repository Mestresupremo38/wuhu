const STORAGE_KEY = 'jovi-camera-state';

export const initialMessages = [
  {
    id: 'welcome',
    text: 'Olá! Sou a JOVI AI. Como posso ajudar com sua foto?',
    isUser: false,
  },
];

export function loadCameraState() {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    if (!storedValue) return {};

    const parsedValue = JSON.parse(storedValue);
    return {
      activeMode: typeof parsedValue.activeMode === 'string' ? parsedValue.activeMode : undefined,
      isFrontCamera: typeof parsedValue.isFrontCamera === 'boolean' ? parsedValue.isFrontCamera : undefined,
      messages: Array.isArray(parsedValue.messages) ? parsedValue.messages : undefined,
    };
  } catch {
    return {};
  }
}

export function saveCameraState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // A câmera continua funcionando mesmo se o armazenamento estiver indisponível.
  }
}
