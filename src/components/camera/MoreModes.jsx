const extraModes = [
  ['aperture', 'PRO'],
  ['panorama', 'PANORAMA'],
  ['slow_motion_video', 'CÂMERA LENTA'],
  ['timelapse', 'TIME-LAPSE'],
  ['nights_stay', 'NOITE+'],
  ['document_scanner', 'DOCUMENTO'],
  ['flare', 'ASTRO'],
  ['camera_enhance', 'PROFISSIONAL'],
  ['edit', 'INSTANTÂNEO'],
  ['restaurant', 'COMIDA'],
  ['split_screen', 'VISUALIZAÇÃO DUPLA'],
  ['motion_photos_on', 'FOTO EM MOVIMENTO'],
];

export default function MoreModes() {
  return (
    <>
      <div className="grid-pattern" />
      <div className="more-viewfinder-grid">
        <div className="modes-grid">
          {extraModes.map(([icon, label]) => (
            <div className="mode-option" key={label}>
              <div className="mode-icon-wrapper">
                <span className="material-symbols-outlined">{icon}</span>
              </div>
              <span className="mode-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
