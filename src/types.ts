export type GameId = 'X' | 'Y' | 'OR' | 'AS' | 'S' | 'M' | 'US' | 'UM';

export type GameGroup = 'XY' | 'ORAS' | 'SM' | 'USUM';

export type LanguageCode = 'ENG' | 'FRE' | 'ITA' | 'CHT';

export interface GameInfo {
  id: GameId;
  name: string;
  generation: 6 | 7;
  group: GameGroup;
  titleId: string;
  updateVersion: number;
  maxPokemon: number;
  boxCount: number;
  badgeType: 'Badges' | 'Z-Crystals';
  color: string;
}

export type CheatCategory = 
  | 'GTS'
  | 'PlazaOrPSS'
  | 'Battle'
  | 'Trainer'
  | 'Computer'
  | 'Movement'
  | 'Miscellaneous';

export interface CheatEntry {
  id: string;
  name: {
    ENG: string;
    FRE: string;
    ITA: string;
    CHT: string;
  };
  description: {
    ENG: string;
    FRE: string;
    ITA: string;
    CHT: string;
  };
  category: CheatCategory;
  subcategory?: string;
  groups?: GameGroup[]; // If undefined, applies to all
  hotkey?: string;
  isEnabled: boolean;
  type: 'toggle' | 'action' | 'input' | 'select';
  inputValue?: string | number;
  selectOptions?: { label: { ENG: string; FRE: string; ITA: string; CHT: string }; value: string | number }[];
  arCodeSnippet?: string;
}

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
}

export interface PokemonData {
  box: number;
  slot: number;
  speciesId: number;
  nickname: string;
  isNicknamed: boolean;
  level: number;
  nature: string;
  gender: 'Male' | 'Female' | 'Genderless';
  isShiny: boolean;
  ability: string;
  heldItem: string;
  friendship: number;
  form: number;
  language: string;
  isEgg: boolean;
  pokerus: 'None' | 'Infected' | 'Cured';
  country: string;
  region: string;
  consoleRegion: string;
  
  // Met Info
  originGame: GameId;
  metLocation: string;
  pokeball: string;
  metLevel: number;
  metDate: string;
  isFatefulEncounter: boolean;
  eggMetLocation?: string;
  eggMetDate?: string;

  // Stats
  ivs: PokemonStats;
  evs: PokemonStats;
  contest: {
    cool: number;
    beauty: number;
    cute: number;
    clever: number;
    tough: number;
    sheen: number;
  };

  // Moves
  moves: [string, string, string, string];
  ppUps: [number, number, number, number];
  relearnMoves: [string, string, string, string];

  // Trainer & OT
  tid: number;
  sid: number;
  otName: string;
  latestHandler: string;
  ribbonsCount: number;
}

export interface TrainerProfile {
  tid: number;
  sid: number;
  otName: string;
  playHours: number;
  playMinutes: number;
  playSeconds: number;
  money: number;
  pokeMiles: number;
  battlePoints: number;
  festivalCoins: number;
  festivalRank: number;
  oPowerGauge: number;
  shoutOutMessage: string;
  gameLanguage: LanguageCode;
}

export interface MemoryOffsetRow {
  address: string;
  originalHex: string;
  currentHex: string;
  label: string;
  cheatLinked: string;
}
