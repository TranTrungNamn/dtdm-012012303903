# BÀI TẬP LỚN - ĐIỆN TOÁN ĐÁM MÂY (NHÓM 5)

### Môn học: `[012012303903] - Điện toán đám mây - CNS_CS1`

## Đề bài giáo viên

- **STT:** 5
- **Tên đề tài:** Triển khai ứng dụng PaaS bằng nền tảng cloud miễn phí
- **Mục tiêu:** Thực hành triển khai ứng dụng không cần quản trị hạ tầng sâu.
- **Vấn đề cần giải quyết:** Nhóm phát triển phần mềm nhỏ cần triển khai nhanh ứng dụng web/API.
- **Nội dung cần thực hiện:** Xây dựng ứng dụng Node.js/Python/Java đơn giản; triển khai lên Render, Railway, Google App Engine hoặc Heroku-like platform; cấu hình biến môi trường; kiểm thử; đánh giá lợi ích của PaaS.

---

Sẽ sử dụng Render

### 📋 Danh sách công việc cần thực hiện (Checklist)

- [x] **Xây dựng ứng dụng:**
  - [x] Thiết kế backend web service đơn giản bằng Node.js / Express.
  - [x] Xây dựng giao diện Frontend (Glassmorphism) và tích hợp các API chức năng.
- [x] **Quản lý cấu hình & Biến môi trường:**
  - [x] Thiết lập file `.env` và `.env.example` quản lý biến môi trường.
  - [x] Ẩn toàn bộ thông tin nhạy cảm khỏi kho mã nguồn Git qua `.gitignore`.
- [x] **Triển khai ứng dụng lên nền tảng Cloud PaaS:**
  - [x] Đẩy mã nguồn lên hệ thống quản lý phiên bản (GitHub & GitLab).
  - [x] Kết nối kho mã nguồn GitHub với nền tảng Cloud PaaS Render.
  - [x] Cấu hình Web Service, Build Command (`npm install`) và Start Command (`npm start`) trên Render.
  - [x] Thiết lập các biến môi trường trực tiếp trên bảng điều khiển Render Dashboard.
  - [x] Thiết lập quy trình CI/CD tự động build & test qua GitHub Actions (`.github/workflows/ci-cd.yml`).
- [x] **Kiểm thử ứng dụng (Testing):**
  - [x] Kiểm thử chức năng và giao diện người dùng trên trình duyệt (Local & Cloud).
  - [x] Viết bộ kịch bản kiểm thử tự động API bằng Postman Collection / Newman (`12/12 Assertions Passed`).
  - [x] Thực hiện kiểm thử endpoint `/api/health` và `/api/weather` (trường hợp thành công, thiếu tham số, không tìm thấy).
- [ ] **Đánh giá & Báo cáo:**
  - [ ] Đánh giá các lợi ích của mô hình PaaS (tốc độ triển khai, không cần quản trị server/hạ tầng, tự động hóa CI/CD, tiết kiệm chi phí).
  - [ ] Tổng hợp báo cáo và tài liệu hoàn chỉnh của bài tập lớn.

---

## Chi tiết triển khai & Tính năng dự án

- **Nền tảng Cloud (PaaS):** Render
- **Môi trường & Công nghệ:** Node.js, Express, HTML5, CSS3 Glassmorphism, JavaScript ES6+.
- **Các tính năng trên Web Portal:**
  - **Tra cứu Cung Hoàng Đạo & Can Chi:**
  - **Danh bạ người dùng ngẫu nhiên (Random User Gallery):**
    Gọi API lấy danh sách người dùng ngẫu nhiên kèm avatar và thông tin chi tiết.
  - **Đăng ký thông tin cư trú công dân:**
    Form nhập liệu địa chỉ động nhiều cấp qua API hành chính.
  - **Dự báo thời tiết (Mini Weather App):**
    Tra cứu thời tiết các thành phố qua OpenWeatherMap API.
- **Bảo mật & Tối ưu:**
  - Giấu toàn bộ API Key và cấu hình nhạy cảm qua biến môi trường (`.env`).
  - Kiểm tra trạng thái hệ thống qua endpoint `/api/health`.
  - Tự động hóa quá trình deploy (CI/CD) liên tục từ **GitLab** lên **Render**.

---

## Thành viên nhóm 5👥

| STT | Họ và tên            | Mã sinh viên |
| :-: | :------------------- | :----------: |
|  1  | **Trần Trung Nam**   | 087205007981 |
|  2  | **Trần Xuân Phát**   | 040205008154 |
|  3  | **Trương Quang Huy** | 079205013084 |

---

## Hướng dẫn khởi động (Local Env)

### 1. Cài đặt thư viện

```bash
npm install
```

### 2. Cấu hình biến môi trường

Tạo file `.env` từ `.env.example`:

```env
PORT=3000
APP_NAME=Cloud API Portal - Nhom 5
APP_ENV=development
OPENWEATHER_API_KEY=your_api_key_here
```

### 3. Khởi chạy ứng dụng

- **Chế độ phát triển (Auto Reload):**
  ```bash
  npm run dev
  ```
- **Chế độ chạy chuẩn (Production):**
  ```bash
  npm start
  ```
- Truy cập trình duyệt: `http://localhost:3000`
