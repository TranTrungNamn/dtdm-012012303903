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
    platform: process.env.RENDER ? "Render" : "Local",
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
    return res
      .status(500)
      .json({ error: "Server chưa cấu hình OPENWEATHER_API_KEY" });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=vi`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ error: "Không tìm thấy thành phố" });
      }
      return res
        .status(502)
        .json({ error: "Không lấy được dữ liệu thời tiết" });
    }

    const data = await response.json();
    res.json({
      city: data.name,
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      windKmh: Math.round(data.wind.speed * 3.6),
      description: data.weather?.[0]?.description || "",
      icon: data.weather?.[0]?.icon || null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi máy chủ" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  const isRender = process.env.RENDER || process.env.NODE_ENV === "production";
  const env = process.env.NODE_ENV || "development";
  const appName = process.env.APP_NAME || "Cloud API Portal - Nhom 5";

  if (isRender) {
    // Log ngắn gọn, sạch đẹp chuẩn Cloud / Render
    console.log(`[PAAS - RENDER] 🚀 ${appName} is running on port ${PORT} (${env})`);
  } else {
    // Log dạng bảng đẹp mắt khi phát triển ở máy cá nhân (Local)
    const localUrl = `http://localhost:${PORT}`;
    const networkUrl = `http://0.0.0.0:${PORT}`;

    const rows = [
      ["Local URL", `\x1b[34m${localUrl}\x1b[0m`, localUrl],
      ["Network URL", `\x1b[34m${networkUrl}\x1b[0m`, networkUrl],
      ["Environment", `\x1b[33m${env}\x1b[0m`, env],
      ["Port", `\x1b[35m${PORT}\x1b[0m`, String(PORT)],
    ];

    const col1W = 14;
    const col2W = 32;
    const totalW = col1W + col2W + 3;

    const title = "BTL DIEN TOAN DAM MAY - NHOM 5";
    const titlePad = totalW - title.length;

    console.log("\n\x1b[36m┌" + "─".repeat(col1W + 2) + "┬" + "─".repeat(col2W + 2) + "┐\x1b[0m");
    console.log(`\x1b[36m│\x1b[0m \x1b[1m\x1b[32m${title}\x1b[0m` + " ".repeat(titlePad + 1) + "\x1b[36m│\x1b[0m");
    console.log("\x1b[36m├" + "─".repeat(col1W + 2) + "┼" + "─".repeat(col2W + 2) + "┤\x1b[0m");

    for (const [col1, col2Colored, col2Raw] of rows) {
      const p1 = " ".repeat(Math.max(0, col1W - col1.length));
      const p2 = " ".repeat(Math.max(0, col2W - col2Raw.length));
      console.log(`\x1b[36m│\x1b[0m \x1b[1m${col1}\x1b[0m${p1} \x1b[36m│\x1b[0m ${col2Colored}${p2} \x1b[36m│\x1b[0m`);
    }

    console.log("\x1b[36m└" + "─".repeat(col1W + 2) + "┴" + "─".repeat(col2W + 2) + "┘\x1b[0m\n");
  }
});
