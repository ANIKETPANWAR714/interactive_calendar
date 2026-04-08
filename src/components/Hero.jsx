const Hero = ({ month, year }) => {
  return (
    <div className="hero-section">
      <img src="/hero.png" alt={`${month} ${year} calendar`} className="hero-image" />
      <div className="hero-overlay">
        <div className="hero-date-info">
          <div className="hero-month">{month}</div>
          <div className="hero-year">{year}</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
