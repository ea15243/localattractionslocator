let weatherAPIkey = "db3e74234e90b3ab070f5a919843e508";
let countriesAPIkey = "328d5a3aaa25e85506ef8faa8dbdf791";

let city_search_input = document.querySelector("#city_search");
let search_btn = document.querySelector("#search_btn");

let city = "";

city_search_input.addEventListener("change", (e) => {
  let value = e.target.value;
  city = value;
});

search_btn.addEventListener("click", async () => {
  let respond = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIkey}&units=imperial`
  );
  let data = await respond.json();
  console.log(data);
  // let city = data.name;
  // let min = data.main.temp_min;
  // let max = data.main.temp_max;
  let lat = data.coord.lat;
  let long = data.coord.lon;
  let country = data.sys.country;
  fetch(
    `http://api.countrylayer.com/v2/alpha/${country}?access_key=${countriesAPIkey}`
  )
    .then((respond) => respond.json())
    .then((city_data) => {
      console.log(city_data);
      render(data, city_data);
    });
  let url = "https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?";
  const options = {
    method: "GET",
    url: "https://opentripmap-places-v1.p.rapidapi.com/en/places/radius",
    params: { radius: "500", lon: "38.364285", lat: "59.855685" },
    headers: {
      "X-RapidAPI-Key": "b46d25f85fmsh2f7a49052766833p146f44jsn3eb88f65d627",
      "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
    },
  };
  fetch(options)
    .then((respond) => respond.json())
    .then((city_data) => {
      console.log(city_data);
    });
});

function render(data, city) {
  let result = document.querySelector("#result");
  result.innerHTML = `
  <div class='box'>
    <div class="weathercon"></div>
    <div class="info">
      <h2 class="location">${data.name}</h2>
      <p class="date">${city.name} | ${city.region}</p>
      <h1 class="temp">${data.main.temp_min} &deg;F | ${data.main.temp_max} &deg;F</h1>
    </div>
  </div>
`;
  //result.innerText = JSON.stringify(data, null, "  ");
}

//innerText vs innerHTML diferences
