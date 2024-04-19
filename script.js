// user should be able to search for a specific location
// user should be able to toggle displaying data in Fahrenheit or Celcius

// background should change based on the data: color of background changes based on weather
// bonus: use Giphy API to find appropriate weather related gif

const button = document.getElementById('btn');
let input = document.getElementById('location');
let temp = document.querySelector('.temp'); //where temp will be displayed

button.addEventListener('click', async function(){
    let location = input.value;
    const url = `http://api.weatherapi.com/v1/forecast.json?key=ae6aaba6a219490dbba52518241904&q=${location}&days=1&aqi=no&alerts=no`;
    const data = await fetchData(url);

    if (data){
        temp.textContent = `${data.current.temp_c} °C`;
    }
});

async function fetchData(url){
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error){
        console.error('Error:', error);
    }
};