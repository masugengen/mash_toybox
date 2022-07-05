(() => {
  const header = document.querySelector<HTMLElement>('.js-header');
  const pageTopBtn = document.querySelector<HTMLElement>('.js-totop');

  if (!pageTopBtn) {
    return;
  }

  /** headerと交差したときに呼び出す関数 */
  const intersectHeader = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      pageTopBtn.classList.add('is-hidden');
    } else {
      pageTopBtn.classList.remove('is-hidden');
    }
  };

  const observerHeader = new IntersectionObserver(intersectHeader);

  observerHeader.observe(header);
})();
