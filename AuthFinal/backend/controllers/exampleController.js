const Example = require('../models/example');

// GET all examples
exports.getAllExamples = async (req, res) => {
  try {
    const examples = await Example.find();
    res.json(examples);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST a new example
exports.createExample = async (req, res) => {
  const newExample = new Example(req.body);
  try {
    const savedExample = await newExample.save();
    res.status(201).json(savedExample);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
