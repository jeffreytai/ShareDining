export default class GoogleMap {

  static createMap($mapContainer, center, zoom = 14, options = {}) {
    options.center = center;
    options.zoom = zoom;

    return new google.maps.Map($mapContainer, options);
  }

  static createAutoComplete($inputEl, options = {}) {
    return new google.maps.places.Autocomplete($inputEl, options);
  }

  static createMapMarker(map, lat, lng) {
    return new google.maps.Marker({
      position: { lat, lng },
      map: map
    });
  }
}
