//Hämta DOM-element.
const form = document.getElementById("searchForm");
const input = document.getElementById("locationInput");
const mapFrame = document.getElementById("mapFrame");

/**
 * Hämtar kordinater från Nominatim API baserat på platsnamn.
 * @param {string} Location - Plats som användaren skrivit in.
 * @return {Promise<{Lat: string, Lon: string}>}
 */
async function name(params) {
    
}