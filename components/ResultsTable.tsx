
import React from 'react';
import { Assessment } from '../types';

interface ResultsTableProps {
  results: Assessment[];
}

const TYPE_MAP: Record<string, string> = {
  "Ability & Aptitude": "A",
  "Biodata & Situational Judgement": "B",
  "Competencies": "C",
  "Development & 360": "D",
  "Assessment Exercises": "E",
  "Knowledge & Skills": "K",
  "Personality & Behavior": "P",
  "Simulations": "S"
};

const RANK_CONFIG = {
  Primary: {
    label: 'PRIMARY RECOMMENDATION',
    badge: 'bg-[#059669] text-white',
    card: 'border-emerald-200 shadow-emerald-100 shadow-2xl scale-[1.01]',
    icon: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
  },
  Secondary: {
    label: 'SECONDARY MATCH',
    badge: 'bg-[#2563eb] text-white',
    card: 'border-blue-100 shadow-blue-50',
    icon: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
  },
  Tertiary: {
    label: 'ADDITIONAL CONTEXT',
    badge: 'bg-[#475569] text-white',
    card: 'border-slate-100 shadow-slate-50 opacity-95',
    icon: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>
  }
};

const AssessmentCard: React.FC<{ item: Assessment }> = ({ item }) => {
  const rank = item.ranking_label || 'Tertiary';
  const config = RANK_CONFIG[rank as keyof typeof RANK_CONFIG] || RANK_CONFIG.Tertiary;

  return (
    <div className={`group glass p-8 rounded-[2.5rem] border transition-all duration-500 flex flex-col relative ${config.card}`}>
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-4">
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest ${config.badge} w-fit shadow-md shadow-emerald-900/10`}>
            {config.icon}
            {config.label}
          </div>
          <div className="flex flex-wrap gap-2">
            {item.test_type.map((t, i) => {
              const code = TYPE_MAP[t] || '?';
              return (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-6 h-6 flex items-center justify-center bg-[#2d2d2d] text-white text-[10px] font-black rounded shadow-sm">
                    {code}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100/30 text-emerald-800 text-[10px] font-bold tracking-tight border border-emerald-100/50">
                    {t}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="text-slate-900 font-extrabold text-lg bg-[#f8fafc] px-5 py-1.5 rounded-full shadow-inner border border-slate-100">
          {item.duration}m
        </div>
      </div>

      <h4 className="text-2xl font-black text-slate-800 group-hover:text-emerald-600 transition-colors mb-4 leading-tight">
        {item.name}
      </h4>
      
      <p className="text-slate-600 text-sm font-medium leading-relaxed mb-8 flex-grow">
        {item.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100/60">
        <div className="flex gap-4">
          {item.adaptive_support === "Yes" && (
            <div className="flex items-center gap-1.5" title="Adaptive Testing">
              <div className="w-5 h-5 bg-[#10b981] rounded-full flex items-center justify-center text-white">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-tighter">Adaptive</span>
            </div>
          )}
          {item.remote_support === "Yes" && (
            <div className="flex items-center gap-1.5" title="Remote Proctoring Available">
              <div className="w-5 h-5 bg-[#34d399] rounded-full flex items-center justify-center text-white">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-tighter">Remote</span>
            </div>
          )}
        </div>
        
        <a 
          href={item.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#1e293b] text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-all active:scale-95 shadow-lg shadow-slate-200"
        >
          <span>View Solution</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </a>
      </div>
    </div>
  );
};

const TestTypeLegend: React.FC = () => (
  <div className="flex flex-col items-center justify-center bg-white p-8 rounded-[3rem] border border-white/40 shadow-xl shadow-emerald-900/10 max-w-[340px] mx-auto md:mx-0">
    <h4 className="text-xl font-extrabold text-[#1e293b] mb-6 tracking-tight">Test Type</h4>
    
    <div className="flex gap-2.5 mb-10">
      {['A', 'B', 'C', 'D'].map(code => (
        <span key={code} className="w-9 h-9 flex items-center justify-center bg-[#2d2d2d] text-white text-xs font-black rounded-lg shadow-md">
          {code}
        </span>
      ))}
    </div>

    <div className="w-full border-2 border-slate-100 rounded-2xl p-6 space-y-3 relative bg-white shadow-sm">
      {Object.entries(TYPE_MAP)
        .sort((a, b) => a[1].localeCompare(b[1]))
        .map(([name, code]) => (
        <div key={code} className="flex items-center gap-3.5 group">
          <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center bg-[#2d2d2d] text-white text-[10px] font-black rounded shadow-sm">
            {code}
          </span>
          <span className="text-[13px] font-bold text-slate-500 group-hover:text-slate-900 transition-colors">{name}</span>
        </div>
      ))}
      {/* Small arrow indicator seen in screenshot */}
      <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-slate-100 rotate-45"></div>
    </div>
  </div>
);

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  if (results.length === 0) return null;

  const primary = results.filter(r => r.ranking_label === 'Primary');
  const secondary = results.filter(r => r.ranking_label === 'Secondary');
  const tertiary = results.filter(r => r.ranking_label === 'Tertiary');

  return (
    <div className="space-y-24">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
        <div className="flex-1">
          <h3 className="text-4xl md:text-5xl font-black text-[#1e293b] tracking-tighter leading-tight">
            Intelligent Ranking Results<span className="text-emerald-500">.</span>
          </h3>
          <p className="text-slate-500 font-medium mt-8 max-w-2xl text-lg leading-relaxed">
            Prioritized by relevance using our <span className="text-emerald-600 font-extrabold">Balanced Intelligence</span> logic, mapping Knowledge (K) and Personality (P) assessments to your specific hiring intent.
          </p>
        </div>
        
        <TestTypeLegend />
      </div>
      
      {/* Primary Section */}
      {primary.length > 0 && (
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.45em]">Tier 01 // Primary</h4>
            <div className="h-[2px] bg-emerald-100 flex-grow rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {primary.map((item, index) => <AssessmentCard key={index} item={item} />)}
          </div>
        </section>
      )}

      {/* Secondary Section */}
      {secondary.length > 0 && (
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.45em]">Tier 02 // Secondary</h4>
            <div className="h-[2px] bg-blue-100 flex-grow rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {secondary.map((item, index) => <AssessmentCard key={index} item={item} />)}
          </div>
        </section>
      )}

      {/* Tertiary Section */}
      {tertiary.length > 0 && (
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.45em]">Tier 03 // Tertiary</h4>
            <div className="h-[2px] bg-slate-100 flex-grow rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tertiary.map((item, index) => <AssessmentCard key={index} item={item} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default ResultsTable;
