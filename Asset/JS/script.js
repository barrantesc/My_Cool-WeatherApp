// GIVEN a weather dashboard with form inputs
var weather;

var api = 'https://api.openweathermap.org/data/2.5/weather?q='
var apiKey = 'aefb5a0c0b478f7f82221b45c7eddcc8'
var units = '&units=imperial'

$(document).ready(function() {
  $("#submit").click(weatherSearch);

  function revealMessage() {
    document.getElementById("hiddenMessage").style.display = "block";
  }

  function displayWeather(data) {
    for (var i = 0; i < data.length; i++) {
      var {name} = data;
      
    }
    
  }

  function weatherSearch() {
    revealMessage()
    var searchFieldInput = $("#searchField").val()
            fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            searchFieldInput +
              "&units=metric&appid=" +
              apiKey
          )
            .then((response) => {
              if (!response.ok) {
                alert("No weather found.");
                throw new Error("No weather found.");
              }
              return response.json();
              console.log(response)
            })
            .then((data) => {
              displayWeather(data)
              console.log(data);
            });
            
    }

    

    

  

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