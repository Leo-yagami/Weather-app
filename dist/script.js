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
// let latitude;
// let longitude;

// async function getLatLon() {
//     return new Promise((resolve, reject) => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition((position) => {
//                 latitude = position.coords.latitude;
//                 longitude = position.coords.longitude;
//                 resolve({ latitude, longitude });
//             }, (error) => {
//                 reject("Geolocation error: " + error.message);
//             });
//         } else {
//             reject("Geolocation is not supported by this browser.");
//         }
//     });
// }
// // Usage
// (async () => {
//     try {
//         coords = await getLatLon();
//         console.log("Latitude:", coords.latitude);
//         console.log("Longitude:", coords.longitude);
//     } catch (error) {
//         alert(error);
//     }
// })();

// // console.log(latitude, longitude);
// console.log("Script chained")

async function getCity(callback){
    return new Promise((resolve, reject) => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(position),
                (error) => reject(error)
            )
        }
        else{
            alert("WHY NOT SEND LOCATION :(");
        }
    })
}
let lat, long;
let obj = {};
// Inserting the current date information into the object
const currDate = new Date();
const day1 = currDate.getDay();
const month1 = currDate.getMonth()
let owwmoidayzFam = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let owwmoimonthsFam = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function getDayMonth(dateTxt){
    let txtArr = dateTxt.split(" ")[0].split("-");
    let day = txtArr[2];
    let month = txtArr[1];
    return `${day} ${owwmoimonthsFam[+month - 1]}`;
}
function getWeek(date){
    return owwmoidayzFam[new Date(date).getDay()]
} 
function calcClock(date){
    date = new Date(date * 1000);
    let timeHalf = date.getUTCHours() >= 12 ? 'PM' : 'AM';
    return `${date.getUTCHours()}:${date.getUTCMinutes()} ${timeHalf}`;
}
function calcClockHour(date){
    let clock = calcClock(date).split(" ");
    let hour = clock[0].split(":")[0]%12 === 0? 12 : clock[0].split(":")[0]%12;
    let timeHalf = clock[1];
    return `${hour} ${timeHalf}`
}
obj["Date Description"] = `${owwmoidayzFam[day1]} ${day1}, ${owwmoimonthsFam[month1]}`;
getCity().then(position => {
    console.log(position)
    // Storing the latitude and longitude into 2 variables from geolocation.getCurrentPosition async method
    lat = position.coords.latitude;
    long = position.coords.longitude;
    // Calling reverse geocoding API(for cityname based on lat and long)
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`;
    const apiKey = 'ae69e163688a492fcd4a648e6e3076e9'; // Replace with your OpenWeather API key
    fetch(url)
    .then(response => response.json())
    .then(data => {
        // Setting the first property of the object which describes the country and corresponding city
        console.log(data)
        obj["Country Description"] = `${data.address.state_district}, ${data.address.country_code}`
        const country = data.address.country;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}&units=metric`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            obj["Temperature"] = data.main.temp;
            obj["Description"] = data.weather[0].description;
            obj["Humidity"] = data.main.humidity;
            obj["Pressure"] = data.main.pressure;
            obj["Visibility"] = data.visibility;
            obj["Feels Like"] = data.main.feels_like;
            obj["Sunrise"] = calcClock(data.sys.sunrise);
            obj["Sunset"] = calcClock(data.sys.sunset);
            obj["Country Abbreviation"] = data.sys.country;
            obj["nowIcon"] = `./Design Process/images/${data.weather[0].icon}_t.png` 
            console.log(data)
            console.log("////////////////////OBJECT")
            console.log(obj)
        });
    })
    const url5Day = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}`
        fetch(url5Day)
        .then(response => response.json())
        .then(data => {
            console.log("////////////////////5DAY FORCAST")
            console.log(data)
            // 5 DAY PROPERTIES
            obj["temp_d_1"] = data.list[0].main.temp;
            obj["temp_d_2"] = data.list[8].main.temp;
            obj["temp_d_3"] = data.list[16].main.temp;
            obj["temp_d_4"] = data.list[24].main.temp;
            obj["temp_d_5"] = data.list[30].main.temp;
            console.log("PARAMETER" + data.list[0].clouds.dt_text)
            obj["temp_date_1"] = getDayMonth(data.list[0].dt_txt);
            obj["temp_date_2"] = getDayMonth(data.list[8].dt_txt);
            obj["temp_date_3"] = getDayMonth(data.list[16].dt_txt);
            obj["temp_date_4"] = getDayMonth(data.list[24].dt_txt);
            obj["temp_date_5"] = getDayMonth(data.list[30].dt_txt);
            obj["temp_week_1"] = getWeek(data.list[0].dt_txt);
            obj["temp_week_2"] = getWeek(data.list[8].dt_txt);
            obj["temp_week_3"] = getWeek(data.list[16].dt_txt);
            obj["temp_week_4"] = getWeek(data.list[24].dt_txt);
            obj["temp_week_5"] = getWeek(data.list[30].dt_txt);
            obj["temp_icon_1"] = `./Design Process/images/${data.list[0].weather[0].icon}_t.png`;
            obj["temp_icon_2"] = `./Design Process/images/${data.list[8].weather[0].icon}_t.png`;
            obj["temp_icon_3"] = `./Design Process/images/${data.list[16].weather[0].icon}_t.png`;
            obj["temp_icon_4"] = `./Design Process/images/${data.list[24].weather[0].icon}_t.png`;
            obj["temp_icon_5"] = `./Design Process/images/${data.list[30].weather[0].icon}_t.png`;

            // 16 HOur PROPERTIES
            obj["temp_h_1"] = data.list[0].main.temp;
            obj["temp_h_2"] = data.list[1].main.temp;
            obj["temp_h_3"] = data.list[2].main.temp;
            obj["temp_h_4"] = data.list[3].main.temp;
            obj["temp_h_5"] = data.list[4].main.temp;
            obj["temp_h_6"] = data.list[5].main.temp;
            obj["temp_h_7"] = data.list[6].main.temp;
            obj["temp_h_8"] = data.list[7].main.temp;
            obj["temp_h_9"] = data.list[8].main.temp;
            obj["temp_h_10"] = data.list[9].main.temp;
            obj["temp_h_11"] = data.list[10].main.temp;
            obj["temp_h_12"] = data.list[11].main.temp;
            obj["temp_h_13"] = data.list[12].main.temp;
            obj["temp_h_14"] = data.list[13].main.temp;
            obj["temp_h_15"] = data.list[14].main.temp;
            obj["temp_h_16"] = data.list[15].main.temp;
            obj["time_h_1"] = calcClockHour(data.list[0].dt);
            obj["time_h_2"] = calcClockHour(data.list[1].dt);
            obj["time_h_3"] = calcClockHour(data.list[2].dt);
            obj["time_h_4"] = calcClockHour(data.list[3].dt);
            obj["time_h_5"] = calcClockHour(data.list[4].dt);
            obj["time_h_6"] = calcClockHour(data.list[5].dt);
            obj["time_h_7"] = calcClockHour(data.list[6].dt);
            obj["time_h_8"] = calcClockHour(data.list[7].dt);
            obj["time_h_9"] = calcClockHour(data.list[8].dt);
            obj["time_h_10"] = calcClockHour(data.list[9].dt);
            obj["time_h_11"] = calcClockHour(data.list[10].dt);
            obj["time_h_12"] = calcClockHour(data.list[11].dt);
            obj["time_h_13"] = calcClockHour(data.list[12].dt);
            obj["time_h_14"] = calcClockHour(data.list[13].dt);
            obj["time_h_15"] = calcClockHour(data.list[14].dt);
            obj["time_h_16"] = calcClockHour(data.list[15].dt);
            obj["icon_h_1"] = `./Design Process/images/${data.list[0].weather[0].icon}_t.png`
            obj["icon_h_2"] = `./Design Process/images/${data.list[1].weather[0].icon}_t.png`
            obj["icon_h_3"] = `./Design Process/images/${data.list[2].weather[0].icon}_t.png`
            obj["icon_h_4"] = `./Design Process/images/${data.list[3].weather[0].icon}_t.png`
            obj["icon_h_5"] = `./Design Process/images/${data.list[4].weather[0].icon}_t.png`
            obj["icon_h_6"] = `./Design Process/images/${data.list[5].weather[0].icon}_t.png`
            obj["icon_h_7"] = `./Design Process/images/${data.list[6].weather[0].icon}_t.png`
            obj["icon_h_8"] = `./Design Process/images/${data.list[7].weather[0].icon}_t.png`
            obj["icon_h_9"] = `./Design Process/images/${data.list[8].weather[0].icon}_t.png`
            obj["icon_h_10"] = `./Design Process/images/${data.list[9].weather[0].icon}_t.png`
            obj["icon_h_11"] = `./Design Process/images/${data.list[10].weather[0].icon}_t.png`
            obj["icon_h_12"] = `./Design Process/images/${data.list[11].weather[0].icon}_t.png`
            obj["icon_h_13"] = `./Design Process/images/${data.list[12].weather[0].icon}_t.png`
            obj["icon_h_14"] = `./Design Process/images/${data.list[13].weather[0].icon}_t.png`
            obj["icon_h_15"] = `./Design Process/images/${data.list[14].weather[0].icon}_t.png`
            obj["icon_h_16"] = `./Design Process/images/${data.list[15].weather[0].icon}_t.png`
        })
    const aqURL = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat.toFixed(2)}&longitude=${long.toFixed(2)}&hourly=pm2_5,nitrogen_dioxide,sulphur_dioxide,ozone&forecast_days=1`;
    fetch(aqURL)
    .then(response => response.json())
    .then(data => {
        console.log("///////////////////////AIR QUALITY INDEX")
        console.log(data)
        obj["pm25"] = data.hourly.pm2_5[0];
        obj["no2"] = data.hourly.nitrogen_dioxide[0];
        obj["so2"] = data.hourly.sulphur_dioxide[0];
        obj["o3"] = data.hourly.ozone[0];
    })

})
.finally(() =>console.log(lat, long))

// function getLatLon(callback) {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//             latitude = position.coords.latitude;
//             longitude = position.coords.longitude;
//             callback(latitude, longitude);
//         }, (error) => {
//             alert("Geolocation error: " + error.message);
//         });
//     } else {
//         alert("Geolocation is not supported by this browser.");
//     }
// }

// function getAddress(lat, lon, callback) {
//     const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             if (data.display_name) {
//                 console.log("Address:", data.address.country);
//                 console.log("Address:", data);
//                 callback(data.address.country);
//             } else {
//                 console.error("No address found");
//             }
//         })
//         .catch(error => console.error("Error:", error));
// }

// function getWeather(city) {
//     const apiKey = 'YOUR_OPENWEATHER_API_KEY'; // Replace with your OpenWeather API key
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//     fetch(url)
//     .then(response => response.json())
//     .then(data => {
//         if(data.main){
//             console.log(`Weather in ${city}: ${data.main.temp}°C, ${data.weather[0].description}`);
//         }
//         else {
//             console.error("No weather data found")
//         }
//     })
//     .catch(error => console.error("Error: ", error));
// }

// // Usage
// getLatLon((lat, lon) => {
//     console.log("Latitude:", lat);
//     console.log("Longitude:", lon);
//     getAddress(lat, lon, (city)=>getWeather(city)); // Call the reverse geocoding function
// });
