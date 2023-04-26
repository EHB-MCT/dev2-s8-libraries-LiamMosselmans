"use strict";

// de leaflet library is reeds geimporteerd, en beschikbaar als "L"
// dit via de script en css tag in de index.html, en de "map" div die werd toegevoegd.


const app = {
    map: L.map('map').setView([50.845132,4.3572129], 12), // gebruik dit om de map gemakkelijk aan te spreken doorheen de applicatie
    init() {
        // initialise de kaart
        // Coordinates + zoom level EHB campus kaai: @50.8422424,4.3202277 [17z]
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(app.map);
        // voeg een tile layer toe, met URL https://a.tile.openstreetmap.org/{z}/{x}/{y}.png
        // vergeet openstreetmap attributie niet
        
        // gebruik de functie "loadMarkers" om de markers toe te voegen

        this.loadMarkers();
    },
    loadMarkers() {
        fetch('https://opendata.brussels.be/api/records/1.0/search/?dataset=toiletten&q=&rows=100&geofilter.distance=50.846475%2C+4.352793%2C+5000')
        .then(response => response.json())
        .then(data => {
            data.records.forEach(element => {
          const adres = element.fields.adrvoisnl;
          const lat = element.fields.wgs84_lat;
          const long = element.fields.wgs84_long;
          var marker = L.marker([lat, long]).addTo(app.map);
          marker.bindPopup(adres)
      });
    });
        L.marker([50.8422095, 4.3228863]).addTo(app.map)
            .bindPopup('Op Campus Kaai zijn er bachelors, graduaten en postgraduaten beschikbaar. Deze zijn technisch & theater gericht.');
        // fetch de data van opendata.brussels.be
            // als er coordinaten beschikbaar zijn, kan je de addMarker functie gebruiken om een marker toe te voegen op de kaart
    },
    addMarker(lat, lon) {
        // voeg een marker toe op lat, lon
    }
}

app.init();
