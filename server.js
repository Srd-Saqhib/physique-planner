import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import axios from "axios";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const PORT = 4000;
dotenv.config();

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "fewd",
  password: "12345678",
  port: 5432,
}); 
db.connect();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const API_KEY = process.env.RAPID_API;

const muscleMap = {
  chest: "pectorals",
  back: "lats",
  shoulders: "delts",
  legs: "quads",
  abs: "abs",
  triceps: "triceps",
  biceps: "biceps"
};


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post("/login", async(req,res)=>{
  const {email,password}=req.body;
  
  try{
    const result = await db.query("SELECT * FROM users WHERE email = $1 AND password = $2",[email, password]);

    const user = result.rows[0];

    if (result.rows.length > 0) {
      res.render("main.ejs", {name:user.name, email:user.email, weight:user.weight, height:user.height});
    } else {
      res.status(401).send("Invalid email or password");
    }
  }catch (err) {
    console.error(err);
    res.status(500).send("Error logging in");
  }
});

app.post("/register", async(req,res)=>{
  const { name, email, password, age, gender, height, weight, activity } = req.body;

  try{
    const check = await db.query("SELECT 1 FROM users WHERE email = $1", [email]);

    if (check.rowCount > 0) {
      return res.status(409).send("Email already registered");
    }

    await db.query(`INSERT INTO users (name, email, password, age, gender, height, weight, activity)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [name, email, password, age, gender, height, weight, activity]);

      res.render("main.ejs", {name:req.body.name, email:req.body.email, weight:req.body.weight, height:req.body.height}); 
  }
  catch (err) {
    console.error("Register error:", err);
  }
   
});


app.get("/exercises/:muscle", async (req, res) => {
  const userMuscle = req.params.muscle.toLowerCase();
  const target = muscleMap[userMuscle] || userMuscle;

  try {
    const { data } = await axios.get(
      `https://exercisedb.p.rapidapi.com/exercises/target/${target}`,
      {
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": "exercisedb.p.rapidapi.com",
        },
      }
    );

    const simplified = data.slice(0, 10).map(ex => ({
      id: ex.id,
      name: ex.name,
      target: ex.target,
      equipment: ex.equipment
    }));

    res.json(simplified);

  } catch (err) {
    console.error("❌ Error fetching exercises:", err.message);
    res.status(500).json({ error: "Failed to load exercises" });
  }
});


app.get("/nutrition", async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: "Missing food query" });

  try {
    const response = await axios.get(
      `https://api.api-ninjas.com/v1/nutrition?query=${query}`,
      {
        headers: { "X-Api-Key": process.env.NINJA_API_KEY },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching nutrition data:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, (req,res)=>{
    console.log('Server running at port 4000');
});