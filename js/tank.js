/**
 * tank.js
 * 水槽のアニメーション全般を担当します。
 * - 生き物カードの遊泳
 * - 気泡の生成
 * - 光の筋の揺れ（CSS アニメーションに任せる）
 */

/**
 * 気泡を1つ生成して水槽に追加する
 * @param {HTMLElement} tank
 */
function spawnBubble(tank) {
  const b = document.createElement('div');
  b.className = 'bubble';

  const s = 3 + Math.random() * 9;
  b.style.width  = s + 'px';
  b.style.height = s + 'px';
  b.style.left   = (6 + Math.random() * 88) + '%';
  b.style.bottom = '52px';

  const dur = 9 + Math.random() * 9;
  b.style.animationDuration = dur + 's';
  b.style.animationDelay    = (Math.random() * 1.5) + 's';

  tank.appendChild(b);

  // アニメーション完了後に DOM から削除（メモリリーク防止）
  setTimeout(() => b.remove(), (dur + 2) * 1000);
}

/**
 * 気泡の定期生成を開始する
 * @param {HTMLElement} tank
 */
function startBubbles(tank) {
  const a = CONFIG.ANIMATION;

  // 初期気泡
  for (let i = 0; i < a.BUBBLE_INITIAL; i++) {
    spawnBubble(tank);
  }

  // 定期生成
  setInterval(() => spawnBubble(tank), a.BUBBLE_INTERVAL);
}

/**
 * 生き物カードの遊泳アニメーションを開始する
 * @param {Array}       cards   createAllCards の戻り値
 * @param {HTMLElement} tank
 */
function startSwimming(cards, tank) {
  const BOTTOM_MARGIN = 108; // 砂利・水草エリアの高さ分

  function animate(ts) {
    const W = tank.offsetWidth;
    const H = tank.offsetHeight;
    const t = ts / 1000; // 秒換算

    cards.forEach((c) => {
      const freq = (2 * Math.PI) / c.period;

      // 主波（ゆっくりした正弦波） + ドリフト（さらに長い周期の揺れ）
      const cx =
        c.ox * W +
        Math.sin(freq * t + c.phaseX) * c.ampX +
        Math.sin(c.driftX * t + c.driftPX) * 40;

      const cy =
        c.oy * H +
        Math.sin(freq * t * 0.65 + c.phaseY) * c.ampY +
        Math.sin(c.driftY * t + c.driftPY) * 30;

      // 画面端・砂利エリアへはみ出さないようにクランプ
      const lx = Math.max(0, Math.min(W - c.size, cx - c.size / 2));
      const ly = Math.max(50, Math.min(H - c.size - BOTTOM_MARGIN, cy - c.size / 2));

      c._wrap.style.left = lx + 'px';
      c._wrap.style.top  = ly + 'px';

      // グロウリングはカードに追従
      c._ring.style.left = (lx - 11) + 'px';
      c._ring.style.top  = (ly - 11) + 'px';
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

/**
 * 水槽アニメーション全体の起動
 * @param {Array}       cards
 * @param {HTMLElement} tank
 */
function initTank(cards, tank) {
  startBubbles(tank);
  startSwimming(cards, tank);
}
