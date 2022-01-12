//Dados da API
const api = {
  key: 'bd4b293360f99deb09eddb8c1d17bba6',
  base: 'https://api.openweathermap.org/data/2.5/',
  lang: 'pt_br',
  units: 'metric'
};

//Selecionando os valores do html
const city = document.querySelector('.city');
const date = document.querySelector('.date');
const container_img = document.querySelector('.container-img'); //não terá
const container_temp = document.querySelector('.container-temp');
const temp_number = document.querySelector('.container-temp div');
const temp_unit = document.querySelector('.container-temp span');
const weather_t = document.querySelector('.weather');
const search_input = document.querySelector('.form-control');
const search_button = document.querySelector('.btn');
const low_high = document.querySelector('.low-high');

//pesqquisando valor pelo campo button
search_button.addEventListener('click', function () {
  searchResults(search_input.value);
});
//pesqquisando valor pelo tecla enter
search_input.addEventListener('keypress', enter);
function enter(event) {
  key = event.keyCode;
  if (key === 13) {
    searchResults(search_input.value);
  }
}

//resultados da pesquisa
function searchResults(city) {
  fetch(
    `${api.base}weather?q=${city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(`http error: status ${response.status}`); //mensagem de erro alternativa para o resonse
      }
      return response.json();
    })
    .catch(error => {
      //alert para ser ativado quando houver o erro
      alert(error.message);
    })
    .then(response => {
      displayResults(response);
    });
}

//function inserir os dados no card
function displayResults(weather) {
  //inserindo informações no card
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  date.innerText = dateBuilder(now);

  let iconName = weather.weather[0].icon;
  container_img.innerHTML = `<img src="./icons/${iconName}.png">`;

  let temperature = `${Math.round(weather.main.temp)}`;
  temp_number.innerHTML = temperature;
  temp_unit.innerHTML = `°c`;

  weather_tempo = weather.weather[0].description;
  weather_t.innerText = capitalizeFirstLetter(weather_tempo);

  low_high.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`;
}

// Criando function para definir o Dia da semana e o mês
function dateBuilder(d) {
  //declarando arrays
  let days = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
  ];
  let months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];

  //usando as functions get Day, Date,  Month e FullYear
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  //retorna data formatada
  return `${day}, ${date} de ${month} de ${year}`;
}
