/**
 * loader.js
 * creatures.json を読み込み、新しい順に DISPLAY_LIMIT 件だけ返します。
 * アニメーション用のランダムパラメータもここで付与します。
 */

/**
 * 指定範囲のランダムな数値を返す
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randBetween(min, max) {
  return min + Math.random() * (max - min);
}

function sortCreaturesByDate(items) {
  return items
    .slice()
    .sort((a, b) => new Date(b.added_at) - new Date(a.added_at));
}

function addCreatureImagePaths(item) {
  return {
    ...item,
    frontSrc: `${CONFIG.CREATURES_BASE}${item.id}/${CONFIG.FRONT_IMAGE}`,
    backSrc:  `${CONFIG.CREATURES_BASE}${item.id}/${CONFIG.BACK_IMAGE}`,
  };
}

function createSwimmingCreatures(items) {
  return items.map((item) => {
    const a = CONFIG.ANIMATION;
    return {
      ...addCreatureImagePaths(item),

      // カードサイズ
      size: Math.round(randBetween(a.SIZE_MIN, a.SIZE_MAX)),

      // 泳ぎのパラメータ（各カードがバラバラに動くようランダム化）
      ox:      randBetween(0.08, 0.88),   // 中心X（画面幅の割合）
      oy:      randBetween(0.15, 0.72),   // 中心Y（画面高の割合）
      period:  randBetween(a.PERIOD_MIN, a.PERIOD_MAX),
      ampX:    randBetween(a.AMP_X_MIN,  a.AMP_X_MAX),
      ampY:    randBetween(a.AMP_Y_MIN,  a.AMP_Y_MAX),
      phaseX:  randBetween(0, Math.PI * 2),
      phaseY:  randBetween(0, Math.PI * 2),
      driftX:  randBetween(0.002, 0.006),
      driftY:  randBetween(0.002, 0.005),
      driftPX: randBetween(0, Math.PI * 2),
      driftPY: randBetween(0, Math.PI * 2),
    };
  });
}

async function loadCreatureCatalog() {
  const res = await fetch(CONFIG.DATA_PATH);
  if (!res.ok) throw new Error('creatures.json の読み込みに失敗しました');

  const all = await res.json();
  return sortCreaturesByDate(all).map(addCreatureImagePaths);
}

/**
 * creatures.json を取得して表示用データを返す
 * @returns {Promise<Array>}
 */
async function loadCreatures() {
  const catalog = await loadCreatureCatalog();

  // 上限件数に絞り込む
  const limited = catalog.slice(0, CONFIG.DISPLAY_LIMIT);

  // アニメーション用パラメータを付与して返す
  return createSwimmingCreatures(limited);
}
