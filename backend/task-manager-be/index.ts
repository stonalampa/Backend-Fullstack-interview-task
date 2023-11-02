import express, { Express, Request, Response, Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes";
import taskRoutes from "./src/routes/taskRoutes";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(
    cors({
        origin: "http://localhost:8080",
        methods: "GET,PUT,POST,DELETE, PATCH",
        credentials: true,
        optionsSuccessStatus: 204,
    })
);
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
    res.send("Welcome to Express & TypeScript Server");
});

app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
