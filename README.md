# Coy – Discover ❤️

A full-stack dating discovery application built using the MERN stack. Coy allows users to discover profiles, like or pass on people, and get notified when a mutual like creates a match.

## 🚀 Live Demo

- **Frontend:** [Add Your Live Frontend URL]
- **Backend API:** https://coy-discover-backend-5bms.onrender.com
- **GitHub Repository:** https://github.com/ashutosh-gupta01/Coy-Discover

## ✨ Features

- **Discover Profiles:** Browse user profiles with profile images and personal details.
- **Like Profiles:** Like profiles you are interested in.
- **Pass Profiles:** Skip profiles you are not interested in.
- **Super Like:** Express additional interest in a profile.
- **Mutual Matching:** Get a match when two users like each other.
- **Match Notification:** Display a notification when a mutual match occurs.
- **Matches:** View your matched profiles.
- **Swipe Persistence:** Save user swipe actions in the database.
- **Responsive UI:** Designed for desktop and mobile devices.

## 🛠️ Tech Stack

**Frontend**
- React.js
- Vite
- Tailwind CSS
- JavaScript
- Lucide React

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

**Deployment**
- Frontend: Render Static Site
- Backend: Render Web Service
- Database: MongoDB Atlas
- Version Control: Git & GitHub

## 📂 Project Structure

```text
Coy-Discover/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ashutosh-gupta01/Coy-Discover.git

cd Coy-Discover
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm start
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend folder:

```env
VITE_API_URL=http://localhost:5000/api/profiles
```

Start the frontend:

```bash
npm run dev
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/profiles/feed` | Fetch discovery profiles |
| POST | `/api/profiles/swipe` | Like or pass on profiles |
| GET | `/api/profiles/matches` | Fetch matched profiles |

## 🌐 Deployment

The project is deployed using Render.

- Frontend is deployed as a Render Static Site.
- Backend is deployed as a Render Web Service.
- MongoDB Atlas is used for cloud database storage.
- Environment variables are configured separately for frontend and backend.

## 👨‍💻 Developer

**Aashutosh Gupta**

- GitHub: https://github.com/ashutosh-gupta01
- LinkedIn: https://linkedin.com/in/aashutosh-kumar-gupta-0561ab265/

---

⭐ If you find this project interesting, feel free to explore the repository!
