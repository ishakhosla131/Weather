var btn = $("#button-addon2");
var cities = JSON.parse(localStorage.getItem("cityList")) || [];

function loadHistory() {
  var prevSearched = $("#local-storage");
  prevSearched.html("");

  //adding buttons for previously searched cities
  for (i = 0; i < cities.length; i++) {
    var newBtn = $("<button>");
    var newDiv = $("<div>");
    newBtn.append(cities[i]);
    newBtn.addClass("btn btn-light btn-lg btn-block")
    newDiv.append(newBtn);
    prevSearched.append(newDiv)
    newBtn.on("click", function (event) {
      console.log(event.target.innerText);
      searchWeather(event.target.innerText)
      fiveDay(event.target.innerText)
    })

  }
}
loadHistory();

function fiveDay(city) {
  var fiveDay = $("#five-day")
  fiveDay.empty()
  var title = $("#title")
  title.removeClass("invisible")

  $.ajax({
    type: "GET",
    url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=af94843d065a063d35f3375ed16087ce",
    dataType: "json"
  }).then(function (response) {


    //for loop for 5 day weather forecast
    for (var i = 0; i < 40; i += 8) {
      var forecastDiv = $("<div>")
      var datetxt = $("<p>").text("Date: " + response.list[i].dt_txt)
      //creating element to display temperature in F
      var tempK = response.list[i].main.temp
      var TEMPF = (tempK - 273.15) * 1.80 + 32;
      TEMPF = Math.ceil(TEMPF);
      var newTemp = $("<p>").text("Temp: " + TEMPF + "F");
      //creating elemnt to display humidity
      var humid = $("<p>").text("Humidity: " + response.list[i].main.humidity + "%")
      //creating element to display description
      var description = $("<p>").text(response.list[i].weather[0].description)
      //displaying icon
      var icon = $("<img>")
      var code = response.list[i].weather[0].icon
      imgSrc = "http://openweathermap.org/img/w/" + code + ".png"
      icon.attr("src", imgSrc)
      //appending all the new elements 
      forecastDiv.append(datetxt, icon, newTemp, humid, description)
      forecastDiv.addClass("border border-primary col-md-2 m5")
      fiveDay.append(forecastDiv)
    }
  })
}



function searchWeather(city) {
  var currentWeather = $("#current-weather");

  $.ajax({
    type: "GET",
    url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=af94843d065a063d35f3375ed16087ce",
    dataType: "json"
  }).then(function (response) {
    // console.log(response)
    currentWeather.empty()
    //  display city's name
    var cityName = $("#city-name");
    cityName.text(response.name);
    //display todays date (youtube video)
    var today = new Date();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    var date = today.getDate();
    var currentDate = " " + month + "/" + date + "/" + year;
    cityName.append(currentDate);


    // display weather info
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    var tempF = Math.ceil(tempF)
    var temp = $("<p>").text("Tempurature: " + tempF + " F");
    var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
    var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + " MPH");
    //var UV= $("<p>").text("UV Index: " + response.main.humidity  );
    currentWeather.append(temp, humidity, windSpeed);
    $("#main").addClass("border border-dark");
  });
}
btn.on("click", function (event) {
  // prevent default
  event.preventDefault();
  var userInput = $("#user-input").val().trim();
  //calling weather functions
  searchWeather(userInput);
  fiveDay(userInput);

  //preventing previously searched cities to be saved again
  if (cities.indexOf(userInput) === -1) {
    cities.push(userInput);
    localStorage.setItem("cityList", JSON.stringify(cities))
    loadHistory()
  };
}) 