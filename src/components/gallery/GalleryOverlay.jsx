import { useEffect, useState } from 'react';
import galleryPreview from '../../assets/gallery-preview.png';

const suggestions = [
  {
    icon: 'lightbulb',
    title: 'Iluminação',
    text: 'A luz de fundo está um pouco estourada. Na próxima captura, tente posicionar o assunto a favor da luz ou ative o modo HDR para equilibrar as sombras.',
  },
  {
    icon: 'grid_on',
    title: 'Composição',
    text: 'O objeto centralizado ficou ótimo, mas enquadrá-lo utilizando a regra dos terços (na interseção da direita) traria uma profundidade mais artística.',
  },
  {
    icon: 'psychology',
    title: 'Dica do Jovi AI',
    text: 'Experimente dar um toque longo na tela para travar o foco e a exposição (Bloqueio AE/AF) antes de disparar. Isso evitará desfoques acidentais em caso de movimento.',
  },
];

export default function GalleryOverlay({ isOpen, onClose }) {
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) setIsSuggestionsOpen(false);
  }, [isOpen]);

  function closeGallery() {
    setIsSuggestionsOpen(false);
    onClose();
  }

  return (
    <section className={`gallery-overlay${isOpen ? ' gallery-overlay-visible' : ''}`} id="gallery-overlay">
      <div className="gallery-panel">
        <div className="gallery-header">
          <button className="gallery-close-btn" aria-label="Voltar para Câmera" onClick={closeGallery}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="gallery-title">Galeria</span>
          <div style={{ width: '2rem' }} />
        </div>

        <div className="gallery-content">
          <img className="gallery-large-img" src={galleryPreview} alt="Photo preview" />
        </div>

        <div className="gallery-footer">
          <button className="action-btn primary" onClick={() => setIsSuggestionsOpen(true)}>
            <span className="material-symbols-outlined">auto_awesome</span>
            Sugestões IA
          </button>
        </div>

        <div className={`gallery-ai-sheet${isSuggestionsOpen ? ' gallery-ai-sheet-visible' : ''}`}>
          <div className="sheet-drag-handle" />
          <div className="sheet-header">
            <span className="material-symbols-outlined sheet-icon">auto_awesome</span>
            <span className="sheet-title">JOVI AI - Análise de Foto</span>
            <button className="sheet-close-btn" aria-label="Fechar sugestões" onClick={() => setIsSuggestionsOpen(false)}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="sheet-body">
            {suggestions.map((suggestion) => (
              <div className="suggestion-group" key={suggestion.title}>
                <div className="suggestion-header">
                  <span className="material-symbols-outlined text-primary">{suggestion.icon}</span>
                  <strong>{suggestion.title}</strong>
                </div>
                <p className="suggestion-text">{suggestion.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
