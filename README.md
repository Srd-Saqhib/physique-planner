# Physique Planner

A comprehensive fitness and nutrition tracking web application that helps users achieve their physique goals through personalized workout plans, exercise recommendations, and nutritional guidance.

## Features

- **User Authentication**: Secure login and registration system
- **Personalized Dashboard**: User profile with height, weight, and fitness goals
- **Workout Planning**: Interactive muscle group selection with exercise recommendations
- **Exercise Database**: Integration with ExerciseDB API for comprehensive exercise data
- **Nutrition Tracking**: Search and analyze nutritional information using Nutrition API
- **Progress Tracking**: Workout streak counter and progress visualization
- **Trending Workouts**: Popular workout split recommendations

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Frontend**: HTML, CSS, JavaScript, EJS templating
- **APIs**:
  - ExerciseDB (RapidAPI)
  - Nutrition API (API-Ninjas)
- **Dependencies**:
  - axios: HTTP client for API requests
  - body-parser: Parse incoming request bodies
  - dotenv: Environment variable management
  - pg: PostgreSQL client

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn package manager

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd physique-planner
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database:**
   - Create a PostgreSQL database named `fewd`
   - Create a `users` table with the following schema:
     ```sql
     CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       age INTEGER,
       gender VARCHAR(50),
       height DECIMAL,
       weight DECIMAL,
       activity VARCHAR(100)
     );
     ```

4. **Configure environment variables:**
   Create a `.env` file in the root directory with the following variables:
   ```
   RAPID_API=your_rapidapi_key_here
   NINJA_API_KEY=your_ninja_api_key_here
   ```

5. **Update database configuration:**
   In `server.js`, update the PostgreSQL connection details:
   ```javascript
   const db = new pg.Client({
     user: "postgres",
     host: "localhost",
     database: "fewd",
     password: "your_password_here",
     port: 5432,
   });
   ```

## Usage

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Open your browser and navigate to:**
   ```
   http://localhost:4000
   ```

3. **Register a new account** or sign in if you already have one

4. **Explore the features:**
   - View your personalized dashboard
   - Browse workout plans by muscle group
   - Search for nutritional information
   - Track your workout streaks

## API Endpoints

- `GET /` - Landing page
- `POST /login` - User authentication
- `POST /register` - User registration
- `GET /exercises/:muscle` - Fetch exercises for specific muscle group
- `GET /nutrition?query=food` - Search nutritional information

## Project Structure

```
physique-planner/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── public/                # Static files
│   ├── index.html         # Landing page
│   ├── main.html          # Main application page
│   ├── script.js          # Client-side JavaScript
│   ├── style.css          # Landing page styles
│   ├── style_main.css     # Main page styles
│   └── assets/            # Images and media
├── views/                 # EJS templates
│   └── main.ejs           # Main dashboard template
└── README.md              # Project documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- Exercise data provided by [ExerciseDB API](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb)
- Nutrition data provided by [API-Ninjas Nutrition API](https://api-ninjas.com/api/nutrition)
- Icons and design inspiration from various fitness communities</content>
<parameter name="filePath">C:\Physique Planner\README.md