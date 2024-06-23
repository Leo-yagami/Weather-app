"use strict";

// Checking if the user wants to use his own location
let useLocation = prompt(
  "Do you want to use your own location for the forecast(y/n):"
);

let response;
const getLatLon = function (userLocation) {
  if (userLocation.toLowerCase() === "y") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat } = position.coords;
          const { longitude: long } = position.coords;
          // Mistake: you forgot to put the question mark after 'forecast'
          const url = `https://api.open-meteo.com/v1/forecast?&latitude=${lat}&longitude=${long}`;
          fetch(url)
            .then((response) => {
              // manaully checking for error(404...)
              if (!response.ok) throw new Error("Network response wasn't ok");
              // Mistake: you forgot to return response.json()
              return response.json();
            })
            .then((data) => console.log(data))
            .catch((err) => console.log(err.message));
        },
        () => {
          console.log("Couldn't get your location");
        }
      );
    }
  }
};
getLatLon(useLocation);
