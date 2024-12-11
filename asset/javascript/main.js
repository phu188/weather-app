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
searchBtn.addEventListener("click", () => {
  if (searchInput.classList.contains("showInput")) {
    if (searchInput.value.trim() === "") {
      searchInput.classList.remove("showInput");
      MakebtnShake();
      searchBtn.style.right = "calc(100% - 25px)";
      setTimeout(() => {
        menuBtn.classList.remove("hide");
      }, 500);
      return;
    } else {
      buidWeather(
        `http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${searchInput.value}`
      );
    }
  } else {
    searchInput.focus();
    menuBtn.classList.add("hide");
    searchBtn.style.right = "0";
    searchInput.value = "";
    searchInput.classList.add("showInput");
    clearInterval(btnShake);
    return;
  }
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
  divIcon.querySelector("img").src = weather.current.condition.icon;
  currentTime.textContent = getDate(weather.location.localtime);
  weatherPredict.textContent = weather.current.condition.text;
  wind.textContent = `${weather.current.wind_kph} (km/h)`;
  visible.textContent = `${weather.current.vis_miles} (m)`;
  humidity.textContent = `${weather.current.humidity} (%)`;
  changeBackground(weather.current.temp_c, weather.current.condition.text);
  searchInput.value = "";
}
function getDate(localtime) {
  const date = new Date();
  let res = ``;
  res += `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, `;
  let len = localtime.length;
  res += localtime.substring(len - 5);
}
let weather = [
  `asset/img/rain.png`,
  `asset/img/mist.png`,
  `asset/img/clear.png`,
  `asset/img/hot.png`,
  `asset/img/warm.png`,
  `asset/img/cold.png`,
];
const bigBackground = document.querySelector(".wrap");
const smallBackground = document.querySelector(".inner__wrap");
console.log(bigBackground);
console.log(smallBackground);
function changeBackground(temperature, text) {
  text = text.toLowerCase();
  console.log(text);
  if (text.includes("rain")) {
    bigBackground.style.backgroundImage = `url(${weather[0]})`;
    smallBackground.style.backgroundImage = `url(${weather[0]})`;
    return;
  }
  if (text.includes("mist") || text.includes("fog")) {
    console.log("1");
    bigBackground.style.backgroundImage = `url(${weather[1]})`;
    smallBackground.style.backgroundImage = `url(${weather[1]})`;
    console.log(`url(${weather[1]})`);
    return;
  }
  if (text.includes("clear")) {
    bigBackground.style.backgroundImage = `url(${weather[2]})`;
    smallBackground.style.backgroundImage = `url(${weather[2]})`;
    return;
  }
  if (temperature >= 35) {
    bigBackground.style.backgroundImage = `url(${weather[3]})`;
    smallBackground.style.backgroundImage = `url(${weather[3]})`;
  } else if (temperature < 35 && temperature >= 20) {
    bigBackground.style.backgroundImage = `url(${weather[4]})`;
    smallBackground.style.backgroundImage = `url(${weather[4]})`;
  } else if (temperature < 10) {
    bigBackground.style.backgroundImage = `url(${weather[5]})`;
    smallBackground.style.backgroundImage = `url(${weather[5]})`;
  }
}
// buidWeather(`http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=hanoi`);
