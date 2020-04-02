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
    map.removeEventListener("click", onMapClick)
}

let policeIcon = L.icon({
    iconUrl : "assets/icon/police_icon.png",
    iconAnchor:   [50, 50],
});

let policeButton = document.getElementById("policeButton")

policeButton.onclick = () => {
    Swal.fire({
        title: 'Position du contrôle',
        text: "Voulez vous signaler un contrôle de police ?",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        showCloseButton : true,
        cancelButtonText: "Non"

    }).then((result) => {
        if (result.value) {
            Swal.fire(
                'Confirmation',
                "Veuillez cliquer sur l'endroit où se situe le contrôle",
                'info'
            )
            map.on("click",onMapClick)
        }
    })
}


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
// var stateChangingButton = L.easyButton({
//     position:  'topRight',
//     states: [{
//         stateName: 'zoom-to-forest',        // name the state
//         icon:      '<img src="assets/icon/policeButton.png">',               // and define its properties
//         title:     'zoom to a forest',      // like its title,,
//         position: "bottomLeft",
//         onClick: function(btn, map) {       // and its callback
//             map.setView([46.25,-121.8],10);
//             btn.state('zoom-to-school');    // change state on click!
//         }
//     }, {
//         stateName: 'zoom-to-school',
//         icon:      'fa-university',
//         title:     'zoom to a school',
//         onClick: function(btn, map) {
//             map.setView([42.3748204,-71.1161913],16);
//             btn.state('zoom-to-forest');
//         }
//     }]
// });

// stateChangingButton.addTo( map );


// map.on("click",onMapClick)