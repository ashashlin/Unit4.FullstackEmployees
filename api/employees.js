import express from "express";
import { createEmployee, getEmployees } from "#db/queries/employees";

const router = express.Router();

router.route("/").get(async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.status(200).json({ employees });
  } catch (error) {
    next(error);
  }
});

router.route("/").post(async (req, res, next) => {
  try {
    const name = req.body.name;
    const birthday = req.body.birthday;
    const salary = req.body.salary;

    // check if req.body is an empty {}
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ message: "ERROR: request body is not provided." });
    }

    if (!name || !birthday || !salary) {
      return res.status(400).json({
        message:
          "ERROR: request body is missing a required field. Please provide name, birthday, and salary of an employee.",
      });
    }

    const newEmployee = await createEmployee({ name, birthday, salary });
    res.status(201).json({ newEmployee });
  } catch (error) {
    next(error);
  }
});

export default router;
