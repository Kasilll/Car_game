const api = {
    key: "c75dcbd41b6e4342586d63d25534b94a",
    base: "http://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(e) {
    if (e.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
      .then(weather => {
        return weather.json();
      })
      .then((data) => {
        displayResults(data)
    })
        .catch(alert('Что-то пошло не так... Введите город еще раз'))
        
     
  }
  
  function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.textContent = `${weather.name}, ${weather.sys.country}`;
    
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.textContent = dateBuilder(now);
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)-273}<span>°c</span>`;
  
    let weather_el = document.querySelector('.current .weather');
    weather_el.textContent = weather.weather[0].main;
  
    let hilow = document.querySelector('.hi-low');
    hilow.textContent = `${Math.round(weather.main.temp_min)-273}°c / ${Math.round(weather.main.temp_max)-273}°c`;
  }
  
  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }