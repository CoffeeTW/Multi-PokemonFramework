export interface ArCheatItem {
  id: string;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  category: 'currency' | 'battle' | 'wormhole' | 'movement' | 'items' | 'pokemon';
  code: string;
  isRecommended?: boolean;
}

export interface ArCheatCategory {
  key: string;
  nameZh: string;
  nameEn: string;
  icon: string;
  items: ArCheatItem[];
}

export const USUM_V12_CHEAT_DATABASE: ArCheatCategory[] = [
  {
    key: 'wormhole',
    nameZh: '🌌 究極時空洞專用修改 (Ultra Wormhole)',
    nameEn: '🌌 Ultra Wormhole Cheats',
    icon: 'Orbit',
    items: [
      {
        id: 'wh_dual_ring',
        titleZh: '必定 4 環雙彩虹特大神獸洞',
        titleEn: 'Always Tier 4 Dual-Ring Legend Hole',
        descriptionZh: '進入時空洞必定判定為最高等級的 4 環雙彩虹光環（神獸遭遇率 100%）。',
        category: 'wormhole',
        code: '00388430 E3A00003',
        isRecommended: true,
      },
      {
        id: 'wh_9999_ly',
        titleZh: '時空洞光年距離 9999 光年 (色違機率極限)',
        titleEn: 'Ultra Wormhole 9999 Light Years Max',
        descriptionZh: '固定光年距離為最大值，大幅提高普通野生寶可夢的色違機率（最高達 36%）。',
        category: 'wormhole',
        code: '003883C0 E3A00FA0',
        isRecommended: true,
      },
      {
        id: 'wh_infinite_energy',
        titleZh: '時空洞飛行能量常駐最大 (永不減速)',
        titleEn: 'Ultra Wormhole Infinite Energy / Speed',
        descriptionZh: '索爾迦雷歐/露奈雅拉飛行時能量球常駐最大，保持最高速飛行。',
        category: 'wormhole',
        code: '00388274 E3A00064',
        isRecommended: true,
      },
      {
        id: 'wh_invincible',
        titleZh: '時空洞無敵 (撞擊雷雲障礙物不減速/不扣能量)',
        titleEn: 'Ultra Wormhole Invincible',
        descriptionZh: '穿越時空洞時即使撞到電擊雷雲障礙物也不會損失能量或被減速。',
        category: 'wormhole',
        code: '003882B8 E1A00000',
      },
      {
        id: 'wh_shiny_ub_legend',
        titleZh: '時空洞 100% 必定色違神獸/異獸',
        titleEn: 'Ultra Wormhole 100% Shiny Legendaries & UBs',
        descriptionZh: '時空洞內遭遇的神獸、究極異獸與野生寶可夢 100% 必定為異色。',
        category: 'wormhole',
        code: '003160BC E3A00001',
        isRecommended: true,
      },
      {
        id: 'wh_unlock_shiny_lock',
        titleZh: '解除全神獸色違鎖定 (Shiny Lock)',
        titleEn: 'Disable Shiny Lock on All Encounters',
        descriptionZh: '解鎖所有神獸與定點怪的色違限制，合法生成異色外觀。',
        category: 'wormhole',
        code: '003160D0 EA000005',
        isRecommended: true,
      },
    ],
  },
  {
    key: 'battle',
    nameZh: '⚔️ 100% 捕獲、色違與戰鬥增益',
    nameEn: '⚔️ 100% Catch, Shiny & Battle Boosts',
    icon: 'Swords',
    items: [
      {
        id: 'battle_guaranteed_catch_v12',
        titleZh: '100% 必定捕獲率 (任何球種皆大師球效果)',
        titleEn: '100% Guaranteed Catch Rate',
        descriptionZh: '投擲任意精靈球（普通球/柑果球/究極球）皆 100% 一發直接捕獲，不搖晃。',
        category: 'battle',
        code: '00318040 E3A00001',
        isRecommended: true,
      },
      {
        id: 'battle_wild_shiny_v12',
        titleZh: '100% 野生寶可夢必定色違/異色',
        titleEn: 'Wild 100% Shiny Pokémon',
        descriptionZh: '草叢暗雷、定點、釣魚與召喚助手遭遇 100% 必定為色違寶可夢。',
        category: 'battle',
        code: '003160BC E3A00001',
        isRecommended: true,
      },
      {
        id: 'battle_catch_trainer_pokemon_v12',
        titleZh: '可強行捕獲對手訓練家的寶可夢',
        titleEn: "Catch Opponent Trainer's Pokémon",
        descriptionZh: '突破「不能偷別人寶可夢」的系統限制，可直接投球捕獲對手隊伍。',
        category: 'battle',
        code: '003180C4 E1A00000',
      },
      {
        id: 'battle_infinite_pp_v12',
        titleZh: '我方技能 PP 不減 (無限 PP)',
        titleEn: 'Infinite PP (No PP Deduction)',
        descriptionZh: '戰鬥中使用任何招式皆不扣除 PP 值，永久保持最大。',
        category: 'battle',
        code: '0037A4C8 E1A00000',
        isRecommended: true,
      },
      {
        id: 'battle_exp_32x_v12',
        titleZh: '對戰獲得經驗值 32 倍',
        titleEn: 'Exp Multiplier x32',
        descriptionZh: '擊倒寶可夢後獲得的經驗值提升為 32 倍，快速升等。',
        category: 'battle',
        code: '00377508 E0811280',
      },
      {
        id: 'battle_infinite_zmoves_v12',
        titleZh: '無限施放 Z 招式 (每回合皆可使用)',
        titleEn: 'Infinite Z-Moves (Use Every Turn)',
        descriptionZh: '解除單場戰鬥僅能施放 1 次 Z 招式的限制，每回合皆可連續使用。',
        category: 'battle',
        code: '0037DF00 00000000',
      },
      {
        id: 'battle_ultra_burst_free_v12',
        titleZh: '免究極奈克洛 Z 直接發動究極爆發',
        titleEn: 'Ultra Burst w/o Ultranecrozium Z',
        descriptionZh: '奈克洛茲瑪無須攜帶 Z 純晶道具即可隨時變身為究極奈克洛茲瑪。',
        category: 'battle',
        code: '0037E100 00000001',
      },
    ],
  },
  {
    key: 'currency',
    nameZh: '💰 貨幣、點數與島嶼掃描',
    nameEn: '💰 Currencies, Points & Scans',
    icon: 'Coins',
    items: [
      {
        id: 'cur_money_max_v12',
        titleZh: '金錢最大化 ($9,999,999)',
        titleEn: 'Max Money ($9,999,999)',
        descriptionZh: '將訓練家的金錢直接修改至最高上限 9,999,999 寶可夢幣。',
        category: 'currency',
        code: '030D9838 0098967F',
        isRecommended: true,
      },
      {
        id: 'cur_bp_max_v12',
        titleZh: '對戰點數最大化 (9,999 BP)',
        titleEn: 'Max Battle Points (9,999 BP)',
        descriptionZh: '將對戰樹與設施點數修改為上限 9,999 BP，兌換全道具。',
        category: 'currency',
        code: '030D983C 0000270F',
        isRecommended: true,
      },
      {
        id: 'cur_fc_max_v12',
        titleZh: '圓慶幣最大化 (999,999 FC)',
        titleEn: 'Max Festival Coins (999,999 FC)',
        descriptionZh: '圓慶廣場貨幣直接鎖定 999,999 FC，商店任意消費。',
        category: 'currency',
        code: '03124D58 000F423F',
      },
      {
        id: 'cur_qr_scan_100_v12',
        titleZh: '即時島嶼掃描 100 點 (無限次掃描)',
        titleEn: 'QR Scan Points 100pt (Instant Scan)',
        descriptionZh: '掃描點數隨時常駐 100 點，可連續呼叫全島嶼稀有野生御三家。',
        category: 'currency',
        code: '230D9938 00000064',
        isRecommended: true,
      },
      {
        id: 'cur_roto_loto_v12',
        titleZh: '洛托姆碰碰抽獎次數無限',
        titleEn: 'Roto-Loto Infinite Uses',
        descriptionZh: '洛托姆圖鑑隨時可進行抽獎，獲得經驗值、捕獲率等強力洛托碰碰。',
        category: 'currency',
        code: '230D9940 0000000A',
      },
      {
        id: 'cur_pokebeans_max_v12',
        titleZh: '全種類寶可豆數量最大 (255)',
        titleEn: 'Max Poké Beans in Bag (255)',
        descriptionZh: '寶可清爽樂的全種類寶可豆（彩虹豆、花紋豆）數量全滿。',
        category: 'currency',
        code: 'D3000000 00000000\nD5000000 000000FF\nC0000000 00000010\nD6000000 030DA200\nD2000000 00000000',
      },
    ],
  },
  {
    key: 'items',
    nameZh: '🎒 背包全道具、精靈球、樹果與 Z純晶',
    nameEn: '🎒 All Items, Balls, Berries & Z-Crystals',
    icon: 'Package',
    items: [
      {
        id: 'item_all_balls_v12',
        titleZh: '全種類精靈球 x999 (含大師球/究極球/柑果球)',
        titleEn: 'All Pokéballs x999 (Master/Beast/Apricorn)',
        descriptionZh: '給予大師球、究極球、甜蜜球、月亮球等全 26 種精靈球各 999 顆。',
        category: 'items',
        code: 'D3000000 00000000\nD5000000 03E70001\nC0000000 00000019\nD6000000 030D9AC0\nD2000000 00000000',
        isRecommended: true,
      },
      {
        id: 'item_all_medicine_v12',
        titleZh: '全回復藥劑與戰鬥強化道具 x999',
        titleEn: 'All Medicine & Battle Items x999',
        descriptionZh: '給予全滿藥、元氣藥塊、神奇糖果、PP極限提升劑等各 999 個。',
        category: 'items',
        code: 'D3000000 00000000\nD5000000 03E7001A\nC0000000 00000028\nD6000000 030D9B50\nD2000000 00000000',
        isRecommended: true,
      },
      {
        id: 'item_all_stones_hold_v12',
        titleZh: '全進化之石與對戰攜帶道具 x999',
        titleEn: 'All Evolution Stones & Held Items x999',
        descriptionZh: '給予太陽之石、月之石、命玉、氣勢披帶、專用道具等各 999 個。',
        category: 'items',
        code: 'D3000000 00000000\nD5000000 03E70050\nC0000000 00000050\nD6000000 030D9CD0\nD2000000 00000000',
      },
      {
        id: 'item_all_berries_v12',
        titleZh: '全種類樹果數量 x999',
        titleEn: 'All Berries x999',
        descriptionZh: '給予降低努力值果、抗性果、回復果等全部 64 種樹果各 999 顆。',
        category: 'items',
        code: 'D3000000 00000000\nD5000000 03E70095\nC0000000 00000040\nD6000000 030D9DF0\nD2000000 00000000',
      },
      {
        id: 'item_unlock_all_tms_v12',
        titleZh: '解鎖全招式學習器 (TM 01~100)',
        titleEn: 'Unlock All TMs (TM01-TM100)',
        descriptionZh: '直接解鎖全部 100 種招式學習器，隨時教導寶可夢強大招式。',
        category: 'items',
        code: 'D3000000 00000000\nD5000000 00010148\nC0000000 00000064\nD6000000 030D9EE0\nD2000000 00000000',
      },
      {
        id: 'item_unlock_all_zcrystals_v12',
        titleZh: '解鎖全 Z 純晶 (含專用 Z 純晶)',
        titleEn: 'Unlock All Z-Crystals',
        descriptionZh: '獲得全部 18 種屬性 Z 純晶以及皮卡丘、智皮、卡比獸等專屬 Z 純晶。',
        category: 'items',
        code: 'D3000000 00000000\nD5000000 00010320\nC0000000 00000022\nD6000000 030DA020\nD2000000 00000000',
      },
    ],
  },
  {
    key: 'movement',
    nameZh: '🚀 地圖移動、便利輔助與生蛋',
    nameEn: '🚀 Movement, Utilities & Breeding',
    icon: 'Compass',
    items: [
      {
        id: 'util_wtw_v12',
        titleZh: '穿牆模式 (按住 B 鍵移動即可穿牆)',
        titleEn: 'Walk Through Walls (Hold B)',
        descriptionZh: '在地圖移動時按住 B 鍵，即可穿透任何障礙物、牆壁與NPC邊界。',
        category: 'movement',
        code: 'DD000000 00000002\n00320140 E1A00000\nD0000000 00000000',
        isRecommended: true,
      },
      {
        id: 'util_run_fast_v12',
        titleZh: '移動奔跑速度 2 倍',
        titleEn: 'Run Speed 2x',
        descriptionZh: '提升主角在城鎮與原野地圖上的移動與奔跑速度。',
        category: 'movement',
        code: '00320188 E1A000A0',
      },
      {
        id: 'util_no_outlines_v12',
        titleZh: '去除角色與寶可夢黑色描邊線 (畫面更精緻)',
        titleEn: 'No Outlines (High Quality Visuals)',
        descriptionZh: '移除 3DS 上人物與寶可夢模型粗糙的黑邊，畫面更清晰平滑。',
        category: 'movement',
        code: '00325100 00000000',
        isRecommended: true,
      },
      {
        id: 'util_instant_text_v12',
        titleZh: '即時對話文字顯示 (跳過打字動畫)',
        titleEn: 'Instant Dialogue Text Display',
        descriptionZh: '劇情與 NPC 對話文字瞬間完整顯示，大幅加快遊戲節奏。',
        category: 'movement',
        code: '00331980 00000000',
        isRecommended: true,
      },
      {
        id: 'util_instant_egg_hatch_v12',
        titleZh: '攜帶的蛋走 1 步立即孵化',
        titleEn: 'Instant Egg Hatch (1 Step)',
        descriptionZh: '隊伍中攜帶的寶可夢蛋只要移動一步就會立刻觸發孵化動畫。',
        category: 'movement',
        code: '0036C520 E3A00001',
        isRecommended: true,
      },
      {
        id: 'util_daycare_fast_egg_v12',
        titleZh: '培育屋寄存必定立刻產蛋',
        titleEn: 'Daycare Immediate Egg Generation',
        descriptionZh: '將兩隻寶可夢放入歐哈納牧場的培育屋後，立刻生成蛋。',
        category: 'movement',
        code: '0036C470 E3A00001',
      },
      {
        id: 'util_access_pc_anywhere_v12',
        titleZh: '隨身打開電腦箱子 (快捷鍵: START + X)',
        titleEn: 'Access PC Anywhere (START + X)',
        descriptionZh: '在任何野外或建築中按下 START + X，即可直接存取寶可夢電腦箱子。',
        category: 'movement',
        code: 'DD000000 00000408\n003102C4 E3A00001\nD0000000 00000000',
      },
    ],
  },
];

export function buildCompleteUsumCheatFile(selectedItemIds?: string[]): string {
  const lines: string[] = [
    `# ========================================================`,
    `# Pokémon Ultra Sun (精靈寶可夢 究極之日) - ver 1.2 專用全代碼庫`,
    `# Title ID: 00040000001B5000 | Update: v1.2`,
    `# 相容系統: Nintendo 3DS Sys 11.17.0-50J ｜ Luma3DS v13.4`,
    `# SD 路徑: /luma/plugins/00040000001B5000/cheats.txt`,
    `# ========================================================`,
    ``,
  ];

  for (const category of USUM_V12_CHEAT_DATABASE) {
    const categoryItems = selectedItemIds
      ? category.items.filter(item => selectedItemIds.includes(item.id))
      : category.items;

    if (categoryItems.length === 0) continue;

    lines.push(`# --------------------------------------------------------`);
    lines.push(`# ${category.nameZh}`);
    lines.push(`# --------------------------------------------------------`);
    lines.push(``);

    for (const item of categoryItems) {
      lines.push(`[${item.titleZh}]`);
      lines.push(`; ${item.titleEn} - ${item.descriptionZh}`);
      lines.push(item.code);
      lines.push(``);
    }
  }

  return lines.join('\n');
}
