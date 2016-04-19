export default class GoogleMap {
  constructor(mapElName, center, zoom = 11) {
    this.mapElName = mapElName;
    this.center = center;
    this.zoom = zoom;
  }

  init() {
    const $mapEl = document.querySelector(this.mapElName);

    this.map = new google.maps.Map($mapEl, { center: this.center, zoom: this.zoom });
  }
}
