const apiKey = "f83e627d693799d840bcd607f809876b";
const apiUrl= "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox=document.querySelector("#search input")
const searchBtn=document.querySelector("#search button")
const weatherIcon=document.querySelector(".weatherIcon")

async function checkWeather(city) {
    const response = await fetch(apiUrl + city +`&appid=${apiKey}`);
    if (response.status==404) {
        document.getElementById("error").style.display="block";
        document.getElementById("weather").style.display="none";

    }
    else{
        var data = await response.json();
        document.getElementById("city").innerHTML = data.name;
        document.getElementById("temp").innerHTML = Math.round(data.main.temp) +"°C";
        document.getElementById("humidity").innerHTML = data.main.humidity+" %";
        document.getElementById("wind").innerHTML = data.wind.speed + " km/h";
        
        if (data.weather[0].main=="Clouds") {
            weatherIcon.src="img/clouds.png"
        }
        else if (data.weather[0].main=="Clear") {
            weatherIcon.src="img/clear.png"
        }
        else if (data.weather[0].main=="Rain") {
            weatherIcon.src="img/rain.png"
        }
        else if (data.weather[0].main=="Drizzle") {
            weatherIcon.src="img/drizzle.png"
        }
        else if (data.weather[0].main=="Mist") {
            weatherIcon.src="img/mist.png"
        }
        document.getElementById("weather").style.display="block"
        document.getElementById("error").style.display="none";

    }

}
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
    searchBox.value = "";

})
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
        searchBox.value = "";
    }
});
