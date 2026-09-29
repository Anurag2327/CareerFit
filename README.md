# CareerFit

CareerFit is an AI-powered interview preparation platform that helps users prepare for technical and behavioral interviews based on their resume, skills, and target job description.

It analyzes the user's resume and job requirements and generates a personalized interview report with technical questions, behavioral questions, skill gaps, and an overall job-match assessment.

## Features

- User Registration and Login
- JWT-based Authentication
- Protected Routes
- Resume Upload
- Job Description Analysis
- Self-Description Input
- AI-Powered Interview Report Generation
- Technical Interview Questions
- Behavioral Interview Questions
- Skill Gap Analysis
- Job Match Score
- Personalized Interview Preparation
- Interview Report History
- Resume PDF Generation
- Responsive User Interface

## Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- SCSS
- Context API

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Zod

### AI & Other Technologies

- Google Gemini API
- Puppeteer
- pdf-parse

## Project Structure

```text
CareerFit/
│
├── Frontend/
│   ├── src/
│   │   ├── component/
│   │   │   ├── header.jsx
│   │   │   └── footer.jsx
│   │   │
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── pages/
│   │   │   │   └── auth.context.jsx
│   │   │   │
│   │   │   └── interview/
│   │   │       ├── pages/
│   │   │       ├── interview.context.jsx
│   │   │       └── services/
│   │   │
│   │   ├── App.jsx
│   │   └── app.routes.jsx
│   │
│   └── package.json
│
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── app.js
│   │
│   └── package.json
│
└── README.md
