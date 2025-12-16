// traer la info de la API https://restcountries.com/v3.1/all?fields=name,flags,car,population,capital
// Ponerlas en pantalla name, flag, car
// ordenar por nombre sort()
// al clicar saldra la info por encima de todo
// boton para cerrar el flotante
//todo funcione

const countriesList = document.getElementById("countries-list")
const info = document.getElementById("info")


async function getCountries () {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,car,population,capital")
        const data = await response.json()
        sortedCountries(data)
        return data        
    } catch (err) {
        console.log(err)
    } 
}

function sortedCountries (countries) {
    countries.sort ((a,b) => {
        const nameA =a.name.common.toUpperCase()
        const nameB =b.name.common.toUpperCase()
        return nameA.localeCompare(nameB, "es")
    })
}

getCountries().then(countries => {
    const allCountries = countries.map(country => {
        const {flags, name:{common}} = country
        const template = `
        <li class="card">
          <h2>${common}</h2>
          <img src ="${flags.png}" alt="${flags.alt}"/>        
        </li>
        
        `
        return template        
    }).join("")
    countriesList.innerHTML = allCountries

    const cards = document.querySelectorAll(".card")

    cards.forEach((card, i) =>{
        card.addEventListener("click", () => {
            info.classList.add("visible")
            const country = countries[i]
            const {flags, name:{common}, population, car, capital} = country         
            
            const template = `
            <section class="info-country">
            <div class="info-container">
            <div class="closed" id="closed">X</div>
              <h2>${common}</h2>
              <p>Capital: ${capital[0]}</p>
              <img src ="${flags.png}" alt="${flags.alt}"/>  
              <p>Población: ${population}</p>
              <p>Dirección del coche: ${car.side}</p>
            </div>
            </section>
            `
            info.innerHTML = template
        })
    })
    info.addEventListener("click", (e) => {
        if(e.target.classList.contains("closed")) {
            info.classList.remove("visible")
        }

    })
})

