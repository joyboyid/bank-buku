import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import AuthRoute from "./routes/AuthRoute.js";
import UserRoute from "./routes/UserRoute.js";
import BookRoute from "./routes/BookRoute.js";

dotenv.config();

const app = express();
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(UserRoute);
app.use(BookRoute);
app.use(AuthRoute);

const startServer = async () => {
  try {
    await db.authenticate();
    console.log("Database connected");

    // Uncomment the following if you want to auto-sync models (use with caution in production)
    // await db.sync();
    // await store.sync();

    app.listen(process.env.APP_PORT, () => {
      console.log(`Server is running on port ${process.env.APP_PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    if (error.original) console.error("Original error:", error.original.message || error.original);
    process.exit(1);
  }
};

startServer();
