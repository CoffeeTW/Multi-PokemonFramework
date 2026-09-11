import { GameInfo, GameId } from '../types';

export const GAMES_METADATA: Record<GameId, GameInfo> = {
  X: {
    id: 'X',
    name: 'Pokémon X',
    generation: 6,
    group: 'XY',
    titleId: '0004000000055D00',
    updateVersion: 5232,
    maxPokemon: 721,
    boxCount: 31,
    badgeType: 'Badges',
    color: 'from-blue-600 to-indigo-700',
  },
  Y: {
    id: 'Y',
    name: 'Pokémon Y',
    generation: 6,
    group: 'XY',
    titleId: '0004000000055E00',
    updateVersion: 5216,
    maxPokemon: 721,
    boxCount: 31,
    badgeType: 'Badges',
    color: 'from-red-600 to-rose-700',
  },
  OR: {
    id: 'OR',
    name: 'Pokémon Omega Ruby',
    generation: 6,
    group: 'ORAS',
    titleId: '000400000011C400',
    updateVersion: 7820,
    maxPokemon: 721,
    boxCount: 31,
    badgeType: 'Badges',
    color: 'from-red-700 to-amber-700',
  },
  AS: {
    id: 'AS',
    name: 'Pokémon Alpha Sapphire',
    generation: 6,
    group: 'ORAS',
    titleId: '000400000011C500',
    updateVersion: 7820,
    maxPokemon: 721,
    boxCount: 31,
    badgeType: 'Badges',
    color: 'from-blue-700 to-cyan-700',
  },
  S: {
    id: 'S',
    name: 'Pokémon Sun',
    generation: 7,
    group: 'SM',
    titleId: '0004000000164800',
    updateVersion: 2112,
    maxPokemon: 802,
    boxCount: 32,
    badgeType: 'Z-Crystals',
    color: 'from-amber-500 to-orange-600',
  },
  M: {
    id: 'M',
    name: 'Pokémon Moon',
    generation: 7,
    group: 'SM',
    titleId: '0004000000175E00',
    updateVersion: 2112,
    maxPokemon: 802,
    boxCount: 32,
    badgeType: 'Z-Crystals',
    color: 'from-indigo-600 to-violet-700',
  },
  US: {
    id: 'US',
    name: 'Pokémon Ultra Sun',
    generation: 7,
    group: 'USUM',
    titleId: '00040000001B5000',
    updateVersion: 2080,
    maxPokemon: 807,
    boxCount: 32,
    badgeType: 'Z-Crystals',
    color: 'from-amber-600 to-rose-600',
  },
  UM: {
    id: 'UM',
    name: 'Pokémon Ultra Moon',
    generation: 7,
    group: 'USUM',
    titleId: '00040000001B5100',
    updateVersion: 2080,
    maxPokemon: 807,
    boxCount: 32,
    badgeType: 'Z-Crystals',
    color: 'from-purple-700 to-blue-800',
  },
};

export interface PokemonSpecies {
  id: number;
  name: {
    ENG: string;
    FRE: string;
    ITA: string;
    CHT: string;
  };
  types: string[];
}

// Curated list of Pokémon including key Gen 6 and Gen 7 species
export const POKEMON_SPECIES_LIST: PokemonSpecies[] = [
  { id: 1, name: { ENG: 'Bulbasaur', FRE: 'Bulbizarre', ITA: 'Bulbasaur', CHT: '妙蛙種子' }, types: ['Grass', 'Poison'] },
  { id: 2, name: { ENG: 'Ivysaur', FRE: 'Herbizarre', ITA: 'Ivysaur', CHT: '妙蛙草' }, types: ['Grass', 'Poison'] },
  { id: 3, name: { ENG: 'Venusaur', FRE: 'Florizarre', ITA: 'Venusaur', CHT: '妙蛙花' }, types: ['Grass', 'Poison'] },
  { id: 4, name: { ENG: 'Charmander', FRE: 'Salamèche', ITA: 'Charmander', CHT: '小火龍' }, types: ['Fire'] },
  { id: 5, name: { ENG: 'Charmeleon', FRE: 'Reptincel', ITA: 'Charmeleon', CHT: '火恐龍' }, types: ['Fire'] },
  { id: 6, name: { ENG: 'Charizard', FRE: 'Dracaufeu', ITA: 'Charizard', CHT: '噴火龍' }, types: ['Fire', 'Flying'] },
  { id: 7, name: { ENG: 'Squirtle', FRE: 'Carapuce', ITA: 'Squirtle', CHT: '傑尼龜' }, types: ['Water'] },
  { id: 8, name: { ENG: 'Wartortle', FRE: 'Carabaffe', ITA: 'Wartortle', CHT: '卡咪龜' }, types: ['Water'] },
  { id: 9, name: { ENG: 'Blastoise', FRE: 'Tortank', ITA: 'Blastoise', CHT: '水箭龜' }, types: ['Water'] },
  { id: 25, name: { ENG: 'Pikachu', FRE: 'Pikachu', ITA: 'Pikachu', CHT: '皮卡丘' }, types: ['Electric'] },
  { id: 133, name: { ENG: 'Eevee', FRE: 'Évoli', ITA: 'Eevee', CHT: '伊布' }, types: ['Normal'] },
  { id: 143, name: { ENG: 'Snorlax', FRE: 'Ronflex', ITA: 'Snorlax', CHT: '卡比獸' }, types: ['Normal'] },
  { id: 144, name: { ENG: 'Articuno', FRE: 'Artikodin', ITA: 'Articuno', CHT: '急凍鳥' }, types: ['Ice', 'Flying'] },
  { id: 145, name: { ENG: 'Zapdos', FRE: 'Électhor', ITA: 'Zapdos', CHT: '閃電鳥' }, types: ['Electric', 'Flying'] },
  { id: 146, name: { ENG: 'Moltres', FRE: 'Sulfura', ITA: 'Moltres', CHT: '火焰鳥' }, types: ['Fire', 'Flying'] },
  { id: 149, name: { ENG: 'Dragonite', FRE: 'Dracolosse', ITA: 'Dragonite', CHT: '快龍' }, types: ['Dragon', 'Flying'] },
  { id: 150, name: { ENG: 'Mewtwo', FRE: 'Mewtwo', ITA: 'Mewtwo', CHT: '超夢' }, types: ['Psychic'] },
  { id: 151, name: { ENG: 'Mew', FRE: 'Mew', ITA: 'Mew', CHT: '夢幻' }, types: ['Psychic'] },
  { id: 249, name: { ENG: 'Lugia', FRE: 'Lugia', ITA: 'Lugia', CHT: '洛奇亞' }, types: ['Psychic', 'Flying'] },
  { id: 250, name: { ENG: 'Ho-Oh', FRE: 'Ho-Oh', ITA: 'Ho-Oh', CHT: '鳳王' }, types: ['Fire', 'Flying'] },
  { id: 251, name: { ENG: 'Celebi', FRE: 'Celebi', ITA: 'Celebi', CHT: '時拉比' }, types: ['Psychic', 'Grass'] },
  { id: 252, name: { ENG: 'Treecko', FRE: 'Arcko', ITA: 'Treecko', CHT: '木守宮' }, types: ['Grass'] },
  { id: 255, name: { ENG: 'Torchic', FRE: 'Poussifeu', ITA: 'Torchic', CHT: '火稚雞' }, types: ['Fire'] },
  { id: 258, name: { ENG: 'Mudkip', FRE: 'Gobou', ITA: 'Mudkip', CHT: '水躍魚' }, types: ['Water'] },
  { id: 380, name: { ENG: 'Latias', FRE: 'Latias', ITA: 'Latias', CHT: '拉帝亞斯' }, types: ['Dragon', 'Psychic'] },
  { id: 381, name: { ENG: 'Latios', FRE: 'Latios', ITA: 'Latios', CHT: '拉帝歐斯' }, types: ['Dragon', 'Psychic'] },
  { id: 382, name: { ENG: 'Kyogre', FRE: 'Kyogre', ITA: 'Kyogre', CHT: '蓋歐卡' }, types: ['Water'] },
  { id: 383, name: { ENG: 'Groudon', FRE: 'Groudon', ITA: 'Groudon', CHT: '固拉多' }, types: ['Ground'] },
  { id: 384, name: { ENG: 'Rayquaza', FRE: 'Rayquaza', ITA: 'Rayquaza', CHT: '烈空坐' }, types: ['Dragon', 'Flying'] },
  { id: 385, name: { ENG: 'Jirachi', FRE: 'Jirachi', ITA: 'Jirachi', CHT: '基拉祈' }, types: ['Steel', 'Psychic'] },
  { id: 386, name: { ENG: 'Deoxys', FRE: 'Deoxys', ITA: 'Deoxys', CHT: '代歐奇希斯' }, types: ['Psychic'] },
  { id: 448, name: { ENG: 'Lucario', FRE: 'Lucario', ITA: 'Lucario', CHT: '路卡利歐' }, types: ['Fighting', 'Steel'] },
  { id: 483, name: { ENG: 'Dialga', FRE: 'Dialga', ITA: 'Dialga', CHT: '帝牙盧卡' }, types: ['Steel', 'Dragon'] },
  { id: 484, name: { ENG: 'Palkia', FRE: 'Palkia', ITA: 'Palkia', CHT: '帕路奇亞' }, types: ['Water', 'Dragon'] },
  { id: 487, name: { ENG: 'Giratina', FRE: 'Giratina', ITA: 'Giratina', CHT: '騎拉帝納' }, types: ['Ghost', 'Dragon'] },
  { id: 493, name: { ENG: 'Arceus', FRE: 'Arceus', ITA: 'Arceus', CHT: '阿爾宙斯' }, types: ['Normal'] },
  { id: 643, name: { ENG: 'Reshiram', FRE: 'Reshiram', ITA: 'Reshiram', CHT: '萊希拉姆' }, types: ['Dragon', 'Fire'] },
  { id: 644, name: { ENG: 'Zekrom', FRE: 'Zekrom', ITA: 'Zekrom', CHT: '捷克羅姆' }, types: ['Dragon', 'Electric'] },
  { id: 646, name: { ENG: 'Kyurem', FRE: 'Kyurem', ITA: 'Kyurem', CHT: '酋雷姆' }, types: ['Dragon', 'Ice'] },
  // Gen 6 Kalos Stars
  { id: 650, name: { ENG: 'Chespin', FRE: 'Marisson', ITA: 'Chespin', CHT: '哈力栗' }, types: ['Grass'] },
  { id: 653, name: { ENG: 'Fennekin', FRE: 'Feunnec', ITA: 'Fennekin', CHT: '火狐狸' }, types: ['Fire'] },
  { id: 656, name: { ENG: 'Froakie', FRE: 'Grenousse', ITA: 'Froakie', CHT: '呱呱泡蛙' }, types: ['Water'] },
  { id: 658, name: { ENG: 'Greninja', FRE: 'Amphinobi', ITA: 'Greninja', CHT: '甲賀忍蛙' }, types: ['Water', 'Dark'] },
  { id: 700, name: { ENG: 'Sylveon', FRE: 'Nymphali', ITA: 'Sylveon', CHT: '仙子伊布' }, types: ['Fairy'] },
  { id: 716, name: { ENG: 'Xerneas', FRE: 'Xerneas', ITA: 'Xerneas', CHT: '哲爾尼亞斯' }, types: ['Fairy'] },
  { id: 717, name: { ENG: 'Yveltal', FRE: 'Yveltal', ITA: 'Yveltal', CHT: '伊裴爾塔爾' }, types: ['Dark', 'Flying'] },
  { id: 718, name: { ENG: 'Zygarde', FRE: 'Zygarde', ITA: 'Zygarde', CHT: '基格爾德' }, types: ['Dragon', 'Ground'] },
  { id: 719, name: { ENG: 'Diancie', FRE: 'Diancie', ITA: 'Diancie', CHT: '蒂安希' }, types: ['Rock', 'Fairy'] },
  { id: 720, name: { ENG: 'Hoopa', FRE: 'Hoopa', ITA: 'Hoopa', CHT: '胡帕' }, types: ['Psychic', 'Ghost'] },
  { id: 721, name: { ENG: 'Volcanion', FRE: 'Volcanion', ITA: 'Volcanion', CHT: '波爾凱尼恩' }, types: ['Fire', 'Water'] },
  // Gen 7 Alola Stars
  { id: 722, name: { ENG: 'Rowlet', FRE: 'Brindibou', ITA: 'Rowlet', CHT: '木木梟' }, types: ['Grass', 'Flying'] },
  { id: 724, name: { ENG: 'Decidueye', FRE: 'Archéduc', ITA: 'Decidueye', CHT: '狙射樹梟' }, types: ['Grass', 'Ghost'] },
  { id: 725, name: { ENG: 'Litten', FRE: 'Flamiaou', ITA: 'Litten', CHT: '火斑喵' }, types: ['Fire'] },
  { id: 727, name: { ENG: 'Incineroar', FRE: 'Félinferno', ITA: 'Incineroar', CHT: '熾焰咆哮虎' }, types: ['Fire', 'Dark'] },
  { id: 728, name: { ENG: 'Popplio', FRE: 'Otaquin', ITA: 'Popplio', CHT: '球球海獅' }, types: ['Water'] },
  { id: 730, name: { ENG: 'Primarina', FRE: 'Oratoria', ITA: 'Primarina', CHT: '西獅海壬' }, types: ['Water', 'Fairy'] },
  { id: 744, name: { ENG: 'Rockruff', FRE: 'Rocabot', ITA: 'Rockruff', CHT: '岩狗狗' }, types: ['Rock'] },
  { id: 745, name: { ENG: 'Lycanroc', FRE: 'Lougaroc', ITA: 'Lycanroc', CHT: '鬃岩狼人' }, types: ['Rock'] },
  { id: 778, name: { ENG: 'Mimikyu', FRE: 'Mimiqui', ITA: 'Mimikyu', CHT: '謎擬Ｑ' }, types: ['Ghost', 'Fairy'] },
  { id: 785, name: { ENG: 'Tapu Koko', FRE: 'Tokorico', ITA: 'Tapu Koko', CHT: '卡璞・鳴鳴' }, types: ['Electric', 'Fairy'] },
  { id: 786, name: { ENG: 'Tapu Lele', FRE: 'Tokopiyon', ITA: 'Tapu Lele', CHT: '卡璞・蝶蝶' }, types: ['Psychic', 'Fairy'] },
  { id: 787, name: { ENG: 'Tapu Bulu', FRE: 'Tokotoro', ITA: 'Tapu Bulu', CHT: '卡璞・哞哞' }, types: ['Grass', 'Fairy'] },
  { id: 788, name: { ENG: 'Tapu Fini', FRE: 'Tokopisco', ITA: 'Tapu Fini', CHT: '卡璞・鰭鰭' }, types: ['Water', 'Fairy'] },
  { id: 789, name: { ENG: 'Cosmog', FRE: 'Cosmog', ITA: 'Cosmog', CHT: '科斯莫古' }, types: ['Psychic'] },
  { id: 791, name: { ENG: 'Solgaleo', FRE: 'Solgaleo', ITA: 'Solgaleo', CHT: '索爾迦雷歐' }, types: ['Psychic', 'Steel'] },
  { id: 792, name: { ENG: 'Lunala', FRE: 'Lunala', ITA: 'Lunala', CHT: '露奈雅拉' }, types: ['Psychic', 'Ghost'] },
  { id: 793, name: { ENG: 'Nihilego', FRE: 'Zéroïd', ITA: 'Nihilego', CHT: '虛吾伊德' }, types: ['Rock', 'Poison'] },
  { id: 800, name: { ENG: 'Necrozma', FRE: 'Necrozma', ITA: 'Necrozma', CHT: '奈克洛茲瑪' }, types: ['Psychic'] },
  { id: 801, name: { ENG: 'Magearna', FRE: 'Magearna', ITA: 'Magearna', CHT: '瑪機雅娜' }, types: ['Steel', 'Fairy'] },
  { id: 802, name: { ENG: 'Marshadow', FRE: 'Marshadow', ITA: 'Marshadow', CHT: '瑪夏多' }, types: ['Fighting', 'Ghost'] },
  // USUM Additions (up to 807)
  { id: 803, name: { ENG: 'Poipole', FRE: 'Vémini', ITA: 'Poipole', CHT: '毒貝比' }, types: ['Poison'] },
  { id: 804, name: { ENG: 'Naganadel', FRE: 'Mandrillon', ITA: 'Naganadel', CHT: '四顎針龍' }, types: ['Poison', 'Dragon'] },
  { id: 805, name: { ENG: 'Stakataka', FRE: 'Ama-Ama', ITA: 'Stakataka', CHT: '壘磊石' }, types: ['Rock', 'Steel'] },
  { id: 806, name: { ENG: 'Blacephalon', FRE: 'Pierroteknik', ITA: 'Blacephalon', CHT: '碰頭小丑' }, types: ['Fire', 'Ghost'] },
  { id: 807, name: { ENG: 'Zeraora', FRE: 'Zeraora', ITA: 'Zeraora', CHT: '捷拉奧拉' }, types: ['Electric'] }
];

export const NATURES = [
  'Hardy', 'Lonely', 'Brave', 'Adamant', 'Naughty',
  'Bold', 'Docile', 'Relaxed', 'Impish', 'Lax',
  'Timid', 'Hasty', 'Serious', 'Jolly', 'Naive',
  'Modest', 'Mild', 'Quiet', 'Bashful', 'Rash',
  'Calm', 'Gentle', 'Sassy', 'Careful', 'Quirky'
];

export const POKEBALLS = [
  'Master Ball', 'Ultra Ball', 'Great Ball', 'Poké Ball',
  'Safari Ball', 'Net Ball', 'Dive Ball', 'Nest Ball',
  'Repeat Ball', 'Timer Ball', 'Luxury Ball', 'Premier Ball',
  'Dusk Ball', 'Heal Ball', 'Quick Ball', 'Cherish Ball',
  'Fast Ball', 'Level Ball', 'Lure Ball', 'Heavy Ball',
  'Love Ball', 'Friend Ball', 'Moon Ball', 'Sport Ball',
  'Beast Ball'
];

export const POPULAR_ITEMS = [
  'Leftovers', 'Life Orb', 'Choice Band', 'Choice Specs', 'Choice Scarf',
  'Focus Sash', 'Assault Vest', 'Eviolite', 'Rocky Helmet', 'Heavy-Duty Boots',
  'Lum Berry', 'Sitrus Berry', 'Master Ball', 'Rare Candy', 'Ability Capsule',
  'Gold Bottle Cap', 'Destiny Knot', 'Everstone', 'Lucky Egg', 'Mega Ring',
  'Charizardite X', 'Charizardite Y', 'Mewtwonite X', 'Mewtwonite Y',
  'Ultranecrozium Z', 'Solganium Z', 'Lunalium Z', 'Decidium Z', 'Incinium Z'
];

export const POPULAR_MOVES = [
  'Earthquake', 'Ice Beam', 'Thunderbolt', 'Flamethrower', 'Scald',
  'Stealth Rock', 'Toxic', 'Protect', 'U-turn', 'Volt Switch',
  'Roost', 'Recover', 'Moonblast', 'Shadow Ball', 'Close Combat',
  'Swords Dance', 'Dragon Dance', 'Nasty Plot', 'Calm Mind', 'Taunt',
  'Knock Off', 'Play Rough', 'Giga Drain', 'Extreme Speed', 'Z-Move Blast'
];

export const POPULAR_ABILITIES = [
  'Intimidate', 'Levitate', 'Magic Bounce', 'Speed Boost', 'Protean',
  'Beast Boost', 'Prankster', 'Sturdy', 'Natural Cure', 'Drought',
  'Drizzle', 'Electric Surge', 'Psychic Surge', 'Grassy Surge', 'Misty Surge',
  'Technician', 'Adaptability', 'Guts', 'Huge Power', 'Pure Power',
  'Regenerator', 'Disguise', 'Neuroforce', 'Shadow Shield', 'Full Metal Body'
];

export const MET_LOCATIONS = [
  'Route 1', 'Route 7', 'Route 10', 'Altar of the Sunne', 'Altar of the Moone',
  'Mount Lanakila', 'Ultra Space Wilds', 'Poni Plains', 'Lush Jungle',
  'Pokemon League', 'Day Care Center', 'Nursery', 'Aether Paradise',
  'Tower of Mastery', 'Geosenge Town', 'Terminus Cave', 'Sea Mauville',
  'Sky Pillar', 'Battle Maison', 'Battle Tree', 'Fateful Encounter'
];
