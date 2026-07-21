import express from 'express';
import * as enrollmentController from '../controllers/enrollmentController.js';

const router = express.Router();

// שליפת כל ההרשמות
router.get('/', enrollmentController.getAllEnrollments);

// הרשמת תלמיד לקורס
router.post('/', enrollmentController.createEnrollment);

// שליפת קורסים של תלמיד מסוים
router.get('/student/:studentId', enrollmentController.getStudentCourses);

export default router;