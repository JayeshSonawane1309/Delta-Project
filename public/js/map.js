mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map",
  center: coordinates,
  zoom: 8,
  style: "mapbox://styles/mapbox/streets-v12",
});

console.log(coordinates);

// Home marker
const homeIcon = document.createElement("div");
homeIcon.className = "home-marker";
homeIcon.innerHTML = `<i class="fa-solid fa-house"></i>`;

new mapboxgl.Marker(homeIcon)
  .setLngLat(coordinates)
  .setPopup(
    new mapboxgl.Popup({offset: 25}).setHTML(
      `<h4>${listingLocation}</h4><p>Exact Location provided after booking</p>`,
    ),
  )
  .addTo(map);

// Geolocate (user location)
const geolocate = new mapboxgl.GeolocateControl({
  trackUserLocation: true,
  showUserLocation: true,
  followUserLocation: false,
});
map.addControl(geolocate);

// 🔁 RETURN TO LISTING LOCATION
document.getElementById("backToListing").addEventListener("click", () => {
  map.flyTo({
    center: coordinates,
    zoom: 14,
    speed: 1.2,
    curve: 1.4,
    essential: true,
  });
});
