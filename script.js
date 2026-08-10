// UI LOGIC (Tabs & Toasts)

function switchTab(index, tabId) {
  // Update buttons
  document.querySelectorAll(".tab-btn").forEach((btn, i) => {
    if (i === index) btn.classList.add("active");
    else btn.classList.remove("active");
  });

  // Move Slider
  const slider = document.getElementById("tabSlider");
  slider.style.left = `${index * 20}%`;

  // Show Content
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active");
  });
  document.getElementById(tabId).classList.add("active");

  // Lazy load for specific tabs
  if (
    tabId === "bai2" &&
    document.getElementById("userGrid").children.length <= 1
  ) {
    loadUsers();
  }
  if (
    tabId === "bai3" &&
    document.getElementById("provinceSelect").options.length <= 1
  ) {
    loadProvinces();
  }
}
// Toast Notification
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "fadeOutToast 0.5s forwards";
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// Bài 1
const thienCanArray = [
  "Canh",
  "Tân",
  "Nhâm",
  "Quý",
  "Giáp",
  "Ất",
  "Bính",
  "Đinh",
  "Mậu",
  "Kỷ",
];
const diaChiArray = [
  "Thân",
  "Dậu",
  "Tuất",
  "Hợi",
  "Tý",
  "Sửu",
  "Dần",
  "Mão",
  "Thìn",
  "Tỵ",
  "Ngọ",
  "Mùi",
];
// Mảng tọa độ đã tính toán chính xác theo kích thước 152px
const positions = [
  "-2px -2px",
  "-154px -2px",
  "-306px -2px",
  "-458px -2px", // Hàng 1
  "-2px -154px",
  "-154px -154px",
  "-306px -154px",
  "-458px -154px", // Hàng 2
  "-2px -306px",
  "-154px -306px",
  "-306px -306px",
  "-458px -306px", // Hàng 3
];

// Hàm nhập ngày tháng năm sinh và tính toán
function zodiacCalculator() {
  const dateVal = document.getElementById("dobInput").value;
  if (!dateVal) {
    showToast("Vui lòng chọn ngày sinh", "error");
    return;
  }

  const dateObj = new Date(dateVal);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  // --- 1. TÍNH CAN CHI (CON GIÁP) ---
  // Index từ 0 (Tý) đến 11 (Hợi)
  // Lịch Vạn Niên
  const chiIdx = (year - 4) % 12;
  const can = thienCanArray[year % 10];
  const chi = diaChiArray[chiIdx];
  const canchiStr = `Năm ${can} ${chi}`;

  // --- 2. TÍNH CUNG HOÀNG ĐẠO (PHƯƠNG TÂY) ---
  let zodiac = "";
  let img_zodiac = "";

  // Logic if/else hiện tại của bạn...
  if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
    zodiac = "Bạch Dương";
    img_zodiac = "./img/zodiac/_1_aries.jpg";
  } else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
    zodiac = "Kim Ngưu";
    img_zodiac = "./img/zodiac/_2_taurus_zodiac.jpg";
  } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
    zodiac = "Song Tử";
    img_zodiac = "./img/zodiac/_3_gemini.jpg";
  } else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) {
    zodiac = "Cự Giải";
    img_zodiac = "./img/zodiac/_4_cancer.jpg";
  } else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
    zodiac = "Sư Tử";
    img_zodiac = "./img/zodiac/_5_leo.jpg";
  } else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
    zodiac = "Xử Nữ";
    img_zodiac = "./img/zodiac/_6_virgo.jpg";
  } else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
    zodiac = "Thiên Bình";
    img_zodiac = "./img/zodiac/_7_libra.jpg";
  } else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) {
    zodiac = "Thiên Yết";
    img_zodiac = "./img/zodiac/_8_scorpio.jpg";
  } else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
    zodiac = "Nhân Mã";
    img_zodiac = "./img/zodiac/_9_sagittarius.jpg";
  } else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) {
    zodiac = "Ma Kết";
    img_zodiac = "./img/zodiac/_10_capricorn.jpg";
  } else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
    zodiac = "Bảo Bình";
    img_zodiac = "./img/zodiac/_11_aquarius.jpg";
  } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
    zodiac = "Song Ngư";
    img_zodiac = "./img/zodiac/_12_pisces.jpg";
  }

  // 3. Hiển thị vào DOM
  document.getElementById("zodiacName").innerText = zodiac;

  // Hiển thị ảnh Hoàng đạo
  document.getElementById("zodiacIllustration").innerHTML =
    `<img src="${img_zodiac}" alt="${zodiac}" class="zodiac-img" />`;

  // Hiển thị Con giáp (CSS Sprites)
  document.getElementById("canchiText").innerText = canchiStr;
  document.getElementById("chineseIllustration").innerHTML =
    `<div class="zodiac-chinese-img" style="background-position: ${positions[chiIdx]};"></div>`;

  document.getElementById("zodiacResult").style.display = "block";
  showToast("Tra cứu thành công", "success");
}

// Bài 2
// Gọi API (Fetch)
async function loadUsers() {
  // Tạo giao diện dạng lưới (Grid).
  const grid = document.getElementById("userGrid");
  grid.innerHTML =
    '<div style="grid-column: 1/-1; display: flex; justify-content: center; align-items: center; min-height: 250px;">Đang tải dữ liệu...</div>';
  try {
    // API: https://randomuser.me/api/?results=10 (Lấy 10 người dùng cùng lúc).
    const res = await fetch("https://randomuser.me/api/?results=10");
    const data = await res.json();

    const html = data.results
      /* Dùng vòng lặp forEach hoặc map để tạo các thẻ nhân viên bao gồm:
        Ảnh đại diện, Tên, Email, Quốc gia.
        */
      .map(
        (user) => `
                    <div class="user-card">
                        <img src="${user.picture.large}" alt="avatar">
                        <h4>${user.name.title} ${user.name.first} ${user.name.last}</h4>
                        <p>${user.email}</p>
                        <p>${user.location.country}</p>
                    </div>
                `,
      )
      .join("");

    grid.innerHTML = html;
  } catch (err) {
    showToast("Lỗi tải danh bạ", "error");
    grid.innerHTML = "<p>Không thể tải dữ liệu.</p>";
  }
}

// Bài 3
let locationData = [];
async function loadProvinces() {
  try {
    showToast("Đang tải dữ liệu tỉnh thành...", "waiting");
    const res = await fetch("https://provinces.open-api.vn/api/?depth=3");
    locationData = await res.json();

    const provSelect = document.getElementById("provinceSelect");
    locationData.forEach((prov) => {
      let opt = document.createElement("option");
      opt.value = prov.code;
      opt.innerText = prov.name;
      provSelect.appendChild(opt);
    });

    showToast("Đã tải xong dữ liệu cư trú!", "success");
  } catch (error) {
    showToast("Lỗi tải dữ liệu tỉnh thành", "error");
  }
}

function loadDistricts() {
  const provCode = document.getElementById("provinceSelect").value;
  const distSelect = document.getElementById("districtSelect");
  const wardSelect = document.getElementById("wardSelect");

  distSelect.innerHTML = '<option value="" disabled selected hidden></option>';
  wardSelect.innerHTML = '<option value="" disabled selected hidden></option>';
  wardSelect.disabled = true;

  const province = locationData.find((p) => p.code == provCode);
  if (province && province.districts) {
    province.districts.forEach((dist) => {
      let opt = document.createElement("option");
      opt.value = dist.code;
      opt.innerText = dist.name;
      distSelect.appendChild(opt);
    });
    distSelect.disabled = false;
  }
}

function loadWards() {
  const provCode = document.getElementById("provinceSelect").value;
  const distCode = document.getElementById("districtSelect").value;
  const wardSelect = document.getElementById("wardSelect");

  wardSelect.innerHTML = '<option value="" disabled selected hidden></option>';

  const province = locationData.find((p) => p.code == provCode);
  const district = province.districts.find((d) => d.code == distCode);

  if (district && district.wards) {
    district.wards.forEach((ward) => {
      let opt = document.createElement("option");
      opt.value = ward.code;
      opt.innerText = ward.name;
      wardSelect.appendChild(opt);
    });
    wardSelect.disabled = false;
  }
}

// BÀI 4: Thời tiết (Async/Await + Fetch + Try/Catch)
/*
  Mô tả bài toán: Thiết kế một ô nhập tên thành phố (ví dụ: "Hanoi", "Tokyo") và
  một nút bấm "Xem thời tiết". Khi người dùng bấm nút, ứng dụng sẽ thực hiện một
  yêu cầu AJAX ngầm (gọi Fetch API) đến một dịch vụ cung cấp dữ liệu thời tiết
  mở trực tuyến (Ví dụ: OpenWeatherMap API Weather API) để lấy về thông tin
  nhiệt độ, độ ẩm của thành phố đó dưới dạng dữ liệu JSON, sau đó hiển thị đẹp
  mắt ra màn hình bằng DOM. Yêu cầu xử lý lỗi mất mạng hoặc sai tên thành phố
  bằng khối lệnh try...catch.
*/

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    showToast("Vui lòng nhập tên thành phố", "error");
    return;
  }

  showToast("Đang tra cứu thời tiết...", "waiting");

  // --- TH1: (open weather api) ---
  try {
    const API_KEY = "8481a8dc5b906df58cc9473b06115f89";
    const owmUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=vi`;

    const resOWM = await fetch(owmUrl);

    if (!resOWM.ok) {
      throw new Error("OpenWeatherMap thất bại");
    }

    const data = await resOWM.json();

    document.getElementById("wCity").innerText = data.name;
    document.getElementById("wTemp").innerText =
      `${Math.round(data.main.temp)}°C`;
    document.getElementById("wHumidity").innerText = data.main.humidity;
    document.getElementById("wWind").innerText = Math.round(
      data.wind.speed * 3.6,
    );
    document.getElementById("wDesc").innerText = data.weather[0].description;

    const iconCode = data.weather[0].icon;
    document.getElementById("wIcon").src =
      `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById("wIcon").style.display = "block"; // Hiện icon

    document.getElementById("weatherResult").style.display = "block";
    showToast("Lấy dữ liệu thành công!", "success");
  } catch (errorOWM) {
    // --- TH2: Sử dụng Geocoding + Open Meteo ---
    console.warn("API chính lỗi, đang chuyển sang API dự phòng...", errorOWM);

    try {
      // 1. Dùng Geocoding để lấy Toạ độ
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`,
      );
      if (!geoRes.ok) throw new Error("Mất kết nối mạng");

      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("Sai tên thành phố. Không tìm thấy!");
      }

      const lat = geoData.results[0].latitude;
      const lon = geoData.results[0].longitude;
      const cityName = geoData.results[0].name;

      // 2. Dùng Weather API của Open-Meteo (Có gọi thêm tham số độ ẩm để khớp giao diện)
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`,
      );
      if (!weatherRes.ok)
        throw new Error("Lỗi tải thời tiết từ máy chủ dự phòng");

      const weatherData = await weatherRes.json();
      const current = weatherData.current;

      // 3. Hiển thị dữ liệu API dự phòng
      document.getElementById("wCity").innerText = cityName;
      // document.getElementById("wTemp").innerText = document.getElementById(
      //   "wDesc",
      // ).innerText = " ";
      `${Math.round(current.temperature_2m)}°C`;
      document.getElementById("wHumidity").innerText =
        current.relative_humidity_2m;
      document.getElementById("wWind").innerText = Math.round(
        current.wind_speed_10m,
      );

      // Ẩn icon vì Open-Meteo không có sẵn icon như OWM
      document.getElementById("wIcon").style.display = "none";

      document.getElementById("weatherResult").style.display = "block";
      showToast("Lấy dữ liệu thành công!", "success");
    } catch (errorMeteo) {
      showToast(errorMeteo.message, "error");
      document.getElementById("weatherResult").style.display = "none";
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("dobInput")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        zodiacCalculator();
      }
    });

  document
    .getElementById("cityInput")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        getWeather();
      }
    });
});
