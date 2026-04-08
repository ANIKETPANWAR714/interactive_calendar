import { MoonIcon, SunIcon } from './Icons';

const Header = ({ theme, onToggleTheme }) => {
  return (
    <div className="top-bar">
      <button
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        <span>{theme === 'light' ? 'Midnight Mode' : 'Nature Mode'}</span>
      </button>
    </div>
  );
};

export default Header;
