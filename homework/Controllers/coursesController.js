import * as courseService from '../service/coursesService.js';

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
        // 404 כשהקורס לא נמצא, אחרת 500
        res.status(error.status || 500).json({ error: error.message });
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

// עדכון קורס קיים
export function updateCourse(req, res) {
    try {
        const id = Number(req.params.id);
        const updatedCourse = courseService.updateCourse(id, req.body);
        res.json(updatedCourse);
    } catch (error) {
        // 404 אם הקורס לא נמצא, אחרת 500
        res.status(error.status || 500).json({ error: error.message });
    }
}

// מחיקת קורס
export function deleteCourse(req, res) {
    try {
        const id = Number(req.params.id);
        courseService.deleteCourse(id);
        res.sendStatus(204);
    } catch (error) {
        // 404 אם הקורס לא נמצא, אחרת 500
        res.status(error.status || 500).json({ error: error.message });
    }
}