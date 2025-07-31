# CRM App (MVP)

Bu proje, temel CRM (Müşteri İlişkileri Yönetimi) fonksiyonlarını barındıran, kullanıcı ve rol tabanlı kimlik doğrulama sistemi ile geliştirilmiş tam yığın (full-stack) bir uygulamadır. **Node.js + Express (backend)** ve **(Frontend)** yapısıyla birlikte tek bir repoda organize edilmiştir.

## 🎯 Özellikler

- JWT ile kimlik doğrulama
- Rol tabanlı erişim kontrolü (`admin`, `sales`, `customer`)
- Kullanıcı kayıt ve giriş işlemleri
- Müşteri CRUD işlemleri (sadece yetkili kullanıcılar görebilir)
- MVC mimarisi ile modüler yapı

## 📁 Proje Yapısı

```
crm-app/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   └── .env
├── frontend/  (isteğe bağlı)
│   ├── public/
│   ├── src/
│   └── package.json
├── README.md
```

## 🔧 Teknolojiler

- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT)
- Bcrypt
- dotenv
- CORS

## 🚀 Kurulum

```bash
git clone https://github.com/mkaragoz01/crm-app.git
cd crm-app/backend
npm install
```

`.env` dosyası oluştur:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/crm
JWT_SECRET=seninsecretin
```

Başlat:

```bash
npm start
```

## 🧪 API Örnekleri

### 📌 POST /api/auth/register

```json
{
  "name": "Mustafa",
  "email": "admin@example.com",
  "password": "123456",
  "role": "admin"
}
```

### 📌 POST /api/auth/login

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

Dönen JWT token’ı Authorization header’ına ekleyin:
```
Authorization: Bearer <token>
```

## 📌 Notlar

- `sales` rolü yalnızca kendi müşterilerini görür.
- `admin` tüm kullanıcıları ve müşterileri yönetebilir.
- `customer` rolü sadece kendi aktivitelerini görebilecek şekilde yapılandırılabilir.

---

Bu proje MVP olarak hazırlanmış olup zamanla genişletilmeye uygundur.