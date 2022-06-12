let weatherAPIkey = "db3e74234e90b3ab070f5a919843e508";

let city_search_input = document.querySelector("#city_search");
let search_btn = document.querySelector("#search_btn");

let city = "";

city_search_input.addEventListener("change", (e) => {
  let value = e.target.value;
  city = value;
});

search_btn.addEventListener("click", () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIkey}`
  )
    .then((respond) => respond.json())
    .then((data) => render(data));
});

function render(data) {
  let result = document.querySelector("#result");
  result.innerText = JSON.stringify(data, null, "  ");
}

//innerText vs innerHTML diferences
