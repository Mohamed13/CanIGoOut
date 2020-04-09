function onLocationFound(e) {
    var radius = e.accuracy;
    L.marker(e.latlng).addTo(map)
        .bindPopup("Vous êtes dans environ " + radius + " mètre de ce point").openPopup();
    L.circle(e.latlng, Math.round(radius)).addTo(map);
    range = getGeohashRange(e.latlng.lat, e.latlng.lng, 5);
    db.collection("Controls")
        .where("geohash", ">=", range.lower)
        .where("geohash", "<=", range.upper)
        .onSnapshot(function(snapshot) {
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
}

function addMarker(location){
    L.marker(location.latlng, {icon: policeIcon}).addTo(map)
}

function onMapClick(e){
    addMarker(e);
    db.collection("Controls").add({
        last_signalment: Date.now(),
        position: {latitude:  e.latlng.lat, longitude :  e.latlng.lng},
        geohash :  Geohash.encode(e.latlng.lat, e.latlng.lng)
    });
    map.removeEventListener("click", onMapClick)
}

let policeIcon = L.icon({
    iconUrl : "assets/icon/police_icon.png",
    iconAnchor:   [50, 50],
});

const getGeohashRange = (
    latitude,
    longitude,
    distance, // miles
) => {
    const lat = 0.0144927536231884; // degrees latitude per mile
    const lon = 0.0181818181818182; // degrees longitude per mile

    const lowerLat = latitude - lat * distance;
    const lowerLon = longitude - lon * distance;

    const upperLat = latitude + lat * distance;
    const upperLon = longitude + lon * distance;

    const lower = Geohash.encode(lowerLat, lowerLon);
    const upper = Geohash.encode(upperLat, upperLon);

    return {
        lower,
        upper
    };
};


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
firebase.firestore().enablePersistence()
    .catch(function(err) {
        if (err.code == 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            // ...
        } else if (err.code == 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
        }
    });
// Subsequent queries will use persistence, if it was enabled successfully





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
    minZoom: 12,
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

const base32 = '0123456789bcdefghjkmnpqrstuvwxyz'; // (geohash-specific) Base32 map

//region geohash
/**
 * Geohash: Gustavo Niemeyer’s geocoding system.
 */
class Geohash {

    /**
     * Encodes latitude/longitude to geohash, either to specified precision or to automatically
     * evaluated precision.
     *
     * @param   {number} lat - Latitude in degrees.
     * @param   {number} lon - Longitude in degrees.
     * @param   {number} [precision] - Number of characters in resulting geohash.
     * @returns {string} Geohash of supplied latitude/longitude.
     * @throws  Invalid geohash.
     *
     * @example
     *     const geohash = Geohash.encode(52.205, 0.119, 7); // => 'u120fxw'
     */
    static encode(lat, lon, precision) {
        // infer precision?
        if (typeof precision == 'undefined') {
            // refine geohash until it matches precision of supplied lat/lon
            for (let p=1; p<=12; p++) {
                const hash = Geohash.encode(lat, lon, p);
                const posn = Geohash.decode(hash);
                if (posn.lat==lat && posn.lon==lon) return hash;
            }
            precision = 12; // set to maximum
        }

        lat = Number(lat);
        lon = Number(lon);
        precision = Number(precision);

        if (isNaN(lat) || isNaN(lon) || isNaN(precision)) throw new Error('Invalid geohash');

        let idx = 0; // index into base32 map
        let bit = 0; // each char holds 5 bits
        let evenBit = true;
        let geohash = '';

        let latMin =  -90, latMax =  90;
        let lonMin = -180, lonMax = 180;

        while (geohash.length < precision) {
            if (evenBit) {
                // bisect E-W longitude
                const lonMid = (lonMin + lonMax) / 2;
                if (lon >= lonMid) {
                    idx = idx*2 + 1;
                    lonMin = lonMid;
                } else {
                    idx = idx*2;
                    lonMax = lonMid;
                }
            } else {
                // bisect N-S latitude
                const latMid = (latMin + latMax) / 2;
                if (lat >= latMid) {
                    idx = idx*2 + 1;
                    latMin = latMid;
                } else {
                    idx = idx*2;
                    latMax = latMid;
                }
            }
            evenBit = !evenBit;

            if (++bit == 5) {
                // 5 bits gives us a character: append it and start over
                geohash += base32.charAt(idx);
                bit = 0;
                idx = 0;
            }
        }

        return geohash;
    }


    /**
     * Decode geohash to latitude/longitude (location is approximate centre of geohash cell,
     *     to reasonable precision).
     *
     * @param   {string} geohash - Geohash string to be converted to latitude/longitude.
     * @returns {{lat:number, lon:number}} (Center of) geohashed location.
     * @throws  Invalid geohash.
     *
     * @example
     *     const latlon = Geohash.decode('u120fxw'); // => { lat: 52.205, lon: 0.1188 }
     */
    static decode(geohash) {

        const bounds = Geohash.bounds(geohash); // <-- the hard work
        // now just determine the centre of the cell...

        const latMin = bounds.sw.lat, lonMin = bounds.sw.lon;
        const latMax = bounds.ne.lat, lonMax = bounds.ne.lon;

        // cell centre
        let lat = (latMin + latMax)/2;
        let lon = (lonMin + lonMax)/2;

        // round to close to centre without excessive precision: ⌊2-log10(Δ°)⌋ decimal places
        lat = lat.toFixed(Math.floor(2-Math.log(latMax-latMin)/Math.LN10));
        lon = lon.toFixed(Math.floor(2-Math.log(lonMax-lonMin)/Math.LN10));

        return { lat: Number(lat), lon: Number(lon) };
    }


    /**
     * Returns SW/NE latitude/longitude bounds of specified geohash.
     *
     * @param   {string} geohash - Cell that bounds are required of.
     * @returns {{sw: {lat: number, lon: number}, ne: {lat: number, lon: number}}}
     * @throws  Invalid geohash.
     */
    static bounds(geohash) {
        if (geohash.length == 0) throw new Error('Invalid geohash');

        geohash = geohash.toLowerCase();

        let evenBit = true;
        let latMin =  -90, latMax =  90;
        let lonMin = -180, lonMax = 180;

        for (let i=0; i<geohash.length; i++) {
            const chr = geohash.charAt(i);
            const idx = base32.indexOf(chr);
            if (idx == -1) throw new Error('Invalid geohash');

            for (let n=4; n>=0; n--) {
                const bitN = idx >> n & 1;
                if (evenBit) {
                    // longitude
                    const lonMid = (lonMin+lonMax) / 2;
                    if (bitN == 1) {
                        lonMin = lonMid;
                    } else {
                        lonMax = lonMid;
                    }
                } else {
                    // latitude
                    const latMid = (latMin+latMax) / 2;
                    if (bitN == 1) {
                        latMin = latMid;
                    } else {
                        latMax = latMid;
                    }
                }
                evenBit = !evenBit;
            }
        }

        const bounds = {
            sw: { lat: latMin, lon: lonMin },
            ne: { lat: latMax, lon: lonMax },
        };

        return bounds;
    }


    /**
     * Determines adjacent cell in given direction.
     *
     * @param   geohash - Cell to which adjacent cell is required.
     * @param   direction - Direction from geohash (N/S/E/W).
     * @returns {string} Geocode of adjacent cell.
     * @throws  Invalid geohash.
     */
    static adjacent(geohash, direction) {
        // based on github.com/davetroy/geohash-js

        geohash = geohash.toLowerCase();
        direction = direction.toLowerCase();

        if (geohash.length == 0) throw new Error('Invalid geohash');
        if ('nsew'.indexOf(direction) == -1) throw new Error('Invalid direction');

        const neighbour = {
            n: [ 'p0r21436x8zb9dcf5h7kjnmqesgutwvy', 'bc01fg45238967deuvhjyznpkmstqrwx' ],
            s: [ '14365h7k9dcfesgujnmqp0r2twvyx8zb', '238967debc01fg45kmstqrwxuvhjyznp' ],
            e: [ 'bc01fg45238967deuvhjyznpkmstqrwx', 'p0r21436x8zb9dcf5h7kjnmqesgutwvy' ],
            w: [ '238967debc01fg45kmstqrwxuvhjyznp', '14365h7k9dcfesgujnmqp0r2twvyx8zb' ],
        };
        const border = {
            n: [ 'prxz',     'bcfguvyz' ],
            s: [ '028b',     '0145hjnp' ],
            e: [ 'bcfguvyz', 'prxz'     ],
            w: [ '0145hjnp', '028b'     ],
        };

        const lastCh = geohash.slice(-1);    // last character of hash
        let parent = geohash.slice(0, -1); // hash without last character

        const type = geohash.length % 2;

        // check for edge-cases which don't share common prefix
        if (border[direction][type].indexOf(lastCh) != -1 && parent != '') {
            parent = Geohash.adjacent(parent, direction);
        }

        // append letter for direction to parent
        return parent + base32.charAt(neighbour[direction][type].indexOf(lastCh));
    }


    /**
     * Returns all 8 adjacent cells to specified geohash.
     *
     * @param   {string} geohash - Geohash neighbours are required of.
     * @returns {{n,ne,e,se,s,sw,w,nw: string}}
     * @throws  Invalid geohash.
     */
    static neighbours(geohash) {
        return {
            'n':  Geohash.adjacent(geohash, 'n'),
            'ne': Geohash.adjacent(Geohash.adjacent(geohash, 'n'), 'e'),
            'e':  Geohash.adjacent(geohash, 'e'),
            'se': Geohash.adjacent(Geohash.adjacent(geohash, 's'), 'e'),
            's':  Geohash.adjacent(geohash, 's'),
            'sw': Geohash.adjacent(Geohash.adjacent(geohash, 's'), 'w'),
            'w':  Geohash.adjacent(geohash, 'w'),
            'nw': Geohash.adjacent(Geohash.adjacent(geohash, 'n'), 'w'),
        };
    }

}

//endregion