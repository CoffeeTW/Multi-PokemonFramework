import React, { useState } from 'react';
import { GameInfo, LanguageCode, CheatEntry, CheatCategory } from '../types';
import { 
  Search, 
  Swords, 
  UserCheck, 
  Database, 
  Compass, 
  Globe2, 
  Sliders, 
  Zap, 
  Check, 
  Code,
  Sparkles,
  Filter
} from 'lucide-react';

interface Props {
  game: GameInfo;
  language: LanguageCode;
  cheats: CheatEntry[];
  onToggleCheat: (id: string) => void;
  onSelectAction: (id: string) => void;
  onUpdateCheatValue: (id: string, value: string | number) => void;
}

export const CheatManager: React.FC<Props> = ({
  game,
  language,
  cheats,
  onToggleCheat,
  onSelectAction,
  onUpdateCheatValue,
}) => {
  const [activeCategory, setActiveCategory] = useState<CheatCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCodeId, setShowCodeId] = useState<string | null>(null);

  const categories: { id: CheatCategory | 'ALL'; label: string; icon: React.ReactNode }[] = [
    { 
      id: 'ALL', 
      label: language === 'CHT' ? '全部金手指' : 'All Cheats', 
      icon: <Filter size={15} /> 
    },
    { 
      id: 'Battle', 
      label: language === 'CHT' ? '戰鬥修改' : language === 'ENG' ? 'Battle' : language === 'FRE' ? 'Combat' : 'Battaglia', 
      icon: <Swords size={15} /> 
    },
    { 
      id: 'Trainer', 
      label: language === 'CHT' ? '訓練家與道具' : language === 'ENG' ? 'Trainer & Pouch' : language === 'FRE' ? 'Dresseur' : 'Allenatore', 
      icon: <UserCheck size={15} /> 
    },
    { 
      id: 'Computer', 
      label: language === 'CHT' ? '電腦與儲存' : 'PC & Storage', 
      icon: <Database size={15} /> 
    },
    { 
      id: 'Movement', 
      label: language === 'CHT' ? '地圖與移動' : language === 'ENG' ? 'Movement' : language === 'FRE' ? 'Mouvement' : 'Movimento', 
      icon: <Compass size={15} /> 
    },
    { 
      id: 'PlazaOrPSS', 
      label: game.generation === 6 
        ? (language === 'CHT' ? 'PSS (第6代)' : 'PSS (Gen 6)') 
        : (language === 'CHT' ? '圓慶廣場 (第7代)' : 'Festival Plaza (Gen 7)'), 
      icon: <Sparkles size={15} /> 
    },
    { 
      id: 'GTS', 
      label: language === 'CHT' ? 'GTS 全球交換' : 'GTS', 
      icon: <Globe2 size={15} /> 
    },
    { 
      id: 'Miscellaneous', 
      label: language === 'CHT' ? '雜項與優化' : language === 'ENG' ? 'Misc' : language === 'FRE' ? 'Divers' : 'Varie', 
      icon: <Sliders size={15} /> 
    },
  ];

  const filteredCheats = cheats.filter(cheat => {
    // Filter by game group compatibility
    if (cheat.groups && !cheat.groups.includes(game.group)) {
      return false;
    }
    // Filter by category
    if (activeCategory !== 'ALL' && cheat.category !== activeCategory) {
      return false;
    }
    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const name = cheat.name[language]?.toLowerCase() || '';
      const desc = cheat.description[language]?.toLowerCase() || '';
      return name.includes(q) || desc.includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-slate-900/70 p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={17} />
          <input
            type="text"
            placeholder={
              language === 'CHT'
                ? '搜尋寶可夢金手指、快捷鍵或功能描述...'
                : language === 'ENG' 
                ? 'Search Pokémon cheats, hotkeys, or descriptions...' 
                : language === 'FRE'
                ? 'Rechercher des triches, raccourcis ou descriptions...'
                : 'Cerca trucchi, tasti rapidi o descrizioni...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Categories Tab Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                activeCategory === cat.id
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                  : 'bg-slate-950/50 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cheats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCheats.map((cheat) => (
          <div
            key={cheat.id}
            className={`p-4 rounded-2xl border transition-all ${
              cheat.isEnabled
                ? 'bg-gradient-to-br from-cyan-950/30 to-slate-900 border-cyan-600/40 shadow-lg shadow-cyan-950/10'
                : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700/80'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-slate-100 text-sm">
                    {cheat.name[language]}
                  </h4>
                  {cheat.hotkey && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-950 text-purple-300 border border-purple-800">
                      {cheat.hotkey}
                    </span>
                  )}
                  {cheat.groups && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {cheat.groups.join('/')}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {cheat.description[language]}
                </p>
              </div>

              {/* Action or Toggle Control */}
              <div className="flex-shrink-0">
                {cheat.type === 'action' ? (
                  <button
                    onClick={() => onSelectAction(cheat.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white text-xs font-semibold shadow-md shadow-purple-950/30 transition-colors"
                  >
                    <Zap size={13} />
                    <span>{language === 'CHT' ? '套用' : 'Apply'}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onToggleCheat(cheat.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      cheat.isEnabled ? 'bg-cyan-500' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        cheat.isEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                )}
              </div>
            </div>

            {/* Select Options or Secondary Inputs */}
            {cheat.type === 'select' && cheat.selectOptions && (
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3 text-xs">
                <span className="text-slate-400">{language === 'CHT' ? '設定數值:' : 'Selected Value:'}</span>
                <select
                  value={cheat.inputValue}
                  onChange={(e) => onUpdateCheatValue(cheat.id, e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-cyan-300 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-cyan-500"
                >
                  {cheat.selectOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label[language]}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Action Replay Code preview trigger */}
            {cheat.arCodeSnippet && (
              <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                <button
                  onClick={() => setShowCodeId(showCodeId === cheat.id ? null : cheat.id)}
                  className="flex items-center gap-1 hover:text-cyan-400 font-mono transition-colors"
                >
                  <Code size={12} />
                  <span>
                    {showCodeId === cheat.id 
                      ? (language === 'CHT' ? '隱藏 AR 代碼' : 'Hide AR Code') 
                      : (language === 'CHT' ? '檢視 AR 代碼' : 'View AR Code')}
                  </span>
                </button>
                {cheat.isEnabled && (
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <Check size={12} /> {language === 'CHT' ? '3DS Hook 已生效' : 'Active in 3DS Hook'}
                  </span>
                )}
              </div>
            )}

            {/* Expanded Code Snippet */}
            {showCodeId === cheat.id && cheat.arCodeSnippet && (
              <div className="mt-2 p-2.5 bg-black/70 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-400 whitespace-pre">
                {cheat.arCodeSnippet}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
