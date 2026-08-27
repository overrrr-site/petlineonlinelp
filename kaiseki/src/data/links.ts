export const footerLinks = [
  {
    label: '特定商取引法に基づく表記',
    href: 'https://www.petlineonline.com/shop/pages/law.aspx',
  },
  {
    label: 'プライバシーポリシー',
    href: 'https://www.petline.co.jp/privacy/',
  },
  {
    label: '利用規約',
    href: 'https://www.petline.co.jp/regulation/',
  },
] as const;

export const catCtaLinks = {
  kidney: 'https://www.petlineonline.com/shop/g/gU6324/',
  // TODO(2026-09-01): 新商品「小魚添えペア 合鴨とお魚味」の商品ページURLに差し替える。
  // ペットラインからURL未共有のため、暫定でお試し対象一覧（cKS2G）に逃がしている。
  // 差し替え時は products.ts の catCtaButtons の sku（現在 'TBD-AIGAMO'）も併せて更新すること。
  aigamo: 'https://www.petlineonline.com/shop/c/cKS2G/',
  urinary: 'https://www.petlineonline.com/shop/g/gU6322/',
  grainfree: 'https://www.petlineonline.com/shop/g/gU6321/',
  kitten: 'https://www.petlineonline.com/shop/g/gU6314/',
  standard: 'https://www.petlineonline.com/shop/g/gU6315/',
  follow: 'https://www.petlineonline.com/shop/c/cKS2G/',
} as const;

export const dogCtaLinks = {
  grainfree: 'https://www.petlineonline.com/shop/g/gU0815/',
  senior: 'https://www.petlineonline.com/shop/g/gU0810/',
  puppy: 'https://www.petlineonline.com/shop/g/gU0800/',
  adult: 'https://www.petlineonline.com/shop/g/gU0805/',
  follow: 'https://www.petlineonline.com/shop/c/cDKSD/',
} as const;
