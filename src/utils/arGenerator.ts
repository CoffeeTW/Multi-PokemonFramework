import { GameInfo, CheatEntry, PokemonData } from '../types';

export function generateActionReplayCode(
  game: GameInfo,
  cheats: CheatEntry[],
  currentPokemon?: PokemonData
): string {
  const activeCheats = cheats.filter(c => {
    if (!c.isEnabled) return false;
    if (c.groups && !c.groups.includes(game.group)) return false;
    return true;
  });

  const lines: string[] = [
    `# ========================================================`,
    `# Multi-Pokémon Framework CTRPluginFramework Export`,
    `# Game: ${game.name} (${game.group})`,
    `# Title ID: ${game.titleId}`,
    `# Update Version: v${game.updateVersion}`,
    `# SD Path: /luma/plugins/${game.titleId}/cheats.txt`,
    `# ========================================================`,
    ``,
  ];

  if (activeCheats.length === 0 && !currentPokemon) {
    lines.push(`# No active cheats currently selected.`);
    lines.push(`# Toggle cheats in the Multi-Pokémon Framework interface to generate codes.`);
    return lines.join('\n');
  }

  for (const cheat of activeCheats) {
    lines.push(`[${cheat.name.ENG}]`);
    if (cheat.hotkey) {
      lines.push(`; Hotkey: ${cheat.hotkey}`);
    }
    if (cheat.arCodeSnippet) {
      lines.push(cheat.arCodeSnippet);
    } else {
      // Default generated hook for cheat
      lines.push(`080D0000 00000001`);
    }
    lines.push(``);
  }

  if (currentPokemon) {
    lines.push(`[PKHeX Memory Inject: Box ${currentPokemon.box} Slot ${currentPokemon.slot}]`);
    lines.push(`; Species: #${currentPokemon.speciesId} | Level: ${currentPokemon.level} | Shiny: ${currentPokemon.isShiny ? 'Yes' : 'No'}`);
    
    // Memory address calculation matching CTRPF Computer.cpp
    // pointer = (((slot - 1) * 0xE8) + ((box - 1) * 6960 + GetPokePointer()));
    const boxOffset = (currentPokemon.box - 1) * 6960;
    const slotOffset = (currentPokemon.slot - 1) * 232; // 0xE8
    const hexOffset = (boxOffset + slotOffset).toString(16).toUpperCase().padStart(8, '0');
    
    lines.push(`D3000000 08C861C8`);
    lines.push(`0${hexOffset.slice(1)} ${currentPokemon.speciesId.toString(16).padStart(4, '0')}${currentPokemon.level.toString(16).padStart(4, '0')}`);
    lines.push(`D2000000 00000000`);
    lines.push(``);
  }

  return lines.join('\n');
}

export function downloadFile(content: string, filename: string, type = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
