import React, { useState } from 'react';
import { GameInfo, CheatEntry, PokemonData, LanguageCode } from '../types';
import { generateActionReplayCode, downloadFile } from '../utils/arGenerator';
import { Copy, Download, Check, Terminal, HardDrive, Cpu, ShieldCheck } from 'lucide-react';

interface Props {
  game: GameInfo;
  cheats: CheatEntry[];
  currentPokemon?: PokemonData;
  language?: LanguageCode;
}

export const ArCodeExporter: React.FC<Props> = ({ game, cheats, currentPokemon, language = 'CHT' }) => {
  const [copied, setCopied] = useState(false);
  const [copiedPath, setCopiedPath] = useState(false);
  const codeContent = generateActionReplayCode(game, cheats, currentPokemon);
  const targetPath = `/luma/plugins/${game.titleId}/`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
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
    downloadFile(codeContent, `cheats_${game.titleId}.txt`);
  };

  const isZh = language === 'CHT';

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
                {isZh ? '3DS 系統與 Luma3DS 相容性確認' : '3DS & Luma3DS Compatibility Verified'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                100% READY
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 font-mono">
              {isZh 
                ? '已支援 韌體版本: Sys 11.17.0-50J (日規全區) ｜ Luma3DS 版本: v13.4' 
                : 'Target: Sys 11.17.0-50J (JPN/Global) ｜ Luma3DS v13.4'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
          <Cpu size={14} className="text-cyan-400" />
          <span>Luma3DS 13.4 內建 3GX Loader</span>
        </div>
      </div>

      {/* Overview & Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div>
          <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
            <Terminal size={17} className="text-cyan-400" />
            {isZh ? 'Action Replay / CTRPF 金手指代碼生成器' : 'Action Replay / CTRPF Code Generator'}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {isZh 
              ? `即時記憶體注入碼與 AR 金手指 — 目標遊戲: ${game.name} (${game.titleId})` 
              : `Real-time memory hooks and cheat addresses generated for ${game.name} (${game.titleId})`}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleCopy}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copied ? (isZh ? '已複製！' : 'Copied!') : (isZh ? '複製代碼' : 'Copy Code')}</span>
          </button>
          <button
            onClick={handleDownloadTxt}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-950/30 transition-colors"
          >
            <Download size={14} />
            <span>{isZh ? '下載 cheats.txt' : 'Download cheats.txt'}</span>
          </button>
        </div>
      </div>

      {/* Code Display Terminal */}
      <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-950">
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            <span className="ml-2 text-slate-300 font-semibold">cheats_{game.titleId}.txt</span>
          </div>
          <span>Format: CTRPF Action Replay (UTF-8)</span>
        </div>

        <pre className="p-4 sm:p-5 text-xs font-mono text-cyan-300 overflow-x-auto whitespace-pre leading-relaxed selection:bg-cyan-900 max-h-[450px]">
          {codeContent}
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
