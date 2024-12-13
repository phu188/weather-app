export function buidLocation(O) {
  const divLocation = document.querySelector("#MS1");
  let htmls = "";
  htmls += `
    <h1>
        <i class="fa-solid fa-location-dot" style="color: aqua"></i>
        LOCATION
    </h1>
          <ul>
            <li><strong>Name:</strong> ${O.location.name}</li>
            <li><strong>Region:</strong> ${O.location.region}</li>
            <li><strong>country:</strong> ${O.location.country}</li>
            <li><strong>Latitude:</strong> ${O.location.lat}</li>
            <li><strong>Longitude:</strong> ${O.location.lon}</li>
            <li><strong>Time zone name:</strong> ${O.location.tz_id}</li>
            <li><strong>Localtime:</strong> ${O.location.localtime}</li>
          </ul>
  
  
  `;
  divLocation.innerHTML = htmls;
}
export function buidAstro(O) {
  const divLocation = document.querySelector("#MS2");
  let htmls = "";
  htmls += `
    <h1>
            <i
              class="fa-solid fa-earth-americas"
              style="color: greenyellow"
            ></i>
            ASTRO
          </h1>
          <h1>Today: ${O[0].date}</h1>
          <ul>
            <li><strong>sunrise:</strong> ${O[0].astro.sunrise}</li>
            <li><strong>sunset:</strong> ${O[0].astro.sunset}</li>
            <li><strong>moonrise:</strong> ${O[0].astro.moonrise}</li>
            <li><strong>moonset:</strong> ${O[0].astro.moonset}</li>
            <li><strong>moon_phase:</strong> ${O[0].astro.moon_phase}</li>
            <li><strong>moon_illumination:</strong> ${
              O[0].astro.moon_illumination
            }</li>
            <li><strong>the ${
              O[0].astro.is_moon_up ? "moon" : "sun"
            } is: </strong> Up</li>
          </ul>
          <h1>Tomorrow: ${O[1].date}</h1>
          <ul>
            <li><strong>sunrise:</strong> ${O[1].astro.sunrise}</li>
            <li><strong>sunset:</strong> ${O[1].astro.sunset}</li>
            <li><strong>moonrise:</strong> ${O[1].astro.moonrise}</li>
            <li><strong>moonset:</strong> ${O[1].astro.moonset}</li>
            <li><strong>moon_phase:</strong> ${O[1].astro.moon_phase}</li>
            <li><strong>moon_illumination:</strong> ${
              O[1].astro.moon_illumination
            }</li>
            <li><strong>the ${
              O[1].astro.is_moon_up ? "moon" : "sun"
            } is: </strong> Up</li>
          </ul>
  
  
  `;
  divLocation.innerHTML = htmls;
}
export function buidCurrent(O) {
  const divLocation = document.querySelector("#MS3");
  let htmls = "";
  htmls += `
     <h1>
            <i class="fa-solid fa-hurricane" style="color: orange"></i>
            CURRENT
          </h1>

          <ul>
            <li><strong>last_updated:</strong> ${O.current.last_updated}</li>
            <li>
              <strong><sup>o</sup>C:</strong> ${O.current.temp_c}
            </li>
            <li>
              <strong><sup>o</sup>F:</strong> ${O.current.temp_f}
            </li>
            <li><strong>condition:</strong> ${O.current.condition.text}</li>
            <li><strong>wind (KPH):</strong> ${O.current.wind_kph} (KPH)</li>
            <li><strong>wind (MPH):</strong> ${O.current.wind_mph} (MPH)</li>
            <li><strong>wind direction:</strong> ${O.current.wind_dir}</li>
            <li><strong>humidity: </strong> ${O.current.humidity} (%)</li>
            <li><strong>visible (Km): </strong> ${O.current.vis_km} (Km)</li>
            <li><strong>visible (m): </strong> ${O.current.vis_miles} (m)</li>
            <li><strong>sun UV: </strong> ${O.current.uv}</li>
            <li>
              <strong
                >air quality:
                <ul style="font-size: 12px; margin-left: 20px">
                  <li>CO: ${O.current.air_quality.co}</li>
                  <li>NO2: ${O.current.air_quality.no2}</li>
                  <li>O3: ${O.current.air_quality.o3}</li>
                </ul>
              </strong>
            </li>
          </ul>
  
  
  `;
  divLocation.innerHTML = htmls;
}
