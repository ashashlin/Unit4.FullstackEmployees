import express from "express";
import router from "#api/employees";

const app = express();

app.use(express.json());

app.route("/").get((req, res, next) => {
  try {
    res.status(200).send("Welcome to the Fullstack Employees API.");
  } catch (error) {
    next(error);
  }
});

app.use("/employees", router);

// Catch-all error-handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Sorry! Something went wrong!" });
});

export default app;
