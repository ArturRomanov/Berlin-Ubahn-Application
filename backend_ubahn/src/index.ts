import { lineRoutes } from "./routes/lineRoutes";
import express from "express";
import morgan from "morgan";

const app = express();
const port = 8080;

app.use(function enableCors(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});
app.use(express.json());

app.use(morgan("dev"));

app.use("/lines", lineRoutes);
app.get("/hello", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Backend listening on port ${port}!`));
