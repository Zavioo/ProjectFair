# Project Fair

Project Fair is a React-based web application for showcasing and managing software projects. It provides a clean platform where users can register, log in, upload their projects, update their profile, and browse project listings from others.

## Features

- User registration and login
- Protected dashboard for managing projects
- Add, edit, and delete project entries
- Search projects by language
- Public home page with featured projects
- User profile management with GitHub, LinkedIn, and profile image support
- Responsive UI built with React and Bootstrap

## Tech Stack

- React
- Vite
- React Router DOM
- Axios
- Bootstrap
- React Bootstrap

## Project Structure

```text
ProjectFair/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (v18 or above)
- npm
- A backend API server running on port 3000 (this frontend expects the backend at http://localhost:3000)

## Installation

```bash
git clone https://github.com/Zavioo/ProjectFair.git
cd ProjectFair
npm install
```

## Running the App

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## API Configuration

The app connects to a backend API through the file below:

```js
src/services/serverURL.js
```

Current default value:

```js
const SERVER_URL = "http://localhost:3000"
export default SERVER_URL
```

If your backend runs on a different host or port, update this file accordingly.

## Main Features in Detail

### Authentication
Users can sign up with a username, email, and password or log in to access their dashboard.

### Dashboard
Once logged in, users can:

- view their uploaded projects
- add new projects
- edit existing project details
- remove projects

### Projects Page
The Projects section lists all available project entries and includes a search input to filter by language.

### Profile Management
Users can update:

- GitHub profile link
- LinkedIn profile link
- profile picture

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Notes

This project is designed to work with a backend service providing endpoints for:

- user registration
- login
- fetching home projects
- fetching all projects
- user projects
- project creation
- project update
- project deletion
- user profile update

If you are working with a separate backend service, make sure its API routes match the requests in `src/services/allAPI.js`.

## License

This project is for educational and demonstration purposes.
