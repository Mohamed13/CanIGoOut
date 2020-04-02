function onLocationFound(e) {
    var radius = e.accuracy;
    L.marker(e.latlng).addTo(map)
        .bindPopup("Vous êtes dans environ " + radius + " mètre de ce point").openPopup();
    L.circle(e.latlng, radius).addTo(map);
}

function addMarker(location){
    L.marker(location.latlng, {icon: policeIcon}).addTo(map)
}

function onMapClick(e){
    addMarker(e)
}

let policeIcon = L.icon({
    iconUrl : "assets/icon/police_icon.png",
    iconAnchor:   [50, 50],
});


var map = L.map('mapid').fitWorld();
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaWRvZiIsImEiOiJjazd5a3FxbHMwNmxhM2twbWlybWZma3g1In0.yYqxxmkQk9YrP3GVTrQsHA', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);
map.locate({setView: true, maxZoom: 16});
map.on('locationfound', onLocationFound);




map.on("click",onMapClick)