let weatherAPIkey = "db3e74234e90b3ab070f5a919843e508";
let countriesAPIkey = "328d5a3aaa25e85506ef8faa8dbdf791";

let city_search_input = document.querySelector("#city_search");
let search_btn = document.querySelector("#search_btn");

let city = "";
let resultList = document.querySelector("#places");

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

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b46d25f85fmsh2f7a49052766833p146f44jsn3eb88f65d627",
      "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
    },
  };

  fetch(
    `https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=500&lon=${long}&lat=${lat}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      resultList.innerHTML = "";
      for (let item of response.features) {
        let data = item.properties;
        let $li = document.createElement("li");
        $li.classList.add("card");
        let $h3 = document.createElement("h3");
        $h3.textContent = data.name;
        let $p = document.createElement("p");
        $p.textContent = "Distance: " + data.dist;
        $li.appendChild($h3);
        $li.appendChild($p);
        resultList.appendChild($li);
      }
    })
    .catch((err) => console.error(err));
});

function render(data, city) {
  let result = document.querySelector("#result");
  result.classList.remove("fade");
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
