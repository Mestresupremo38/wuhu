import galleryPreview from '../../assets/gallery-preview.png';

export default function CameraControls({ isMoreScreen, onGallery, onShutter, onFlip, onAi }) {
  return (
    <footer>
      <button className="gallery-btn" aria-label="Open Gallery" onClick={isMoreScreen ? undefined : onGallery}>
        <img alt="Recent photo preview" className="gallery-img" src={galleryPreview} />
      </button>

      <div
        className="shutter-container"
        style={isMoreScreen ? { opacity: 0, pointerEvents: 'none' } : undefined}
      >
        <div className="shutter-glow" aria-hidden="true" />
        <button className="shutter-btn" aria-label="Take photo" onClick={onShutter}>
          <div className="shutter-inner">
            <div className="shutter-core" />
          </div>
        </button>
      </div>

      <div className="flip-wrapper">
        <button className="flip-btn" aria-label="Switch camera" onClick={isMoreScreen ? undefined : onFlip}>
          <span className="material-symbols-outlined">flip_camera_ios</span>
        </button>
        <button className="ai-btn" aria-label="AI Mode" onClick={isMoreScreen ? undefined : onAi}>
          AI
        </button>
      </div>
    </footer>
  );
}
