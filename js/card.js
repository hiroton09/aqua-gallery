/**
 * card.js
 * 生き物カードのDOM生成とフリップ（表裏反転）を担当します。
 */

/**
 * 1枚のカード要素を生成してコンテナに追加する
 * @param {Object} creature  loader.js で整形済みのデータ
 * @param {HTMLElement} container  カードを追加する親要素
 * @returns {{ wrap: HTMLElement, ring: HTMLElement }} アニメーション用の参照
 */
function createCard(creature, container) {
  // ── ラッパー（位置・perspective） ──────────────────────
  const wrap = document.createElement('div');
  wrap.className = 'card-wrap';
  wrap.style.width  = creature.size + 'px';
  wrap.style.height = creature.size + 'px';

  // ── カード本体（3D 回転する要素） ─────────────────────
  const inner = document.createElement('div');
  inner.className = 'card-inner';

  // ── 表面（front.jpg） ────────────────────────────────
  const front = document.createElement('div');
  front.className = 'card-face card-front';

  const frontImg = document.createElement('img');
  frontImg.src = creature.frontSrc;
  frontImg.alt = `生き物 ${creature.id}`;
  frontImg.className = 'card-img';

  // 画像読み込み失敗時のフォールバック（絵文字）
  frontImg.onerror = () => {
    frontImg.style.display = 'none';
    const fallback = document.createElement('span');
    fallback.className = 'card-fallback';
    fallback.textContent = '🐠';
    front.appendChild(fallback);
  };
  front.appendChild(frontImg);

  // ── 裏面（back.jpg ＋ ユーザー名） ───────────────────
  const back = document.createElement('div');
  back.className = 'card-face card-back';

  const backImg = document.createElement('img');
  backImg.src = creature.backSrc;
  backImg.alt = `投稿者 ${creature.discord_user}`;
  backImg.className = 'card-img';

  // 画像読み込み失敗時はアバター文字
  backImg.onerror = () => {
    backImg.style.display = 'none';
    const av = document.createElement('div');
    av.className = 'user-avatar';
    av.textContent = creature.discord_user.slice(0, 2).toUpperCase();
    back.insertBefore(av, back.firstChild);
  };
  back.appendChild(backImg);

  const userName = document.createElement('div');
  userName.className = 'user-name';
  userName.textContent = '@' + creature.discord_user;
  back.appendChild(userName);

  // ── 組み立て ──────────────────────────────────────────
  inner.appendChild(front);
  inner.appendChild(back);
  wrap.appendChild(inner);

  // ── フリップのクリックイベント ───────────────────────
  wrap.addEventListener('click', () => {
    wrap.classList.toggle('flipped');
  });

  container.appendChild(wrap);

  // ── グロウリング ──────────────────────────────────────
  const ring = document.createElement('div');
  ring.className = 'glow-ring';
  ring.style.width  = (creature.size + 22) + 'px';
  ring.style.height = (creature.size + 22) + 'px';
  ring.style.animationDelay    = (Math.random() * 3) + 's';
  ring.style.animationDuration = (5 + Math.random() * 3) + 's';
  container.appendChild(ring);

  return { wrap, ring };
}

/**
 * 全カードを生成する
 * @param {Array} creatures  loader.js から受け取ったデータ配列
 * @param {HTMLElement} container
 * @returns {Array} アニメーション用データ配列
 */
function createAllCards(creatures, container) {
  return creatures.map((creature) => {
    const { wrap, ring } = createCard(creature, container);
    return { ...creature, _wrap: wrap, _ring: ring };
  });
}
