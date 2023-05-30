/**
 * Moves the map to display over Berlin
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */
function addMarkersToMap(map) {
    var parisMarker = new H.map.Marker({lat:28.675968, lng:77.502611});
    map.addObject(parisMarker);
}


var platform = new H.service.Platform({
  apikey: "cVKuqf_WlxXYkKJ4QTUXLZfuJAXpsyI7DcHBuwEqupE"
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map,{
  center: {lat:28.675968, lng:77.502611},
  zoom: 4,
  pixelRatio: window.devicePixelRatio || 1
});

window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers);

window.onload = function () {
    addMarkersToMap(map);
}
   