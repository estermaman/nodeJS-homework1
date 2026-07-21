import express from 'express';
import * as courseController from '../controllers/courseController.js';

const router = express.Router();

// שליפת כל הקורסים
router.get('/', courseController.getAllCourses);

// שליפת קורס בודד
router.get('/:id', courseController.getCourseById);

// יצירת קורס חדש
router.post('/', courseController.createCourse);

export default router;