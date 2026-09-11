import React, { useState } from 'react';
import { GameInfo, CheatEntry, MemoryOffsetRow } from '../types';
import { Search, Binary, RefreshCw, Cpu } from 'lucide-react';

interface Props {
  game: GameInfo;
  cheats: CheatEntry[];
}

export const MemoryHexViewer: React.FC<Props> = ({ game, cheats }) => {
  const [searchAddr, setSearchAddr] = useState<string>('');

  // Sample real offsets from CTRPF C++ source code
  const baseOffsets: MemoryOffsetRow[] = [
    {
      address: game.generation === 6 ? '0x08C861C8' : '0x330D9838',
      originalHex: '00 00 27 10',
      currentHex: cheats.find(c => c.id === 'trainer_max_money')?.isEnabled ? '00 98 96 7F' : '00 00 27 10',
      label: 'Trainer Money ($)',
      cheatLinked: 'trainer_max_money',
    },
    {
      address: game.generation === 6 ? '0x08C861CC' : '0x330D983C',
      originalHex: '00 00 00 14',
      currentHex: cheats.find(c => c.id === 'trainer_max_bp')?.isEnabled ? '00 00 27 0F' : '00 00 00 14',
      label: 'Battle Points (BP)',
      cheatLinked: 'trainer_max_bp',
    },
    {
      address: game.generation === 6 ? '0x08C79C3C' : '0x330D67D0',
      originalHex: '30 39 00 00',
      currentHex: '30 39 00 00',
      label: 'Trainer ID (TID) / SID',
      cheatLinked: 'trainer_ids',
    },
    {
      address: game.generation === 6 ? '0x080DA120' : '0x003160BC',
      originalHex: 'E3 A0 00 00',
      currentHex: cheats.find(c => c.id === 'battle_shiny_100')?.isEnabled ? 'E3 A0 00 01' : 'E3 A0 00 00',
      label: 'Wild Shiny Generator Hook',
      cheatLinked: 'battle_shiny_100',
    },
    {
      address: game.generation === 6 ? '0x080DA148' : '0x003160D0',
      originalHex: '1A 00 00 05',
      currentHex: cheats.find(c => c.id === 'battle_disable_shiny_lock')?.isEnabled ? 'EA 00 00 05' : '1A 00 00 05',
      label: 'Shiny Lock Bypass Branch',
      cheatLinked: 'battle_disable_shiny_lock',
    },
    {
      address: game.generation === 6 ? '0x080DB200' : '0x00318040',
      originalHex: 'E1 A0 00 00',
      currentHex: cheats.find(c => c.id === 'battle_guaranteed_catch')?.isEnabled ? 'E3 A0 00 01' : 'E1 A0 00 00',
      label: 'Pokéball Catch Rate Calculator',
      cheatLinked: 'battle_guaranteed_catch',
    },
    {
      address: game.generation === 6 ? '0x080C5100' : '0x00320140',
      originalHex: 'EB 01 22 4A',
      currentHex: cheats.find(c => c.id === 'movement_bypass_walls')?.isEnabled ? 'E1 A0 00 00' : 'EB 01 22 4A',
      label: 'Player Collision Check (Walk Thru Walls)',
      cheatLinked: 'movement_bypass_walls',
    },
    {
      address: game.generation === 6 ? '0x080A4100' : '0x00325100',
      originalHex: 'E3 A0 00 01',
      currentHex: cheats.find(c => c.id === 'misc_remove_outlines')?.isEnabled ? '00 00 00 00' : 'E3 A0 00 01',
      label: '3DS Cel-Shading Outline Shader',
      cheatLinked: 'misc_remove_outlines',
    },
  ];

  const filteredRows = baseOffsets.filter(row => {
    if (!searchAddr.trim()) return true;
    const q = searchAddr.toLowerCase();
    return row.address.toLowerCase().includes(q) || row.label.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div>
          <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
            <Binary size={17} className="text-cyan-400" />
            CTRPluginFramework Memory Hex Viewer & Live Search
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Inspecting 3DS ARM9/ARM11 Memory Space for {game.name}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search address or symbol..."
            value={searchAddr}
            onChange={(e) => setSearchAddr(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>
      </div>

      {/* Hex Table */}
      <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-950">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Memory Address</th>
                <th className="py-3 px-4">Original Hex</th>
                <th className="py-3 px-4">Current Hex (Patched)</th>
                <th className="py-3 px-4">Subsystem Label</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredRows.map((row, idx) => {
                const isModified = row.originalHex !== row.currentHex;
                return (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4 text-cyan-400 font-semibold">{row.address}</td>
                    <td className="py-3 px-4 text-slate-500">{row.originalHex}</td>
                    <td className="py-3 px-4 font-bold">
                      <span className={isModified ? "text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/80" : "text-slate-300"}>
                        {row.currentHex}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300 font-sans text-xs">{row.label}</td>
                    <td className="py-3 px-4 text-right">
                      {isModified ? (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          HOOK ACTIVE
                        </span>
                      ) : (
                        <span className="text-[10px] uppercase text-slate-500">Stock</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
