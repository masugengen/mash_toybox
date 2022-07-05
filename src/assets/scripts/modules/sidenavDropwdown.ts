import {Disclosure, DisclosureOptions} from './inheritance/disclosure';

(() => {
  const roots = document.querySelectorAll<HTMLElement>('.js-sidenav-dropwdown');
  const options: DisclosureOptions = {
    trigger: 'js-sidenav-dropwdown__trigger',
    content: 'js-sidenav-dropwdown__content',
    prefix: 'sidenav-dropwdown'
  };

  for (const root of roots) {
    const dropdown = new Disclosure(root, options);

    if (dropdown.trigger.getAttribute('aria-current') === 'true') {
      dropdown.open();
    }
  }
})();
