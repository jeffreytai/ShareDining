export default class ModalShow {
  constructor(modalBindings) {
    this.modalBindings = modalBindings; // maps modal class to elements that toggle modal
    this.hideModalBindings = [];
  }

  addHideBindings(bindings) {

  }

  addBindings(className, ...elements) {
    if (!this.modalBindings[className]) {
      this.modalBindings[className] = [...elements];
    }
    this.modalBindings[className].push(...elements);
  }

  initBindings() {
    const $body = document.querySelector('body');

    Object.keys(this.modalBindings).forEach((className) => {
      const elements = this.modalBindings[className];
      console.log(className);

      elements.forEach((el) => {
        console.log(el, className);
        el.addEventListener('click', (evt) => {
          $body.classList.add(className);
        });
      });
    });
  }
}
