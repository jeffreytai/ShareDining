import  jsController from 'JsController';
import { throttle } from 'utils';

jsController['kitchen-new'] = function () {
  const CURRENT_FIELDSET_CLASS = 'current';
  const CURRENT_MENU_ITEM_CLASS = 'current';
  const MENU_LINK_CLASS = 'kitchen-new-menu-link';
  const STICKY_MENU_CLASS = 'stuck';
  const KITCHEN_MENU_LINK_CLASS = 'kitchen-new-menu-link';

  const navHeight = document.querySelector('.main-nav').offsetHeight;
  const $stickyMenu = document.querySelector('.kitchen-new-side-menu');
  const $body = document.querySelector('body');
  const $buttonContainer = document.querySelector('.kitchen-new-button-container');
  const $nextButton = document.querySelector('.next-button');
  const $prevButton = document.querySelector('.prev-button');

  let $currentFieldset = document.querySelector('.fieldset.current'),
    $currentMenuItem = document.querySelector(`.${KITCHEN_MENU_LINK_CLASS}.current`),
  // the hashArray holds all of the hashes for different form sections
    hashArray = Array.prototype.map.call(document.querySelectorAll(`.${KITCHEN_MENU_LINK_CLASS}`), (el) => `#${el.href.split('#')[1]}`),
    currentHash = location.hash,
    isStuck = false;

  function handleButtonChanges(newHash) {
    var currHashIdx = hashArray.indexOf(newHash);

    if (currHashIdx === 0) {
      $prevButton.disabled = true;
    } else {
      $prevButton.disabled = false;
    }

    if (currHashIdx === hashArray.length - 1) {
      $nextButton.innerText = 'Finish';
    } else {
      $nextButton.innerText = 'Next';
    }
  }

  // changes the current fieldset and menu item
  function changeCurrentFieldset(newHash) {
    const $newFieldset = document.querySelector(newHash);
    const $newMenuItem = document.querySelector(`.${MENU_LINK_CLASS}[href="${newHash}"]`);
    const hashIdx = hashArray.indexOf(newHash);

    handleButtonChanges(newHash);

    $currentFieldset.classList.remove(CURRENT_FIELDSET_CLASS);
    $currentMenuItem.classList.remove(CURRENT_MENU_ITEM_CLASS);
    $newFieldset.classList.add(CURRENT_FIELDSET_CLASS);
    $newMenuItem.classList.add(CURRENT_MENU_ITEM_CLASS);
    $currentFieldset = $newFieldset;
    $currentMenuItem = $newMenuItem;
  }

  // change to proper fieldset if a hash is present
  if (currentHash && document.querySelector(currentHash)) {
    changeCurrentFieldset(currentHash);
  }

  // change shown fieldset on hashchange
  window.addEventListener('hashchange', () => {
    let newHash = location.hash;

    changeCurrentFieldset(newHash);
  });

  // handle button clicks via delegation
  $buttonContainer.addEventListener('click', (evt) => {
    if (evt.target && (evt.target === $nextButton || evt.target === $prevButton)) {
      let currIdx = hashArray.indexOf(location.hash);

      console.log(currIdx, hashArray[currIdx]);
      if(currIdx !== -1) {
        evt.target === $nextButton ? location.hash = hashArray[currIdx + 1] : location.hash = hashArray[currIdx - 1];
      }
    }
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
}
;
