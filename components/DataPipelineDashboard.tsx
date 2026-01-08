
import React, { useState } from 'react';
import { RAW_OCR_DATA } from '../constants';
import { runDataPipeline, cleanRawData } from '../utils/pipeline';
import { Assessment } from '../types';

const DataPipelineDashboard: React.FC = () => {
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [processedData, setProcessedData] = useState<Assessment[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

  const handleRunPipeline = () => {
    setPipelineStep(1);
    setLogs([]);
    addLog("Intellit Core: Initiating ETL Sequence...");
    
    setTimeout(() => {
        addLog("RAW: Ingesting OCR string from SHL catalog...");
        const cleanUrls = cleanRawData(RAW_OCR_DATA);
        addLog(`CLEAN: Successfully deduplicated ${cleanUrls.length} unique sources.`);
        setPipelineStep(2);
        
        setTimeout(() => {
             addLog("TRANSFORM: Normalizing metadata schemas...");
             const data = runDataPipeline(RAW_OCR_DATA);
             setProcessedData(data);
             setPipelineStep(3);
             addLog(`STRUCT: ${data.length} assessments parsed successfully.`);
             
             setTimeout(() => {
                 addLog("LOAD: Refreshing local vector store...");
                 addLog("READY: Catalog sequence completed.");
                 setPipelineStep(4);
             }, 800);
        }, 1000);
    }, 800);
  };

  return (
    <div className="bg-emerald-950 rounded-[3rem] shadow-2xl overflow-hidden border border-emerald-900">
      <div className="px-8 py-6 border-b border-emerald-900 flex justify-between items-center bg-emerald-900/40 backdrop-blur-md">
        <div>
            <h2 className="text-xl font-black text-emerald-400 tracking-tighter uppercase italic flex items-center gap-2">
               <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
               ETL:PIPELINE_ENGINE
            </h2>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-1">Status: {pipelineStep === 4 ? 'SYSTEM_ONLINE' : 'SYSTEM_IDLE'}</p>
        </div>
        <button
            onClick={handleRunPipeline}
            disabled={pipelineStep > 0 && pipelineStep < 4}
            className={`px-8 py-3 rounded-full font-black text-xs tracking-widest transition-all shadow-lg ${
                pipelineStep > 0 && pipelineStep < 4 
                ? 'bg-emerald-800 text-emerald-600 cursor-not-allowed' 
                : 'bg-emerald-500 hover:bg-emerald-400 text-emerald-950 active:scale-95 shadow-emerald-500/20'
            }`}
        >
            {pipelineStep === 0 ? 'START ENGINE' : pipelineStep === 4 ? 'RE-SYNC' : 'PARSING...'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 h-[550px]">
        {/* Left: Input */}
        <div className="border-r border-emerald-900 flex flex-col h-full bg-emerald-950/20">
            <div className="flex-1 p-6 overflow-hidden flex flex-col">
                <h3 className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em] mb-4">Input Stream (Raw OCR)</h3>
                <div className="bg-black/30 rounded-[2rem] p-6 font-mono text-xs text-emerald-500/70 overflow-y-auto flex-1 border border-emerald-900/50 scrollbar-hide">
                    {RAW_OCR_DATA}
                </div>
            </div>
            <div className="h-40 bg-black/40 p-6 font-mono text-xs overflow-y-auto border-t border-emerald-900">
                <div className="flex items-center gap-2 text-emerald-600 font-black mb-3 text-[10px] uppercase tracking-widest">
                  <div className="w-1 h-1 bg-emerald-600 rounded-full"></div>
                  System Logs
                </div>
                {logs.map((log, i) => (
                    <div key={i} className="mb-1 opacity-80">> {log}</div>
                ))}
                {logs.length === 0 && <span className="opacity-30 italic">Waiting for signal...</span>}
            </div>
        </div>

        {/* Right: Output */}
        <div className="flex flex-col h-full bg-emerald-900/10">
             <div className="p-6">
                <h3 className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em] mb-4">Output Stream (Intellit Struct)</h3>
                <div className="flex-1 overflow-y-auto max-h-[440px] space-y-3 scrollbar-hide">
                    {processedData.length === 0 ? (
                        <div className="h-full py-20 flex flex-col items-center justify-center text-emerald-900/50 opacity-20">
                            <svg className="w-20 h-20 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                        </div>
                    ) : (
                        processedData.map((item, idx) => (
                            <div key={idx} className="bg-emerald-900/20 p-4 rounded-2xl border border-emerald-800/50 group hover:border-emerald-500/50 transition-all">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-emerald-400 font-bold text-xs">{item.name}</span>
                                    <span className="text-emerald-600 text-[10px] font-black">{item.duration}m</span>
                                </div>
                                <div className="text-[10px] text-emerald-700 truncate font-mono mb-2">{item.url}</div>
                                <div className="flex flex-wrap gap-1">
                                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded text-[9px] font-black uppercase tracking-tighter border border-emerald-500/20">
                                        EXTRACTED
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default DataPipelineDashboard;
