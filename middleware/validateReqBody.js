export default function validateReqBody(req, res, next) {
  try {
    const name = req.body?.name;
    const birthday = req.body?.birthday;
    const salary = req.body?.salary;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "request body is not provided." });
    }

    if (!name || !birthday || !salary) {
      return res.status(400).json({
        error:
          "request body is missing a required field. Please provide name, birthday, and salary of an employee.",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
}
