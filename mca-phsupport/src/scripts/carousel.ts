interface CarouselState {
  current: number;
  dragging: boolean;
  startX: number;
  startY: number;
  startTime: number;
  directionLocked: null | 'horizontal' | 'vertical';
  scale: number;
  section: HTMLElement;
  slides: HTMLElement[];
}

declare global {
  interface Window {
    __mcaPhsupportCarouselCleanup__?: () => void;
  }
}

const SWIPE_THRESHOLD = 60;
const VELOCITY_THRESHOLD = 0.3;
const DIRECTION_LOCK_DISTANCE = 5;
const DIRECTION_LOCK_ANGLE = 30;
const CARD_WIDTH = 326;
const CARD_GAP = 16;
const OFFSCREEN_OFFSET = CARD_WIDTH + CARD_GAP;

function getScale(section: HTMLElement): number {
  const matrix = getComputedStyle(section).transform;
  if (!matrix || matrix === 'none') return 1;

  const match = matrix.match(/matrix\(([^,]+),/);
  const value = match ? Number.parseFloat(match[1]) : Number.NaN;
  return Number.isFinite(value) && value > 0 ? value : 1;
}

function getSlide(state: CarouselState, index: number): HTMLElement | undefined {
  return state.slides[index];
}

function updateDots(state: CarouselState, index: number): void {
  const dots = state.section.querySelectorAll<HTMLButtonElement>('.carousel-dots .dot');

  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === index;
    dot.classList.toggle('active', isActive);

    if (isActive) {
      dot.setAttribute('aria-current', 'true');
    } else {
      dot.removeAttribute('aria-current');
    }
  });
}

function showSlide(state: CarouselState, requestedIndex: number): void {
  const total = state.slides.length;
  if (total === 0) return;

  const index = ((requestedIndex % total) + total) % total;
  const previousIndex = (index - 1 + total) % total;
  const nextIndex = (index + 1) % total;
  state.current = index;

  state.slides.forEach((slide, slideIndex) => {
    slide.style.transform = '';
    slide.style.opacity = '';
    slide.classList.remove('carousel-active', 'carousel-adjacent', 'carousel-dragging');

    const isActive = slideIndex === index;
    slide.setAttribute('aria-hidden', String(!isActive));

    if (isActive) {
      slide.classList.add('carousel-active');
      slide.style.transform = 'translateX(0)';
    } else if (slideIndex === previousIndex) {
      slide.classList.add('carousel-adjacent');
      slide.style.transform = `translateX(-${OFFSCREEN_OFFSET}px)`;
    } else if (slideIndex === nextIndex) {
      slide.classList.add('carousel-adjacent');
      slide.style.transform = `translateX(${OFFSCREEN_OFFSET}px)`;
    } else {
      slide.style.transform = `translateX(${OFFSCREEN_OFFSET}px)`;
    }
  });

  updateDots(state, index);
}

function createDots(name: string, state: CarouselState): void {
  const container = state.section.querySelector<HTMLElement>(
    `.carousel-dots[data-carousel="${name}"]`,
  );
  if (!container) return;

  const fragment = document.createDocumentFragment();

  state.slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'dot';
    dot.dataset.index = String(index);
    dot.dataset.carousel = name;
    dot.setAttribute('aria-label', `スライド ${index + 1} / ${state.slides.length}へ移動`);

    if (state.section.id) {
      dot.setAttribute('aria-controls', state.section.id);
    }

    fragment.appendChild(dot);
  });

  container.replaceChildren(fragment);
}

function setupCarousels(): () => void {
  const states = new Map<string, CarouselState>();
  const cleanupCallbacks: Array<() => void> = [];

  document.querySelectorAll<HTMLElement>('[data-carousel-section]').forEach((section) => {
    const name = section.dataset.carouselSection;
    const slides = Array.from(section.querySelectorAll<HTMLElement>('[data-carousel-slide]'));
    if (!name || slides.length === 0) return;

    const state: CarouselState = {
      current: 0,
      dragging: false,
      startX: 0,
      startY: 0,
      startTime: 0,
      directionLocked: null,
      scale: 1,
      section,
      slides,
    };

    states.set(name, state);
    createDots(name, state);
    showSlide(state, 0);

    const handleTouchStart = (event: TouchEvent): void => {
      const touch = event.touches[0];
      if (!touch) return;

      state.dragging = true;
      state.startX = touch.clientX;
      state.startY = touch.clientY;
      state.startTime = Date.now();
      state.directionLocked = null;
      state.scale = getScale(section);

      const total = state.slides.length;
      getSlide(state, state.current)?.classList.add('carousel-dragging');
      getSlide(state, (state.current - 1 + total) % total)?.classList.add('carousel-dragging');
      getSlide(state, (state.current + 1) % total)?.classList.add('carousel-dragging');
    };

    const handleTouchMove = (event: TouchEvent): void => {
      if (!state.dragging) return;

      const touch = event.touches[0];
      if (!touch) return;

      const rawDiffX = touch.clientX - state.startX;
      const rawDiffY = touch.clientY - state.startY;

      if (
        state.directionLocked === null
        && (Math.abs(rawDiffX) > DIRECTION_LOCK_DISTANCE
          || Math.abs(rawDiffY) > DIRECTION_LOCK_DISTANCE)
      ) {
        const angle = Math.abs((Math.atan2(rawDiffY, rawDiffX) * 180) / Math.PI);

        if (angle < DIRECTION_LOCK_ANGLE || angle > 180 - DIRECTION_LOCK_ANGLE) {
          state.directionLocked = 'horizontal';
        } else {
          state.directionLocked = 'vertical';
          state.dragging = false;
          state.slides.forEach((slide) => slide.classList.remove('carousel-dragging'));
          return;
        }
      }

      if (state.directionLocked !== 'horizontal') return;
      event.preventDefault();

      const designDiffX = rawDiffX / state.scale;
      const activeSlide = getSlide(state, state.current);
      if (activeSlide) {
        activeSlide.style.transform = `translateX(${designDiffX}px)`;
      }

      const total = state.slides.length;
      const progress = Math.min(1, Math.abs(designDiffX) / SWIPE_THRESHOLD);

      if (designDiffX < 0) {
        const nextSlide = getSlide(state, (state.current + 1) % total);
        if (nextSlide) {
          nextSlide.classList.add('carousel-adjacent');
          nextSlide.style.opacity = String(Math.max(0.3, progress));
          nextSlide.style.transform = `translateX(${OFFSCREEN_OFFSET + designDiffX}px)`;
        }
      } else if (designDiffX > 0) {
        const previousSlide = getSlide(state, (state.current - 1 + total) % total);
        if (previousSlide) {
          previousSlide.classList.add('carousel-adjacent');
          previousSlide.style.opacity = String(Math.max(0.3, progress));
          previousSlide.style.transform = `translateX(${-OFFSCREEN_OFFSET + designDiffX}px)`;
        }
      }
    };

    const handleTouchEnd = (event: TouchEvent): void => {
      if (!state.dragging && state.directionLocked !== 'horizontal') return;

      state.dragging = false;
      state.slides.forEach((slide) => slide.classList.remove('carousel-dragging'));

      const touch = event.changedTouches[0];
      if (!touch) {
        showSlide(state, state.current);
        state.directionLocked = null;
        return;
      }

      const designDiffX = (touch.clientX - state.startX) / state.scale;
      const elapsed = Date.now() - state.startTime;
      const velocity = elapsed > 0 ? Math.abs(designDiffX) / elapsed : 0;
      let nextIndex = state.current;

      if (Math.abs(designDiffX) > SWIPE_THRESHOLD || velocity > VELOCITY_THRESHOLD) {
        if (designDiffX < 0) nextIndex += 1;
        if (designDiffX > 0) nextIndex -= 1;
      }

      showSlide(state, nextIndex);
      state.directionLocked = null;
    };

    section.addEventListener('touchstart', handleTouchStart, { passive: true });
    section.addEventListener('touchmove', handleTouchMove, { passive: false });
    section.addEventListener('touchend', handleTouchEnd, { passive: true });

    cleanupCallbacks.push(() => {
      section.removeEventListener('touchstart', handleTouchStart);
      section.removeEventListener('touchmove', handleTouchMove);
      section.removeEventListener('touchend', handleTouchEnd);
    });
  });

  const handleClick = (event: MouseEvent): void => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const dot = target.closest<HTMLElement>('.carousel-dots .dot[data-carousel]');
    if (dot) {
      const name = dot.dataset.carousel;
      const index = Number.parseInt(dot.dataset.index ?? '', 10);
      const state = name ? states.get(name) : undefined;

      if (state && Number.isInteger(index)) {
        showSlide(state, index);
      }
      return;
    }

    const control = target.closest<HTMLElement>('.slider-btn[data-carousel]');
    if (!control) return;

    const name = control.dataset.carousel;
    const state = name ? states.get(name) : undefined;
    if (!state) return;

    const isPrevious = control.classList.contains('slider-btn--prev');
    showSlide(state, state.current + (isPrevious ? -1 : 1));
  };

  const handleKeydown = (event: KeyboardEvent): void => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    const target = event.target instanceof Element ? event.target : null;
    const dot = target?.closest<HTMLElement>('.carousel-dots .dot[data-carousel]');
    if (!dot) return;

    const name = dot.dataset.carousel;
    const index = Number.parseInt(dot.dataset.index ?? '', 10);
    const state = name ? states.get(name) : undefined;
    if (!state || !Number.isInteger(index)) return;

    event.preventDefault();
    showSlide(state, index);
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKeydown);
  cleanupCallbacks.push(() => document.removeEventListener('click', handleClick));
  cleanupCallbacks.push(() => document.removeEventListener('keydown', handleKeydown));

  return () => cleanupCallbacks.forEach((cleanup) => cleanup());
}

export function initCarousels(): void {
  window.__mcaPhsupportCarouselCleanup__?.();

  const start = (): void => {
    window.__mcaPhsupportCarouselCleanup__ = setupCarousels();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
    window.__mcaPhsupportCarouselCleanup__ = () => {
      document.removeEventListener('DOMContentLoaded', start);
    };
  } else {
    start();
  }
}
