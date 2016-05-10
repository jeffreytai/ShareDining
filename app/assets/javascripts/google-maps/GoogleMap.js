import { MAP_STYLES, MARKER_DEFAULT_STYLES } from 'google-maps/styles';

export default class GoogleMap {

  static createMap($mapContainer, center, zoom = 12, options = {}) {
    options.center = center;
    options.zoom = zoom;
    options.styles = MAP_STYLES;

    return new google.maps.Map($mapContainer, options);
  }

  static createAutoComplete($inputEl, options = {}) {
    return new google.maps.places.Autocomplete($inputEl, options);
  }

  static createMapMarker(map, lat, lng) {
    return new google.maps.Marker({
      position: { lat, lng },
      icon: MARKER_DEFAULT_STYLES,
      map
    });
  }
}
