/**
 * catalog.js
 * 登録済みの生き物データ一覧を描画します。
 */

function formatCreatureDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function createCatalogImage(src, alt) {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.loading = 'lazy';
  img.onerror = () => {
    const fallback = document.createElement('div');
    fallback.className = 'catalog-image-missing';
    fallback.setAttribute('role', 'img');
    fallback.setAttribute('aria-label', `${alt}（画像なし）`);
    fallback.textContent = '画像なし';
    img.replaceWith(fallback);
  };
  return img;
}

function renderCreatureCatalog(creatures, container) {
  if (!container) return;

  container.replaceChildren();

  creatures.forEach((creature) => {
    const item = document.createElement('article');
    item.className = 'catalog-card';

    const images = document.createElement('div');
    images.className = 'catalog-images';

    const frontFigure = document.createElement('figure');
    frontFigure.className = 'catalog-image-frame';
    frontFigure.appendChild(createCatalogImage(creature.frontSrc, `${creature.id} の表画像`));
    const frontCaption = document.createElement('figcaption');
    frontCaption.textContent = 'front.png';
    frontFigure.appendChild(frontCaption);

    const backFigure = document.createElement('figure');
    backFigure.className = 'catalog-image-frame';
    backFigure.appendChild(createCatalogImage(creature.backSrc, `${creature.id} の裏画像`));
    const backCaption = document.createElement('figcaption');
    backCaption.textContent = 'back.png';
    backFigure.appendChild(backCaption);

    images.append(frontFigure, backFigure);

    const body = document.createElement('div');
    body.className = 'catalog-card-body';

    const user = document.createElement('h3');
    user.textContent = `@${creature.discord_user}`;

    const meta = document.createElement('dl');
    meta.className = 'catalog-meta';

    const dateTerm = document.createElement('dt');
    dateTerm.textContent = '登録日';
    const dateValue = document.createElement('dd');
    dateValue.textContent = formatCreatureDate(creature.added_at);

    meta.append(dateTerm, dateValue);
    body.append(user, meta);
    item.append(images, body);
    container.appendChild(item);
  });
}
