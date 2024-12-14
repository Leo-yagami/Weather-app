"use strict";

// const { latitude, longitude } = require("./latitude");

// // initialzing varaible that stores location preference
// let useLocation = false;

// // Adding DOM elements
// const locationBtn = document.addEventListener("click", (event) => {
//   //indicating that the user wants to fetch his weather data using his own location
//   useLocation = "y";
//   getLatLon(useLocation);
// });

// Checking if the user wants to use his own location

// const getLatLon = function (userLocation) {
//   if (userLocation === "y") {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude: lat, longitude: long } = position.coords;
//           const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_min,temperature_2m_max,precipitation_sum,wind_speed_10m_max,uv_index_max,sunrise,sunset,apparent_temperature_max,apparent_temperature_min&current_weather=true`;

//           const locationUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`;

//           fetch(url)
//             .then((response) => {
//               // if (!response.ok) {
//               //   throw new Error("Network response was not ok");
//               // }
//               return response.json();
//             })
//             .then((data) => {
//               // Extract temperature data from the response
//               // const temperature = data.hourly.temperature[0].value; // Example: accessing the first hourly temperature
//               // console.log("Temperature:", temperature);
//               console.log("Full Data:", data); // Optionally, log the full data object
//             })
//             .catch((err) => console.error("Fetch error:", err));

//           // fetch(locationUrl)
//           //   .then((response) => {
//           //     if (!response.ok) throw new Error("Network response was not ok");
//           //     return response.json();
//           //   })
//           //   .then((locationData) => {
//           //     const { country, city } = locationData.address;
//           //     console.log(`Country: ${Country}\n City: ${City}`);
//           //   })
//           //   .catch((err) => console.log(err.message));
//         },
//         () => {
//           console.log("Couldn't get your location");
//         }
//       );
//     } else {
//       console.log("Geolocation is not supported by this browser");
//     }
//   } else {
//     console.log("User opted not to use location");
//   }
// };

// Re-implementation
// const latitude = null,longitude = null;
// function getLatLon(){
//   if(navigator.geolocation){
//     navigator.geolocation.getCurrentPosition((position)=>{
//       console.log(position.coords.latitude);
//       console.log(position.coords.latitude);
//     });
//   }
//   else {
//     alert("The geolocation process wasn't successful");
//   }
// }

// console.log(latitude, longitude);
console.log("Script chained")
