import React, { useState, useEffect } from 'react';
import { GameInfo, LanguageCode, CheatEntry } from '../types';
import { 
  Wifi, 
  Battery, 
  Folder, 
  CheckSquare, 
  Square, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles
} from 'lucide-react';

interface Props {
  game: GameInfo;
  language: LanguageCode;
  cheats: CheatEntry[];
  onToggleCheat: (id: string) => void;
  onSelectAction: (id: string) => void;
  onLanguageChange: (lang: LanguageCode) => void;
}

export const Ctrpf3DSSimulator: React.FC<Props> = ({
  game,
  language,
  cheats,
  onToggleCheat,
  onSelectAction,
  onLanguageChange,
}) => {
  // Navigation state in CTRPF menu
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [osdMessage, setOsdMessage] = useState<string>('Welcome to CTRPF Multi-Pokémon Framework!');
  const [blueFlash, setBlueFlash] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState<boolean>(true);

  // Time clock display
  const [timeStr, setTimeStr] = useState<string>('12:00');

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTimeStr(`${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`);
    };
    update();
    const timer = setInterval(update, 10000);
    return () => clearInterval(timer);
  }, []);

  // Flash blue notification upon game switch
  useEffect(() => {
    setBlueFlash(true);
    const welcome = 
      language === 'CHT' ? '歡迎使用！' : 
      language === 'ENG' ? 'Welcome!' : 
      language === 'FRE' ? 'Bienvenue!' : 'Benvenuto!';
    setOsdMessage(`${game.name} loaded - ${welcome}`);
    const timeout = setTimeout(() => setBlueFlash(false), 800);
    return () => clearTimeout(timeout);
  }, [game, language]);

  const categories = [
    { 
      id: 'Battle', 
      name: language === 'CHT' ? '戰鬥修改 (Battle)' : language === 'ENG' ? 'Battle' : language === 'FRE' ? 'Combat' : 'Battaglia', 
      count: cheats.filter(c => c.category === 'Battle').length 
    },
    { 
      id: 'Trainer', 
      name: language === 'CHT' ? '訓練家與道具 (Trainer)' : language === 'ENG' ? 'Trainer' : language === 'FRE' ? 'Dresseur' : 'Allenatore', 
      count: cheats.filter(c => c.category === 'Trainer').length 
    },
    { 
      id: 'Computer', 
      name: language === 'CHT' ? '電腦與盒子 (PC)' : language === 'ENG' ? 'Computer (PC)' : language === 'FRE' ? 'PC' : 'PC', 
      count: cheats.filter(c => c.category === 'Computer').length 
    },
    { 
      id: 'Movement', 
      name: language === 'CHT' ? '移動與穿牆 (Movement)' : language === 'ENG' ? 'Movement' : language === 'FRE' ? 'Mouvement' : 'Movimento', 
      count: cheats.filter(c => c.category === 'Movement').length 
    },
    { 
      id: 'PlazaOrPSS', 
      name: game.generation === 6 
        ? (language === 'CHT' ? '玩家搜尋系統 (PSS)' : 'Player Search System (PSS)') 
        : (language === 'CHT' ? '圓慶廣場 (Festival Plaza)' : language === 'ENG' ? 'Festival Plaza' : language === 'FRE' ? 'Place Festival' : 'Festiplaza'),
      count: cheats.filter(c => c.category === 'PlazaOrPSS').length 
    },
    { 
      id: 'GTS', 
      name: language === 'CHT' ? '全球貿易中心 (GTS)' : 'Global Trade Station', 
      count: cheats.filter(c => c.category === 'GTS').length 
    },
    { 
      id: 'Miscellaneous', 
      name: language === 'CHT' ? '雜項與優化 (Misc)' : language === 'ENG' ? 'Miscellaneous' : language === 'FRE' ? 'Divers' : 'Varie', 
      count: cheats.filter(c => c.category === 'Miscellaneous').length 
    },
  ];

  const currentFolderCheats = currentFolder 
    ? cheats.filter(c => {
        if (c.category !== currentFolder) return false;
        if (c.groups && !c.groups.includes(game.group)) return false;
        return true;
      })
    : [];

  const activeCheatsCount = cheats.filter(c => {
    if (!c.isEnabled) return false;
    if (c.groups && !c.groups.includes(game.group)) return false;
    return true;
  }).length;

  const handleTriggerAction = (cheat: CheatEntry) => {
    if (cheat.type === 'action') {
      onSelectAction(cheat.id);
      setOsdMessage(language === 'CHT' ? `已執行: ${cheat.name[language]}` : `Executed: ${cheat.name[language]}`);
    } else {
      onToggleCheat(cheat.id);
      const newState = !cheat.isEnabled;
      setOsdMessage(`${cheat.name[language]}: ${newState ? (language === 'CHT' ? '已開啟 (ON)' : 'ENABLED') : (language === 'CHT' ? '已關閉 (OFF)' : 'DISABLED')}`);
    }
  };

  const selectedEntry = currentFolder 
    ? currentFolderCheats[selectedItemIndex] 
    : null;

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 gap-6">
      {/* 3DS Device Shell */}
      <div className="relative w-full max-w-[560px] bg-gradient-to-b from-slate-900 via-neutral-900 to-slate-950 p-4 sm:p-6 rounded-3xl border border-slate-700/60 shadow-2xl shadow-cyan-950/20">
        
        {/* Top Hinge Bar */}
        <div className="flex items-center justify-between px-3 py-1.5 mb-3 bg-neutral-950/80 rounded-xl border border-neutral-800 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono text-[11px] font-semibold tracking-wider text-neutral-300">3DS XL SYSTEM</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-cyan-400 font-mono">3D DEPTH [ON]</span>
            <div className="flex items-center gap-1">
              <Wifi size={12} className="text-emerald-400" />
              <Battery size={13} className="text-emerald-400" />
            </div>
          </div>
        </div>

        {/* ----------------- TOP SCREEN (400 x 240 Widescreen) ----------------- */}
        <div className="relative w-full aspect-[5/3] bg-black rounded-lg border-2 border-neutral-800 overflow-hidden shadow-inner flex flex-col ctrpf-scanline">
          {/* Blue Flash Effect on Plugin Init */}
          {blueFlash && (
            <div className="absolute inset-0 bg-blue-500/50 z-30 pointer-events-none transition-opacity duration-700 animate-out fade-out" />
          )}

          {/* 3DS Top Status Bar */}
          <div className="flex items-center justify-between px-3 py-1 bg-neutral-900/90 border-b border-neutral-800 text-xs text-neutral-300 z-10 font-pixel">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">CTRPluginFramework</span>
              <span className="text-neutral-500">v1.0.0</span>
            </div>
            <div className="flex items-center gap-3 text-neutral-400">
              <span className="text-[11px] text-amber-400">{game.name}</span>
              <span className="text-[11px] font-mono">{timeStr}</span>
            </div>
          </div>

          {/* Top Screen Main Display */}
          <div className="flex-1 p-3 flex flex-col justify-between text-neutral-200 z-10 select-none overflow-hidden">
            {menuOpen ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-neutral-900/80 p-2 rounded border border-neutral-800">
                  <div>
                    <h3 className="font-pixel text-sm font-bold text-cyan-300 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-cyan-400" />
                      Multi-Pokémon Framework
                    </h3>
                    <p className="text-[11px] text-neutral-400 font-mono">
                      Game: {game.name} (TID: {game.titleId.slice(-8)})
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-pixel px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {activeCheatsCount} {language === 'CHT' ? '已啟用' : 'Active Cheats'}
                    </span>
                  </div>
                </div>

                {/* Selected Item Info Box on Top Screen */}
                <div className="bg-neutral-950/90 border border-neutral-800 p-2.5 rounded-md min-h-[90px] flex flex-col justify-between">
                  {selectedEntry ? (
                    <>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-pixel text-xs text-amber-400 font-semibold">
                            {selectedEntry.name[language]}
                          </span>
                          {selectedEntry.hotkey && (
                            <span className="text-[10px] font-mono text-purple-300 bg-purple-950/80 px-1 py-0.2 rounded border border-purple-800">
                              {selectedEntry.hotkey}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-neutral-300 leading-snug font-sans">
                          <span className="text-orange-400 font-bold">{language === 'CHT' ? '說明: ' : 'Note: '}</span>
                          {selectedEntry.description[language]}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-neutral-800/80 text-[10px] text-neutral-400 font-mono">
                        <span>
                          {language === 'CHT' ? '狀態: ' : 'Status: '}
                          <strong className={selectedEntry.isEnabled ? "text-emerald-400" : "text-neutral-500"}>
                            {selectedEntry.isEnabled ? (language === 'CHT' ? '開啟 (ENABLED)' : 'ENABLED') : (language === 'CHT' ? '關閉 (OFF)' : 'OFF')}
                          </strong>
                        </span>
                        <span>{language === 'CHT' ? '類型: ' : 'Type: '}{selectedEntry.type}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center py-2">
                      <p className="font-pixel text-xs text-neutral-300">
                        {currentFolder 
                          ? `${language === 'CHT' ? '目前資料夾: ' : 'Folder: '}${currentFolder}` 
                          : (language === 'CHT' ? '請在下方觸控螢幕選擇分類資料夾' : 'Select a Folder on the Touch Screen below')}
                      </p>
                      <p className="text-[10px] text-neutral-500 mt-1">
                        {language === 'CHT' ? '使用觸控筆或十字鍵瀏覽寶可夢金手指' : 'Use stylus tap or D-pad to browse Pokémon cheats'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 text-center">
                <p className="font-pixel text-neutral-400 text-sm">{language === 'CHT' ? '選單已隱藏' : 'Menu Hidden'}</p>
                <p className="text-xs text-cyan-400 font-mono mt-1">
                  {language === 'CHT' ? '按下 [SELECT] 鍵開啟金手指選單' : 'Press [SELECT] to open Plugin Menu'}
                </p>
              </div>
            )}

            {/* In-Game OSD Notification Banner */}
            <div className="mt-1 bg-cyan-950/90 border border-cyan-700/60 px-2.5 py-1 rounded text-xs font-pixel flex items-center justify-between text-cyan-200">
              <span className="truncate">{osdMessage}</span>
              <span className="text-[10px] text-cyan-400 font-mono">OSD</span>
            </div>
          </div>
        </div>

        {/* 3DS Middle Divider & Stereo Speakers */}
        <div className="flex items-center justify-between py-2 px-6">
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-800"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-800"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-800"></span>
          </div>
          <div className="h-1 flex-1 mx-6 bg-gradient-to-r from-transparent via-neutral-800 to-transparent"></div>
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-800"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-800"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-800"></span>
          </div>
        </div>

        {/* ----------------- BOTTOM TOUCH SCREEN (320 x 240) ----------------- */}
        <div className="relative w-[85%] mx-auto aspect-[4/3] bg-neutral-950 rounded-lg border-2 border-neutral-700/80 overflow-hidden shadow-2xl flex flex-col">
          {/* Touch Screen Title Bar */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-neutral-900 border-b border-neutral-800 text-xs font-pixel text-neutral-200">
            <div className="flex items-center gap-1.5">
              {currentFolder ? (
                <button 
                  onClick={() => {
                    setCurrentFolder(null);
                    setSelectedItemIndex(0);
                  }}
                  className="flex items-center gap-0.5 text-cyan-400 hover:text-cyan-300 font-bold"
                >
                  <ChevronLeft size={14} /> {language === 'CHT' ? '返回' : 'Back'}
                </button>
              ) : (
                <span className="text-cyan-400 font-bold">{language === 'CHT' ? '選單目錄' : 'Menu'}</span>
              )}
              <span className="text-neutral-500">|</span>
              <span className="truncate max-w-[140px] text-neutral-300">
                {currentFolder || (language === 'CHT' ? '根目錄' : 'Root Folders')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-neutral-400">{language === 'CHT' ? '觸控操作' : 'Stylus Touch'}</span>
            </div>
          </div>

          {/* Touch Screen Menu Content */}
          <div className="flex-1 overflow-y-auto p-2 bg-[#1a1c23] text-neutral-200 font-sans text-xs">
            {!currentFolder ? (
              // Root Folders List
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setCurrentFolder(cat.id);
                      setSelectedItemIndex(0);
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <Folder size={15} className="text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="font-pixel text-neutral-200 font-medium">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-neutral-400">
                      <span className="text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-300 font-mono">
                        {cat.count}
                      </span>
                      <ChevronRight size={13} className="text-neutral-500" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              // Entries inside selected Folder
              <div className="space-y-1">
                {currentFolderCheats.length === 0 ? (
                  <div className="text-center py-6 text-neutral-500 font-pixel">
                    {language === 'CHT' ? `此資料夾在 ${game.name} 無可用項目` : `No cheats in this folder for ${game.name}.`}
                  </div>
                ) : (
                  currentFolderCheats.map((cheat, index) => {
                    const isSelected = selectedItemIndex === index;
                    return (
                      <div
                        key={cheat.id}
                        onClick={() => {
                          setSelectedItemIndex(index);
                          handleTriggerAction(cheat);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-left transition-colors cursor-pointer border ${
                          isSelected 
                            ? 'bg-cyan-950/80 border-cyan-700 text-white font-semibold' 
                            : 'bg-neutral-900/80 border-neutral-800/80 text-neutral-300 hover:bg-neutral-800/60'
                        }`}
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0 pr-2">
                          {cheat.type === 'action' ? (
                            <span className="text-[9px] uppercase px-1 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-mono">
                              EXEC
                            </span>
                          ) : cheat.isEnabled ? (
                            <CheckSquare size={14} className="text-emerald-400 flex-shrink-0" />
                          ) : (
                            <Square size={14} className="text-neutral-500 flex-shrink-0" />
                          )}
                          <span className="truncate text-xs font-pixel">
                            {cheat.name[language]}
                          </span>
                        </div>
                        {cheat.hotkey && (
                          <span className="text-[9px] font-mono text-purple-300 bg-purple-950/60 px-1 py-0.2 rounded border border-purple-800/60 flex-shrink-0">
                            {cheat.hotkey.replace('Key: ', '')}
                          </span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* Bottom Screen Footer Toolbar */}
          <div className="flex items-center justify-between px-3 py-1 bg-neutral-900 border-t border-neutral-800 text-[10px] text-neutral-400 font-mono">
            <span>{language === 'CHT' ? '[A] 切換 / [B] 返回' : '[A] Toggle / [B] Back'}</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  const langs: LanguageCode[] = ['CHT', 'ENG', 'FRE', 'ITA'];
                  const curIdx = langs.indexOf(language);
                  const nextLang = langs[(curIdx + 1) % langs.length];
                  onLanguageChange(nextLang);
                }}
                className="hover:text-cyan-300 underline"
              >
                Lang: {language}
              </button>
            </div>
          </div>
        </div>

        {/* 3DS Physical Buttons Row */}
        <div className="flex items-center justify-between mt-4 px-3 text-xs text-neutral-400 font-pixel">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (currentFolder) {
                  setSelectedItemIndex(prev => Math.max(0, prev - 1));
                }
              }}
              className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-900 text-neutral-200 border border-neutral-700 shadow"
            >
              ▲ Up
            </button>
            <button
              onClick={() => {
                if (currentFolder) {
                  setSelectedItemIndex(prev => Math.min(currentFolderCheats.length - 1, prev + 1));
                }
              }}
              className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-900 text-neutral-200 border border-neutral-700 shadow"
            >
              ▼ Down
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              className="px-3 py-1 rounded bg-gradient-to-b from-neutral-700 to-neutral-800 hover:from-neutral-600 hover:to-neutral-700 active:from-neutral-900 active:to-neutral-950 text-cyan-300 border border-neutral-600 font-bold shadow"
            >
              SELECT (CTRPF)
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                if (currentFolder && currentFolderCheats[selectedItemIndex]) {
                  handleTriggerAction(currentFolderCheats[selectedItemIndex]);
                }
              }}
              className="w-8 h-8 rounded-full bg-blue-700 hover:bg-blue-600 active:bg-blue-800 text-white font-bold flex items-center justify-center shadow"
            >
              A
            </button>
            <button
              onClick={() => {
                if (currentFolder) {
                  setCurrentFolder(null);
                  setSelectedItemIndex(0);
                }
              }}
              className="w-8 h-8 rounded-full bg-red-700 hover:bg-red-600 active:bg-red-800 text-white font-bold flex items-center justify-center shadow"
            >
              B
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
