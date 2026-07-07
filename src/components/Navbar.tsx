import { Settings } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between px-6 py-3 bg-white/70 backdrop-blur-md border border-[#e8eaed] rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0ea5e9] flex items-center justify-center text-white shadow-[0_2px_8px_rgba(14,165,233,0.2)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </div>
            <span className="font-bold text-sm tracking-tight text-[#1a1f26]">
              CrystalAI
            </span>
          </div>
          
          <div className="hidden sm:flex items-center gap-8 text-[13px] font-medium text-[#64748b]">
            <a href="#features" className="hover:text-[#1a1f26] transition-colors">Features</a>
            <a href="#predictor" className="hover:text-[#1a1f26] transition-colors">Predictor</a>
            <a href="#process" className="hover:text-[#1a1f26] transition-colors">How It Works</a>
          </div>

          <a
            href="#predictor"
            className="text-xs font-semibold bg-[#0ea5e9] text-white px-4 py-2.5 rounded-full hover:bg-[#0284c7] transition-all duration-200 shadow-[0_2px_8px_rgba(14,165,233,0.15)]"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
