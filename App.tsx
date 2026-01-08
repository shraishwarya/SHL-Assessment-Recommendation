
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchForm from './components/SearchForm';
import ResultsTable from './components/ResultsTable';
import EvaluationDashboard from './components/EvaluationDashboard';
import { getRecommendations } from './services/geminiService';
import { Assessment, QueryStatus } from './types';

type View = 'home' | 'evaluation';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [status, setStatus] = useState<QueryStatus>(QueryStatus.IDLE);
  const [results, setResults] = useState<Assessment[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setStatus(QueryStatus.LOADING);
    setError(null);
    setResults([]);

    try {
      const data = await getRecommendations(query);
      setResults(data.recommended_assessments);
      setStatus(QueryStatus.SUCCESS);
    } catch (err) {
      console.error(err);
      setError("Failed to generate recommendations. Please try again later.");
      setStatus(QueryStatus.ERROR);
    }
  };

  const renderHomeView = () => (
    <div className="animate-fade-in">
      <section className="relative pt-32 pb-20 px-4 overflow-hidden hero-gradient min-h-[70vh] flex flex-col justify-center">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-300/30 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-200/40 blur-[100px] rounded-full animate-float"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 mb-16">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-5xl md:text-7xl font-extrabold text-emerald-950 leading-[0.9] tracking-tighter mb-8">
                Match & Assess <br/> with <span className="text-emerald-600">The Big Bang Engineers.</span>
              </h2>
              <p className="text-lg md:text-xl text-emerald-800/70 font-medium max-w-lg mb-10 leading-relaxed">
                Our intelligent engine maps your hiring requirements to the perfect SHL assessments in seconds. Precision talent discovery starts here.
              </p>
            </div>
            
            <div className="hidden lg:block relative group">
              <div className="absolute inset-0 bg-emerald-400 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-white/20 backdrop-blur-3xl border border-white/30 rounded-[3rem] p-10 shadow-2xl animate-float">
                <div className="w-56 h-56 relative flex items-center justify-center">
                  <div className="absolute inset-0 border-4 border-dashed border-emerald-400/30 rounded-full animate-[spin_20s_linear_infinite]"></div>
                  <div className="w-40 h-40 bg-white rounded-full flex flex-col items-center justify-center shadow-inner overflow-hidden">
                     <div className="text-emerald-600 mb-1">
                       <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/></svg>
                     </div>
                     <div className="text-xs font-black text-emerald-900 uppercase tracking-tighter">System Ready</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <SearchForm onSearch={handleSearch} isLoading={status === QueryStatus.LOADING} />
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        {/* Recommendation Results */}
        <div className="space-y-12 min-h-[200px]">
          {status === QueryStatus.IDLE && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass p-8 rounded-[2rem] border-emerald-100/50">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <h4 className="text-xl font-bold text-emerald-950 mb-3">Intelligent Mapping</h4>
                  <p className="text-sm text-emerald-800/60 leading-relaxed font-medium">Instantly find the right assessments for any role using our vector-search technology.</p>
                </div>
                <div className="glass p-8 rounded-[2rem] border-emerald-100/50">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <h4 className="text-xl font-bold text-emerald-950 mb-3">Verified Accuracy</h4>
                  <p className="text-sm text-emerald-800/60 leading-relaxed font-medium">Our system is rigorously evaluated against gold-standard data to ensure high-recall recommendations.</p>
                </div>
            </div>
          )}

          {status === QueryStatus.ERROR && (
            <div className="rounded-[2rem] bg-rose-50 p-6 border border-rose-100 flex items-center gap-4">
              <div className="w-10 h-10 bg-rose-500 text-white rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-black text-rose-900">System Error</h3>
                <p className="text-xs text-rose-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          {status === QueryStatus.SUCCESS && (
            <div className="animate-fade-in-up">
              <ResultsTable results={results} />
            </div>
          )}
        </div>
      </main>
    </div>
  );

  const renderEvaluationView = () => (
    <div className="animate-fade-in pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-emerald-950 tracking-tighter">System Metrics & Evaluation</h1>
        <p className="text-lg text-emerald-800/60 font-medium mt-4">Analyze the recommendation engine's performance against historical data.</p>
      </div>
      <EvaluationDashboard />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col selection:bg-emerald-200 bg-emerald-50">
      <Header currentView={currentView} setView={setCurrentView} />
      
      <div className="flex-grow">
        {currentView === 'home' ? renderHomeView() : renderEvaluationView()}
      </div>

      <Footer />
    </div>
  );
}

export default App;
