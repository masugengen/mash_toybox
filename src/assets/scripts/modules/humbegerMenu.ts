import {Disclosure, DisclosureOptions} from './inheritance/disclosure';
import {bodyElement, headerBreakPoint, controlBackdrop, controlScrollLock} from '../utils/global';

/** ハンバーガーメニュー開閉機能 */
class HumbegerMenu extends Disclosure {
  constructor(public root: HTMLElement, options?: DisclosureOptions) {
    super(root, options);
    this.checkBreakPoint();
    this.setBackdropClickEvent();
    this.removeHiddenAttribute();
  }

  /** トリガーになる要素のクリックイベントを登録 */
  public setClickEvent(): void {
    if (!this.trigger) {
      return;
    }

    this.trigger.addEventListener('click', (e) => {
      e.preventDefault();

      if (this.isOpen) {
        this.close();
        controlScrollLock();
        controlBackdrop();

        return;
      }

      this.open();
      controlScrollLock();
      controlBackdrop();
    });
  }

  /** バックドロップのクリックイベントを登録 */
  private setBackdropClickEvent(): void {
    bodyElement.addEventListener('click', (e) => {
      if (this.isOpen === true && e.target === e.currentTarget) {
        controlBackdrop();
        controlScrollLock();
        this.close();
      }
    });
  }

  /** ブレイクポイント切り替わり時の処理 */
  private checkBreakPoint(): void {
    headerBreakPoint.addEventListener('change', () => {
      if (headerBreakPoint.matches) {
        this.removeAttribute();
      } else {
        this.addAttribute();
      }

      if (
        headerBreakPoint.matches &&
        this.isOpen
      ) {
        this.isOpen = false;
        controlBackdrop();
        controlScrollLock();
      }
    });
  }

  /** hidden属性を削除 */
  private removeHiddenAttribute(): void {
    if (headerBreakPoint.matches && this.content) {
      this.content.removeAttribute('hidden');
    }
  }
}

(() => {
  const root = document.querySelector<HTMLElement>('.js-hamburgerMenu');
  const options: DisclosureOptions = {
    trigger: 'js-hamburgerMenu__trigger',
    content: 'js-hamburgerMenu__content',
    prefix: 'hamburgerMenu__content'
  };

  if (!root) {
    return;
  }

  // eslint-disable-next-line no-new
  new HumbegerMenu(root, options);
})();
