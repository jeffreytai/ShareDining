export default class ModalShow {
  constructor(bodyModalClass, modalLinks, modalClass) {
    this.bodyModalClass = bodyModalClass;
    this.modalLinks = modalLinks;
    this.modalClass = modalClass;
  }

  init() {
    const $body = document.querySelector('body');
    const $modal = document.querySelector(`.${this.modalClass}`);
    const ESCAPE_KEY_CODE = 27;

    // each link should open the modal by adding the bodyModalClass to body
    this.modalLinks.forEach((link) => {
      link.addEventListener('click', (evt) => {
        $body.classList.add(this.bodyModalClass);
        evt.stopPropagation(); // stop prop so we don't close the modal when we bubble up to body
      });
    });

    // a click outside the modal should close it
    $body.addEventListener('click', () => {
      if ($body.classList.contains(this.bodyModalClass)) {
        $body.classList.remove(this.bodyModalClass);
      }
    });

    // inside the modal don't bubble up so we don't close it
    $modal.addEventListener('click', (evt) => evt.stopPropagation());

    // handle modal close on escape
    document.addEventListener('keyup', (evt) => {
      if (evt.keyCode === ESCAPE_KEY_CODE && $body.classList.contains(this.bodyModalClass)) {
        $body.classList.remove(this.bodyModalClass);
      }
    });
  }
}
