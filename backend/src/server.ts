import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { sample_foods, sample_tags, sample_users } from "./data";

const app = express();
const port = 5000;

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// GET ALL FOODS
app.get("/api/foods", (req, res) => {
  res.send(sample_foods);
});

// GET FOODS BY KEYWORD SEARCH
app.get("/api/foods/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const foods = sample_foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.send(foods);
});

// GET ALL TAGS
app.get("/api/foods/tags", (req, res) => {
  res.send(sample_tags);
});

// GET FOODS BY TAG
app.get("/api/foods/tags/:tagName", (req, res) => {
  const tagName = req.params.tagName;
  const foods = sample_foods.filter((food) => food.tags?.includes(tagName));
  res.send(foods);
});

// GET FOOD BY ID
app.get("/api/foods/:foodID", (req, res) => {
  const foodID = req.params.foodID;
  const food = sample_foods.find((food) => food.id === foodID);
  if (food) res.send(food);
});

// LOGIN
app.post("api/users/login", (req, res) => {
  const { email, password } = req.body;
  const user = sample_users.find((user) => {
    user.email === email && user.password === password;
  });
  if (user) {
    res.send(generateToken(user));
  } else {
    res.status(400).send("Email or password, not valid!");
  }
});

const generateToken = (user: any) => {
  const token = jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "PrivateKey",
    {
      expiresIn: "1h",
    }
  );

  user.token = token;
  return user;
};
