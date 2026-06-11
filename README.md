📊 GitHub Profile Analyzer API

A backend service built using Node.js, Express.js, and MySQL that analyzes GitHub user profiles using the GitHub REST API. It fetches user data, calculates developer insights, and stores structured analytics in a database.

🚀 Features
Fetch GitHub user profile using username
Retrieve public repository data via GitHub API
Calculate developer insights:
Account age (in days)
Total stars across repositories
Profile score based on activity
Store analyzed data in MySQL database
Retrieve all stored profiles
Retrieve single user profile
RESTful API architecture

🛠 Tech Stack
Node.js
Express.js
MySQL
GitHub REST API
Axios (or fetch)

📁 Project Structure
github-profile-analyzer/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── githubController.js
│
├── routes/
│   └── githubRoutes.js
│
├── services/
│   └── githubService.js
│
├── database/
│   └── schema.sql
│
├── server.js
├── package.json
└── .gitignore

⚙️ Setup Instructions
1. Clone the repository
git clone https://github.com/your-username/github-profile-analyzer.git
cd github-profile-analyzer
2. Install dependencies
npm install
3. Create .env file
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=github_analyzer
4. Setup MySQL Database
Run the schema file:
source database/schema.sql;
5. Start the server
npm start
or
npx nodemon server.js

📌 API Endpoints

🔍 Analyze GitHub Profile
GET /api/github/analyze/:username

📂 Get All Profiles
GET /api/github/profiles

👤 Get Single Profile
GET /api/github/profile/:username

📊 Example Response
{
  "success": true,
  "data": {
    "username": "octocat",
    "name": "The Octocat",
    "followers": 22918,
    "public_repos": 8
  },
  "insights": {
    "accountAgeDays": 5615,
    "totalStars": 21533,
    "profileScore": 110475
  }
}

🧠 Profile Score Formula
Profile Score =
followers * 2 +
public_repos * 5 +
total_stars * 3

📦 Future Improvements
Add authentication (JWT)
Add caching for GitHub API
Frontend dashboard (React)
Rate limit handling
Docker support

👨‍💻 Author
Avanthi Udagiri

⭐ If you like this project

Give it a ⭐ on GitHub and share it!
