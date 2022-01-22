// Global variables
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
var citySearchHistory = []


//set current date and time
$(document).ready(function() {
  $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));
  $("#currentTime").text(moment().format(" h:mm a"));
  $("#submit").click(weatherSearch);
  cityHistory();
  // $("#day-1").text.moment().add(1, 'days').calendar();

  // function revealMessage() {
  //   document.getElementById("hiddenMessage").style.display = "block";
  // }

  // storing city name in local storage
function addCitySearchHistory (cityName) {
  //add city name inside local storage
  var loadPreviousSearches = JSON.parse(localStorage.getItem("citySearch")) || [];
  if (loadPreviousSearches.indexOf(cityName) === -1) 
  {
    loadPreviousSearches.push(cityName);
    localStorage.setItem("citySearch", JSON.stringify(loadPreviousSearches.slice(-4)));
  } 
};

// getting city name from local storage and creating history button
function cityHistory () {
  var loadPreviousSearches = JSON.parse(localStorage.getItem("citySearch")) || [];
  $("#previous-searches").empty();
  for (var i = 0; i < loadPreviousSearches.length ; i++) {
    $("<li>").text(loadPreviousSearches[i]).appendTo($("#previous-searches")).addClass("citySearch");
}
};

// Populate forecast from search history
$("#previous-searches").click(function(event) {
  var clickedSearchTerm = event.target;
  var citySearchTerm = clickedSearchTerm.textContent;
  $("#searchField").val(citySearchTerm);
  weatherSearch();
});

  // function to display data on click
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
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            searchFieldInput +
              "&units=imperial" + "&appid=" +
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
              // var fiveDayData = fetch5Days(data.coord.lat,data.coord.lon);
              var lat = data.coord.lat
              var lon = data.coord.lon
              // console.log("data here", data, lon);
              document.getElementById("hiddenMessage").style.display = "block";

              console.log("temp response: ",data);
              currentWeatherIcon.setAttribute("src", `https://openweathermap.org/img/w/${data.weather[0].icon}.png`)
              currentDayCity.textContent = data.name;
              currentTemp.textContent = `${data.main.temp} F`;
              currentHumidity.textContent = `Humidity: ${data.main.humidity}`;
              currentWindSpeed.textContent = `Wind speed: ${data.wind.speed}`;
              
              addCitySearchHistory(data.name);
              displayWeather(data);
              cityHistory(); 
              fetch5Days (lat, lon);
            });
            
    }

    function fetch5Days (lat,lon) {
      fetch (
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&units=imperial&appid=${apiKey}`
        )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          } 
          return response.json();
        })
        .then((data) => {
          console.log("response here", data);
          currentUVIndex.textContent = `UVI: ${data.current.uvi}`;
          if (data.current.uvi < 3) {
            currentUVIndex.classList.add("uvIndex-green")
          } 
          else if (data.current.uvi < 7) {
            currentUVIndex.classList.add("uvIndex-yellow")
          }
          else {
            currentUVIndex.classList.add("uvIndex-red")
          }

          
          for (var i=1; i < 6; i++) {
            console.log("inside for loop", data.daily[i].dt);
            document.querySelector("#weatherIcon-" + i).setAttribute("src", `https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`);
            document.querySelector("#temp-" + i).textContent=`${data.daily[i].temp.day} F`;
            document.querySelector("#humidity-" + i).textContent=`Humidity: ${data.daily[i].humidity}`;
            document.querySelector("#windSpeed-" + i).textContent=`Wind speed: ${data.daily[i].wind_speed}`;
            document.querySelector('#day-' + i).textContent = moment(data.daily[i].dt * 1000).format("dddd, MMMM Do YYYY");
          }
        });
        
      }
     

});


// GIVEN a weather dashboard with form inputs
// WHEN I search for a city. THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city. THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index. THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city. THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history. THEN I am again presented with current and future conditions for that city