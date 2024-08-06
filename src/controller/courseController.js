const Course = require('../model/course');
const CourseContent = require('../model/courseContent');

// Admin creates a new course
const createCourse = async (req, res) => {
    const { title, instructor, description, duration, startDate, endDate, level, category, price } = req.body;
    const userId = req.user._id; // Assume user information is set in the req by auth middleware

    try {
        const course = new Course({
            title,
            instructor,
            description,
            duration,
            startDate,
            endDate,
            level,
            category,
            price,
            user: userId,
        });
        await course.save();
        res.status(201).send({
            message: 'Course created successfully',
            course
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Admin updates a course
const updateCourse = async (req, res) => {
    const { title, description } = req.body;
    const courseId = req.params.id;

    try {
        const course = await Course.findByIdAndUpdate(courseId, { title, description }, { new: true });
        if (!course) {
            return res.status(404).send("Course not found");
        }
        res.status(200).send({
            message: 'Course updated successfully',
            course
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Failed to update course");
    }
};
// Get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).send(courses);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve courses', error: error.message });
    }
};




//admin delete a course
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).send("Course not found");
        }
        // Optionally, delete all related course content
        await CourseContent.deleteMany({ course: req.params.id });
        res.status(200).send("Course deleted successfully");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Failed to delete course");
    }
};

// Instructor adds course content

const addCourseContent = async (req, res) => {
   
    const { title, content ,courseId } = req.body;
    const userId = req.user._id;
    const image = req.file; 
    let imagePath ="";

    if(image){
        imagePath=`/uploads/${image.filename}`
    }

    console.log(title, content, image)

    try {
        const courseContent = new CourseContent({ title, content, image:imagePath,courseId, createdBy: userId });
        console.log(courseContent)
        const response = await courseContent.save();

        console.log(response)

        res.status(201).send({
            courseContent,
            message: 'Course content added successfully',
            courseContent
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Instructor updates course content
const updateCourseContent = async (req, res) => {
    const { title, content } = req.body;
    const courseContentId = req.params.id;

    try {
        const courseContent = await CourseContent.findByIdAndUpdate(courseContentId, { title, content }, { new: true });
        if (!courseContent) {
            return res.status(404).send("Course content not found");
        }
        res.status(200).send({
            message: 'Course content updated successfully',
            courseContent
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Failed to update course content");
    }
};

// Fetch content for a specific course

const getCourseContentByCourseId = async (req, res) => {
    const courseId = req.params.courseId;
    console.log(courseId);
    try {
        // Find course content by courseId
        const content = await CourseContent.find({ courseId: courseId });
        if (!content || content.length === 0) {
            return res.status(404).send("Course content not found");
        }
        res.status(200).send(content);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Failed to fetch course content");
    }
};





// const getCourseContent=async(req,res)=>{try {
//     const courseId = req.params.id;
//     const course = await Course.findById(courseId).populate('content'); // Adjust the model and relationships as needed
//     if (!course) {
//       return res.status(404).json({ error: 'Course not found' });
//     }
//     res.json(course);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };






// Instructor deletes course content
const deleteCourseContent = async (req, res) => {
    try {
        const courseContent = await CourseContent.findByIdAndDelete(req.params.id);
        if (!courseContent) {
            return res.status(404).send("Course content not found");
        }
        res.status(200).send("Course content deleted successfully");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Failed to delete course content");
    } 
};

module.exports = {
    createCourse,
    addCourseContent,
    deleteCourse,
    updateCourse,
    updateCourseContent,
    deleteCourseContent,
    getAllCourses,
    getCourseContentByCourseId




};

