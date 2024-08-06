const bcrypt = require('bcrypt');
const  User = require('../model/Usermodel.js');
const jwt = require("jsonwebtoken");
const allowRoles = require('../middleware/roles.js');

// const Subject = require('../models/subjectSchema.js'); 
//new one with my modifications 

const teacherRegister = async (req, res) => {
    const { name, email, password, role, gender, phone, subject } = req.body;
    try {
        const existingTeacherByEmail = await User.findOne({ email });

        if (existingTeacherByEmail) {
            return res.status(409).send({ message: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const teacher = new User({ name, email, password: hashedPass, role, gender, phone, subject });

        let result = await teacher.save();
        result.password = undefined;
        res.status(201).send({
            message: "Registered successfully",
            userDetails: {
                id: result._id,
                name: result.name,
                email: result.email,
                role: result.role,
                gender: result.gender,
                phone: result.phone,
                subject: result.subject
            }
        });
    } catch (err) {
        res.status(500).json(err);
    }
};
const teacherLogIn = async (req, res) => {
    try {
        let teacher = await User.findOne({ email: req.body.email });
        if (teacher) {
            const validated = await bcrypt.compare(req.body.password, teacher.password);
            if (validated) {
                teacher.password = undefined;

// // Generate JWT
    const token = jwt.sign(
        { _id: teacher._id, role: teacher.role },
       "abcd",
        { expiresIn: "1h" }
      );

  
              res.status(200).send({ message: "Login successful",token,role:teacher.role });
            } else {
                res.status(401).send({ message: "Invalid password" });
            }
        } else {
            res.status(404).send({ message: "Email not registered" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
const getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'Student' });
        res.status(200).send(students);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Failed to fetch students");
    }
};

const promoteUser = async (req, res) => {
    const id = req.params.id; 
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { role: "Instructor" }, { new: true });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send("User promoted to Instructor");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Failed to promote user");
    }
};





// Set a user's subject to "Paid"
const setPaidStatus = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { subject: "Paid" }, { new: true });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send("User subject set to Paid");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Failed to update user subject");
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send("User deleted successfully");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Failed to delete user");
    }
};

const getInstructor = async (req, res) => {
    try {
        const instructors = await User.find({ role: 'Instructor' });
        res.status(200).send(instructors);
    } catch (error) {
        console.error('Error fetching instructors:', error);
        res.status(500).send('Internal Server Error');
    }
};






module.exports = {
    teacherRegister,
    teacherLogIn,
    promoteUser,
    setPaidStatus,
    deleteUser,
    getAllStudents,
    getInstructor

   
};