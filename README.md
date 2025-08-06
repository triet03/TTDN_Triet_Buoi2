<img width="417" height="459" alt="mc" src="https://github.com/user-attachments/assets/2868bdb8-f89e-4ee8-bcef-6bb60872524a" />

# 🗂️ Web Quản Lý Công Việc Cá Nhân

**Quản lý công việc cá nhân** là ứng dụng web hỗ trợ người dùng **tạo, theo dõi và sắp xếp các công việc hàng ngày** một cách trực quan và hiệu quả.  
Ứng dụng sử dụng giao diện chia cột (Trello-style), cho phép quản lý công việc theo các trạng thái:

- 📝 **Chưa làm**
- 🔄 **Đang làm**
- ✅ **Đã xong**

## ✨ Tính năng
- Thêm mới công việc với tiêu đề, mô tả, thời hạn và độ ưu tiên.
- Hiển thị công việc theo từng cột tương ứng với trạng thái.
- Kéo thả (drag & drop) để chuyển trạng thái (nếu sử dụng).
- Đánh dấu hoàn thành hoặc xoá công việc.
- Màu sắc thẻ thay đổi theo độ ưu tiên hoặc trạng thái giúp dễ nhận biết.

---

## 🛠️ Công nghệ sử dụng

### Frontend
- ⚛️ **ReactJS** – Thư viện xây dựng UI hiện đại, component-based.
- 🎨 **Material UI (MUI)** – Giao diện theo chuẩn Material Design.
- 🔄 **Axios** – Dùng để gửi request đến backend API.
- 🧩 **react-beautiful-dnd** – Hỗ trợ kéo thả các thẻ công việc (nếu dùng).

### Backend
- 🧱 **ASP.NET Core Web API** – Framework xây dựng RESTful API.
- 🗃️ **Entity Framework Core (EF Core)** – ORM để truy xuất và thao tác với cơ sở dữ liệu.

### Database
- 💾 **SQL Server** – Hệ quản trị cơ sở dữ liệu dùng để lưu trữ công việc, trạng thái, mô tả, thời hạn,...
