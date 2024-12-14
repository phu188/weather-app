function getDate(localtime) {
  let curr1 = localtime.substring(0, 10);
  let curr2 = localtime.substring(10);
  let res = ``;
  res += `${curr1.substring(curr1.length - 2)}/${
    curr1[5] + curr1[6]
  }/${curr1.substring(0, 4)} `;
  res += curr2;
  return res;
}
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
            <li><strong>Localtime:</strong> ${getDate(
              O.location.localtime
            )}</li>
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
          <h1>Today: ${getDate(O[0].date)}</h1>
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
          <h1>Tomorrow: ${getDate(O[1].date)}</h1>
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
            <li><strong>last_updated:</strong> ${getDate(
              O.current.last_updated
            )}</li>
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
export function buidAlert(O) {
  const divLocation = document.querySelector("#MS4");
  let htmls = "";
  htmls += `<h1>
  <i class="fa-solid fa-triangle-exclamation" style="color: red"></i>
  ALERT
  </h1>
  `;
  if (O.alerts.alert.length === 0) {
    htmls += `<h1><i style="color: yellow" class="fa-solid fa-circle-exclamation"></i>No Alerts</h1>`;
    divLocation.innerHTML = htmls;

    return;
  }
  O.alerts.alert.forEach((element, index) => {
    htmls += `
          <h1>
            <i style="color: yellow" class="fa-solid fa-circle-exclamation"></i
            >Alert ${index + 1}
          </h1>
          <ul>
            <li><strong>headline:</strong> ${
              element.headline === "" ? "Unknow" : element.headline
            }</li>
            <li><strong>msgtype:</strong> ${
              element.msgtype === "" ? "Unknow" : element.msgtype
            }</li>
            <li><strong>severity:</strong> ${
              element.severity === "" ? "Unknow" : element.severity
            }</li>
            <li><strong>urgency:</strong> ${
              element.urgency === "" ? "Unknow" : element.urgency
            }</li>
            <li><strong>areas:</strong> ${
              element.areas === "" ? "Unknow" : element.areas
            }</li>
            <li><strong>category:</strong> ${
              element.category === "" ? "Unknow" : element.category
            }</li>
            <li><strong>certainty:</strong> ${
              element.certainty === "" ? "Unknow" : element.certainty
            }</li>
            <li><strong>event:</strong> ${
              element.event === "" ? "No Event" : element.event
            }</li>
            <li><strong>note:</strong> ${
              element.note === "" ? "No note" : element.note
            }</li>
            <li><strong>effective:</strong> ${
              element.effective === "" ? "Unknow" : getDate(element.effective)
            }</li>
            <li><strong>expires:</strong> ${
              element.expires === "" ? "Unknow" : getDate(element.expires)
            }</li>
            <li><strong>description:</strong> ${
              element.desc === "" ? "No Description" : element.desc
            }</li>
            <li><strong>instruction:</strong> ${
              element.instruction === ""
                ? "No instruction"
                : element.instruction
            }</li>
          </ul>
    `;
    console.log(typeof element.effective);
    console.log(element.expires);
  });
  divLocation.innerHTML = htmls;
}
export function buidForecast(object) {
  const divLocation = document.querySelector("#MS5");
  let currHour = object.location.localtime;
  console.log(currHour);
  currHour = currHour.substring(currHour.length - 5);
  currHour = currHour.substring(0, 2);
  let hourObject = [];
  currHour = Number(currHour);
  for (let i = currHour; i < object.forecast.forecastday[0].hour.length; ++i) {
    hourObject.push(object.forecast.forecastday[0].hour[i]);
  }
  let cnt = hourObject.length;
  for (let i = 0; i < object.forecast.forecastday[1].hour.length; ++i) {
    cnt++;
    if (cnt > 24) {
      break;
    }
    hourObject.push(object.forecast.forecastday[1].hour[i]);
  }
  console.log(hourObject);

  let htmls = "";
  htmls += `
          <div class="bug__content__head">
            <div class="content__left">
              <strong>Now</strong>
              <div class="bug__content__desc">
                <h1>${hourObject[0].temp_c} °C</h1>
                <img src="${hourObject[0].condition.icon}" alt="" />
              </div>
              <p>Feel like: ${hourObject[0].feelslike_c} °C</p>
            </div>
            <div class="content__right">
              <strong>${hourObject[0].condition.text}</strong>
              <p>Rain ability: ${hourObject[0].chance_of_rain}%</p>
              <p>Humidity: ${hourObject[0].humidity}%</p>
              <p>Wind: ${hourObject[0].wind_kph} Km/h</p>
            </div>
          </div>
  
  `;
  htmls += `
        <div class="bug__content__body">
            <div class="overview__box">
              <ul>
                <li>Overview</li>
                
              </ul>
            <div class="wrap__box__weather">
  `;
  let html1 = "";
  hourObject.forEach((element, index) => {
    if (index > 0) {
      html1 += `
                <div class="box-weather">
                  <p>${element.time.substring(element.time.length - 5)}</p>
                  <p>${
                    element.chance_of_rain > 0
                      ? element.chance_of_rain + "%"
                      : ""
                  }</p>
                  <div class="body__wether-img">
                    <img src="${element.condition.icon}" alt="" />
                  </div>
                  <strong>${element.temp_c} °C</strong>
                </div>
      
      `;
    } else {
      html1 += `
                <div class="box-weather">
                  <p>Now</p>
                  <p>${
                    element.chance_of_rain > 0
                      ? element.chance_of_rain + "%"
                      : ""
                  }</p>
                  <div class="body__wether-img">
                    <img src="${element.condition.icon}" alt="" />
                  </div>
                  <strong>${element.temp_c} °C</strong>
                </div>
      `;
    }
  });
  htmls += html1;
  htmls += `
              </div>
            </div>
            <div class="Wind__box">
              <ul>
                <li>Wind</li>
                <p>Highest wind speed today ${object.forecast.forecastday[0].day.maxwind_kph} Km/h</p>
              </ul>
              <div class="wrap__box__weather">
    `;
  let html2 = "";
  hourObject.forEach((element, index) => {
    if (index > 0) {
      html2 += `
                <div class="box-weather">
                  <p>${element.time.substring(element.time.length - 5)}</p>
                  <strong>${element.wind_dir}</strong>
                  <p>${element.wind_kph}</p>
                </div>
        `;
    } else {
      html2 += `
                <div class="box-weather">
                  <p>Now</p>
                  <strong>${element.wind_dir}</strong>
                  <p>${element.wind_kph}</p>
                </div>
        `;
    }
  });
  htmls += html2;
  htmls += `
              </div>
            </div>
            <div class="Humidity__box">
              <ul>
                <li>Humidity</li>
                <p>Medium humidity ${object.forecast.forecastday[0].day.avghumidity}%</p>
              </ul>
              <div class="wrap__box__weather">
    `;

  let html3 = "";
  hourObject.forEach((element, index) => {
    if (index > 0) {
      html3 += `
                <div class="box-weather">
                  <p>${element.time.substring(element.time.length - 5)}</p>
                  <strong>${element.humidity}%</strong>
                </div>
        `;
    } else {
      html3 += `
                <div class="box-weather">
                  <p>Now</p>
                  <strong>${element.humidity}%</strong>
                </div>
        `;
    }
  });
  htmls += html3;
  htmls += `
                </div>
            </div>
          </div>
    `;
  console.log(htmls);
  divLocation.innerHTML = htmls;
}
