$().ready(function() {
  let map = L.map("map").setView([13.75318, 100.53173], 15);
  const longdomapserver =
    "http://ms.longdo.com/mmmap/tile.php?zoom={z}&x={x}&y={y}&key=7f4c1dcd284059067bbdc722c2d84aef&proj=epsg3857&HD=1";

  L.tileLayer(longdomapserver, {
    attribution: "© Longdo Map"
  }).addTo(map);

  map.on('moveend', (data) => {
    randomCircle(map)
  })

  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    map.setView([lat, lng], 15);
  })
});

function successLocate(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
}

function randomCircle(map) {
  for (let i = 0; i < 100; i++) {
    const randLat = ((Math.random() * 0.02) * getSign())
    const randLng = ((Math.random() * 0.02) * getSign())

    const lat = map.getCenter().lat + randLat
    const lng = map.getCenter().lng + randLng

    L.circle([lat, lng], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 30
    })
    .bindPopup(`Lat: ${lat}, Lng: ${lng}`)
    .addTo(map)
  }
}

function getSign() {
  return (Math.floor((Math.random())) % 2) === 0 ? 1 : -1
}