// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// 統合リポジトリ（petlineonlinelp）で 1 つの Vercel プロジェクトとして
// サブパス /mca-phsupport/ 配下に配信するため base を設定。
export default defineConfig({
  base: '/mca-phsupport',
});
