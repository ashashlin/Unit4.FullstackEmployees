import { getEmployees } from "#db/queries/employees";

export default async function validateEmployeeId(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (id <= 0) {
      return res
        .status(400)
        .json({ error: "employee id has to be a positive integer." });
    }

    const employees = await getEmployees();
    const employee = employees.find((employee) => employee.id === id);

    if (!employee) {
      return res
        .status(404)
        .json({ error: `employee with id ${id} does not exist.` });
    }

    next();
  } catch (error) {
    next(error);
  }
}
