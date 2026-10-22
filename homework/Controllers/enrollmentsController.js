import * as enrollmentService from '../service/enrollmentsService.js';

// שליפת כל ההרשמות
export function getAllEnrollments(req, res) {
    enrollmentService.getAllEnrollments()
        .then(enrollments => {
            res.json(enrollments);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
}

// הרשמת תלמיד לקורס
export function createEnrollment(req, res) {
    const { studentId, courseId } = req.body;

    if (!studentId || !courseId) {
        return res.status(400).json({ error: 'חובה לספק studentId ו-courseId' });
    }

    enrollmentService.enrollStudentToCourse(Number(studentId), Number(courseId))
        .then(newEnrollment => {
            res.status(201).json({
                message: 'ההרשמה בוצעה בהצלחה',
                enrollment: newEnrollment
            });
        })
        .catch(error => {
            // 404 אם התלמיד/הקורס לא קיים, 400 אם ההרשמה כפולה, אחרת 500
            res.status(error.status || 500).json({ error: error.message });
        });
}

// שליפת הקורסים של תלמיד מסוים
export function getStudentCourses(req, res) {
    const studentId = Number(req.params.studentId);

    enrollmentService.getCoursesForStudent(studentId)
        .then(courses => {
            res.json(courses);
        })
        .catch(error => {
            // 404 אם התלמיד לא נמצא, אחרת 500
            res.status(error.status || 500).json({ error: error.message });
        });
}

// שליפת הרשמה בודדת לפי ID
export function getEnrollmentById(req, res) {
    const id = Number(req.params.id);

    enrollmentService.getEnrollmentById(id)
        .then(enrollment => {
            res.json(enrollment);
        })
        .catch(error => {
            // 404 אם ההרשמה לא נמצאה, אחרת 500
            res.status(error.status || 500).json({ error: error.message });
        });
}

// עדכון הרשמה קיימת
export function updateEnrollment(req, res) {
    const id = Number(req.params.id);

    enrollmentService.updateEnrollment(id, req.body)
        .then(updatedEnrollment => {
            res.json(updatedEnrollment);
        })
        .catch(error => {
            // 404 אם ההרשמה לא נמצאה, 400 אם הנתונים שגויים, אחרת 500
            res.status(error.status || 500).json({ error: error.message });
        });
}

// מחיקת הרשמה
export function deleteEnrollment(req, res) {
    const id = Number(req.params.id);

    enrollmentService.deleteEnrollment(id)
        .then(() => {
            res.sendStatus(204);
        })
        .catch(error => {
            // 404 אם ההרשמה לא נמצאה, אחרת 500
            res.status(error.status || 500).json({ error: error.message });
        });
}
