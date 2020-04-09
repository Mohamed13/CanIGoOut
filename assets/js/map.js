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
    addMarker(e);
    db.collection("Controls").add({
        last_signalment: Date.now(),
        position: {latitude:  e.latlng.lat, longitude :  e.latlng.lng}
    });
    map.removeEventListener("click", onMapClick)
}

let policeIcon = L.icon({
    iconUrl : "assets/icon/police_icon.png",
    iconAnchor:   [50, 50],
});



// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBdKO4PvQldfP-5VLW9qqbS6sbUvwpwL8M",
    authDomain: "canigoout-25b12.firebaseapp.com",
    databaseURL: "https://canigoout-25b12.firebaseio.com",
    projectId: "canigoout-25b12",
    storageBucket: "canigoout-25b12.appspot.com",
    messagingSenderId: "433104589309",
    appId: "1:433104589309:web:d8ebcf3a82902ff503c994",
    measurementId: "G-SH80DS4GD5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

db.collection("Controls").onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
            addMarker({latlng : {lat : change.doc.data().position.latitude, lng : change.doc.data().position.longitude }} );
            console.log("New city: ", change.doc.data().position);
        }
        if (change.type === "modified") {
            console.log("Updated control");
        }
        if (change.type === "removed") {
            console.log("Removed control");
        }
    });
});


let policeButton = document.getElementById("policeButton");

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