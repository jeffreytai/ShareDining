import jsController from 'JsController';
import DateSlider from 'utils/DateSlider';
import { throttle } from 'utils/utils';

jsController['kitchen-new'] = function () {
  const CURRENT_FIELDSET_CLASS = 'current';
  const CURRENT_MENU_ITEM_CLASS = 'current';
  const MENU_LINK_CLASS = 'kitchen-new-menu-link';
  const STICKY_MENU_CLASS = 'stuck';
  const KITCHEN_MENU_LINK_CLASS = 'kitchen-new-menu-link';
  const COMPLETED_LINK_CLASS = 'completed';
  const INCOMPLETE_LINK_CLASS = 'incomplete';

  const navHeight = document.querySelector('.main-nav').offsetHeight;
  const $stickyMenu = document.querySelector('.kitchen-new-side-menu');
  const $body = document.querySelector('body');
  const $buttonContainer = document.querySelector('.kitchen-new-button-container');
  const $nextButton = document.querySelector('.next-button');
  const $prevButton = document.querySelector('.prev-button');
  const $kitchenForm = document.querySelector('#new_kitchen');
  const $dateSliders = document.querySelectorAll('.date-slider');

  var $currentFieldset = document.querySelector('.fieldset.current'),
    $currentMenuItem = document.querySelector(`.${KITCHEN_MENU_LINK_CLASS}.current`),
  // the hashArray holds all of the hashes for different form sections
    hashArray = Array.prototype.map.call(document.querySelectorAll(`.${KITCHEN_MENU_LINK_CLASS}`), (el) => `#${el.href.split('#')[1]}`),
    currentHash = location.hash,
    isStuck = false;

  function handleButtonChanges(newHash) {
    var currHashIdx = hashArray.indexOf(newHash);

    // disable previous button for first page
    $prevButton.disabled = currHashIdx === 0;

    if (currHashIdx === hashArray.length - 1) {
      $nextButton.innerText = 'Finish';
    } else {
      $nextButton.innerText = 'Next';
    }
  }

  function addCompletionIcon($newMenuItem) {
    var $requiredFields = $currentFieldset.querySelectorAll('[required="required"]'),
      $filledFields = Array.prototype.filter.call($requiredFields, (el) => {
        return String(el.value).trim();
      });

    if ($requiredFields.length === $filledFields.length) {
      $newMenuItem.classList.remove(INCOMPLETE_LINK_CLASS);
      $newMenuItem.classList.add(COMPLETED_LINK_CLASS);
    } else {
      $newMenuItem.classList.remove(COMPLETED_LINK_CLASS);
      $newMenuItem.classList.add(INCOMPLETE_LINK_CLASS);
    }
  }

  // changes the current fieldset and menu item
  function changeCurrentFieldset(newHash) {
    const $newFieldset = document.querySelector(newHash);

    // make sure that the hash change corresponds to the inventory form
    if ($newFieldset) {
      const $newMenuItem = document.querySelector(`.${MENU_LINK_CLASS}[href="${newHash}"]`);

      handleButtonChanges(newHash);
      addCompletionIcon($currentMenuItem);

      $currentFieldset.classList.remove(CURRENT_FIELDSET_CLASS);
      $currentMenuItem.classList.remove(CURRENT_MENU_ITEM_CLASS);
      $newFieldset.classList.add(CURRENT_FIELDSET_CLASS);
      $newMenuItem.classList.add(CURRENT_MENU_ITEM_CLASS);
      $currentFieldset = $newFieldset;
      $currentMenuItem = $newMenuItem;
    }
  }

  // change to proper fieldset if a hash is present, else make the current hash the first hash
  if (currentHash && document.querySelector(currentHash)) {
    changeCurrentFieldset(currentHash);
  } else {
    location.hash = hashArray[0];
  }

  // change shown fieldset on hashchange
  window.addEventListener('hashchange', () => {
    const newHash = location.hash;

    changeCurrentFieldset(newHash);
  });

  // handle button clicks via delegation
  $buttonContainer.addEventListener('click', (evt) => {
    if (evt.target && (evt.target === $nextButton || evt.target === $prevButton)) {
      const currIdx = hashArray.indexOf(location.hash);

      // if the last button is pressed, then submit the form
      if (event.target === $nextButton && currIdx === hashArray.length - 1) {
        $kitchenForm.submit();
      } else if (currIdx !== -1) {
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
  }, 50));

  // init the date sliders
  Array.prototype.forEach.call($dateSliders, (el) => {
    const dateSlider = new DateSlider(el);
    dateSlider.init();
  });
}
;
