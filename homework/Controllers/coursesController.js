import * as courseService from '../service/coursesService.js';

// שליפת כל הקורסים
export function getAllCourses(req, res) {
    courseService.getAllCourses()
        .then(courses => {
            res.json(courses);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
}

// שליפת קורס לפי ID
export function getCourseById(req, res) {
    const id = Number(req.params.id);

    courseService.getCourseById(id)
        .then(course => {
            res.json(course);
        })
        .catch(error => {
            // 404 כשהקורס לא נמצא, אחרת 500
            res.status(error.status || 500).json({ error: error.message });
        });
}

// יצירת קורס חדש
export function createCourse(req, res) {
    courseService.createNewCourse(req.body)
        .then(newCourse => {
            res.status(201).json(newCourse);
        })
        .catch(error => {
            // 400 אם הנתונים שגויים, אחרת 500
            res.status(error.status || 500).json({ error: error.message });
        });
}

// עדכון קורס קיים
export function updateCourse(req, res) {
    const id = Number(req.params.id);

    courseService.updateCourse(id, req.body)
        .then(updatedCourse => {
            res.json(updatedCourse);
        })
        .catch(error => {
            // 404 אם הקורס לא נמצא, אחרת 500
            res.status(error.status || 500).json({ error: error.message });
        });
}

// מחיקת קורס
export function deleteCourse(req, res) {
    const id = Number(req.params.id);

    courseService.deleteCourse(id)
        .then(() => {
            res.sendStatus(204);
        })
        .catch(error => {
            // 404 אם הקורס לא נמצא, אחרת 500
            res.status(error.status || 500).json({ error: error.message });
        });
}
