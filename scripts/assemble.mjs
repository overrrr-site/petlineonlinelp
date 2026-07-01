// 各サブプロジェクトのビルド成果物を 1 つの dist/ に統合する。
// dist/<name>/ で配信され、Vercel の単一プロジェクトから
// /<name>/ のサブパスとして公開される。
//
// 新しい LP を追加するときは PROJECTS に 1 行足すだけ。
// （その LP 側で astro base: '/<name>' を設定し、絶対アセットパスを
//   /<name>/... に揃えること。mca-allergencut が実装例。）
import { rmSync, mkdirSync, cpSync, writeFileSync, existsSync } from 'node:fs';

const OUT = 'dist';

const PROJECTS = [
  { name: 'mca-allergencut', dist: 'mca-allergencut/dist', title: 'メディコート アドバンス アレルゲンカット' },
  { name: 'mca-phsupport', dist: 'mca-phsupport/dist', title: 'メディコート アドバンス 尿石ケア pHサポート' },
  { name: 'kaiseki', dist: 'kaiseki/dist', title: '懐石 2つのごほうび（猫）／健美（犬）' },
];

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const live = [];
for (const p of PROJECTS) {
  if (existsSync(p.dist)) {
    cpSync(p.dist, `${OUT}/${p.name}`, { recursive: true });
    live.push(p);
    console.log(`✓ assembled: ${p.name} -> ${OUT}/${p.name}/`);
  } else {
    console.log(`- skip (no build output yet): ${p.name}`);
  }
}

// ルート（ドメイン直下）に各 LP へのリンク一覧を置く
const items = live
  .map((p) => `      <li><a href="/${p.name}/">${p.title}</a></li>`)
  .join('\n');

writeFileSync(
  `${OUT}/index.html`,
  `<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ペットライン ランディングページ</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 0; padding: 48px 24px; line-height: 1.7; color: #222; }
      main { max-width: 640px; margin: 0 auto; }
      h1 { font-size: 20px; margin: 0 0 24px; }
      ul { list-style: none; padding: 0; margin: 0; }
      li + li { margin-top: 12px; }
      a { display: inline-block; color: #c83e00; text-decoration: none; font-weight: 700; }
      a:hover { text-decoration: underline; }
    </style>
  </head>
  <body>
    <main>
      <h1>ペットライン ランディングページ</h1>
      <ul>
${items}
      </ul>
    </main>
  </body>
</html>
`
);
console.log(`✓ assembled: root landing -> ${OUT}/index.html (${live.length} LP)`);
