export interface DisclosureOptions {
  trigger: string;
  content: string;
  prefix: string;
}

/** 汎用ディスクロージャー機能 */
export class Disclosure {
  /** 開閉を行うトリガーとなる要素 */
  public trigger: HTMLElement | null;

  /** 開閉されるコンテンツとなる要素 */
  public content: HTMLElement | null;

  /** 設定の情報が入ったオブジェクト */
  private config: DisclosureOptions | null;

  /** 開いているかを判定 */
  public isOpen = false;

  constructor(public root: HTMLElement, options?: DisclosureOptions) {
    const config: DisclosureOptions = {
      trigger: 'js-disclosure__trigger',
      content: 'js-disclosure__content',
      prefix: 'disclosure'
    };

    this.config = {
      ...config,
      ...options
    };
    this.trigger = this.root.querySelector(`.${this.config.trigger}`);
    this.content = this.root.querySelector(`.${this.config.content}`);
    this.addAttribute();
    this.setClickEvent();
    this.setKeyDownEvent();
  }

  /** ランダム文字列生成 */
  static randomString(prefix: string): string {
    const str = `${prefix}-${Math.random().toString(36).slice(-8)}`;

    // 重複するIDがHTML内に存在する場合、再生成
    if (document.getElementById(str)) {
      return this.randomString(prefix);
    }

    return str;
  }

  /** ディスクロージャーを開く */
  public open(): void {
    if (!this.trigger || !this.content) {
      return;
    }

    this.isOpen = true;
    this.content.style.height = '0';
    this.content.hidden = false;
    this.content.style.height = `${this.content.scrollHeight}px`;
    this.trigger.setAttribute('aria-expanded', 'true');

    this.content.addEventListener('transitionend', (e) => {
      if (
        e.propertyName === 'height' &&
        e.target === this.content &&
        this.content
      ) {
        this.content.style.height = '';
      }
    }, {
      once: true
    });
  }

  /** ディスクロージャーを閉じる */
  public close(): void {
    if (!this.trigger || !this.content) {
      return;
    }

    this.isOpen = false;
    this.content.style.height = `${this.content.scrollHeight}px`;
    this.trigger.setAttribute('aria-expanded', 'false');

    // this.contentのBOXモデルが再計算されるのを待ってから実行
    setTimeout(() => {
      if (this.content) {
        this.content.style.height = '0';
      }
    }, 0);

    this.content.addEventListener('transitionend', (e) => {
      if (
        !this.isOpen &&
        e.target === this.content &&
        e.propertyName === 'height' &&
        this.content
      ) {
        this.content.style.height = '';
        this.content.hidden = true;
      }
    }, {
      once: true
    });
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

        return;
      }

      this.open();
    });
  }

  /** キーダウンイベントを登録 */
  public setKeyDownEvent(): void {
    if (!this.trigger || this.trigger.tagName !== 'A') {
      return;
    }

    this.trigger.addEventListener('keydown', (e) => {
      if (e.code !== 'Space') {
        return;
      }

      e.preventDefault();

      this.trigger?.dispatchEvent(new CustomEvent('click'));
    });
  }

  /** 属性を付与 */
  public addAttribute(): void {
    if (!this.trigger || !this.config || !this.content) {
      return;
    }

    this.trigger.setAttribute('aria-controls', Disclosure.randomString(this.config.prefix));
    this.trigger.setAttribute('aria-expanded', 'false');
    this.content.setAttribute('id', `${this.trigger.getAttribute('aria-controls')}`);
    this.content.hidden = true;
  }

  /** 属性を削除 */
  public removeAttribute(): void {
    if (!this.trigger || !this.content) {
      return;
    }

    if (this.trigger.tagName === 'A') {
      this.trigger.removeAttribute('role');
    }

    this.trigger.removeAttribute('aria-expanded');
    this.trigger.removeAttribute('aria-controls');
    this.content.removeAttribute('id');
    this.content.hidden = false;
  }
}
