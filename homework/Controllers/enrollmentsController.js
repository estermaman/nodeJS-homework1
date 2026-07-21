import * as enrollmentService from '../services/enrollmentsService.js';

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
        res.status(404).json({ error: error.message });
    }
}