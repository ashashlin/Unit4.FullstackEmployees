import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "#db/queries/employees";
import validateReqBody from "#middleware/validateReqBody";
import validateEmployeeId from "#middleware/validateEmployeeId";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.status(200).send(employees);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateReqBody, async (req, res, next) => {
  try {
    const name = req.body?.name;
    const birthday = req.body?.birthday;
    const salary = req.body?.salary;

    const newEmployee = await createEmployee({ name, birthday, salary });
    res.status(201).send(newEmployee);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validateEmployeeId, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const employees = await getEmployees();
    const employee = employees.find((employee) => employee.id === id);

    res.status(200).send(employee);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", validateEmployeeId, async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    await deleteEmployee(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  validateReqBody,
  validateEmployeeId,
  async (req, res, next) => {
    try {
      const name = req.body?.name;
      const birthday = req.body?.birthday;
      const salary = req.body?.salary;
      const id = Number(req.params.id);

      const updatedEmployee = await updateEmployee({
        id,
        name,
        birthday,
        salary,
      });
      res.status(200).send(updatedEmployee);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
