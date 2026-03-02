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
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon)
        };

    } catch (error) {
        console.error("Ett fel uppstod:", error);
        return null;
    }
}


/**
 * Uppdaterar kartans iframe genom att skapa en bounding box
 * runt angivna kordinater och placera en markör.
 * 
 * @function updateMap
 * @param {number} lat - Latitud
 * @param {number} lon - Longitud
 * @returns {void}
 */
function updateMap(lat, lon) {

    const offset = 0.05;

    const minLon = lon - offset;
    const minLat = lat - offset;
    const maxLon = lon - offset;
    const maxLat = lat - offset;

    const bbox = `${minLon},${minLat},${maxLon},${maxLat}`;

        mapFrame.src =
        `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;
}


/**
 * Hanterar formulär-sökning
 * Hämtar användarens plats, anropar API och uppdaterar kartan.
 * 
 * @async
 * @function handleSearch
 * @param {Event} event
 * @returns {Promise<void>}
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