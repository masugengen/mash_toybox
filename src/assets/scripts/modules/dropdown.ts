import {Disclosure, DisclosureOptions} from './inheritance/disclosure';
import {headerBreakPoint} from '../utils/global';

/** グローバルナビゲーションのドロップダウン機能 */
class Dropdown extends Disclosure {
  constructor(public root: HTMLElement, options?: DisclosureOptions) {
    super(root, options);
    this.checkBreakPoint();
  }

  /** ブレイクポイント切り替わり時の処理 */
  private checkBreakPoint(): void {
    headerBreakPoint.addEventListener('change', () => {
      if (!headerBreakPoint.matches && this.content) {
        this.close();
        this.removeAttribute();
        this.content.hidden = true;
      } else {
        this.addAttribute();
      }
    });
  }
}

(() => {
  const instances: Dropdown[] = [];
  const roots = document.querySelectorAll<HTMLElement>('.js-dropdown');
  const options: DisclosureOptions = {
    trigger: 'js-dropdown__trigger',
    content: 'js-dropdown__content',
    prefix: 'dropdown'
  };

  for (const root of roots) {
    const dropdown = new Dropdown(root, options);

    instances.push(dropdown);
  }

  for (const instance of instances) {
    if (!instance.trigger) {
      return;
    }

    instance.trigger.addEventListener('click', (e) => {
      if (!headerBreakPoint.matches) {
        return;
      }

      for (const _instance of instances) {
        if (
          _instance.isOpen &&
          e.currentTarget !== _instance.trigger
        ) {
          _instance.close();
        }
      }
    });
  }
})();
