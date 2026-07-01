import { catCtaLinks, dogCtaLinks } from './links';

// 犬 HEALTH CARE の3項目（img の alt は title と同一）。
export const dogHealthCare = [
  { articleClass: 'element-21', img: 'healthcare-coat.png', h3Class: 'text-wrapper-69', title: '輝く毛並の健康維持', frameClass: 'frame-27', tag: 'DHA ＋ EPA (フィッシュオイル)', bodyClass: 'text-wrapper-71', body: 'DHA・EPAを含むフィッシュオイルを配合。毛並みの美しさに配慮します。' },
  { articleClass: 'element-22', img: 'healthcare-tummy.png', h3Class: 'text-wrapper-72', title: 'お腹の健康維持', frameClass: 'frame-28', tag: 'フラクトオリゴ糖', bodyClass: 'text-wrapper-71', body: 'お腹の善玉菌を増やすフラクトオリゴ糖を配合。お腹の健康維持に貢献。' },
  { articleClass: 'element-23', img: 'healthcare-immunity.png', h3Class: 'text-wrapper-73', title: '免疫力の維持', frameClass: 'frame-29', tag: '乳酸菌 ＋ フラクトオリゴ糖', bodyClass: 'text-wrapper-74', body: '乳酸菌とフラクトオリゴ糖が腸内フローラを整え、健康を維持することにより免疫力を保ちます。' },
] as const;

// 犬 LINE-UP の商品カード（4）。button は各商品ページへ遷移。desc は <br> を含むため set:html。
export const dogLineup = [
  { articleClass: 'element-2', buttonClass: 'button', href: dogCtaLinks.grainfree, descClass: 'text-wrapper-6', desc: '原材料として穀類不使用・タピオカ粉使用。たんぱく質34.5%以上（1歳から比 約140%）。', h3Class: 'text-wrapper-7', title: 'グレインフリー 1歳から', badgeClass: 'div-wrapper', badge: 'GRAIN-FREE', imgClass: 'thumb-kenbi', thumb: 'thumb-grainfree.png' },
  { articleClass: 'element-3', buttonClass: 'button-2', href: dogCtaLinks.senior, descClass: 'element-4', desc: 'シニア期向け。<br>たんぱく質20.5%以上/グルコサミン配合・コンドロイチン含有・高齢期のための健康設計※1。', h3Class: 'text-wrapper-9', title: '7歳から', badgeClass: 'frame-2', badge: 'SENIOR', imgClass: 'thumb-kenbi-2', thumb: 'thumb-7years.png' },
  { articleClass: 'element-5', buttonClass: 'button-3', href: dogCtaLinks.puppy, descClass: 'element-DHA', desc: '成長期向け。<br>たんぱく質26.0%以上/カルシウム1.3%（1歳から比 約125%）/DHA+EPA 1900mg。', h3Class: 'text-wrapper-10', title: '子いぬ用 り乳から', badgeClass: 'frame-3', badge: 'PUPPY', imgClass: 'thumb-kenbi', thumb: 'thumb-puppy.png' },
  { articleClass: 'element-6', buttonClass: 'button', href: dogCtaLinks.adult, descClass: 'text-wrapper-6', desc: '成犬の毎日に。<br>たんぱく質23.0%以上/DHA+EPA 1800mg。', h3Class: 'text-wrapper-7', title: '1歳から', badgeClass: 'frame-4', badge: 'ADULT', imgClass: 'thumb-kenbi', thumb: 'thumb-adult.png' },
] as const;

// 犬 CTA の商品ボタン（4）。ラベル部は構造が不規則なため labelHtml を set:html で描画。
export const dogCtaCards = [
  { btnClass: 'button-dog-2', href: dogCtaLinks.grainfree, thumb: 'thumb-grainfree-card.png', thumbAlt: 'グレインフリー 1歳から 商品画像', badgeWrapClass: 'ADULT-wrapper', badge: 'GRAIN-FREE', labelHtml: '<div class="element-19">グレインフリー 1歳から</div>', aria: 'グレインフリー 1歳から の商品ページへ' },
  { btnClass: 'button-dog-3', href: dogCtaLinks.senior, thumb: 'thumb-7years-card.png', thumbAlt: '7歳から 商品画像', badgeWrapClass: 'frame-24', badge: 'SENIOR', labelHtml: '<div class="text-wrapper-57">7歳から</div>', aria: '7歳から の商品ページへ' },
  { btnClass: 'button-dog-4', href: dogCtaLinks.puppy, thumb: 'thumb-puppy-card.png', thumbAlt: '子いぬ用 り乳から 商品画像', badgeWrapClass: 'frame-24', badge: 'PUPPY', labelHtml: '<p class="p"><span class="text-wrapper-58">子いぬ用 <br></span><span class="text-wrapper-59">り乳から</span></p>', aria: '子いぬ用 り乳から の商品ページへ' },
  { btnClass: 'button-dog-5', href: dogCtaLinks.adult, thumb: 'thumb-adult-card.png', thumbAlt: '1歳から 商品画像', badgeWrapClass: 'frame-24', badge: 'ADULT', labelHtml: '<div class="text-wrapper-57">1歳から</div>', aria: '1歳から の商品ページへ' },
] as const;

// 猫 CTA の商品ボタン（5）。ラベル部は構造が不規則なため labelHtml を set:html で描画。
export const catCtaButtons = [
  { btnClass: 'button-cat', href: catCtaLinks.kidney, thumb: 'thumb-kidney-btn.png', badgeWrapClass: 'ADULT-wrapper', badgeClass: 'ADULT', badge: 'HEALTH', labelHtml: '<div class="text-wrapper-8">腎臓の健康維持</div>' },
  { btnClass: 'button-cat-2', href: catCtaLinks.urinary, thumb: 'thumb-urinary-btn.png', badgeWrapClass: 'ADULT-wrapper', badgeClass: 'ADULT', badge: 'HEALTH', labelHtml: '<div class="text-wrapper-9">下部尿路の<br>健康維持</div>' },
  { btnClass: 'button-cat-3', href: catCtaLinks.grainfree, thumb: 'thumb-grainfree-btn.png', badgeWrapClass: 'ADULT-wrapper', badgeClass: 'ADULT', badge: 'HEALTH', labelHtml: '<div class="text-wrapper-8">グレインフリー</div>' },
  { btnClass: 'button-cat-4', href: catCtaLinks.kitten, thumb: 'thumb-kitten-btn.png', badgeWrapClass: 'frame-5', badgeClass: 'ADULT-2', badge: 'KITTEN', labelHtml: '<p class="p"><span class="span">子ねこ用<br></span><span class="text-wrapper-10">おさかな添えペア</span></p>' },
  { btnClass: 'button-cat-5', href: catCtaLinks.standard, thumb: 'thumb-standard-btn.png', badgeWrapClass: 'frame-5', badgeClass: 'ADULT', badge: 'STANDARD', labelHtml: '<div class="text-wrapper-8">小魚添えペア</div>' },
] as const;
