# Weather Dashboard
## Table of Contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Demo](#demo)
* [Code Example](#code-example)
## General info 
This project is a simple weather application. When the user inputs a city, the Weather Dashboard with display the current weather an a five day forecast. This is done using the Open Weather Map API. Another feature of the Weather Dashboard is the use of local storage. It will save the user's preious searches. The user can then click on the button of previous cities searched and be directed to that respective city's weather information. 
## Technologies
-Bootstrap 4
-jQuery
-Open Weather API
## Demo
![demo of app](demoimage.JPG)
## Code Example
```
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
```
## Authors and Acknowledgement
Isha Khosla is the main auther with guidance from Simon Rennoks
## Deployed Application

