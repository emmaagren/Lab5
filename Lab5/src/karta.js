//Hämta DOM-element.
const form = document.getElementById("searchForm");
const input = document.getElementById("locationInput");
const mapFrame = document.getElementById("mapFrame");


/**
 * Hämtar kordinater från Nominatim API baserat på platsnamn.
 * @param {string} Location - Plats som användaren skrivit in.
 * @return {Promise<{Lat: string, Lon: string}>}
 */
async function fetchCoordinates(location) {

    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
        );

        if (!response.ok) {
            throw new Error("Fel vid hämtning av koordinater");
        }

        const data = await response.json();

        if (data.length === 0) {
            alert("Ingen plats hittades.");
            return null;
        }

        return {
            lat: data[0].lat,
            lon: data[0].lon
        };
    } catch (error) {
        console.error("Ett fel uppstod:", error);
        return null;
    }
}


/**
 * Uppdaterar iframe med OpenStreetMap baserat på koordinater.
 * @param {string} lat - Latitud
 * @param {string} lon - Longitud
 */
function updateMap(lat, lon) {

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    const minLon = longitude - 0.01;
    const minLat = latitude - 0.01;
    const maxLon = longitude - 0.01;
    const maxLat = latitude - 0.01;

    mapFrame.src =
        `https://www.openstreetmap.org/export/embed.html?marker=${latitude}%2C${longitude}&layer=mapnik`;
}


/**
 * Hanterar formulär-sökning
 * @param {Event} event
 */
async function handleSearch(event) {
    event.preventDefault();

    const location = input.value.trim();
    if (!location) return;

    const coordinates = await fetchCoordinates(location);

    if (coordinates) {
        updateMap(coordinates.lat, coordinates.lon);
    }
}


//Event listener
form.addEventListener("submit", handleSearch);