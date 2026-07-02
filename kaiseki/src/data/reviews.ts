export const reviewStats = {
  cat: {
    total: '4,383',
    asOf: '2026年6月時点',
  },
  dog: {
    total: '267',
    asOf: '2026年6月時点',
  },
} as const;

// レビューカルーセルの各スライド。Anima 由来の位置別クラスを明示フィールドで保持する。
// title は改行（<br>）を含むため set:html で描画する想定。

export const catReviews = [
  {
    wrapClass: 'frame-12', infoClass: 'frame-13', avatarClass: 'mask-group', avatar: 'review-avatar-1.png',
    product: '小魚添えペア', hasStars: true, name: 'にゃんたじさん', title: '好評でした。',
    body: 'いつものカリカリの上に、トッピングのようにかけてあげました。食感が変わるからか、とても嬉しそうに食べてくれました。2種類の味が入っているのも良かったです。',
  },
  {
    wrapClass: 'frame-12', infoClass: 'frame-17', avatarClass: 'mask-group-2', avatar: 'review-avatar-default.png',
    product: '子ねこ用', hasStars: false, name: 'マユミさん', title: '子ねこにちょうどいい<br>サイズ',
    body: '子ねこ用なので粒が小さいのはもちろん、平たい形状で食べやすそうなのもあってか、よく食べてくれて良かったです。',
  },
  {
    wrapClass: 'frame-12', infoClass: 'frame-17', avatarClass: 'mask-group-3', avatar: 'review-avatar-default.png',
    product: 'グレインフリー', hasStars: false, name: 'あみさん', title: '問題なく、しっかり完食。',
    body: '以前から気になっていたグレインフリーを、お得に試せました。袋を開けた瞬間から反応がよく、食いつきも良くて問題なく完食。60gずつの小分け包装で、開封後に風味が落ちにくいのも嬉しいです。',
  },
  {
    wrapClass: 'frame-18', infoClass: 'frame-17', avatarClass: 'mask-group-4', avatar: 'review-avatar-default.png',
    product: '下部尿路の健康維持', hasStars: false, name: 'まねきねこさん', title: '食いつきがいいです。',
    body: '機能性のあるタイプは初めてで、食いつきを少し心配しましたが、問題なくよく食べてくれました。安心して続けられます。',
  },
  {
    wrapClass: 'frame-12', infoClass: 'frame-17', avatarClass: 'mask-group-5', avatar: 'review-avatar-default.png',
    product: '腎臓の健康維持', hasStars: false, name: 'でぃまろさん', title: '最後までしっかり食べてくれました',
    body: '健康系のフードは食べてくれるか心配でしたが、開けた瞬間からしっかり興味を示し、食いつきが良かったです。香りも自然で食べやすいサイズ感。60gずつの小分けパックで、おいしさを保ったまま最後まであげられるのもありがたいです。',
  },
] as const;

export const dogReviews = [
  {
    articleClass: 'slide-2', wrapClass: 'frame-6', infoClass: 'frame-7', avatarClass: 'mask-group', avatar: 'review-avatar-1.png', avatarAlt: 'ユーザーさんの愛犬',
    product: '1歳から', hasStars: true, name: 'ユーザーさん', title: 'よく食べてくれます。',
    body: 'とても食いつきが良く、食べやすそうで、安心してあげられます。',
  },
  {
    articleClass: 'slide-3', wrapClass: 'frame-6', infoClass: 'frame-11', avatarClass: 'mask-group-2', avatar: 'review-avatar-default.png', avatarAlt: 'Howieluluさんの愛犬',
    product: '子いぬ用 り乳から', hasStars: false, name: 'Howieluluさん', title: '大好きごはんになりました。',
    body: '切り替えても食べないことはまったくなく、おいしそうに食べています。ドッグフード特有の匂いがないのも、個人的に気に入っています。',
  },
  {
    articleClass: 'slide-3', wrapClass: 'frame-6', infoClass: 'frame-7', avatarClass: 'mask-group-3', avatar: 'review-avatar-default.png', avatarAlt: 'サクさんの愛犬',
    product: '7歳から', hasStars: false, name: 'サクさん', title: '美味しそうに<br>食べてくれました。',
    body: '最近、歳のためか食べむらが出てきましたが、こちらのフードは喜んで食べてくれました。',
  },
  {
    articleClass: 'slide-3', wrapClass: 'frame-12', infoClass: 'frame-13', avatarClass: 'mask-group-4', avatar: 'review-avatar-default.png', avatarAlt: 'まぁぽんさんの愛犬',
    product: 'グレインフリー 1歳から', hasStars: false, name: 'まぁぽんさん', title: '喜んで食べています！',
    body: 'シニアのポメと2歳のマルプーに与えてみました。どちらも喜んで食べてくれました。たんぱく質がしっかりめなのも気に入っています。',
  },
] as const;
