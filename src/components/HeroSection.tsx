import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative pt-32 md:pt-40 pb-20">
      <section className="max-w-[1200px] mx-auto px-6 flex flex-col items-center text-center reveal">
        {/* Badge */}
        <div className="hero-badge">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] animate-pulse" />
          AI-Powered Material Science
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-[-2px] text-[#1a1f26] max-w-4xl leading-[1.05]">
          Predict Crystal
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0ea5e9] to-[#2563eb]">Band Gaps</span> Instantly
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-[#64748b] max-w-[540px] leading-relaxed">
          Accelerating materials discovery with state-of-the-art deep learning. 
          Predict electronic properties directly from crystal symmetries.
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5">
          <a
            href="#predictor"
            className="glow-button font-semibold text-xs px-8 py-3.5 rounded-full"
          >
            Try the Predictor
          </a>
          <a
            href="#features"
            className="text-xs font-semibold text-[#475569] bg-white border border-[#e2e8f0] px-8 py-3.5 rounded-full hover:border-[#0ea5e9]/30 transition-all duration-200"
          >
            Learn More
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 mb-24">
          <ArrowDown className="w-4 h-4 text-[#8a99ad] animate-bounce" />
        </div>
      </section>

      {/* Stats Banner */}
      <section className="max-w-[1200px] mx-auto px-6 mb-24 reveal">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-8 py-10 bg-white border border-[#e8eaed] rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.015)]">
          <div className="text-center">
            <h3 className="text-3xl font-extrabold tracking-tight text-[#1a1f26] mb-1">50K+</h3>
            <p className="text-[10px] font-bold text-[#8a99ad] uppercase tracking-wider">Crystals Trained</p>
          </div>
          <div className="text-center border-t md:border-t-0 md:border-l border-[#e8eaed] pt-6 md:pt-0">
            <h3 className="text-3xl font-extrabold tracking-tight text-[#1a1f26] mb-1">98.2%</h3>
            <p className="text-[10px] font-bold text-[#8a99ad] uppercase tracking-wider">Prediction Accuracy</p>
          </div>
          <div className="text-center border-t md:border-t-0 md:border-l border-[#e8eaed] pt-6 md:pt-0">
            <h3 className="text-3xl font-extrabold tracking-tight text-[#1a1f26] mb-1">&lt;1s</h3>
            <p className="text-[10px] font-bold text-[#8a99ad] uppercase tracking-wider">Prediction Speed</p>
          </div>
          <div className="text-center border-t md:border-t-0 md:border-l border-[#e8eaed] pt-6 md:pt-0">
            <h3 className="text-3xl font-extrabold tracking-tight text-[#1a1f26] mb-1">12K+</h3>
            <p className="text-[10px] font-bold text-[#8a99ad] uppercase tracking-wider">Researchers Using</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
