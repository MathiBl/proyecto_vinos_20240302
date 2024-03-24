const Label = require("../model/label.model");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

const getLabel = async (req, res, next) => {
  try {
    const id = req.params.id;
    const label = await Label.findById(id);
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: label,
    });
  } catch (error) {
    next(error);
  }
};

// -- TODAS LAS ETIQUETAS
const getLabels = async (req, res, next) => {
  try {
    const label = await Label.find();
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: label,
    });
  } catch (error) {
    next(error);
  }
};

const createLabel = async (req, res, next) => {
  try {
    const { upc, name, wines } = req.body;
    const cover = req.file ? req.file.filename : null;
    const label = new Label({
      id,
      name,
      wines,
      cover: cover,
    });
    await label.save();
    res.status(201).json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: label,
    });
  } catch (error) {
    next(error);
  }
};

const updateLabel = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const label = await Label.findByIdAndUpdate(id, body, { new: true });
    if (!label) {
      return res.status(404).json({
        status: 404,
        message: HTTPSTATUSCODE[404],
      });
    }
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: label,
    });
  } catch (error) {
    next(error);
  }
};

const deleteLabel = async (req, res, next) => {
  try {
    const id = req.params.id;
    const label = await Label.findByIdAndDelete(id);

    if (!label) {
      return res.status(404).json({
        status: 404,
        message: HTTPSTATUSCODE[404],
        data: label,
      });
    }

    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: label,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getLabel, getLabels, createLabel, updateLabel, deleteLabel };
