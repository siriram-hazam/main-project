import "dotenv/config";

import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 3001;

// * Middleware
app.use(
  cors({
    // origin: "http://20.255.153.125:3000",
    origin: (origin, callback) => {
      callback(null, true); // Dynamically allow all origins
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  return res.send("Hello World!!");
});

// * Route file
import routes from "./routes/mainRoutes.js";
app.use(routes);

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
