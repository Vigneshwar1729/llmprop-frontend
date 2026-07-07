const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-[#e8eaed] bg-white reveal">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left column: Logo + Tagline */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-[#0ea5e9] flex items-center justify-center text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </div>
          <span className="font-bold text-xs tracking-tight text-[#1a1f26]">CrystalAI</span>
          <span className="text-[10px] font-bold text-[#8a99ad] uppercase tracking-wider">· AI-powered material science</span>
        </div>

        {/* Center column: Nav links */}
        <div className="flex items-center gap-6 text-xs font-semibold text-[#64748b]">
          <a href="#features" className="hover:text-[#1a1f26] transition-colors">Features</a>
          <a href="#predictor" className="hover:text-[#1a1f26] transition-colors">Predictor</a>
          <a href="#process" className="hover:text-[#1a1f26] transition-colors">How It Works</a>
        </div>

        {/* Right column: Copyright */}
        <p className="text-[10px] font-bold text-[#8a99ad] uppercase tracking-wider">
          © {new Date().getFullYear()} CrystalAI. Built for researchers.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
