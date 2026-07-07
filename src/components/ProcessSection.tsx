const ProcessSection = () => {
  return (
    <section id="process" className="max-w-[1200px] mx-auto px-6 py-28 reveal">
      <div className="text-center mb-16">
        <span className="text-[10px] font-bold text-[#0ea5e9] bg-[#0ea5e9]/10 px-3 py-1 rounded-full uppercase tracking-wider">Methodology</span>
        <h2 className="text-4xl font-extrabold text-[#1a1f26] tracking-[-1.2px] mt-4 mb-3">How It Works</h2>
        <p className="text-sm text-[#64748b] max-w-[420px] mx-auto leading-relaxed">
          Three simple steps to predict crystal band gaps using our deep learning framework.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
        {/* Dotted Line Connection for desktop */}
        <div className="absolute top-[32px] left-[15%] right-[15%] h-[2px] dotted-line -z-10 hidden md:block"></div>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-white border border-[#e8eaed] flex items-center justify-center font-bold text-lg text-[#1a1f26] shadow-sm mb-6">
            01
          </div>
          <h3 className="font-bold text-sm text-[#1a1f26] mb-2">Input Crystal Data</h3>
          <p className="text-xs text-[#64748b] max-w-[240px] leading-relaxed">
            Paste your CIF, POSCAR, or simply type the chemical formula and space group of your material.
          </p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-white border border-[#e8eaed] flex items-center justify-center font-bold text-lg text-[#1a1f26] shadow-sm mb-6">
            02
          </div>
          <h3 className="font-bold text-sm text-[#1a1f26] mb-2">Run AI Prediction</h3>
          <p className="text-xs text-[#64748b] max-w-[240px] leading-relaxed">
            Press predict to send the descriptor to the Hugging Face space running the LLM-Prop framework.
          </p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-white border border-[#e8eaed] flex items-center justify-center font-bold text-lg text-[#1a1f26] shadow-sm mb-6">
            03
          </div>
          <h3 className="font-bold text-sm text-[#1a1f26] mb-2">Analyze Band Gap</h3>
          <p className="text-xs text-[#64748b] max-w-[240px] leading-relaxed">
            Receive your band gap measurement, material classification category, and prediction confidence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
