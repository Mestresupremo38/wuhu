import { useEffect, useRef } from 'react';

const modes = ['Night', 'Portrait', 'Photo', 'Video', 'Mais'];

export default function ModePicker({ activeMode, onSelectMode }) {
  const activeItemRef = useRef(null);

  useEffect(() => {
    activeItemRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [activeMode]);

  return (
    <nav className="mode-picker" aria-label="Camera Modes">
      <div className="mode-list">
        {modes.map((mode) => (
          <button
            className={`mode-item${activeMode === mode ? ' active' : ''}`}
            key={mode}
            ref={activeMode === mode ? activeItemRef : null}
            onClick={() => onSelectMode(mode)}
          >
            {mode}
          </button>
        ))}
      </div>
    </nav>
  );
}
