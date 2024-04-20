// user should be able to search for a specific location
// user should be able to toggle displaying data in Fahrenheit or Celcius

// background should change based on the data: color of background changes based on weather
// bonus: use Giphy API to find appropriate weather related gif

//IIFE setup function
(function () {
    const button = document.getElementById('btn');
    const input = document.getElementById('location');
    const tempBtn = document.getElementById('converter');

    let temp = document.querySelector('.temp'); //where temp will be displayed
    let conditions = document.querySelector('.conditions'); //where weather conditions will be displayed
    let conditionImage = document.querySelector('.conditionImage'); //where weather icon will be displayed
    let feelsLike = document.querySelector('.feelsLike'); //where feels like temp will be displayed
    let rainChance = document.querySelector('.rainChance'); //where rain chance will be displayed
    let tempUnit = 'C';
    let isCelcius = true;

    //toggle between F and C
    tempBtn.addEventListener('click', async function(){        
        if (isCelcius){
            tempUnit = 'F';
            isCelcius = false;
        } else {
            tempUnit = 'C';
            isCelcius = true;
        }
        await updateTemperature();
    });

    //fetch data from weather API
    async function updateTemperature(){
        let location = input.value;
        const url = `http://api.weatherapi.com/v1/forecast.json?key=ae6aaba6a219490dbba52518241904&q=${location}&days=1&aqi=no&alerts=no`;
        const data = await fetchData(url);
    
        if (data && (tempUnit === 'C')){
            temp.textContent = `${data.current.temp_c} °${tempUnit}`;
            feelsLike.textContent = `Feels like: ${data.current.feelslike_c} °${tempUnit}`;

            //change background color based on weather
            if (data.current.temp_c < 10){
                document.body.style.backgroundColor = '#B3C4F8';
            } else if (data.current.temp_c >= 10 && data.current.temp_c < 20){
                document.body.style.backgroundColor = '#FDF2C7';
            } else if (data.current.temp_c >= 20 && data.current.temp_c < 30){
                document.body.style.backgroundColor = '#F5BF9F';
            } else {
                document.body.style.backgroundColor = '#E6836C';
            }
        } else if (data && (tempUnit === 'F')){
            temp.textContent = `${data.current.temp_f} °${tempUnit}`;
            feelsLike.textContent = `Feels like: ${data.current.feelslike_f} °${tempUnit}`;

            if (data.current.temp_f < 50){
                document.body.style.backgroundColor = '#B3C4F8';
            } else if (data.current.temp_f >= 50 && data.current.temp_f < 68){
                document.body.style.backgroundColor = '#FDF2C7';
            } else if (data.current.temp_f >= 68 && data.current.temp_f < 86){
                document.body.style.backgroundColor = '#F5BF9F';
            }  else {
                document.body.style.backgroundColor = '#E6836C';
            }
        }
        else {
            temp.textContent = 'Location not found';
        }
        conditions.textContent = `${data.current.condition.text} in ${data.location.name}, ${data.location.country}`;
        rainChance.textContent = `Chance of rain: ${data.current.precip_mm} mm`;
        conditionImage.src = `https:${data.current.condition.icon}`;

    }

    //event listener for search button, also calls updateTemperature function
    button.addEventListener('click', updateTemperature);
})();

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
