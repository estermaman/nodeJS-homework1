import express from 'express';
import * as studentController from '../controllers/studentController.js';

const router = express.Router();

// שליפת כל התלמידים
router.get('/', studentController.getAllStudents);

// שליפת תלמיד בודד
router.get('/:id', studentController.getStudentById);

// יצירת תלמיד חדש
router.post('/', studentController.createStudent);

// חישוב ממוצע ציונים לתלמיד
router.get('/:id/average', studentController.getStudentAverage);

export default router;