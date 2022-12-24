const input = document.querySelector('#input');
const Get = document.querySelector('#btn');
const wrapper = document.querySelector('.wrapper');
function getCord() {
    const lat = navigator.geolocation.getCurrentPosition((position)=>console.log(position.coords.latitude));
    const lon = navigator.geolocation.getCurrentPosition((position)=>console.log(position.coords.longitude));
    var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
    var token = "e36400c272eaf38c2445eb7f172cc7201502dcf6";
    var query = { lat: `${latitude}`, lon: `${longitude}` };

    var options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify(query)
}

fetch(url, options)
.then(response => response.json())
.then(function(result){
    const mySity = (result.suggestions[1].value).substr(2);
    return mySity
})
.then(function(mySity) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${mySity}&appid=198a36c3dffb7625db8228ae676fb7e0`)
    .then(function (resp) {return resp.json()})
    .then(function (data) {
        let div = document.createElement('div');
        div.className = 'result';
        const temp = (data.main.temp)- 273.15;
        let temperature = document.createElement('h3');
        temperature.className = 'temp';
        temperature.innerHTML = `температура воздуха в ${mySity} равна ${Math.round(temp)}C, по ощущениям ${Math.round((data.main.feels_like)- 273.15)}C`
        wrapper.appendChild(div);
        div.appendChild(temperature)
    })
    .catch(function (){})
    
})
}
getCord();
Get.addEventListener('click', (event)=>{
    event.preventDefault();
    const sity = input.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${sity}&appid=198a36c3dffb7625db8228ae676fb7e0`)
    .then(function (resp) {return resp.json()})
    .then(function (data) {
        let div = document.createElement('div');
        div.className = 'result';
        const temp = (data.main.temp)- 273.15;
        let temperature = document.createElement('h3');
        temperature.className = 'temp';
        temperature.innerHTML = `температура воздуха в ${sity} равна ${Math.round(temp)}C, по ощущениям ${Math.round((data.main.feels_like)- 273.15)}C`
        wrapper.appendChild(div);
        div.appendChild(temperature)
        

    })
    .catch(function (){})
    
})

