import express from 'express';
import * as enrollmentController from '../Controllers/enrollmentsController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// בדיקת הרשאה לכל הקריאות ב-router הזה
router.use(authMiddleware);

// שליפת כל ההרשמות
router.get('/', enrollmentController.getAllEnrollments);

// הרשמת תלמיד לקורס
router.post('/', enrollmentController.createEnrollment);

// שליפת קורסים של תלמיד מסוים
router.get('/student/:studentId', enrollmentController.getStudentCourses);

// שליפת הרשמה בודדת
router.get('/:id', enrollmentController.getEnrollmentById);

// עדכון הרשמה קיימת
router.put('/:id', enrollmentController.updateEnrollment);

// מחיקת הרשמה
router.delete('/:id', enrollmentController.deleteEnrollment);

export default router;