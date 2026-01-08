
import React, { useState } from 'react';
import { evaluateSystemAccuracy } from '../services/geminiService';

const EvaluationDashboard: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [report, setReport] = useState<{ meanRecall: number, results: any[] } | null>(null);

  const runBenchmark = async () => {
    setIsRunning(true);
    try {
      const result = await evaluateSystemAccuracy();
      setReport(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-emerald-100 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-black text-emerald-950 uppercase tracking-tighter">System Performance Benchmark</h2>
          <p className="text-emerald-800/60 font-medium mt-2">
            Rigorously testing the recommendation engine against gold-standard train data.
          </p>
        </div>
        <button
          onClick={runBenchmark}
          disabled={isRunning}
          className={`px-10 py-4 rounded-full font-black text-sm tracking-widest transition-all shadow-xl ${
            isRunning 
            ? 'bg-emerald-100 text-emerald-400 cursor-not-allowed' 
            : 'bg-emerald-950 text-white hover:bg-emerald-800 active:scale-95 shadow-emerald-200'
          }`}
        >
          {isRunning ? 'RUNNING BENCHMARK...' : 'EXECUTE SYSTEM BENCHMARK'}
        </button>
      </div>

      {!report && !isRunning && (
        <div className="py-32 text-center border-2 border-dashed border-emerald-50 rounded-[3rem]">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-200">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          </div>
          <p className="text-emerald-900/40 text-xl font-bold">Waiting for benchmark initiation...</p>
        </div>
      )}

      {isRunning && (
        <div className="py-32 flex flex-col items-center justify-center">
           <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-6"></div>
           <p className="text-emerald-900 font-black text-lg uppercase tracking-widest animate-pulse">Processing Hybrid Retrieval Pipeline...</p>
        </div>
      )}

      {report && (
        <div className="space-y-12 animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-emerald-50 p-10 rounded-[2.5rem] border border-emerald-100 flex flex-col justify-center">
              <div className="text-[12px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-3">Primary Accuracy Metric</div>
              <div className="text-6xl font-black text-emerald-950">{(report.meanRecall * 100).toFixed(1)}%</div>
              <div className="text-sm font-bold text-emerald-900/60 mt-2">Mean Recall@10 Score</div>
            </div>
            
            <div className="bg-emerald-950 p-10 rounded-[2.5rem] text-white md:col-span-2 shadow-2xl shadow-emerald-900/20">
               <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-6">Evaluation Methodology</div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-sm text-emerald-100">Vector Semantic Match</h4>
                      <p className="text-[11px] text-emerald-100/40 font-medium">Initial retrieval stage measuring embeddings alignment.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-sm text-emerald-100">Prompt Interleaving</h4>
                      <p className="text-[11px] text-emerald-100/40 font-medium">Re-ranking stage applying hard/soft skill balancing.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-sm text-emerald-100">Normalized Recall@10</h4>
                      <p className="text-[11px] text-emerald-100/40 font-medium">Fraction of relevant items found in top 10 results.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-sm text-emerald-100">Gold Standard Train Set</h4>
                      <p className="text-[11px] text-emerald-100/40 font-medium">Validated against industry-expert labeled queries.</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-emerald-50">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-50/50">
                  <th className="py-6 px-8 text-xs font-black text-emerald-900 uppercase tracking-widest">Test Query Intent</th>
                  <th className="py-6 px-4 text-xs font-black text-emerald-900 uppercase tracking-widest text-center">Expected</th>
                  <th className="py-6 px-4 text-xs font-black text-emerald-900 uppercase tracking-widest text-center">Matches</th>
                  <th className="py-6 px-8 text-xs font-black text-emerald-900 uppercase tracking-widest text-right">Recall@10</th>
                </tr>
              </thead>
              <tbody>
                {report.results.map((res, i) => (
                  <tr key={i} className="border-b border-emerald-50 hover:bg-emerald-50/20 transition-colors">
                    <td className="py-6 px-8">
                      <div className="text-sm font-bold text-emerald-950 leading-relaxed">{res.query}</div>
                    </td>
                    <td className="py-6 px-4 text-center">
                      <span className="text-sm font-black text-emerald-800/40">{res.expected}</span>
                    </td>
                    <td className="py-6 px-4 text-center">
                      <span className="text-sm font-black text-emerald-600">{res.found}</span>
                    </td>
                    <td className="py-6 px-8 text-right">
                       <span className={`text-xs font-black px-4 py-1.5 rounded-full ${res.recall > 0.7 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {(res.recall * 100).toFixed(0)}%
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationDashboard;
