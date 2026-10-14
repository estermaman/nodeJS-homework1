import express from 'express';
import * as studentController from '../Controllers/studentsController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// בדיקת הרשאה לכל הקריאות ב-router הזה
router.use(authMiddleware);

// שליפת כל התלמידים
router.get('/', studentController.getAllStudents);

// שליפת תלמיד בודד
router.get('/:id', studentController.getStudentById);

// יצירת תלמיד חדש
router.post('/', studentController.createStudent);

// חישוב ממוצע ציונים לתלמיד
router.get('/:id/average', studentController.getStudentAverage);

// עדכון תלמיד קיים
router.put('/:id', studentController.updateStudent);

// מחיקת תלמיד
router.delete('/:id', studentController.deleteStudent);

export default router;