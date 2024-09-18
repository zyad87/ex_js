document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('logOut').addEventListener('click', () => {
      localStorage.clear();
    });
  
    let nameArea = document.getElementById('nameStored');
    nameArea.innerText = `مرحبا: ${localStorage.getItem('name')} `;
  
    let city = document.getElementById('city');
  
    let temp = document.getElementById('temp');
    let humidity = document.getElementById('humidity');
    let lon = document.getElementById('lon');
    let lat = document.getElementById('lat');
  
    let url = `https://api.openweathermap.org/data/2.5/weather?q=Riyadh&appid=124912a31b59da0602a4a3eeb1377e4d`;
    async function fetchData(url) {
      let res = await fetch(url, { method: 'GET' });
      let data = await res.json();
      console.log(data);
  
      temp.innerText = data.main.temp;
      lat.innerText = data.coord.lat;
      lon.innerText = data.coord.lon;
      humidity.innerText = data.main.humidity;
      city.innerText = ' معلومات مدينة: ' + data.name ;
    }
    fetchData(url);
  
    let searchInput = document.getElementById('search');
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        let newUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=124912a31b59da0602a4a3eeb1377e4d`;
        fetchData(newUrl);
      }
    });
  });
  