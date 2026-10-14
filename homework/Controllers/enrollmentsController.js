import * as enrollmentService from '../service/enrollmentsService.js';

// שליפת כל ההרשמות
export function getAllEnrollments(req, res) {
    try {
        const enrollments = enrollmentService.getAllEnrollments();
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// הרשמת תלמיד לקורס
export function createEnrollment(req, res) {
    try {
        const { studentId, courseId } = req.body;

        if (!studentId || !courseId) {
            return res.status(400).json({ error: 'חובה לספק studentId ו-courseId' });
        }

        const newEnrollment = enrollmentService.enrollStudentToCourse(
            Number(studentId),
            Number(courseId)
        );

        res.status(201).json({
            message: 'ההרשמה בוצעה בהצלחה',
            enrollment: newEnrollment
        });
    } catch (error) {
        // אם השגיאה נבעה מכך שהתלמיד/הקורס לא קיים או שההרשמה כפולה
        res.status(400).json({ error: error.message });
    }
}

// שליפת הקורסים של תלמיד מסוים
export function getStudentCourses(req, res) {
    try {
        const studentId = Number(req.params.studentId);
        const courses = enrollmentService.getCoursesForStudent(studentId);
        res.json(courses);
    } catch (error) {
        // 404 אם התלמיד לא נמצא, אחרת 500
        res.status(error.status || 500).json({ error: error.message });
    }
}

// שליפת הרשמה בודדת לפי ID
export function getEnrollmentById(req, res) {
    try {
        const id = Number(req.params.id);
        const enrollment = enrollmentService.getEnrollmentById(id);
        res.json(enrollment);
    } catch (error) {
        // 404 אם ההרשמה לא נמצאה, אחרת 500
        res.status(error.status || 500).json({ error: error.message });
    }
}

// עדכון הרשמה קיימת
export function updateEnrollment(req, res) {
    try {
        const id = Number(req.params.id);
        const updatedEnrollment = enrollmentService.updateEnrollment(id, req.body);
        res.json(updatedEnrollment);
    } catch (error) {
        // 404 אם ההרשמה לא נמצאה, 400 אם הנתונים שגויים, אחרת 500
        res.status(error.status || 500).json({ error: error.message });
    }
}

// מחיקת הרשמה
export function deleteEnrollment(req, res) {
    try {
        const id = Number(req.params.id);
        enrollmentService.deleteEnrollment(id);
        res.sendStatus(204);
    } catch (error) {
        // 404 אם ההרשמה לא נמצאה, אחרת 500
        res.status(error.status || 500).json({ error: error.message });
    }
}