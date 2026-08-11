const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API kiểm tra server
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    app: process.env.APP_NAME || "Cloud API Portal",
    environment: process.env.NODE_ENV || process.env.APP_ENV || "development",
    platform: process.env.RENDER ? "Render" : "Local"
  });
});

// API thời tiết
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "Vui lòng nhập tên thành phố" });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server chưa cấu hình OPENWEATHER_API_KEY" });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=vi`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ error: "Không tìm thấy thành phố" });
      }
      return res.status(502).json({ error: "Không lấy được dữ liệu thời tiết" });
    }

    const data = await response.json();
    res.json({
      city: data.name,
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      windKmh: Math.round(data.wind.speed * 3.6),
      description: data.weather?.[0]?.description || "",
      icon: data.weather?.[0]?.icon || null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi máy chủ" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
