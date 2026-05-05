/**
 * config.js
 * サイト全体の設定をここで管理します。
 * 表示件数を変えたい場合は DISPLAY_LIMIT のみ変更してください。
 */
const CONFIG = {
  // 表示する生き物の最大件数（新しい順に絞り込まれます）
  DISPLAY_LIMIT: 10,

  // creatures.json のパス
  DATA_PATH: './creatures.json',

  // 各生き物の画像フォルダのベースパス
  CREATURES_BASE: './creatures/',

  // 表の画像ファイル名
  FRONT_IMAGE: 'front.png',

  // 裏の画像ファイル名
  BACK_IMAGE: 'back.png',

  // 画像の表示サイズ比率（0.0〜1.0）
  // 1.0 = 枠いっぱい、0.8 = 枠の80%サイズで余白あり
  // 表の画像（生き物写真）
  IMAGE_SCALE_FRONT: 0.7,
  // 裏の画像（投稿者アイコン）
  IMAGE_SCALE_BACK: 0.7,

  // アニメーションの設定
  ANIMATION: {
    // 生き物のサイズ範囲（px）
    SIZE_MIN: 170,
    SIZE_MAX: 170,

    // 泳ぐ周期の範囲（秒）長いほどゆっくり
    PERIOD_MIN: 9,
    PERIOD_MAX: 15,

    // X方向の振れ幅（px）
    AMP_X_MIN: 65,
    AMP_X_MAX: 85,

    // Y方向の振れ幅（px）
    AMP_Y_MIN: 18,
    AMP_Y_MAX: 55,

    // 気泡の生成間隔（ミリ秒）
    BUBBLE_INTERVAL: 1800,

    // 初期気泡の数
    BUBBLE_INITIAL: 8,
  },
};
