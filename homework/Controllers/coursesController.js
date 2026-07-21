import * as courseService from '../services/coursesService.js';

// שליפת כל הקורסים
export function getAllCourses(req, res) {
    try {
        const courses = courseService.getAllCourses();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// שליפת קורס לפי ID
export function getCourseById(req, res) {
    try {
        const id = Number(req.params.id);
        const course = courseService.getCourseById(id);
        res.json(course);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// יצירת קורס חדש
export function createCourse(req, res) {
    try {
        const newCourse = courseService.createNewCourse(req.body);
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}