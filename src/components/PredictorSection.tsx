import { useState } from "react";
import { ArrowRight, Loader2, FlaskConical, AlertCircle } from "lucide-react";

const EXAMPLES = [
  { label: "Silicon (Si)", value: "Si\nFd-3m (227)\na=5.431 Å" },
  { label: "GaAs", value: "GaAs\nF-43m (216)\na=5.653 Å" },
  { label: "TiO₂", value: "TiO2\nP42/mnm (136)\na=4.594 Å, c=2.959 Å" },
];

interface PredictionResult {
  value: string;
  classification: string;
  confidence: number;
}

const PredictorSection = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("https://vignesh1729-llmprop-demo.hf.space/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: input }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status} Error`);
      }

      const data = await response.json();
      setResult(data.prediction);
    } catch (err: any) {
      console.error("Prediction failed:", err);
      setError(err.message || "Failed to connect to the prediction backend.");
    } finally {
      setLoading(false);
    }
  };

  const getBadgeStyle = (cls: string) => {
    if (cls.includes('Metal')) {
      return { backgroundColor: 'rgba(100, 116, 139, 0.08)', color: '#64748b' };
    } else if (cls.includes('Insulator')) {
      return { backgroundColor: 'rgba(239, 68, 68, 0.08)', color: '#ef4444' };
    } else {
      return { backgroundColor: 'rgba(14, 165, 233, 0.08)', color: '#0ea5e9' };
    }
  };

  return (
    <section id="predictor" className="py-28 px-6 reveal">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[10px] font-bold text-[#0ea5e9] bg-[#0ea5e9]/10 px-3 py-1 rounded-full uppercase tracking-wider">Predictor</span>
          <h2 className="text-4xl font-extrabold text-[#1a1f26] tracking-[-1.2px] mt-4 mb-3">
            Try It Now
          </h2>
          <p className="text-sm text-[#64748b] max-w-[400px] mx-auto leading-relaxed">
            Enter a crystal structure or formula to get an instant band gap prediction.
          </p>
        </div>

        <div className="glass-card p-6 sm:p-8 bg-white border border-[#e8eaed] rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.015)]">
          {/* Quick examples */}
          <div className="flex flex-wrap gap-2 mb-5">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                onClick={() => {
                  setInput(ex.value);
                  setError(null);
                }}
                className="text-xs px-3.5 py-1.5 rounded-full bg-[#f1f5f9] text-[#475569] hover:bg-[#0ea5e9]/10 hover:text-[#0ea5e9] transition-all duration-200 font-semibold"
              >
                {ex.label}
              </button>
            ))}
            <button
              onClick={() => {
                setInput("");
                setResult(null);
                setError(null);
              }}
              className="text-xs px-3.5 py-1.5 rounded-full border border-[#e2e8f0] text-[#64748b] hover:bg-slate-50 transition-all font-semibold"
            >
              Custom Input
            </button>
          </div>

          {/* Input */}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste crystal structure data (CIF, POSCAR) or enter formula..."
            rows={5}
            className="w-full rounded-xl bg-[#fafbfa] border border-[#e2e8f0] px-4 py-3 text-sm text-[#1a1f26] placeholder:text-[#8a99ad]/60 focus:outline-none focus:ring-1 focus:ring-[#0ea5e9]/30 focus:border-[#0ea5e9]/50 transition-all resize-none font-mono"
          />

          {/* Predict CTA button */}
          <button
            onClick={handlePredict}
            disabled={loading || !input.trim()}
            className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-[#0ea5e9] text-white font-bold py-3.5 px-6 text-xs hover:bg-[#0284c7] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#0ea5e9]/20"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing Structure...
              </>
            ) : (
              <>
                Predict Band Gap →
              </>
            )}
          </button>

          {/* Error Banner */}
          {error && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50/50 p-5 flex items-start gap-3 text-red-600 animate-fade-in">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider mb-1">Prediction Error</h4>
                <p className="text-xs font-semibold text-red-500">{error}</p>
              </div>
            </div>
          )}

          {/* Result Output Panel */}
          {result && (
            <div className="mt-6 rounded-2xl border border-[#0ea5e9]/18 bg-[#0ea5e9]/2 p-5 animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center shrink-0 mt-0.5">
                  <FlaskConical className="w-5 h-5" />
                </div>
                
                <div className="grow">
                  <p className="text-[10px] font-bold text-[#8a99ad] uppercase tracking-wider mb-1">
                    Predicted Band Gap
                  </p>
                  
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold text-[#1a1f26] tracking-tight">
                      {result.value}
                    </span>
                    <span className="text-xs text-[#8a99ad] font-semibold">eV</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-3">
                    <span
                      className="inline-block text-[10px] font-bold px-2.5 py-1 rounded-md"
                      style={getBadgeStyle(result.classification)}
                    >
                      {result.classification}
                    </span>
                    <span className="text-[10px] font-bold text-[#8a99ad]">
                      Confidence: {result.confidence.toFixed(1)}%
                    </span>
                  </div>

                  {/* Confidence Progress Bar */}
                  <div className="w-full bg-[#e8eaed] h-1.5 rounded-full mt-4 overflow-hidden">
                    <div
                      className="bg-[#0ea5e9] h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${result.confidence}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PredictorSection;
