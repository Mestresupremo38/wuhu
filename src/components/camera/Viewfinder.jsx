import backCameraImage from '../../assets/imagem1.png';
import frontCameraImage from '../../assets/imagem2.png';
import MoreModes from './MoreModes.jsx';

export default function Viewfinder({ isFrontCamera, isMoreScreen }) {
  return (
    <div className="viewfinder-layer">
      {isMoreScreen ? (
        <MoreModes />
      ) : (
        <img
          className="camera-view"
          src={isFrontCamera ? frontCameraImage : backCameraImage}
          alt="Camera view"
          style={{ transform: isFrontCamera ? 'scaleX(-1)' : 'scaleX(1)' }}
        />
      )}
      <div className="scanline" aria-hidden="true" />
      <div className="viewfinder-overlay" aria-hidden="true" />
    </div>
  );
}
