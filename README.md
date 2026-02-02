# 🏡 Delta Web Project – Airbnb Clone

This is a **full-stack web application** inspired by **Airbnb**, built as a **learning project** using **Node.js, Express, MongoDB, and Passport.js**.  
It allows users to **sign up, log in, search listings, filter by categories, add reviews with ratings, and manage sessions securely**.

---

## 🚀 Features

### 👤 User Authentication

- User **Sign Up / Login**
- Password hashing using **Passport-Local-Mongoose**
- Secure login sessions stored in **MongoDB Atlas**

---

### 🏠 Listings

- Create, edit, and delete property listings
- Upload images using **Cloudinary**
- Location & map support using **Mapbox**
- Only listing owners can edit/delete their listings

---

### 🔍 Search Feature

- Search listings by:
  - **Title**
  - **Location**
  - **Country**
- Case-insensitive search
- Search results update dynamically on submit
- Search works together with category filters

**Example:**
Shows all listings located in **Pune**.

---

### 🧭 Categories with Icons

- Listings are grouped into categories
- Each category is represented using **Font Awesome icons**
- Clicking a category filters listings automatically

**Supported Categories:**

| Category      | Icon |
| ------------- | ---- |
| Trending      | 🔥   |
| Farm House    | 🌾   |
| Iconic Cities | 🏙️   |
| Rooms         | 🛏️   |

This improves **user experience** and makes navigation intuitive.

---

### ⭐ Reviews & Ratings

- Users can add reviews with **star ratings**
- Interactive **star rating input**
- Ratings are displayed visually for each review
- Users can delete their own reviews

---

### 🔐 Security & Validation

- Server-side validation using **Joi**
- Flash messages for success & error handling
- Protected routes using middleware
- Secure cookies & sessions

---

## 🛠️ Tech Stack

### Frontend

- **EJS (Embedded JavaScript Templates)**
- **Bootstrap 5**
- **Font Awesome Icons**
- Custom CSS

### Backend

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **Passport.js**

### Cloud & APIs

- **MongoDB Atlas**
- **Cloudinary** – image upload
- **Mapbox** – maps & geolocation
