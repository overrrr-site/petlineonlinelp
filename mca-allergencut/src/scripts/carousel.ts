/* ============================================================
   Reusable touch-enabled carousel for LP sections.

   Usage (from a page <script>):
     import { initCarousels } from '../scripts/carousel';
     initCarousels({ feature: 3, voice: 4, honesty: 3 });

   The config maps each `data-carousel-section` name to its slide
   count. Markup expectations per section:
     - <div data-carousel-section="<name>"> wrapping the cards
     - cards with classes main_01, main_02, … main_0N
     - prev/next controls: .slider-btn--prev / .slider-btn--next
       (or .reviews__slider-prev / .reviews__slider-next) carrying
       data-carousel="<name>"
     - <div class="carousel-dots" data-carousel="<name>"> for dots
   Horizontal pixel deltas are divided by the global --screen-scale
   so drag distance tracks the finger in the scaled design space.
   ============================================================ */

interface CarouselState {
  current: number;
  total: number;
  dragging: boolean;
  startX: number;
  startY: number;
  startTime: number;
  currentTranslateX: number;
  directionLocked: null | 'horizontal' | 'vertical';
  scale: number;
}

const SWIPE_THRESHOLD = 60;
const VELOCITY_THRESHOLD = 0.3;
const DIRECTION_LOCK_DISTANCE = 5;
const DIRECTION_LOCK_ANGLE = 30;
const CARD_WIDTH = 326;
const CARD_GAP = 16;
const OFFSCREEN_OFFSET = CARD_WIDTH + CARD_GAP;

export function initCarousels(config: Record<string, number>): void {
  const carousels: Record<string, CarouselState> = {};
  for (const [name, total] of Object.entries(config)) {
    carousels[name] = {
      current: 0,
      total,
      dragging: false,
      startX: 0,
      startY: 0,
      startTime: 0,
      currentTranslateX: 0,
      directionLocked: null,
      scale: 1,
    };
  }

  /* ---------- scale helper ---------- */
  function getScale(): number {
    const v = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--screen-scale')
    );
    return v > 0 ? v : 1;
  }

  /* ---------- card helpers ---------- */
  function getCards(name: string): HTMLElement[] {
    const section = document.querySelector(`[data-carousel-section="${name}"]`);
    if (!section) return [];
    return Array.from(section.querySelectorAll<HTMLElement>('[class*="main_0"]'));
  }

  function getCardByIndex(name: string, index: number): HTMLElement | null {
    const section = document.querySelector(`[data-carousel-section="${name}"]`);
    if (!section) return null;
    return section.querySelector<HTMLElement>(`.main_0${index + 1}`);
  }

  /* ---------- dot helpers ---------- */
  function updateDots(name: string, index: number) {
    const dotsContainer = document.querySelector(
      `.carousel-dots[data-carousel="${name}"]`
    );
    if (!dotsContainer) return;
    dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function createDots() {
    Object.keys(carousels).forEach((name) => {
      const dotsContainer = document.querySelector(
        `.carousel-dots[data-carousel="${name}"]`
      );
      if (!dotsContainer) return;

      const total = carousels[name].total;
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.dataset.index = String(i);
        dot.dataset.carousel = name;
        dot.setAttribute('aria-label', `スライド ${i + 1}`);

        dot.addEventListener('click', function (this: HTMLElement) {
          const n = this.dataset.carousel!;
          const idx = parseInt(this.dataset.index!, 10);
          showSlide(n, idx);
        });

        dotsContainer.appendChild(dot);
      }
    });
  }

  /* ---------- slide navigation (class + translateX based) ---------- */
  function showSlide(name: string, index: number) {
    const carousel = carousels[name];
    if (!carousel) return;

    // Wrap around at boundaries (infinite loop)
    index = ((index % carousel.total) + carousel.total) % carousel.total;
    carousel.current = index;

    const total = carousel.total;
    const prevIndex = (index - 1 + total) % total;
    const nextIndex = (index + 1) % total;

    const cards = getCards(name);
    cards.forEach((card, i) => {
      // Reset inline styles from drag
      card.style.transform = '';
      card.style.opacity = '';

      // Remove all state classes
      card.classList.remove('carousel-active', 'carousel-adjacent', 'carousel-dragging');

      if (i === index) {
        card.classList.add('carousel-active');
        card.style.transform = 'translateX(0)';
      } else if (i === prevIndex) {
        card.classList.add('carousel-adjacent');
        card.style.transform = `translateX(-${OFFSCREEN_OFFSET}px)`;
      } else if (i === nextIndex) {
        card.classList.add('carousel-adjacent');
        card.style.transform = `translateX(${OFFSCREEN_OFFSET}px)`;
      } else {
        card.style.transform = `translateX(${OFFSCREEN_OFFSET}px)`;
      }
    });

    updateDots(name, index);
  }

  /* ---------- button click handling (prev/next) ---------- */
  document.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest(
      '.slider-btn, .reviews__slider-prev, .reviews__slider-next'
    );
    if (!btn) return;

    const name = (btn as HTMLElement).dataset.carousel;
    if (!name || !carousels[name]) return;

    const isPrev = btn.classList.contains('slider-btn--prev')
      || btn.classList.contains('reviews__slider-prev');
    const direction = isPrev ? -1 : 1;

    showSlide(name, carousels[name].current + direction);
  });

  /* ---------- touch drag support (real-time tracking) ---------- */
  function initDrag() {
    Object.keys(carousels).forEach((name) => {
      const container = document.querySelector(
        `[data-carousel-section="${name}"]`
      ) as HTMLElement;
      if (!container) return;

      /* ---------- touchstart ---------- */
      container.addEventListener('touchstart', ((e: TouchEvent) => {
        const state = carousels[name];
        state.dragging = true;
        state.startX = e.touches[0].clientX;
        state.startY = e.touches[0].clientY;
        state.startTime = Date.now();
        state.currentTranslateX = 0;
        state.directionLocked = null;
        state.scale = getScale();

        // Disable transition on current + adjacent cards for instant tracking
        const total = state.total;
        const activeCard = getCardByIndex(name, state.current);
        if (activeCard) activeCard.classList.add('carousel-dragging');
        const prevCard = getCardByIndex(name, (state.current - 1 + total) % total);
        if (prevCard) prevCard.classList.add('carousel-dragging');
        const nextCard = getCardByIndex(name, (state.current + 1) % total);
        if (nextCard) nextCard.classList.add('carousel-dragging');
      }) as EventListener, { passive: true });

      /* ---------- touchmove ---------- */
      container.addEventListener('touchmove', ((e: TouchEvent) => {
        const state = carousels[name];
        if (!state.dragging) return;

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const rawDiffX = currentX - state.startX;
        const rawDiffY = currentY - state.startY;

        // Direction lock: decide once
        if (state.directionLocked === null
            && (Math.abs(rawDiffX) > DIRECTION_LOCK_DISTANCE || Math.abs(rawDiffY) > DIRECTION_LOCK_DISTANCE)) {
          const angle = Math.abs(Math.atan2(rawDiffY, rawDiffX) * 180 / Math.PI);
          if (angle < DIRECTION_LOCK_ANGLE || angle > (180 - DIRECTION_LOCK_ANGLE)) {
            state.directionLocked = 'horizontal';
          } else {
            state.directionLocked = 'vertical';
            state.dragging = false;
            getCards(name).forEach(c => c.classList.remove('carousel-dragging'));
            return;
          }
        }

        if (state.directionLocked !== 'horizontal') return;

        // Prevent vertical scroll while dragging horizontally
        e.preventDefault();

        // Convert screen px to design-space px
        const designDiffX = rawDiffX / state.scale;

        state.currentTranslateX = designDiffX;

        // Move active card with finger
        const activeCard = getCardByIndex(name, state.current);
        if (activeCard) {
          activeCard.style.transform = `translateX(${designDiffX}px)`;
        }

        // Move adjacent card into view (peek effect) — wraps around
        const total = state.total;
        if (designDiffX < 0) {
          // Swiping left → show next (wraps)
          const nextCard = getCardByIndex(name, (state.current + 1) % total);
          if (nextCard) {
            nextCard.classList.add('carousel-adjacent');
            const progress = Math.min(1, Math.abs(designDiffX) / SWIPE_THRESHOLD);
            nextCard.style.opacity = String(Math.max(0.3, progress));
            nextCard.style.transform = `translateX(${OFFSCREEN_OFFSET + designDiffX}px)`;
          }
        } else if (designDiffX > 0) {
          // Swiping right → show prev (wraps)
          const prevCard = getCardByIndex(name, (state.current - 1 + total) % total);
          if (prevCard) {
            prevCard.classList.add('carousel-adjacent');
            const progress = Math.min(1, Math.abs(designDiffX) / SWIPE_THRESHOLD);
            prevCard.style.opacity = String(Math.max(0.3, progress));
            prevCard.style.transform = `translateX(${-OFFSCREEN_OFFSET + designDiffX}px)`;
          }
        }
      }) as EventListener, { passive: false });

      /* ---------- touchend ---------- */
      container.addEventListener('touchend', ((e: TouchEvent) => {
        const state = carousels[name];
        if (!state.dragging && state.directionLocked !== 'horizontal') return;
        state.dragging = false;

        // Re-enable transitions for snap animation
        getCards(name).forEach(c => c.classList.remove('carousel-dragging'));

        const endX = e.changedTouches[0].clientX;
        const rawDiffX = endX - state.startX;
        const designDiffX = rawDiffX / state.scale;
        const elapsed = Date.now() - state.startTime;
        const velocity = elapsed > 0 ? Math.abs(designDiffX) / elapsed : 0;

        let newIndex = state.current;

        if (Math.abs(designDiffX) > SWIPE_THRESHOLD || velocity > VELOCITY_THRESHOLD) {
          if (designDiffX < 0) {
            newIndex = state.current + 1; // wraps via showSlide
          } else if (designDiffX > 0) {
            newIndex = state.current - 1; // wraps via showSlide
          }
        }

        // Snap to new index (or bounce back) with CSS transition
        showSlide(name, newIndex);
        state.directionLocked = null;
      }) as EventListener, { passive: true });
    });
  }

  /* ---------- initialization ---------- */
  function start() {
    createDots();
    Object.keys(carousels).forEach((name) => showSlide(name, 0));
    initDrag();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
}
