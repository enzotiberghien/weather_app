// 5e7fb953e523d3bcf4b5abfb7340fe4b

const form = document.querySelector("form");
const input = form.querySelector("input");
const content = document.querySelector("#content");

const getData = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=5e7fb953e523d3bcf4b5abfb7340fe4b`)
    .then(response => {
        return response.json()
    }).then(response => {
        let data = {
            name: response.name,
            temperature: Math.round(response.main.temp - 273.15),
            weather: response.weather[0].main
        }

        console.log(data)
        console.log(response)

        let icon;
        if (data.weather === "Clouds") icon = "fa-solid fa-cloud";
        else if (data.weather === "Rain") icon = "fa-solid fa-cloud-showers-heavy"
        else icon = "fa-solid fa-sun";
        console.log(icon)

        content.insertAdjacentHTML("beforeend", `
        <div id="card">
            <div id="degree">${data.temperature}°C</div>
            <div id="icon"><i class="${icon}"></i></div>
            <div id="city">${data.name}</div>
            <div id="conversion-btn">Farenheit</div>
        </div>`)

        const btn = document.querySelector("#conversion-btn");
        const temp = document.querySelector("#degree");
        let celcius = true;
        btn.addEventListener("click", () => {
            if (celcius) {
                temp.textContent = `${Math.floor(data.temperature * 1.8 + 32)}°F`
                celcius = false;
                btn.textContent = "Celcius"
            } else {
                temp.textContent = `${Math.floor(data.temperature)}°C`
                celcius = true;
                btn.textContent = "Farenheit"
            }
        })
    })
}

const removeCard = () => {
    const card = document.querySelector("#card")
    if (card) card.remove()
}

form.addEventListener("submit", e => {
    e.preventDefault();
    removeCard()
    getData(input.value)
})