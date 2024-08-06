//routes/auth.js
const express = require('express');
const {   teacherRegister,teacherLogIn,getAllStudents, } = require('../controller/User');
// const {sclassCreate, sclassList,getSclassDetail} = require("../controller/courseController")
const { addStudent, getStudents } = require('../controller/student');
const auth = require('../middleware/Auth');
const allowRoles = require('../middleware/roles');
const  User = require("../model/Usermodel")
const { createCourse, addCourseContent,deleteCourse,updateCourse, updateCourseContent,deleteCourseContent,getAllCourses,getCourseContentByCourseId } = require('../controller/courseController');
const { promoteUser, setPaidStatus, deleteUser,getInstructor } = require('../controller/User');
const upload= require('../middleware/multer.middleware')

const router = express.Router();
const {
    getInstructors,
    addInstructor,
    updateInstructor,
    deleteInstructor,
  } = require('../controller/instrctorController');




router.post('/register', teacherRegister);
router.post('/login', teacherLogIn);
router.get('/students', getAllStudents);
// router.get('/instructors', getInstructor);

router.get('/instructors', getInstructor);
// Route to get a single instructor by ID
router.get('/instructors/:id', auth, getInstructor);

// Route to add a new instructor
router.post('/instructors', auth, addInstructor);

// Route to update an instructor by ID
router.put('/instructors/:id', auth, updateInstructor);

// Route to delete an instructor by ID
router.delete('/instructors/:id', auth, deleteInstructor);






// router.post('/course',sclassCreate);
// router.get('/courseList',sclassList);
// router.get('/courseDetails/:id',getSclassDetail);
router.post('/course', auth, allowRoles('Admin'), 
upload.single("image"),
 createCourse);
router.delete('/course/:id', auth, allowRoles('Admin'), deleteCourse);
router.put('/course/:id', auth, allowRoles('Admin'), updateCourse);
router.get('/course', auth, allowRoles('Admin', 'Instructor'), getAllCourses); 



router.post('/courseContent', auth, allowRoles('Admin','Instructor') , upload.single("image"), addCourseContent);
router.put('/courseContent/:id', auth, allowRoles('Instructor'), updateCourseContent); 
router.delete('/courseContent/:id', auth, allowRoles('Instructor'), deleteCourseContent); 
router.get('/courseContent/:courseId', getCourseContentByCourseId);



router.post('/add', addStudent);
router.get('/getstudent', getStudents);


  
router.put('/promote/:id', auth, allowRoles('Admin'), promoteUser);

// Set a user's subject to "Paid"
router.put('/paid/:id', auth, allowRoles('Admin'), setPaidStatus);

// Delete a user by admin only
router.delete('/user/:id', auth, allowRoles('Admin'), deleteUser);



module.exports = router;
