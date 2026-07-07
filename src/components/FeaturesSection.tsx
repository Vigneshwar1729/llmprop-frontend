import { Zap, Database, Shield, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Predictions",
    description: "Get band gap predictions in seconds. No lengthy simulations or DFT calculations required.",
  },
  {
    icon: Database,
    title: "Trained on 50K+ Crystals",
    description: "Our model is trained on extensive crystallographic databases for high accuracy.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analysis",
    description: "Receive classification, confidence scores, and material property insights alongside predictions.",
  },
  {
    icon: Shield,
    title: "Research Grade",
    description: "Published accuracy benchmarks and transparent methodology you can trust in your research.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-28 px-6 bg-[#f7f8fa] border-y border-[#e8eaed] reveal">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold text-[#0ea5e9] bg-[#0ea5e9]/10 px-3 py-1 rounded-full uppercase tracking-wider">Features</span>
          <h2 className="text-4xl font-extrabold text-[#1a1f26] tracking-[-1.2px] mt-4 mb-3">
            Why CrystalAI?
          </h2>
          <p className="text-sm text-[#64748b] max-w-[400px] mx-auto leading-relaxed">
            Purpose-built for computational materials science researchers and engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="relative overflow-hidden bg-white border border-[#e8eaed] rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(14,165,233,0.05)] transition-all duration-300 group"
            >
              {/* Cyan top accent line appearing on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#0ea5e9] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              
              <div className="w-10 h-10 rounded-xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center mb-5 group-hover:bg-[#0ea5e9]/15 transition-colors">
                <f.icon className="w-5 h-5" />
              </div>
              
              <h3 className="font-extrabold text-sm text-[#1a1f26] mb-2">{f.title}</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
