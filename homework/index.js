import express from 'express';

// ייבוא הראוטרים
import studentRouter from './routes/students.js';
import courseRouter from './routes/courses.js';
import enrollmentRouter from './routes/enrollments.js';

const app = express();

// Middleware לפענוח JSON בבקשות נכנסות
app.use(express.json());

// רישום הראוטרים לפי נתיבים מרכזיים
app.use('/api/students', studentRouter);
app.use('/api/courses', courseRouter);
app.use('/api/enrollments', enrollmentRouter);

// הפעלת השרת
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});