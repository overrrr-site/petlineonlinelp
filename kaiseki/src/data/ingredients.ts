// 犬 INGREDIENTS セクションの素材リスト（10種）。
// wrapperClass = 配置用のラッパークラス、textClass = 説明文の段落クラス（Anima 由来）。
export const dogIngredients = [
  { wrapperClass: 'niwatori', textClass: 'div-2', img: 'ingredient-chicken.png', alt: 'チキンミール', name: 'チキンミール', desc: 'たんぱく質源' },
  { wrapperClass: 'amani', textClass: 'element-25', img: 'ingredient-flaxseed.png', alt: 'アマニ油', name: 'アマニ油', desc: 'オメガ3脂肪酸が豊富' },
  { wrapperClass: 'komugi', textClass: 'div-3', img: 'ingredient-wheat.png', alt: '小麦全粒粉と小麦ふすま', name: '小麦全粒粉＆小麦ふすま', desc: '食物繊維が豊富' },
  { wrapperClass: 'tomorokoshi', textClass: 'div-2', img: 'ingredient-corn.png', alt: 'とうもろこし', name: 'とうもろこし', desc: 'エネルギー源' },
  { wrapperClass: 'shiitake', textClass: 'div-4', img: 'ingredient-shiitake.png', alt: '干し椎茸', name: '干し椎茸', desc: '水戻し濃縮エキス' },
  { wrapperClass: 'satsumaimo', textClass: 'div-5', img: 'ingredient-sweetpotato.png', alt: '紫芋', name: '紫芋', desc: 'アントシアニンが豊富' },
  { wrapperClass: 'komatsuna', textClass: 'div-6', img: 'ingredient-komatsuna.png', alt: '小松菜', name: '小松菜', desc: '鉄分など<br>ミネラルが豊富' },
  { wrapperClass: 'ke-ru', textClass: 'div-6', img: 'ingredient-kale.png', alt: 'ケール', name: 'ケール', desc: 'ビタミンCや<br>食物繊維が豊富' },
  { wrapperClass: 'ninjin', textClass: 'div-4', img: 'ingredient-carrot.png', alt: 'にんじん', name: 'にんじん', desc: 'β-カロテンが豊富' },
  { wrapperClass: 'tomato', textClass: 'div-7', img: 'ingredient-tomato.png', alt: 'トマト', name: 'トマト', desc: 'リコピンが豊富' },
] as const;
