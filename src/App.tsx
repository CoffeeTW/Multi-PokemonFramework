import React, { useState } from 'react';
import { GameId, LanguageCode, CheatEntry, PokemonData } from './types';
import { GAMES_METADATA } from './data/pokemonData';
import { INITIAL_CHEATS } from './data/cheatsData';
import { Ctrpf3DSSimulator } from './components/Ctrpf3DSSimulator';
import { CheatManager } from './components/CheatManager';
import { PokemonEditor } from './components/PokemonEditor';
import { ArCodeExporter } from './components/ArCodeExporter';
import { MemoryHexViewer } from './components/MemoryHexViewer';
import { 
  Gamepad2, 
  ListOrdered, 
  Database, 
  Terminal, 
  Binary, 
  Languages, 
  Sparkles, 
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [selectedGameId, setSelectedGameId] = useState<GameId>('US'); // Default to Ultra Sun
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('CHT');
  const [activeTab, setActiveTab] = useState<'3ds' | 'manager' | 'editor' | 'ar' | 'hex'>('3ds');
  const [cheats, setCheats] = useState<CheatEntry[]>(INITIAL_CHEATS);
  const [savedPokemon, setSavedPokemon] = useState<PokemonData | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentGame = GAMES_METADATA[selectedGameId];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleCheat = (id: string) => {
    setCheats(prev => prev.map(c => {
      if (c.id === id) {
        const next = !c.isEnabled;
        const statusText = currentLanguage === 'CHT' 
          ? (next ? '已啟用 (ENABLED)' : '已關閉 (DISABLED)')
          : (next ? 'ENABLED' : 'DISABLED');
        showToast(`${c.name[currentLanguage]}: ${statusText}`);
        return { ...c, isEnabled: next };
      }
      return c;
    }));
  };

  const handleSelectAction = (id: string) => {
    const cheat = cheats.find(c => c.id === id);
    if (cheat) {
      const execText = currentLanguage === 'CHT' ? '已執行:' : 'Executed:';
      showToast(`${execText} ${cheat.name[currentLanguage]}`);
    }
  };

  const handleUpdateCheatValue = (id: string, value: string | number) => {
    setCheats(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, inputValue: value };
      }
      return c;
    }));
  };

  const handleSavePokemon = (pkmn: PokemonData) => {
    setSavedPokemon(pkmn);
    const saveMsg = currentLanguage === 'CHT'
      ? `已將 ${pkmn.nickname} 儲存至盒子 ${pkmn.box} 槽位 ${pkmn.slot}！`
      : `Saved ${pkmn.nickname} to Box ${pkmn.box} Slot ${pkmn.slot}!`;
    showToast(saveMsg);
  };

  const activeCheatsCount = cheats.filter(c => {
    if (!c.isEnabled) return false;
    if (c.groups && !c.groups.includes(currentGame.group)) return false;
    return true;
  }).length;

  const languagesList: { code: LanguageCode; label: string }[] = [
    { code: 'CHT', label: '繁中' },
    { code: 'ENG', label: 'ENG' },
    { code: 'FRE', label: 'FRE' },
    { code: 'ITA', label: 'ITA' },
  ];

  const tabList = [
    { 
      id: '3ds', 
      label: currentLanguage === 'CHT' ? '3DS 模擬器 (雙螢幕)' : '3DS Simulator', 
      icon: <Gamepad2 size={15} /> 
    },
    { 
      id: 'manager', 
      label: currentLanguage === 'CHT' ? `金手指管理面板 (${activeCheatsCount})` : `Cheats Manager (${activeCheatsCount})`, 
      icon: <ListOrdered size={15} /> 
    },
    { 
      id: 'editor', 
      label: currentLanguage === 'CHT' ? '寶可夢電腦盒子編輯器' : 'PKHeX PC Box Editor', 
      icon: <Database size={15} /> 
    },
    { 
      id: 'ar', 
      label: currentLanguage === 'CHT' ? 'Action Replay 代碼匯出' : 'Action Replay Export', 
      icon: <Terminal size={15} /> 
    },
    { 
      id: 'hex', 
      label: currentLanguage === 'CHT' ? '3DS 記憶體 Hex 檢視' : 'Memory Hex View', 
      icon: <Binary size={15} /> 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      
      {/* Top Notification Toast */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/90 text-cyan-200 border border-cyan-500/50 shadow-2xl backdrop-blur font-mono text-xs animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={15} className="text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Primary Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-950/40">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-sm sm:text-base text-slate-100 tracking-tight font-pixel">
                  Multi-Pokémon Framework
                </h1>
                <span className="hidden sm:inline text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                  CTRPluginFramework 3DS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono hidden md:block">
                {currentLanguage === 'CHT' 
                  ? '第6代 (XY/ORAS) 與 第7代 (SM/USUM) 3DS 記憶體金手指與修改框架'
                  : 'Gen 6 (XY/ORAS) & Gen 7 (SM/USUM) Memory Modding Suite'}
              </p>
            </div>
          </div>

          {/* Header Controls: Game Selector & Language */}
          <div className="flex items-center gap-3">
            {/* Game Selector */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl p-1">
              <select
                value={selectedGameId}
                onChange={(e) => setSelectedGameId(e.target.value as GameId)}
                className="bg-transparent text-xs font-semibold text-cyan-400 focus:outline-none px-2 py-1 cursor-pointer"
              >
                {Object.values(GAMES_METADATA).map((g) => (
                  <option key={g.id} value={g.id} className="bg-slate-900 text-slate-200">
                    {g.name} (Gen {g.generation})
                  </option>
                ))}
              </select>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
              <Languages size={14} className="text-slate-500 ml-1.5" />
              {languagesList.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setCurrentLanguage(lang.code)}
                  className={`px-2 py-1 rounded-lg font-mono text-[11px] transition-colors ${
                    currentLanguage === lang.code
                      ? 'bg-cyan-500 text-black font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Navigation Tabs Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2 overflow-x-auto scrollbar-none border-t border-slate-900">
          {tabList.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-cyan-500 text-cyan-400 bg-cyan-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Main App Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === '3ds' && (
          <Ctrpf3DSSimulator
            game={currentGame}
            language={currentLanguage}
            cheats={cheats}
            onToggleCheat={handleToggleCheat}
            onSelectAction={handleSelectAction}
            onLanguageChange={setCurrentLanguage}
          />
        )}

        {activeTab === 'manager' && (
          <CheatManager
            game={currentGame}
            language={currentLanguage}
            cheats={cheats}
            onToggleCheat={handleToggleCheat}
            onSelectAction={handleSelectAction}
            onUpdateCheatValue={handleUpdateCheatValue}
          />
        )}

        {activeTab === 'editor' && (
          <PokemonEditor
            game={currentGame}
            language={currentLanguage}
            onSavePokemon={handleSavePokemon}
          />
        )}

        {activeTab === 'ar' && (
          <ArCodeExporter
            game={currentGame}
            cheats={cheats}
            currentPokemon={savedPokemon}
            language={currentLanguage}
          />
        )}

        {activeTab === 'hex' && (
          <MemoryHexViewer
            game={currentGame}
            cheats={cheats}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 px-4 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>Multi-Pokémon Framework</span>
            <span>•</span>
            <span>CTRPluginFramework by The Pixellizer Group</span>
            <span>•</span>
            <span>移植自 CoffeeTW/Multi-PokemonFramework</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Title ID: {currentGame.titleId}</span>
            <span>•</span>
            <span>Luma3DS Rosalina Compatible</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
