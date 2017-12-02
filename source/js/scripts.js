function init() {
  // the mapOptions object contains the information to initialise the map to how we want it
  let mapOptions = {
    zoom: 15,
    center: new google.maps.LatLng(42.2963,-82.8286),
    mapTypeId: google.maps.MapTypeId.ROADMAP,

    panControl: false,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL,
      position: google.maps.ControlPosition.TOP_RIGHT
    },
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      position: google.maps.ControlPosition.TOP_LEFT
    },
    scaleControl: true,
    scaleControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER
    },
    streetViewControl: false,
    overviewMapControl: false
  };
  var venueMap = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function loadScript() {
  let script = document.createElement('script');
  script.src = 'http://maps.googleapis.com/maps/api/js?sensor=false&callback=init';
  document.body.appendChild(script);
}

window.onload = loadScript;