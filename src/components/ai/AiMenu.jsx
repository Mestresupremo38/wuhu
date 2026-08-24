const options = [
  ['chat', 'Dúvidas (chatbot)', 'Converse com o assistente inteligente', 'chat'],
  ['explore', 'Modo guiado', 'Instruções passo a passo para fotos', 'guided'],
  ['auto_awesome', 'Modo automático', 'Otimização inteligente da cena', 'auto'],
];

export default function AiMenu({ onSelect }) {
  return (
    <div className="ai-menu-view">
      <h2 className="ai-menu-title">Selecione uma opção</h2>
      <div className="ai-menu-options">
        {options.map(([icon, title, description, view]) => (
          <button className="ai-menu-btn" key={view} onClick={() => onSelect(view)}>
            <span className="material-symbols-outlined menu-icon">{icon}</span>
            <span className="menu-btn-content">
              <span className="menu-btn-title">{title}</span>
              <span className="menu-btn-desc">{description}</span>
            </span>
            <span className="material-symbols-outlined arrow-icon">chevron_right</span>
          </button>
        ))}
      </div>
    </div>
  );
}
