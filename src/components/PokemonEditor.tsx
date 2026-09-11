import React, { useState } from 'react';
import { GameInfo, LanguageCode, PokemonData } from '../types';
import { 
  POKEMON_SPECIES_LIST, 
  NATURES, 
  POKEBALLS, 
  POPULAR_ITEMS, 
  POPULAR_MOVES, 
  POPULAR_ABILITIES, 
  MET_LOCATIONS 
} from '../data/pokemonData';
import { 
  Sparkles, 
  Save, 
  Copy, 
  Download
} from 'lucide-react';
import { downloadFile } from '../utils/arGenerator';

interface Props {
  game: GameInfo;
  language: LanguageCode;
  onSavePokemon: (pkmn: PokemonData) => void;
}

export const PokemonEditor: React.FC<Props> = ({ game, language, onSavePokemon }) => {
  const [currentBox, setCurrentBox] = useState<number>(1);
  const [currentSlot, setCurrentSlot] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'main' | 'met' | 'stats' | 'attacks' | 'ot'>('main');

  // Active Pokémon state
  const [pokemon, setPokemon] = useState<PokemonData>({
    box: 1,
    slot: 1,
    speciesId: game.generation === 7 ? 724 : 658, // Decidueye or Greninja
    nickname: game.generation === 7 ? (language === 'CHT' ? '狙射樹梟' : 'Decidueye') : (language === 'CHT' ? '甲賀忍蛙' : 'Greninja'),
    isNicknamed: false,
    level: 100,
    nature: 'Jolly',
    gender: 'Male',
    isShiny: true,
    ability: game.generation === 7 ? 'Long Reach' : 'Protean',
    heldItem: 'Life Orb',
    friendship: 255,
    form: 0,
    language: 'ENG',
    isEgg: false,
    pokerus: 'Cured',
    country: 'United States',
    region: 'Alola',
    consoleRegion: 'Americas',
    originGame: game.id,
    metLocation: 'Altar of the Sunne',
    pokeball: 'Moon Ball',
    metLevel: 5,
    metDate: '2024-01-01',
    isFatefulEncounter: false,
    ivs: { hp: 31, attack: 31, defense: 31, spAttack: 31, spDefense: 31, speed: 31 },
    evs: { hp: 4, attack: 252, defense: 0, spAttack: 0, spDefense: 0, speed: 252 },
    contest: { cool: 255, beauty: 255, cute: 255, clever: 255, tough: 255, sheen: 255 },
    moves: ['Spirit Shackle', 'Leaf Blade', 'Brave Bird', 'Swords Dance'],
    ppUps: [3, 3, 3, 3],
    relearnMoves: ['Roost', 'U-turn', 'Shadow Sneak', 'Sucker Punch'],
    tid: 12345,
    sid: 54321,
    otName: 'Trainer',
    latestHandler: 'Trainer',
    ribbonsCount: 12,
  });

  const currentSpecies = POKEMON_SPECIES_LIST.find(s => s.id === pokemon.speciesId) || POKEMON_SPECIES_LIST[0];

  const handleSpeciesChange = (speciesId: number) => {
    const spec = POKEMON_SPECIES_LIST.find(s => s.id === speciesId);
    if (!spec) return;
    setPokemon(prev => ({
      ...prev,
      speciesId,
      nickname: prev.isNicknamed ? prev.nickname : spec.name[language],
    }));
  };

  const handleSetAllIvs = (val: number) => {
    setPokemon(prev => ({
      ...prev,
      ivs: { hp: val, attack: val, defense: val, spAttack: val, spDefense: val, speed: val }
    }));
  };

  const handlePhysicalAtkEvSpread = () => {
    setPokemon(prev => ({
      ...prev,
      evs: { hp: 4, attack: 252, defense: 0, spAttack: 0, spDefense: 0, speed: 252 }
    }));
  };

  const handleSpecialAtkEvSpread = () => {
    setPokemon(prev => ({
      ...prev,
      evs: { hp: 4, attack: 0, defense: 0, spAttack: 252, spDefense: 0, speed: 252 }
    }));
  };

  const handleDefensiveEvSpread = () => {
    setPokemon(prev => ({
      ...prev,
      evs: { hp: 252, attack: 0, defense: 128, spAttack: 0, spDefense: 128, speed: 0 }
    }));
  };

  // TSV Calculation: (TID ^ SID) >> 4
  const tsv = ((pokemon.tid ^ pokemon.sid) >> 4);

  const handleSaveToSlot = () => {
    onSavePokemon({
      ...pokemon,
      box: currentBox,
      slot: currentSlot
    });
  };

  const handleCloneToNextSlot = () => {
    const nextSlot = currentSlot === 30 ? 1 : currentSlot + 1;
    const nextBox = currentSlot === 30 ? (currentBox === 32 ? 1 : currentBox + 1) : currentBox;
    setCurrentSlot(nextSlot);
    setCurrentBox(nextBox);
    onSavePokemon({
      ...pokemon,
      box: nextBox,
      slot: nextSlot
    });
  };

  const handleExportJson = () => {
    const json = JSON.stringify(pokemon, null, 2);
    downloadFile(json, `${pokemon.nickname}_Box${currentBox}_Slot${currentSlot}.json`, 'application/json');
  };

  const totalEvs = Object.values(pokemon.evs).reduce((acc, curr) => acc + curr, 0);

  const tabs = [
    { id: 'main', label: language === 'CHT' ? '主要屬性' : 'Main' },
    { id: 'met', label: language === 'CHT' ? '相遇資訊' : 'Met Info' },
    { id: 'stats', label: language === 'CHT' ? '個體/努力值 (IV/EV)' : 'IVs & EVs' },
    { id: 'attacks', label: language === 'CHT' ? '學會招式' : 'Attacks' },
    { id: 'ot', label: language === 'CHT' ? '初訓家與獎章' : 'OT & Ribbons' },
  ];

  return (
    <div className="space-y-6">
      {/* Box & Slot Navigation Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">{language === 'CHT' ? '電腦盒子:' : 'Box:'}</span>
            <select
              value={currentBox}
              onChange={(e) => setCurrentBox(Number(e.target.value))}
              className="bg-slate-950 border border-slate-700 text-cyan-300 font-mono text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500"
            >
              {Array.from({ length: game.boxCount }, (_, i) => i + 1).map((box) => (
                <option key={box} value={box}>{language === 'CHT' ? `盒子 ${box}` : `Box ${box}`}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">{language === 'CHT' ? '槽位 (1-30):' : 'Slot:'}</span>
            <select
              value={currentSlot}
              onChange={(e) => setCurrentSlot(Number(e.target.value))}
              className="bg-slate-950 border border-slate-700 text-cyan-300 font-mono text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500"
            >
              {Array.from({ length: 30 }, (_, i) => i + 1).map((slot) => (
                <option key={slot} value={slot}>{language === 'CHT' ? `槽位 ${slot}` : `Slot ${slot}`}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCloneToNextSlot}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Copy size={13} />
            <span>{language === 'CHT' ? '複製至下一槽位' : 'Clone to Next Slot'}</span>
          </button>
          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Download size={13} />
            <span>{language === 'CHT' ? '匯出 PKM JSON' : 'Export PKM JSON'}</span>
          </button>
          <button
            onClick={handleSaveToSlot}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-950/30 transition-colors"
          >
            <Save size={13} />
            <span>{language === 'CHT' ? `儲存至 盒子 ${currentBox}:${currentSlot}` : `Save to Box ${currentBox}:${currentSlot}`}</span>
          </button>
        </div>
      </div>

      {/* Editor Main Card */}
      <div className="bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden">
        
        {/* Pokémon Overview Banner */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border font-mono font-bold text-lg ${
              pokemon.isShiny 
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-400 shadow-lg shadow-amber-950/20' 
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}>
              #{pokemon.speciesId}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-100">
                  {pokemon.nickname}
                </h3>
                {pokemon.isShiny && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold">
                    <Sparkles size={11} /> {language === 'CHT' ? '異色/色違' : 'SHINY'}
                  </span>
                )}
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                  Lv. {pokemon.level}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                <span>{currentSpecies.name[language]}</span>
                <span>•</span>
                <span className="text-cyan-400">{pokemon.nature} {language === 'CHT' ? '性格' : 'Nature'}</span>
                <span>•</span>
                <span>{pokemon.ability}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPokemon(prev => ({ ...prev, isShiny: !prev.isShiny }))}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                pokemon.isShiny
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-950/20'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              <Sparkles size={14} />
              <span>{pokemon.isShiny ? (language === 'CHT' ? '異色形態 (Shiny)' : 'Shiny Form') : (language === 'CHT' ? '普通形態 (Regular)' : 'Regular Form')}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 px-4 bg-slate-950/50 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-cyan-500 text-cyan-400 bg-cyan-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="p-5">
          {/* TAB 1: MAIN */}
          {activeTab === 'main' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">{language === 'CHT' ? '寶可夢物種' : 'Species'}</label>
                <select
                  value={pokemon.speciesId}
                  onChange={(e) => handleSpeciesChange(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                >
                  {POKEMON_SPECIES_LIST.map((spec) => (
                    <option key={spec.id} value={spec.id}>
                      #{spec.id.toString().padStart(3, '0')} - {spec.name[language]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">{language === 'CHT' ? '暱稱' : 'Nickname'}</label>
                <input
                  type="text"
                  maxLength={12}
                  value={pokemon.nickname}
                  onChange={(e) => setPokemon(prev => ({ ...prev, nickname: e.target.value, isNicknamed: true }))}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">{language === 'CHT' ? '等級 (1-100)' : 'Level'}</span>
                  <span className="text-cyan-400 font-mono">{pokemon.level}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={pokemon.level}
                  onChange={(e) => setPokemon(prev => ({ ...prev, level: Number(e.target.value) }))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">{language === 'CHT' ? '性格 (Nature)' : 'Nature'}</label>
                <select
                  value={pokemon.nature}
                  onChange={(e) => setPokemon(prev => ({ ...prev, nature: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                >
                  {NATURES.map((nat) => (
                    <option key={nat} value={nat}>{nat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">{language === 'CHT' ? '性別' : 'Gender'}</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Male', 'Female', 'Genderless'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setPokemon(prev => ({ ...prev, gender: g }))}
                      className={`py-1.5 px-2 rounded-lg text-xs font-medium border ${
                        pokemon.gender === g
                          ? 'bg-cyan-600 text-white border-cyan-500'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {g === 'Male' ? (language === 'CHT' ? '雄性 ♂' : 'Male') : g === 'Female' ? (language === 'CHT' ? '雌性 ♀' : 'Female') : (language === 'CHT' ? '無性別' : 'Genderless')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">{language === 'CHT' ? '攜帶道具' : 'Held Item'}</label>
                <select
                  value={pokemon.heldItem}
                  onChange={(e) => setPokemon(prev => ({ ...prev, heldItem: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                >
                  {POPULAR_ITEMS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">{language === 'CHT' ? '特性 (Ability)' : 'Ability'}</label>
                <select
                  value={pokemon.ability}
                  onChange={(e) => setPokemon(prev => ({ ...prev, ability: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                >
                  {POPULAR_ABILITIES.map((ab) => (
                    <option key={ab} value={ab}>{ab}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">{language === 'CHT' ? '親密度' : 'Friendship'}</span>
                  <span className="text-cyan-400 font-mono">{pokemon.friendship}/255</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={255}
                  value={pokemon.friendship}
                  onChange={(e) => setPokemon(prev => ({ ...prev, friendship: Number(e.target.value) }))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">{language === 'CHT' ? '寶可病毒 (Pokérus)' : 'Pokérus Status'}</label>
                <select
                  value={pokemon.pokerus}
                  onChange={(e) => setPokemon(prev => ({ ...prev, pokerus: e.target.value as any }))}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option value="None">{language === 'CHT' ? '無 (None)' : 'None'}</option>
                  <option value="Infected">{language === 'CHT' ? '感染中 (傳染中)' : 'Infected (Active)'}</option>
                  <option value="Cured">{language === 'CHT' ? '已治癒 (免疫標誌)' : 'Cured (Cured Dot)'}</option>
                </select>
              </div>
            </div>
          )}

          {/* TAB 2: MET INFO */}
          {activeTab === 'met' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">{language === 'CHT' ? '來源遊戲' : 'Origin Game'}</label>
                <select
                  value={pokemon.originGame}
                  onChange={(e) => setPokemon(prev => ({ ...prev, originGame: e.target.value as any }))}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option value="X">Pokémon X</option>
                  <option value="Y">Pokémon Y</option>
                  <option value="OR">Pokémon 終極紅寶石 (Omega Ruby)</option>
                  <option value="AS">Pokémon 始源藍寶石 (Alpha Sapphire)</option>
                  <option value="S">Pokémon 太陽 (Sun)</option>
                  <option value="M">Pokémon 月亮 (Moon)</option>
                  <option value="US">Pokémon 究極之日 (Ultra Sun)</option>
                  <option value="UM">Pokémon 究極之月 (Ultra Moon)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">{language === 'CHT' ? '相遇地點' : 'Met Location'}</label>
                <select
                  value={pokemon.metLocation}
                  onChange={(e) => setPokemon(prev => ({ ...prev, metLocation: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                >
                  {MET_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">{language === 'CHT' ? '捕獲精靈球' : 'Pokéball'}</label>
                <select
                  value={pokemon.pokeball}
                  onChange={(e) => setPokemon(prev => ({ ...prev, pokeball: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                >
                  {POKEBALLS.map((ball) => (
                    <option key={ball} value={ball}>{ball}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">{language === 'CHT' ? '相遇等級' : 'Met Level'}</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={pokemon.metLevel}
                  onChange={(e) => setPokemon(prev => ({ ...prev, metLevel: Number(e.target.value) }))}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">{language === 'CHT' ? '相遇日期' : 'Met Date'}</label>
                <input
                  type="date"
                  value={pokemon.metDate}
                  onChange={(e) => setPokemon(prev => ({ ...prev, metDate: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="flex items-center gap-3 pt-5">
                <input
                  type="checkbox"
                  id="fateful"
                  checked={pokemon.isFatefulEncounter}
                  onChange={(e) => setPokemon(prev => ({ ...prev, isFatefulEncounter: e.target.checked }))}
                  className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                />
                <label htmlFor="fateful" className="text-xs text-slate-300 font-medium cursor-pointer">
                  {language === 'CHT' ? '命運般的相遇 (官方配信 Event 標誌)' : 'Fateful Encounter (Event Flag)'}
                </label>
              </div>
            </div>
          )}

          {/* TAB 3: IVS & EVS */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              {/* Quick Presets Bar */}
              <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-800">
                <span className="text-xs text-slate-400">{language === 'CHT' ? '快速配置預設:' : 'Quick Presets:'}</span>
                <button
                  onClick={() => handleSetAllIvs(31)}
                  className="px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-semibold hover:bg-cyan-900"
                >
                  {language === 'CHT' ? '滿 6V 個體 (All 31 IVs)' : 'Max 31 IVs (6IV)'}
                </button>
                <button
                  onClick={handlePhysicalAtkEvSpread}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-xs hover:bg-slate-700"
                >
                  {language === 'CHT' ? '極限物攻型 (252物攻/252速度/4HP)' : 'Physical Sweeper (252 Atk / 252 Spe / 4 HP)'}
                </button>
                <button
                  onClick={handleSpecialAtkEvSpread}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-xs hover:bg-slate-700"
                >
                  {language === 'CHT' ? '極限特攻型 (252特攻/252速度/4HP)' : 'Special Sweeper (252 SpA / 252 Spe / 4 HP)'}
                </button>
                <button
                  onClick={handleDefensiveEvSpread}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-xs hover:bg-slate-700"
                >
                  {language === 'CHT' ? '耐久防禦型 (252 HP / 128 物防 / 128 特防)' : 'Tank Spread (252 HP / 128 Def / 128 SpD)'}
                </button>
              </div>

              {/* Stats Sliders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* IVs Column */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                      {language === 'CHT' ? '個體值 (Individual Values / IVs: 0 - 31)' : 'Individual Values (IVs: 0 - 31)'}
                    </h4>
                  </div>

                  {(['hp', 'attack', 'defense', 'spAttack', 'spDefense', 'speed'] as const).map((stat) => (
                    <div key={stat} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 uppercase font-mono">
                          {stat === 'hp' ? 'HP (生命)' : stat === 'attack' ? (language === 'CHT' ? '物攻 (Atk)' : 'Attack') : stat === 'defense' ? (language === 'CHT' ? '物防 (Def)' : 'Defense') : stat === 'spAttack' ? (language === 'CHT' ? '特攻 (SpA)' : 'Sp. Attack') : stat === 'spDefense' ? (language === 'CHT' ? '特防 (SpD)' : 'Sp. Defense') : (language === 'CHT' ? '速度 (Speed)' : 'Speed')}
                        </span>
                        <span className="text-cyan-300 font-mono font-bold">{pokemon.ivs[stat]} / 31</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={31}
                        value={pokemon.ivs[stat]}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setPokemon(prev => ({
                            ...prev,
                            ivs: { ...prev.ivs, [stat]: val }
                          }));
                        }}
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>

                {/* EVs Column */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      {language === 'CHT' ? '努力值 (Effort Values / EVs: 0 - 252)' : 'Effort Values (EVs: 0 - 252)'}
                    </h4>
                    <span className={`text-xs font-mono ${totalEvs > 510 ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
                      {language === 'CHT' ? '合計: ' : 'Total: '}{totalEvs}/510
                    </span>
                  </div>

                  {(['hp', 'attack', 'defense', 'spAttack', 'spDefense', 'speed'] as const).map((stat) => (
                    <div key={stat} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 uppercase font-mono">
                          {stat === 'hp' ? 'HP' : stat === 'attack' ? (language === 'CHT' ? '物攻 (Atk)' : 'Attack') : stat === 'defense' ? (language === 'CHT' ? '物防 (Def)' : 'Defense') : stat === 'spAttack' ? (language === 'CHT' ? '特攻 (SpA)' : 'Sp. Attack') : stat === 'spDefense' ? (language === 'CHT' ? '特防 (SpD)' : 'Sp. Defense') : (language === 'CHT' ? '速度 (Speed)' : 'Speed')}
                        </span>
                        <span className="text-amber-300 font-mono font-bold">{pokemon.evs[stat]} / 252</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={252}
                        value={pokemon.evs[stat]}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setPokemon(prev => ({
                            ...prev,
                            evs: { ...prev.evs, [stat]: val }
                          }));
                        }}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ATTACKS */}
          {activeTab === 'attacks' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((slotIdx) => (
                <div key={slotIdx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <label className="text-xs font-bold text-cyan-400">
                    {language === 'CHT' ? `招式槽位 #${slotIdx + 1}` : `Move Slot #${slotIdx + 1}`}
                  </label>
                  <select
                    value={pokemon.moves[slotIdx]}
                    onChange={(e) => {
                      const newMoves = [...pokemon.moves] as [string, string, string, string];
                      newMoves[slotIdx] = e.target.value;
                      setPokemon(prev => ({ ...prev, moves: newMoves }));
                    }}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                  >
                    {POPULAR_MOVES.map((move) => (
                      <option key={move} value={move}>{move}</option>
                    ))}
                  </select>

                  <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
                    <span>{language === 'CHT' ? 'PP 提升劑 (+20%/個):' : 'PP Ups (+20% per up):'}</span>
                    <div className="flex items-center gap-1">
                      {[0, 1, 2, 3].map((ppUp) => (
                        <button
                          key={ppUp}
                          onClick={() => {
                            const newPpUps = [...pokemon.ppUps] as [number, number, number, number];
                            newPpUps[slotIdx] = ppUp;
                            setPokemon(prev => ({ ...prev, ppUps: newPpUps }));
                          }}
                          className={`w-6 h-6 rounded text-xs font-mono font-bold ${
                            pokemon.ppUps[slotIdx] === ppUp
                              ? 'bg-cyan-500 text-black'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {ppUp}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: OT & RIBBONS */}
          {activeTab === 'ot' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">{language === 'CHT' ? '訓練家 ID (TID)' : 'Trainer ID (TID)'}</label>
                <input
                  type="number"
                  min={0}
                  max={65535}
                  value={pokemon.tid}
                  onChange={(e) => setPokemon(prev => ({ ...prev, tid: Number(e.target.value) }))}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">{language === 'CHT' ? '隱藏 ID (Secret ID / SID)' : 'Secret ID (SID)'}</label>
                <input
                  type="number"
                  min={0}
                  max={65535}
                  value={pokemon.sid}
                  onChange={(e) => setPokemon(prev => ({ ...prev, sid: Number(e.target.value) }))}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">{language === 'CHT' ? '初訓家名稱 (OT Name)' : 'Original Trainer (OT Name)'}</label>
                <input
                  type="text"
                  maxLength={12}
                  value={pokemon.otName}
                  onChange={(e) => setPokemon(prev => ({ ...prev, otName: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1 col-span-full md:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">{language === 'CHT' ? '訓練家異色值 (TSV):' : 'Trainer Shiny Value (TSV):'}</span>
                  <span className="text-sm font-mono font-bold text-amber-400">{tsv}</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {language === 'CHT'
                    ? '計算公式為 (TID ^ SID) >> 4。凡是蛋的性格值(ESV)與此 TSV 相符時，必定孵化為異色/色違寶可夢。'
                    : 'Computed as (TID ^ SID) >> 4. Any Pokémon with an ESV matching this TSV will hatch as a Shiny Pokémon.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
