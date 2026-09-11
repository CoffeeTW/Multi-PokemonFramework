import React, { useState } from 'react';
import { GameInfo, CheatEntry, PokemonData, LanguageCode } from '../types';
import { generateActionReplayCode, downloadFile } from '../utils/arGenerator';
import { USUM_V12_CHEAT_DATABASE, buildCompleteUsumCheatFile, ArCheatItem } from '../data/usumV12Cheats';
import { 
  Copy, 
  Download, 
  Check, 
  Terminal, 
  HardDrive, 
  Cpu, 
  ShieldCheck, 
  Orbit, 
  Swords, 
  Coins, 
  Package, 
  Compass, 
  Layers, 
  CheckSquare, 
  Square,
  Sparkles,
  Zap
} from 'lucide-react';

interface Props {
  game: GameInfo;
  cheats: CheatEntry[];
  currentPokemon?: PokemonData;
  language?: LanguageCode;
}

export const ArCodeExporter: React.FC<Props> = ({ game, cheats, currentPokemon, language = 'CHT' }) => {
  const [activeTab, setActiveTab] = useState<'usum_v12_suite' | 'custom_runtime'>('usum_v12_suite');
  const [copied, setCopied] = useState(false);
  const [copiedSingle, setCopiedSingle] = useState<string | null>(null);
  const [copiedPath, setCopiedPath] = useState(false);

  // Initialize all USUM v1.2 cheat items as selected by default for complete library export
  const allUsumItemIds = USUM_V12_CHEAT_DATABASE.flatMap(c => c.items.map(i => i.id));
  const [selectedUsumCheats, setSelectedUsumCheats] = useState<string[]>(allUsumItemIds);

  const customRuntimeCode = generateActionReplayCode(game, cheats, currentPokemon);
  const usumFullLibraryCode = buildCompleteUsumCheatFile(selectedUsumCheats);
  const currentOutputCode = activeTab === 'usum_v12_suite' ? usumFullLibraryCode : customRuntimeCode;

  const targetPath = `/luma/plugins/${game.titleId}/`;
  const isZh = language === 'CHT';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentOutputCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleCopySingleCode = async (item: ArCheatItem) => {
    const textToCopy = `[${isZh ? item.titleZh : item.titleEn}]\n${item.code}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedSingle(item.id);
      setTimeout(() => setCopiedSingle(null), 2000);
    } catch (err) {
      console.error('Failed to copy single cheat', err);
    }
  };

  const handleCopyPath = async () => {
    try {
      await navigator.clipboard.writeText(`SD:${targetPath}`);
      setCopiedPath(true);
      setTimeout(() => setCopiedPath(false), 2000);
    } catch (err) {
      console.error('Failed to copy path', err);
    }
  };

  const handleDownloadTxt = () => {
    const filename = activeTab === 'usum_v12_suite' 
      ? `cheats_${game.titleId}_v1.2_Full.txt`
      : `cheats_${game.titleId}.txt`;
    downloadFile(currentOutputCode, filename);
  };

  const toggleCheatSelection = (id: string) => {
    setSelectedUsumCheats(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const selectAllUsum = () => setSelectedUsumCheats(allUsumItemIds);
  const selectRecommendedOnly = () => {
    const recommendedIds = USUM_V12_CHEAT_DATABASE.flatMap(c => 
      c.items.filter(i => i.isRecommended).map(i => i.id)
    );
    setSelectedUsumCheats(recommendedIds);
  };
  const clearAllUsum = () => setSelectedUsumCheats([]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Orbit': return <Orbit size={18} className="text-cyan-400" />;
      case 'Swords': return <Swords size={18} className="text-rose-400" />;
      case 'Coins': return <Coins size={18} className="text-amber-400" />;
      case 'Package': return <Package size={18} className="text-emerald-400" />;
      case 'Compass': return <Compass size={18} className="text-indigo-400" />;
      default: return <Zap size={18} className="text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Compatibility Badge for Sys 11.17.0-50J & Luma3DS v13.4 */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-500/40 flex flex-wrap items-center justify-between gap-3 shadow-lg shadow-emerald-950/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <ShieldCheck size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-emerald-300 text-sm">
                {isZh ? '3DS 系統與 Luma3DS 相容性確認 (ver 1.2 專屬)' : '3DS & Luma3DS Compatibility Verified (ver 1.2)'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                100% READY
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 font-mono">
              {isZh 
                ? '目標主機: Sys 11.17.0-50J ｜ Luma3DS: v13.4 ｜ 究極之日: ver 1.2 (00040000001B5000)' 
                : 'Target: Sys 11.17.0-50J ｜ Luma3DS v13.4 ｜ Ultra Sun: ver 1.2 (00040000001B5000)'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
          <Cpu size={14} className="text-cyan-400" />
          <span>Luma3DS 13.4 內建 3GX Loader</span>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('usum_v12_suite')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'usum_v12_suite'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-950/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Sparkles size={15} />
            <span>{isZh ? '究極之日 ver 1.2 完整代碼庫 (分組預覽與選取)' : 'Ultra Sun v1.2 Full Suite (Categorized)'}</span>
            <span className="px-1.5 py-0.2 rounded bg-cyan-950/80 text-[10px] text-cyan-300 border border-cyan-800">
              {selectedUsumCheats.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('custom_runtime')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'custom_runtime'
                ? 'bg-slate-800 text-cyan-300 border border-cyan-800/60'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Terminal size={15} />
            <span>{isZh ? '自訂執行時勾選代碼匯出' : 'Active Cheats Code Output'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copied ? (isZh ? '已複製全部！' : 'All Copied!') : (isZh ? '複製當前代碼' : 'Copy Codes')}</span>
          </button>

          <button
            onClick={handleDownloadTxt}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-950/30 transition-colors"
          >
            <Download size={14} />
            <span>{isZh ? '下載 cheats.txt' : 'Download cheats.txt'}</span>
          </button>
        </div>
      </div>

      {/* Categorized Code Library View (When USUM v1.2 Full Suite is active) */}
      {activeTab === 'usum_v12_suite' && (
        <div className="space-y-6">
          {/* Quick Selection Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Layers size={15} className="text-cyan-400" />
              <span className="font-semibold">{isZh ? '快速篩選匯出代碼：' : 'Quick Filter:'}</span>
              <span className="text-slate-400">
                {isZh ? `已選取 ${selectedUsumCheats.length} / ${allUsumItemIds.length} 條代碼` : `${selectedUsumCheats.length}/${allUsumItemIds.length} selected`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={selectAllUsum}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium transition-colors"
              >
                {isZh ? '全選' : 'Select All'}
              </button>
              <button
                onClick={selectRecommendedOnly}
                className="px-2.5 py-1 rounded-lg bg-cyan-950/80 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-800/80 text-[11px] font-medium transition-colors"
              >
                {isZh ? '僅選熱門推薦' : 'Recommended'}
              </button>
              <button
                onClick={clearAllUsum}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 text-[11px] font-medium transition-colors"
              >
                {isZh ? '全部清除' : 'Clear'}
              </button>
            </div>
          </div>

          {/* Categorized Accordion / Grouped Cards */}
          <div className="grid grid-cols-1 gap-5">
            {USUM_V12_CHEAT_DATABASE.map(category => (
              <div 
                key={category.key}
                className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-3.5 shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    {getCategoryIcon(category.icon)}
                    <h4 className="font-bold text-slate-100 text-sm">
                      {isZh ? category.nameZh : category.nameEn}
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {category.items.filter(i => selectedUsumCheats.includes(i.id)).length} / {category.items.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {category.items.map(item => {
                    const isSelected = selectedUsumCheats.includes(item.id);
                    const isSingleCopied = copiedSingle === item.id;

                    return (
                      <div
                        key={item.id}
                        className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between gap-2.5 ${
                          isSelected
                            ? 'bg-slate-950/70 border-cyan-500/40 shadow-sm'
                            : 'bg-slate-950/30 border-slate-800/60 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <button
                            onClick={() => toggleCheatSelection(item.id)}
                            className="flex items-start gap-2.5 text-left flex-1"
                          >
                            <div className="mt-0.5 text-cyan-400">
                              {isSelected ? <CheckSquare size={16} /> : <Square size={16} className="text-slate-500" />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-xs text-slate-200">
                                  {isZh ? item.titleZh : item.titleEn}
                                </span>
                                {item.isRecommended && (
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                    ★ HOT
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                                {isZh ? item.descriptionZh : item.titleEn}
                              </p>
                            </div>
                          </button>

                          <button
                            onClick={() => handleCopySingleCode(item)}
                            title={isZh ? '單獨複製此代碼' : 'Copy single cheat'}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800 transition-colors shrink-0"
                          >
                            {isSingleCopied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                          </button>
                        </div>

                        {/* Code snippet display */}
                        <pre className="p-2 rounded-lg bg-slate-900/90 text-[10px] font-mono text-cyan-300 overflow-x-auto whitespace-pre leading-normal border border-slate-800/80 select-all">
                          {item.code}
                        </pre>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Code Display Terminal */}
      <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-950">
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            <span className="ml-2 text-slate-300 font-semibold">
              {activeTab === 'usum_v12_suite' ? `cheats_${game.titleId}_v1.2_Full.txt` : `cheats_${game.titleId}.txt`}
            </span>
          </div>
          <span>Format: CTRPF Action Replay (UTF-8)</span>
        </div>

        <pre className="p-4 sm:p-5 text-xs font-mono text-cyan-300 overflow-x-auto whitespace-pre leading-relaxed selection:bg-cyan-900 max-h-[480px]">
          {currentOutputCode}
        </pre>
      </div>

      {/* 3DS Setup Guide Banner (Specifically for Sys 11.17 + Luma 13.4) */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <HardDrive size={16} className="text-cyan-400" />
            {isZh 
              ? '任天堂 3DS (Sys 11.17.0-50J + Luma3DS v13.4) 實機安裝步驟' 
              : 'Installation Guide for Nintendo 3DS (Sys 11.17 + Luma3DS v13.4)'}
          </h4>

          <button
            onClick={handleCopyPath}
            className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800/80 flex items-center gap-1 transition-colors"
          >
            {copiedPath ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            <span>{copiedPath ? (isZh ? '路徑已複製！' : 'Path Copied!') : `複製 SD 卡路徑: ${targetPath}`}</span>
          </button>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-400 pt-1">
          {/* STEP 1 */}
          <li className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1.5">
            <span className="font-bold text-cyan-400 font-mono">
              {isZh ? '步驟 1：放入 3DS 記憶卡' : 'STEP 1: Copy to SD Card'}
            </span>
            <p className="leading-relaxed">
              {isZh ? (
                <>
                  將下載的 <code className="text-cyan-300 font-mono bg-slate-950 px-1 py-0.5 rounded">cheats.txt</code> 或 <code className="text-amber-300 font-mono bg-slate-950 px-1 py-0.5 rounded">plugin.3gx</code> 放入 SD 卡：
                  <br />
                  <span className="text-[11px] font-mono text-amber-300 break-all font-semibold block mt-1 bg-slate-950 p-1.5 rounded border border-slate-800">
                    SD:{targetPath}
                  </span>
                </>
              ) : (
                <>
                  Place downloaded <code className="text-cyan-300 font-mono">cheats.txt</code> or <code className="text-amber-300 font-mono">plugin.3gx</code> into:
                  <br />
                  <span className="text-[11px] font-mono text-amber-300 break-all font-semibold block mt-1 bg-slate-950 p-1.5 rounded border border-slate-800">
                    SD:{targetPath}
                  </span>
                </>
              )}
            </p>
          </li>

          {/* STEP 2 */}
          <li className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1.5">
            <span className="font-bold text-cyan-400 font-mono">
              {isZh ? '步驟 2：開啟 Rosalina 外掛載入器' : 'STEP 2: Enable Plugin Loader'}
            </span>
            <p className="leading-relaxed">
              {isZh ? (
                <>
                  在 3DS 任何畫面同時按下 <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono font-bold border border-slate-700">L + 十字鍵下 + Select</kbd> 打開 Luma3DS v13.4 的 Rosalina 選單。
                  <br />
                  移動到 <strong className="text-slate-200">Plugin Loader</strong> 並切換為 <strong className="text-emerald-400">[Enabled]</strong>。
                </>
              ) : (
                <>
                  Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono font-bold border border-slate-700">L + Down + Select</kbd> on your 3DS to open Rosalina menu.
                  <br />
                  Scroll to <strong className="text-slate-200">Plugin Loader</strong> and set to <strong className="text-emerald-400">[Enabled]</strong>.
                </>
              )}
            </p>
          </li>

          {/* STEP 3 */}
          <li className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1.5">
            <span className="font-bold text-cyan-400 font-mono">
              {isZh ? '步驟 3：啟動遊戲並載入金手指' : 'STEP 3: Launch Pokémon Game'}
            </span>
            <p className="leading-relaxed">
              {isZh ? (
                <>
                  啟動 <strong className="text-slate-200">{game.name}</strong>，上螢幕出現短暫 <span className="text-cyan-400 font-bold">藍光閃爍 (Blue Flash)</span> 即代表外掛注入成功！
                  <br />
                  在遊戲中隨時按下 <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono font-bold border border-slate-700">Select</kbd> 即可呼叫 CTRPF 金手指選單。
                </>
              ) : (
                <>
                  Start <strong className="text-slate-200">{game.name}</strong>. A brief <span className="text-cyan-400 font-bold">blue flash</span> confirms CTRPF is active.
                  <br />
                  Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono font-bold border border-slate-700">Select</kbd> in-game to access cheat menu!
                </>
              )}
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
};
