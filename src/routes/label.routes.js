const express = require("express");
const labelRouter = express.Router();
const {
  getLabel,
  getLabels,
  createLabel,
  updateLabel,
  deleteLabel,
} = require("../controllers/label.controller");

const { upload } = require("../middlewares/file.middleware");
const { isAuth } = require('../middlewares/auth.middleware');

labelRouter.get("/:id", getLabel);
labelRouter.get("/", getLabels);
labelRouter.post("/", [upload.single("cover")], createLabel);
labelRouter.patch('/:id', [isAuth], updateLabel);
labelRouter.delete('/:id', [isAuth], deleteLabel);

module.exports = labelRouter;
