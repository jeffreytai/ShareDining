import  jsController from 'JsController';
import { throttle } from 'utils';

jsController['kitchen-new'] = function () {
  const CURRENT_FIELDSET_CLASS = 'current';
  const CURRENT_MENU_ITEM_CLASS = 'current';
  const MENU_LINK_CLASS = 'kitchen-new-menu-link';
  const STICKY_MENU_CLASS = 'stuck';

  const navHeight = document.querySelector('.main-nav').offsetHeight;
  const $menuList = 'kitchen-new-side-menu-list';
  const $fieldsets = document.querySelectorAll('.fieldset');
  const $stickyMenu = document.querySelector('.kitchen-new-side-menu');
  const $body = document.querySelector('body');

  let $currentFieldset = document.querySelector('.fieldset.current'),
    $currentMenuItem = document.querySelector('.kitchen-new-menu-link.current'),
    currentHash = location.hash,
    isStuck = false;

  // changes the current fieldset and menu item
  function changeCurrentFieldset(newHash) {
    const $newFieldset = document.querySelector(newHash);
    const $newMenuItem = document.querySelector(`.${MENU_LINK_CLASS}[href="${newHash}"]`);

    $currentFieldset.classList.remove(CURRENT_FIELDSET_CLASS);
    $currentMenuItem.classList.remove(CURRENT_MENU_ITEM_CLASS);
    $newFieldset.classList.add(CURRENT_FIELDSET_CLASS);
    $newMenuItem.classList.add(CURRENT_MENU_ITEM_CLASS);
    $currentFieldset = $newFieldset;
    $currentMenuItem = $newMenuItem;
  }

  // change to proper fieldset if a hash is present
  if (currentHash) {
    changeCurrentFieldset(currentHash);
  }

  // change shown fieldset on hashchange
  window.addEventListener('hashchange', () => {
    let newHash = location.hash;

    changeCurrentFieldset(newHash);
  });

  //  sticky menu listener
  document.addEventListener('scroll', throttle(() => {
    if (!isStuck && $body.scrollTop >= navHeight) {
      $stickyMenu.classList.add(STICKY_MENU_CLASS);
      isStuck = !isStuck;
    } else if (isStuck && $body.scrollTop <= navHeight) {
      $stickyMenu.classList.remove(STICKY_MENU_CLASS);
      isStuck = !isStuck;
    }
  }, 20));
};
