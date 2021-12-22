// GIVEN a weather dashboard with form inputs
var weather;
var currentDayCity = document.querySelector('#currentCity');
var currentTemp = document.querySelector('#temp');
var currentHumidity = document.querySelector('#humidity');
var currentWindSpeed = document.querySelector('#windSpeed');
var currentUVIndex = document.querySelector('#uvIndex');
var currentWeatherIcon = document.querySelector("#weatherIcon")

var api = 'https://api.openweathermap.org/data/2.5/weather?q='
var apiKey = 'aefb5a0c0b478f7f82221b45c7eddcc8'
var units = '&units=imperial'

$(document).ready(function() {
  $("#submit").click(weatherSearch);

  // function revealMessage() {
  //   document.getElementById("hiddenMessage").style.display = "block";
  // }

  function displayWeather(data) {
    for (var i = 0; i < data.length; i++) {
      var button = select('#submit');
      button.onclick(weatherSearch);
      input = select('#city');
      console.log(city)
    }
    
  }

  function weatherSearch() {
  
    var searchFieldInput = $("#searchField").val()
           

            fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=atlanta" +
            // searchFieldInput +
              "&units=metric&appid=" +
              apiKey
          )
            .then((response) => {
              // console.log(response);
              if (!response.ok) {
                alert("No weather found.");
                throw new Error("No weather found.");
              } 
              return response.json();
             
            })
            .then((data) => {
              var fiveDayData = fetch5Days(data.coord.lat,data.coord.lon);
              console.log(data);
              document.getElementById("hiddenMessage").style.display = "block";

              console.log("temp response: ",data);
              currentDayCity.textContent = data.name;
              currentTemp.textContent = `${data.main.temp} F`;
              currentHumidity.textContent = `Humidity: ${data.main.humidity}`;
              currentWindSpeed.textContent = `Wind speed: ${data.wind.speed}`;
              
              console.log(fiveDayData);
              
              displayWeather(data)
            });
            
    }

    function fetch5Days (lat,lon) {
      fetch (
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&units=imperial&appid=${apiKey}`
        )
        .then((response) => {
          // console.log(response);
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          } 
          return response.json();
         
        })
        .then((data) => {
          console.log(data);
          currentUVIndex.textContent = `UVI: ${data.current.uvi}`;

          for (var i=1; i < 6; i++) {
            console.log(data.daily[i].temp.day);
            document.querySelector("#temp-" + i).textContent=`${data.daily[i].temp.day} F`;
            document.querySelector("#humidity-" + i).textContent=`Humidity: ${data.daily[i].humidity}`;
            document.querySelector("#windSpeed-" + i).textContent=`Wind speed: ${data.daily[i].wind_speed}`;
          }
        });
      
    }



// weatherSearch()

  // function weatherSearch() {
  //   revealMessage()
  //   var searchFieldInput = $("#searchField").val()
  //           fetch(
  //           "https://api.openweathermap.org/data/2.5/weather?q=" +
  //           searchFieldInput +
  //             "&units=metric&appid=" +
  //             apiKey
  //         )
  //           .then((response) => {
  //             if (!response.ok) {
  //               alert("No weather found.");
  //               throw new Error("No weather found.");
  //             }
  //             console.log(response)
  //             return response.json();
  //           })
  //           .then((data) => {
  //             displayWeather(data)
  //             console.log(data);
  //           });
            
  //   }
  //   weatherSearch()

    

    

  

});

// var input;

// function setup() { 
// var button = select('#submit');
// button.onclick(weatherSearch);

// input = select('#city');
// }

// function weatherSearch() {
//   var url = api + input.value() + apiKey + units;
//   loadJSON(url, gotData);
// }

// function gotData(data) {
//   weather = data;
// }






// // WHEN I search for a city THEN I am presented with current and future conditions for that city and that city is added to the search history   
//     // what happens when i press the button? 




// WHEN I view current weather conditions for that city THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity 
//WHEN I click on a city in the search history THEN I am again presented with current and future conditions for that city