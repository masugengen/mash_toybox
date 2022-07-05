export const headerBreakPoint = window.matchMedia('(min-width: 1025px)');
export const bodyElement = document.body;

/** バックロドロップの表示制御 */
export const controlBackdrop = () => {
  if (bodyElement.classList.contains('is-backdrop')) {
    bodyElement.classList.remove('is-backdrop');
  } else {
    bodyElement.classList.add('is-backdrop');
  }
};

/** 背面のスクロール制御 */
export const controlScrollLock = () => {
  let scrollLength = 0;

  if (bodyElement.classList.contains('is-scrollLock')) {
    scrollLength = Number(bodyElement.style.top.replace('-', '').replace('px', ''));
    bodyElement.style.top = '';
    bodyElement.classList.remove('is-scrollLock');
    window.scrollTo(0, scrollLength);
  } else {
    scrollLength = window.pageYOffset;
    bodyElement.classList.add('is-scrollLock');
    bodyElement.style.top = `-${scrollLength}px`;
  }
};
