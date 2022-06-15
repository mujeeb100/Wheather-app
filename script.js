"use strict";

const apiKey = "ba2d820f506da082e735942d2c070f94";

const main = document.getElementById("main");
const form = document.getElementById("formexact");
const search = document.getElementById("search");

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWheatherByLocation(city) {
  const resp = await fetch(url(city), {
    origin: "cors",
  });
  const respData = await resp.json();

  console.log(respData);

  addWheatherTopage(respData);
}

function addWheatherTopage(data) {
  const temp = KtoC(data.main.temp);
  const wheather = document.createElement("div");

  wheather.classList.add("wheather");

  wheather.innerHTML = `
  <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> 
  ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
  <small>${data.weather[0].main}</small>
    `;

  //cleanup

  main.innerHTML = "";
  main.appendChild(wheather);
}

// getWheatherByLocation("india");

function KtoC(K) {
  return Math.floor(K - 273.15);
}

// put your code here
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = search.value;

  if (city) {
    getWheatherByLocation(city);
  }
});
