export default class ModalController {
  constructor(bodyModalClass, modalLinks, modalClass) {
    this.bodyModalClass = bodyModalClass;
    this.modalLinks = modalLinks;
    this.modalClass = modalClass;
  }

  init() {
    const $body = document.querySelector('body');
    const $modal = document.querySelector(`.${this.modalClass}`);

    // make sure the modal exists before continuing
    if ($modal) {
      const ESCAPE_KEY_CODE = 27;
      let lastFocus = null;
      const closeModal = () => {
        $body.classList.remove(this.bodyModalClass);
        lastFocus.focus(); // restore focus to the old element
      };

      // each link should open the modal by adding the bodyModalClass to body
      this.modalLinks.forEach((link) => {
        link.addEventListener('click', (evt) => {
          // save the last focus
          lastFocus = document.activeElement;
          $body.classList.add(this.bodyModalClass);

          // focus on the modal
          $modal.setAttribute('tabindex', 0);
          $modal.focus();

          // stop prop so we don't close the modal when we bubble up to body
          evt.stopPropagation();
        });
      });

      // make sure only modal elements are focusable
      document.addEventListener('focus', (evt) => {
        if ($body.classList.contains(this.bodyModalClass) && !$modal.contains(evt.target)) {
          event.preventDefault();
          $modal.focus();
        }
      }, true);

      // a click outside the modal should close it
      $body.addEventListener('click', () => {
        if ($body.classList.contains(this.bodyModalClass)) {
          closeModal();
        }
      });

      // inside the modal don't bubble up so we don't close it
      $modal.addEventListener('click', (evt) => evt.stopPropagation());

      // handle modal close on escape
      document.addEventListener('keyup', (evt) => {
        if (evt.keyCode === ESCAPE_KEY_CODE && $body.classList.contains(this.bodyModalClass)) {
          closeModal();
        }
      });
    }
  }
}
