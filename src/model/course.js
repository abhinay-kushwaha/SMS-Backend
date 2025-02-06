 


const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
    },
    description: {
        type: String,
    },
    duration: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
    },
    category: {
        type: String,
        enum: ['Technology', 'Business', 'Art', 'Science'],
    },
    price: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
