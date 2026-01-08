
import React, { useState } from 'react';

interface SearchFormProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const samples = [
    "ICICI Bank Assistant Admin, 0-2 yrs exp",
    "Marketing Manager for community growth",
    "Senior Data Analyst: SQL, Excel, Python",
    "COO for China, cultural fit check"
  ];

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="group transition-all duration-500">
        <div className="relative glass rounded-[2.5rem] p-4 shadow-2xl shadow-emerald-200/50">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <textarea
                id="query"
                rows={1}
                className="block w-full rounded-[2rem] border-transparent bg-emerald-50/50 focus:bg-white focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-emerald-900 placeholder-emerald-400/70 p-5 pr-12 text-lg font-medium resize-none transition-all duration-300"
                placeholder="Describe your hiring needs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isLoading}
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2 text-emerald-300 pointer-events-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className={`
                flex items-center justify-center gap-2 px-8 py-4 rounded-[2rem] text-lg font-bold text-white shadow-xl
                ${isLoading || !query.trim() 
                  ? 'bg-emerald-300 cursor-not-allowed shadow-none' 
                  : 'bg-emerald-600 hover:bg-emerald-500 active:scale-95 shadow-emerald-200'}
                transition-all duration-300
              `}
            >
              {isLoading ? (
                <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : (
                <>
                  <span>GET STARTED</span>
                  <div className="bg-white/20 rounded-full p-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </div>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {samples.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setQuery(sample)}
              className="px-4 py-2 rounded-full border border-emerald-100 bg-white/50 text-emerald-700 text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all shadow-sm active:scale-95"
            >
              {sample}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
