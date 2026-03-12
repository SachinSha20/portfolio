# Sachin Sharma — Portfolio

A full-stack portfolio website built with a Dark & Techy aesthetic.

---

## 📁 Structure

```
portfolio-frontend/
  index.html          ← Complete single-file frontend

portfolio-backend/
  server.js           ← Express API server
  package.json
```

---

## 🚀 Running Locally

### Backend
```bash
cd portfolio-backend
npm install
npm run dev        # uses nodemon (hot reload)
# API runs on http://localhost:5000
```

### Frontend
Open `portfolio-frontend/index.html` directly in a browser — no build step needed.

---

## 🔌 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/portfolio` | Full portfolio data |
| GET | `/api/personal` | Personal info |
| GET | `/api/skills` | Tech skills |
| GET | `/api/experience` | Work experience |
| GET | `/api/projects` | Projects |
| GET | `/api/education` | Education |
| GET | `/api/certifications` | Certifications |
| POST | `/api/contact` | Contact form submission |

---

## 📧 Enable Contact Form Email

In `server.js`, uncomment the `nodemailer` block and set:
```
EMAIL_USER=sachinsharma1935@gmail.com
EMAIL_PASS=your_app_password
```

---

## 🌐 Deployment

- **Frontend**: Deploy `index.html` to Netlify / Vercel / GitHub Pages
- **Backend**: Deploy `server.js` to Railway / Render / Heroku
- Update the `fetch` URL in `index.html` to your deployed backend URL
