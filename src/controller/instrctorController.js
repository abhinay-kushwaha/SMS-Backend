const Instructor = require('../model/Usermodel');

// Get all instructors
const getInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching instructors', error });
  }
};

// Get a single instructor by ID

const getInstructor = async (req, res) => {
    try {
      const { id } = req.params;
      const instructor = await Instructor.findById(id);
      if (!instructor) {
        return res.status(404).json({ message: 'Instructor not found' });
      }
      res.json(instructor);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching instructor', error });
    }
  };
  

// Add new instructor
const addInstructor = async (req, res) => {
  try {
    const { name, email, phone, gender, subject, password,role  } = req.body;
    const newInstructor = new Instructor({ name, email, phone, gender, subject, password,role });
    await newInstructor.save();
    res.status(201).json(newInstructor);
  } catch (error) {
    res.status(500).json({ message: 'Error adding instructor', error });
  }
};

// Update instructor
const updateInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const updatedInstructor = await Instructor.findByIdAndUpdate(id, { name, email, phone }, { new: true });
    if (!updatedInstructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    res.json(updatedInstructor);
  } catch (error) {
    res.status(500).json({ message: 'Error updating instructor', error });
  }
};

// Delete instructor
const deleteInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInstructor = await Instructor.findByIdAndDelete(id);
    if (!deletedInstructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    res.json({ message: 'Instructor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting instructor', error });
  }
};

module.exports = {
  getInstructors,
  getInstructor,
  addInstructor,
  updateInstructor,
  deleteInstructor,
};
