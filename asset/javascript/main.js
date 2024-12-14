import {
  buidLocation,
  buidAstro,
  buidCurrent,
  buidAlert,
  buidForecast,
} from "./subMenu.js";
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

var closemodal = () => {
  console.log("close modal");
  Modal.style.display = "none";
  searchInput.value = "";
};
var weatherObject = null;
let checkDay = 1;
let numsForcastDay = 2;
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
const closeModal2 = document.querySelector(".btn-close");
const Modal = document.querySelector(".modal");
const bigBackground = document.querySelector(".wrap");
const divAbout = document.querySelectorAll(".inner__about div");
const divFog = document.querySelector(".inner__fog");
const smallBackground = document.querySelector(".inner__wrap");
const searchInput = document.querySelector("#searchInput");
const subMenu = document.querySelector(".sub__menu");
const mainMenu = document.querySelector(".main__menu");
const closeMenuBtn = document.querySelector(".close__menu--btn");

closeModal.addEventListener("click", () => {
  closemodal();
});
closeModal2.addEventListener("click", () => {
  closemodal();
});
closeMenuBtn.addEventListener("click", () => {
  mainMenu.classList.remove("show-menu");
  setTimeout(() => {
    subMenu.classList.add("hide");
  }, 300);
});
subMenu.addEventListener("click", (event) => {
  if (event.target === subMenu) {
    mainMenu.classList.remove("show-menu");
    setTimeout(() => {
      subMenu.classList.add("hide");
    }, 300);
  }
});

menuBtn.addEventListener("click", () => {
  if (subMenu.classList.contains("hide")) {
    subMenu.classList.remove("hide");
    setTimeout(() => {
      mainMenu.classList.add("show-menu");
    }, 100);
  } else {
    mainMenu.classList.remove("show-menu");
    setTimeout(() => {
      subMenu.classList.add("hide");
    }, 300);
  }
});
function resetAbout() {
  divAbout.forEach((element) => {
    element.style.display = "block";
    element.classList.remove("bloss");
    divFog.classList.remove("open");
  });
}
divAbout.forEach((element) => {
  element.addEventListener("click", function () {
    if (this.classList.contains("bloss")) {
      divAbout.forEach((element) => {
        if (element != this) {
          element.style.display = "block";
        }
      });
      this.classList.remove("bloss");
      divFog.classList.remove("open");
    } else {
      divAbout.forEach((element) => {
        if (element != this) {
          element.style.display = "none";
        }
      });
      this.classList.add("bloss");
      divFog.classList.add("open");
    }
  });
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
        `https://api.weatherapi.com/v1/forecast.json?key=${APIKey}&q=${searchInput.value}&days=${numsForcastDay}&aqi=yes&alerts=yes`
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
function showModal(text) {
  Modal.style.display = "block";
  Modal.querySelector(".modal-body > p").textContent = text;
}

MakebtnShake();
async function buidWeather(url) {
  const weather = await fetchAPI(url);
  if (weather === null) {
    showModal("Cant find your city ! Try again !.");
    return;
  }
  weatherObject = weather;
  console.log(weatherObject);

  weatherLocation.textContent = `${weather.location.name}, ${weather.location.country}`;
  document.querySelector(
    ".locate__name"
  ).textContent = `${weather.location.name}, ${weather.location.country}`;
  currTemp.textContent = `${weather.current.temp_c}`;

  checkDay = weather.current.is_day;
  changeBackground(weather.current.temp_c, weather.current.condition.text);
  if (!weather.current.is_day) {
    nightMode();
  } else {
    dayMode();
  }
  divIcon.querySelector("img").src = weather.current.condition.icon;
  document.querySelector(".sub__menu--decor img").src =
    weather.current.condition.icon;
  currentTime.textContent = getDate(weather.location.localtime);
  weatherPredict.textContent = weather.current.condition.text;
  wind.textContent = `${weather.current.wind_kph} (km/h)`;
  visible.textContent = `${weather.current.vis_miles} (m)`;
  humidity.textContent = `${weather.current.humidity} (%)`;
  searchInput.value = "";
  resetAbout();
  openSearch();
  buidLocation(weatherObject);
  buidAstro(weatherObject.forecast.forecastday);
  buidCurrent(weatherObject);
  buidAlert(weatherObject);
  buidForecast(weatherObject);
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
  `asset/img/storm.png`,
  `asset/img/clear.png`,
  `asset/img/cloud.png`,
  `asset/img/overcast.png`,
  `asset/img/hot.png`,
  `asset/img/warm.png`,
  `asset/img/cold.png`,
];

function changeBackground(temperature, text) {
  text = text.toLowerCase();

  // Function to set background
  const setBackground = (url) => {
    const background = `${
      checkDay === 1 ? day : night + ","
    } url(${url}) no-repeat center/cover`;

    bigBackground.style.background = background;
    smallBackground.style.background = background;
  };

  // Map weather conditions to corresponding backgrounds
  const weatherMap = {
    rain: weather[0],
    snow: weather[1],
    mist: weather[2],
    fog: weather[3],
    storm: weather[4],
    clear: weather[5],
    cloudy: weather[6],
    overcast: weather[7],
    sunny: weather[9],
    hot: weather[8],
    warm: weather[9],
    cold: weather[10],
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

const closeMenuInfor = document.querySelector(".close__subMenu--infor");

closeMenuInfor.addEventListener("click", () => {
  parentSlide.style.display = "none";
});
const tranSlide = document.querySelector(".slide-block");
const parentSlide = document.querySelector(".inner__subMenu--infor");
const allDivInfor = document.querySelectorAll(".main__menu > ul > li");
allDivInfor.forEach((item, index) => {
  if (index < allDivInfor.length - 1) {
    item.addEventListener("click", () => {
      if (weatherObject !== null) {
        tranSlide.style.transform = `translateX(${-100 * index}%)`;
        parentSlide.style.display = "block";
      } else {
        showModal("Please search for a city first!");
      }
    });
  } else {
  }
});
