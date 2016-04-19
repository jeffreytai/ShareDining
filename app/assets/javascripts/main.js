import GoogleMap from 'GoogleMap';

// TODO: change this to real data, need to get lat/long based on value of search
const mapElName = '.results-map-container';
window.map = new GoogleMap(mapElName, { lat: 45.5231, lng: -122.6765 });
