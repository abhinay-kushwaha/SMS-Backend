const Student = require('../model/Usermodel')

const addStudent = async (req, res) => {
  try {
    const { name, email, password, role, gender, phone, subject } = req.body;
    const newStudent = new Student({  name, email, password, role, gender, phone, subject  });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error adding student', error });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
};


module.exports = {
  addStudent,
  getStudents
};
// const bcrypt = require('bcrypt');
// const Student = require('../model/student');
// // const course = require('../models/subjectSchema.js');

// // Register a new student
// const studentRegister = async (req, res) => {
//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hashedPass = await bcrypt.hash(req.body.password, salt);

//         const existingStudent = await Student.findOne({
//             email: req.body.email,
//             school: req.body.adminID,
//             sclassName: req.body.sclassName,
//         });

//         if (existingStudent) {
//             res.send({ message: 'Email already exists' });
//         } else {
//             const student = new Student({
//                 ...req.body,
//                 school: req.body.adminID,
//                 password: hashedPass
//             });

//             let result = await student.save();

//             result.password = undefined;
//             res.send(result);
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
// };


// // Student login
// // const studentLogIn = async (req, res) => {
// //     try {
// //         let student = await Student.findOne({ rollNum: req.body.rollNum, name: req.body.studentName });
// //         if (student) {
// //             const validated = await bcrypt.compare(req.body.password, student.password);
// //             if (validated) {
// //                 student = await student.populate("school", "schoolName")
// //                 student = await student.populate("sclassName", "sclassName")
// //                 student.password = undefined;
// //                 student.examResult = undefined;
// //                 student.attendance = undefined;
// //                 res.send(student);
// //             } else {
// //                 res.send({ message: "Invalid password" });
// //             }
// //         } else {
// //             res.send({ message: "Student not found" });
// //         }
// //     } catch (err) {
// //         res.status(500).json(err);
// //     }
// // };

// // // Get all students by school ID
// // const getStudents = async (req, res) => {
// //     try {
// //         let students = await Student.find({ school: req.params.id }).populate("sclassName", "sclassName");
// //         if (students.length > 0) {
// //             let modifiedStudents = students.map((student) => {
// //                 return { ...student._doc, password: undefined };
// //             });
// //             res.send(modifiedStudents);
// //         } else {
// //             res.send({ message: "No students found" });
// //         }
// //     } catch (err) {
// //         res.status(500).json(err);
// //     }
// // };

// // // Get student details by student ID
// // const getStudentDetail = async (req, res) => {
// //     try {
// //         let student = await Student.findById(req.params.id)
// //             .populate("school", "schoolName")
// //             .populate("sclassName", "sclassName")
// //             .populate("examResult.subName", "subName")
// //             .populate("attendance.subName", "subName sessions");
// //         if (student) {
// //             student.password = undefined;
// //             res.send(student);
// //         } else {
// //             res.send({ message: "No student found" });
// //         }
// //     } catch (err) {
// //         res.status(500).json(err);
// //     }
// // };

// // // Delete a student by student ID
// // const deleteStudent = async (req, res) => {
// //     try {
// //         const result = await Student.findByIdAndDelete(req.params.id)
// //         res.send(result)
// //     } catch (error) {
// //         res.status(500).json(err);
// //     }
// // };

// // // Delete all students by school ID
// // const deleteStudents = async (req, res) => {
// //     try {
// //         const result = await Student.deleteMany({ school: req.params.id })
// //         if (result.deletedCount === 0) {
// //             res.send({ message: "No students found to delete" })
// //         } else {
// //             res.send(result)
// //         }
// //     } catch (error) {
// //         res.status(500).json(err);
// //     }
// // };

// // // Delete all students by class ID
// // const deleteStudentsByClass = async (req, res) => {
// //     try {
// //         const result = await Student.deleteMany({ sclassName: req.params.id })
// //         if (result.deletedCount === 0) {
// //             res.send({ message: "No students found to delete" })
// //         } else {
// //             res.send(result)
// //         }
// //     } catch (error) {
// //         res.status(500).json(err);
// //     }
// // };

// // // Update student details by student ID
// // const updateStudent = async (req, res) => {
// //     try {
// //         if (req.body.password) {
// //             const salt = await bcrypt.genSalt(10)
// //             req.body.password = await bcrypt.hash(req.body.password, salt)
// //         }
// //         let result = await Student.findByIdAndUpdate(req.params.id,
// //             { $set: req.body },
// //             { new: true })

// //         result.password = undefined;
// //         res.send(result)
// //     } catch (error) {
// //         res.status(500).json(error);
// //     }
// // };

// // // Update exam result for a student
// // const updateExamResult = async (req, res) => {
// //     const { subName, marksObtained } = req.body;

// //     try {
// //         const student = await Student.findById(req.params.id);

// //         if (!student) {
// //             return res.send({ message: 'Student not found' });
// //         }

// //         const existingResult = student.examResult.find(
// //             (result) => result.subName.toString() === subName
// //         );

// //         if (existingResult) {
// //             existingResult.marksObtained = marksObtained;
// //         } else {
// //             student.examResult.push({ subName, marksObtained });
// //         }

// //         const result = await student.save();
// //         return res.send(result);
// //     } catch (error) {
// //         res.status(500).json(error);
// //     }
// // };

// // // Record attendance for a student
// // const studentAttendance = async (req, res) => {
// //     const { subName, status, date } = req.body;

// //     try {
// //         const student = await Student.findById(req.params.id);

// //         if (!student) {
// //             return res.send({ message: 'Student not found' });
// //         }

// //         const subject = await course.findById(subName);

// //         const existingAttendance = student.attendance.find(
// //             (a) =>
// //                 a.date.toDateString() === new Date(date).toDateString() &&
// //                 a.subName.toString() === subName
// //         );

// //         if (existingAttendance) {
// //             existingAttendance.status = status;
// //         } else {
// //             // Check if the student has already attended the maximum number of sessions
// //             const attendedSessions = student.attendance.filter(
// //                 (a) => a.subName.toString() === subName
// //             ).length;

// //             if (attendedSessions >= subject.sessions) {
// //                 return res.send({ message: 'Maximum attendance limit reached' });
// //             }

// //             student.attendance.push({ date, status, subName });
// //         }

// //         const result = await student.save();
// //         return res.send(result);
// //     } catch (error) {
// //         res.status(500).json(error);
// //     }
// // };

// // // Clear all attendance records for a specific subject
// // const clearAllStudentsAttendanceBySubject = async (req, res) => {
// //     const subName = req.params.id;

// //     try {
// //         const result = await Student.updateMany(
// //             { 'attendance.subName': subName },
// //             { $pull: { attendance: { subName } } }
// //         );
// //         return res.send(result);
// //     } catch (error) {
// //         res.status(500).json(error);
// //     }
// // };

// // // Clear all attendance records for a specific school
// // const clearAllStudentsAttendance = async (req, res) => {
// //     const schoolId = req.params.id;

// //     try {
// //         const result = await Student.updateMany(
// //             { school: schoolId },
// //             { $set: { attendance: [] } }
// //         );

// //         return res.send(result);
// //     } catch (error) {
// //         res.status(500).json(error);
// //     }
// // };

// // // Remove attendance records for a specific subject for a specific student
// // const removeStudentAttendanceBySubject = async (req, res) => {
// //     const studentId = req.params.id;
// //     const subName = req.body.subId;

// //     try {
// //         const result = await Student.updateOne(
// //             { _id: studentId },
// //             { $pull: { attendance: { subName: subName } } }
// //         );

// //         return res.send(result);
// //     } catch (error) {
// //         res.status(500).json(error);
// //     }
// // };

// // // Remove all attendance records for a specific student
// // const removeStudentAttendance = async (req, res) => {
// //     const studentId = req.params.id;

// //     try {
// //         const result = await Student.updateOne(
// //             { _id: studentId },
// //             { $set: { attendance: [] } }
// //         );

// //         return res.send(result);
// //     } catch (error) {
// //         res.status(500).json(error);
// //     }
// // };

// module.exports = {
//     studentRegister,
//     // studentLogIn,
//     // getStudents,
//     // getStudentDetail,
//     // deleteStudents,
//     // deleteStudent,
//     // updateStudent,
//     // studentAttendance,
//     // deleteStudentsByClass,
//     // updateExamResult,
//     // clearAllStudentsAttendanceBySubject,
//     // clearAllStudentsAttendance,
//     // removeStudentAttendanceBySubject,
//     // removeStudentAttendance,
// };
