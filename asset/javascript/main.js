async function fetchAPI(url) {
  try {
    const response = await fetch(url);

    // Kiểm tra mã trạng thái
    if (!response.ok) {
      // Tạo lỗi với thông tin chi tiết
      return null;
    }

    const data = await response.json();
    console.log(url);
    return data;
  } catch (error) {
    // Hiển thị thông báo lỗi khi xảy ra lỗi
    confirm(`Fetch failed: ${error.message}`);
    return null;
  }
}
let checkDay = 1;
let day = `transparent`;
let night = `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8))`;
const APIKey = "db56dab392f74dd09c7110432241012";
const weatherLocation = document.querySelector(".inner__adrress strong");
const currentTime = document.querySelector(".inner__time");
const weatherPredict = document.querySelector(".inner__predict");
const wind = document.querySelector(".inner__windSpeed p");
const visible = document.querySelector(".inner__visibleDistant p");
const humidity = document.querySelector(".inner__humidity p");
const currTemp = document.querySelector("#temperature");
const searchBtn = document.querySelector("#search");
const warmBtn = document.querySelector("#warmClick");
const menuBtn = document.querySelector("#menu");
const divContent = document.querySelector(".inner__content");
const divTemp = document.querySelector(".inner__temperature");
const divIcon = document.querySelector(".inner__icon");
const closeModal = document.querySelector("#close-modal");
const Modal = document.querySelector(".modal");
const bigBackground = document.querySelector(".wrap");
const divAbout = document.querySelectorAll(".inner__about div");
console.log(divAbout);
const smallBackground = document.querySelector(".inner__wrap");
console.log(Modal);

const searchInput = document.querySelector("#searchInput");
closeModal.addEventListener("click", () => {
  Modal.style.display = "none";
  searchInput.value = "";
});

divContent.addEventListener("click", () => {
  if (!divContent.classList.contains("rotate")) {
    divContent.classList.add("rotate");
    setTimeout(() => {
      divTemp.classList.toggle("hide");
      divIcon.classList.toggle("hide");
    }, 900);
    setTimeout(() => {
      divContent.classList.remove("rotate");
    }, 2000);
  }
});
function openSearch() {
  if (searchInput.classList.contains("showInput")) {
    if (searchInput.value.trim() === "") {
      if (!checkDay) {
        searchBtn.style.color = "white";
      }
      searchInput.classList.remove("showInput");
      MakebtnShake();
      searchBtn.style.right = "calc(100% - 25px)";
      setTimeout(() => {
        menuBtn.classList.remove("hide");
      }, 500);
      return;
    } else {
      buidWeather(
        `https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${searchInput.value}`
      );
    }
  } else {
    if (!checkDay) {
      searchBtn.style.color = "black";
    }
    searchInput.focus();
    menuBtn.classList.add("hide");
    searchBtn.style.right = "0";
    searchInput.value = "";
    searchInput.classList.add("showInput");
    clearInterval(btnShake);
    return;
  }
}
searchBtn.addEventListener("click", () => {
  openSearch();
});
let btnShake;
function MakebtnShake() {
  btnShake = setInterval(() => {
    searchBtn.classList.toggle("shake");
  }, 1000);
}
console.log(divIcon);
MakebtnShake();
async function buidWeather(url) {
  const weather = await fetchAPI(url);
  if (weather === null) {
    Modal.style.display = "block";
    return;
  }
  console.log(weather);
  weatherLocation.textContent = `${weather.location.name}, ${weather.location.country}`;
  currTemp.textContent = `${weather.current.temp_c}`;

  // console.log(weather.current.condition.icon);
  checkDay = weather.current.is_day;
  changeBackground(weather.current.temp_c, weather.current.condition.text);
  if (!weather.current.is_day) {
    nightMode();
  } else {
    dayMode();
  }
  divIcon.querySelector("img").src = weather.current.condition.icon;
  currentTime.textContent = getDate(weather.location.localtime);
  weatherPredict.textContent = weather.current.condition.text;
  wind.textContent = `${weather.current.wind_kph} (km/h)`;
  visible.textContent = `${weather.current.vis_miles} (m)`;
  humidity.textContent = `${weather.current.humidity} (%)`;
  searchInput.value = "";
  openSearch();
}
function getDate(localtime) {
  const date = new Date();
  let res = ``;
  if (checkDay) {
    res += "Day, ";
  } else {
    res += "Night, ";
  }
  res += `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, `;
  let len = localtime.length;
  res += localtime.substring(len - 5);
  return res;
}
let weather = [
  `asset/img/rain.png`,
  `asset/img/snow.png`,
  `asset/img/mist.png`,
  `asset/img/fog.png`,
  `asset/img/clear.png`,
  `asset/img/overcast.png`,
  `asset/img/hot.png`,
  `asset/img/warm.png`,
  `asset/img/cold.png`,
];

function changeBackground(temperature, text) {
  text = text.toLowerCase();

  // Function to set background
  const setBackground = (url) => {
    console.log(url);
    const background = `${
      checkDay === 1 ? day : night + ","
    } url(${url}) no-repeat center/cover`;
    console.log(background);
    bigBackground.style.background = background;
    smallBackground.style.background = background;
  };

  // Map weather conditions to corresponding backgrounds
  const weatherMap = {
    rain: weather[0],
    snow: weather[1],
    mist: weather[2],
    fog: weather[3],
    clear: weather[4],
    cloudy: weather[4],
    overcast: weather[5],
    sunny: weather[6],
    hot: weather[6],
    warm: weather[7],
    cold: weather[8],
  };

  // Check weather conditions
  for (const condition in weatherMap) {
    if (text.includes(condition)) {
      setBackground(weatherMap[condition]);
      return;
    }
  }

  // Temperature-based backgrounds
  if (temperature >= 35) {
    setBackground(weather[6]);
  } else if (temperature >= 20) {
    setBackground(weather[7]);
  } else {
    setBackground(weather[8]);
  }
}

function nightMode() {
  weatherLocation.style.color = "white";
  if (searchInput.classList.contains("showInput")) {
    searchBtn.style.color = "black";
  } else {
    searchBtn.style.color = "white";
  }
  menuBtn.style.color = "white";
  currentTime.style.color = "white";
  weatherPredict.style.color = "white";
  searchInput.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  divContent.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  divAbout.forEach((item) => {
    item.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  });
}
function dayMode() {
  searchBtn.style.color = "black";
  menuBtn.style.color = "black";
  weatherLocation.style.color = "black";
  currentTime.style.color = "black";
  weatherPredict.style.color = "black";
  searchInput.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
  divContent.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
  divAbout.forEach((item) => {
    item.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
  });
}
