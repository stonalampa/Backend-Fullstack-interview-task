import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes";
import taskRoutes from "./src/routes/taskRoutes";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.get("/api", (req: Request, res: Response) => {
    res.send("Welcome to Express & TypeScript Server");
});

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
