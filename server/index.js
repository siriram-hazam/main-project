import "dotenv/config";

import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  process.env.CLIENT_ORIGIN, // Your primary frontend URL
  "http://192.168.1.111:3000", // Public IP
  "http://localhost:3000", // Localhost
];

// * Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("CORS not allowed"), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    maxAge: 600, // Cache preflight requests for 10 minutes
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
