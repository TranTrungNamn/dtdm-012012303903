# BÀI TẬP LỚN - ĐIỆN TOÁN ĐÁM MÂY (NHÓM 5)
### Môn học: `[012012303903] - Điện toán đám mây - CNS_CS1`

## Đề bài giáo viên
* **STT:** 5
* **Tên đề tài:** Triển khai ứng dụng PaaS bằng nền tảng cloud miễn phí
* **Mục tiêu:** Thực hành triển khai ứng dụng không cần quản trị hạ tầng sâu.
* **Vấn đề cần giải quyết:** Nhóm phát triển phần mềm nhỏ cần triển khai nhanh ứng dụng web/API.
* **Nội dung cần thực hiện:** Xây dựng ứng dụng Node.js/Python/Java đơn giản; triển khai lên Render, Railway, Google App Engine hoặc Heroku-like platform; cấu hình biến môi trường; kiểm thử; đánh giá lợi ích của PaaS.

---

Sẽ sử dụng Render

---

## Chi tiết triển khai & Tính năng dự án
* **Nền tảng Cloud (PaaS):** [Render](https://render.com/)
* **Môi trường & Công nghệ:** Node.js, Express, HTML5, CSS3 Glassmorphism, JavaScript ES6+.
* **Các tính năng trên Web Portal:**
  - **Tra cứu Cung Hoàng Đạo & Can Chi:** Tính toán ngày sinh, xác định cung hoàng đạo phương Tây và con giáp / thiên can địa chi phương Đông.
  - **Danh bạ người dùng ngẫu nhiên (Random User Gallery):** Gọi API lấy danh sách người dùng ngẫu nhiên kèm avatar và thông tin chi tiết.
  - **Đăng ký thông tin cư trú công dân:** Form nhập liệu địa chỉ động nhiều cấp (Tỉnh/Thành phố ➔ Quận/Huyện ➔ Phường/Xã) qua API hành chính.
  - **Dự báo thời tiết (Mini Weather App):** Tra cứu thời tiết các thành phố qua OpenWeatherMap API với cơ chế proxy backend bảo mật API key.
* **Bảo mật & Tối ưu:**
  - Giấu toàn bộ API Key và cấu hình nhạy cảm qua biến môi trường (`.env`).
  - Kiểm tra trạng thái hệ thống qua endpoint `/api/health`.
  - Tự động hóa quá trình deploy (CI/CD) liên tục từ **GitLab** lên **Render**.

---

## Thành viên nhóm 5👥
| STT | Họ và tên | Mã sinh viên |
|:---:|:---|:---:|
| 1 | **Trần Trung Nam** | 087205007981 |
| 2 | **Trần Xuân Phát** | 040205008154 |
| 3 | **Trương Quang Huy** | 079205013084 |

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
