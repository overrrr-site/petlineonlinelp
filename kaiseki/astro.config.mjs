// @ts-check
import { defineConfig } from 'astro/config';

// 統合リポジトリ（petlineonlinelp）で 1 つの Vercel プロジェクトとして
// サブパス /kaiseki/ 配下に配信するため base を設定。
// 猫 = /kaiseki/ , 犬 = /kaiseki/dog/
export default defineConfig({
  base: '/kaiseki',
});
