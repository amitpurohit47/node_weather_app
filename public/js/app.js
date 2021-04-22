console.log('app.js ');


const form = document.querySelector('form');
const handleForecast = (e) =>{
    e.preventDefault();
    const inp = document.querySelector('input');
    const forec = document.querySelector('.forecast');
    const errp = document.querySelector('.err');
    forec.textContent="Loading...";
    errp.textContent="";
    fetch('http://localhost:5000/weather?address='+inp.value)
    .then((res)=>{
        res.json()
        .then((data)=>{
            if(data.error){
                errp.textContent = data.error;
                forec.textContent = "";
                console.log(data.error);
            }else{
                forec.textContent=`The forecast for ${data.location} is `;
                errp.textContent = data.weather_forecast;
                console.table(data.address,data.location,data.weather_forecast);
            }
        })
        // console.log(res.json());
    })
}

form.addEventListener('submit',handleForecast)
