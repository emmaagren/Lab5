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
        const response = await fetch (
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