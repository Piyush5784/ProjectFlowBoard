import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";
import SearchRoutes from "./routes/searchRoutes";
import UserRoutes from "./routes/userRoutes";
import TeamRoutes from "./routes/teamRoutes";
dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(morgan("common"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({
    message: "This is working",
  });
});

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/search", SearchRoutes);
app.use("/users", UserRoutes);

app.use("/teams", TeamRoutes);

const PORT = Number(process.env.PORT) || 8000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server is running on port ", PORT);
});
