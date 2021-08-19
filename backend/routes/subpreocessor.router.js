const express = require("Express");
const router = express.Router();
const subprocessorController = require("../controllers/subpreocessor.controller");

router.post("/", async (req, res) => {
  const { body } = req;
  const response = await subprocessorController.addSubprocessor(body);

  res.json(response);
});

router.get("/", async (req, res) => {
  const response = await subprocessorController.getAllSubprocessors();

  res.json(response);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await subprocessorController.deleteSubProcessor(id);

  res.json(response);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const response = await subprocessorController.updateSubProcessor(id, body);

  res.json(response);
});

module.exports = router;
