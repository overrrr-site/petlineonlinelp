// 懐石 LP 用カルーセル（猫 index / 犬 dog 共通）。
// Anima 出力の各カルーセルは
//   コンテナ（overflow:hidden）> トラック（inline-flex）> カード×N
//   + インジケータ（.indicator*）+ 右矢印（.vector-wrapper / .img-wrapper / .button-*）
// という構造。トラックを translateX（デザイン px = zoom 非依存）して 1 枚ずつ送る。

interface CarouselDef {
  sel: string; // コンテナ
  track: string; // トラック要素
  step: number; // 1 枚分の移動量（カード幅 + gap, デザイン px）
}

const CAROUSELS: CarouselDef[] = [
  // 猫（card 315 + gap 30 = 345）
  { sel: '.cariusel-peature-cat', track: '.slide', step: 345 },
  { sel: '.carousel-review-cat', track: '.slide', step: 345 },
  { sel: '.carousel-honesty-cat', track: '.slide', step: 345 },
  // 犬
  { sel: '.carousel-review-dog', track: '.slide', step: 365 }, // 315 + 50
  { sel: '.cariusel-peature-dog', track: '.slide-4', step: 305 }, // 275 + 30
  { sel: '.carousel-honesty-dog', track: '.slide-4', step: 345 }, // 315 + 30
];

const ACTIVE = '#a30102';
const ARROWS = '.vector-wrapper, .img-wrapper, .button-3, .button-4, .button-6';
const PREV = '.carousel-prev'; // 左（前へ）ボタン

function updateDots(dots: HTMLElement[], index: number, inactive: string) {
  dots.forEach((dot, i) => {
    dot.style.backgroundColor = i === index ? ACTIVE : inactive;
  });
}

function setup(container: HTMLElement, def: CarouselDef) {
  const track = container.querySelector<HTMLElement>(def.track);
  if (!track) return;
  const cards = Array.from(track.children) as HTMLElement[];
  const total = cards.length;
  if (total <= 1) return;

  const indicator = container.querySelector<HTMLElement>('[class*="indicator"]');
  const dots = indicator ? (Array.from(indicator.children) as HTMLElement[]) : [];
  // 非アクティブ色は最初の非アクティブなドット（2 つ目）から取得して忠実に再現
  const inactive =
    dots.length > 1 ? getComputedStyle(dots[1]).backgroundColor : '#d9d9d9';

  const arrows = Array.from(container.querySelectorAll<HTMLElement>(ARROWS));

  let index = 0;
  track.style.transition =
    'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  track.style.willChange = 'transform';

  function render() {
    track!.style.transform = `translateX(${-index * def.step}px)`;
    updateDots(dots, index, inactive);
  }

  function go(next: number) {
    index = ((next % total) + total) % total;
    render();
  }

  arrows.forEach((arrow) => {
    arrow.style.cursor = 'pointer';
    arrow.addEventListener('click', () => go(index + 1));
  });

  const prevs = Array.from(container.querySelectorAll<HTMLElement>(PREV));
  prevs.forEach((btn) => {
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', () => go(index - 1));
  });

  dots.forEach((dot, i) => {
    dot.style.cursor = 'pointer';
    dot.addEventListener('click', () => go(i));
  });

  let startX = 0;
  let startY = 0;
  let dragging = false;
  let locked: null | 'x' | 'y' = null;

  container.addEventListener(
    'touchstart',
    (e) => {
      dragging = true;
      locked = null;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    },
    { passive: true }
  );

  container.addEventListener(
    'touchmove',
    (e) => {
      if (!dragging) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      if (locked === null && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
        locked = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      }
      if (locked === 'x') e.preventDefault();
    },
    { passive: false }
  );

  container.addEventListener(
    'touchend',
    (e) => {
      if (!dragging) return;
      dragging = false;
      if (locked !== 'x') return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    },
    { passive: true }
  );

  render();
}

export function initCarousels() {
  CAROUSELS.forEach((def) => {
    document.querySelectorAll<HTMLElement>(def.sel).forEach((c) => setup(c, def));
  });
}
