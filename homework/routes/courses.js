import express from 'express';
import * as courseController from '../Controllers/coursesController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// בדיקת הרשאה לכל הקריאות ב-router הזה
router.use(authMiddleware);

// שליפת כל הקורסים
router.get('/', courseController.getAllCourses);

// שליפת קורס בודד
router.get('/:id', courseController.getCourseById);

// יצירת קורס חדש
router.post('/', courseController.createCourse);

// עדכון קורס קיים
router.put('/:id', courseController.updateCourse);

// מחיקת קורס
router.delete('/:id', courseController.deleteCourse);

export default router;