import { Edit3Icon } from './Icons';

const Notes = ({ title, content, onChange, error, onDismissError }) => {
  return (
    <div className="notes-section">
      <div className="notes-header">
        <span>{title}</span>
        <Edit3Icon />
      </div>
      {error && (
        <div className="notes-error" role="alert">
          <span>{error}</span>
          <button
            className="notes-error-dismiss"
            onClick={onDismissError}
            aria-label="Dismiss error"
          >
            ✕
          </button>
        </div>
      )}
      <textarea
        className="notes-area"
        placeholder="Jot down a memo..."
        value={content}
        onChange={onChange}
        aria-label="Notes textarea"
      />
    </div>
  );
};

export default Notes;
