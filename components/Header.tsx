
import React from 'react';

interface HeaderProps {
  currentView: 'home' | 'evaluation';
  setView: (view: 'home' | 'evaluation') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center pill-nav glass px-6 py-2 shadow-sm">
        <button 
          onClick={() => setView('home')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <span className="font-extrabold text-emerald-900 tracking-tight text-lg">The Big Bang Engineers<span className="text-emerald-500">.</span></span>
        </button>
        
        <div className="hidden md:flex items-center space-x-2">
           <button 
             onClick={() => setView('home')}
             className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
               currentView === 'home' 
               ? 'text-emerald-700 bg-white shadow-sm' 
               : 'text-emerald-800/60 hover:text-emerald-900'
             }`}
           >
             Matcher
           </button>
           <button 
             onClick={() => setView('evaluation')}
             className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
               currentView === 'evaluation' 
               ? 'text-emerald-700 bg-white shadow-sm' 
               : 'text-emerald-800/60 hover:text-emerald-900'
             }`}
           >
             Evaluation
           </button>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="hidden sm:block text-sm font-bold text-emerald-900 px-4 py-2 hover:opacity-70 transition-opacity">Login</button>
          <button className="bg-emerald-600 text-white text-sm font-bold px-5 py-2 rounded-full hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">Sign up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
