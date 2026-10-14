// טעינת משתני הסביבה מקובץ .env לתוך process.env
// חייב להיות הייבוא הראשון, לפני כל קוד שקורא ל-process.env
import 'dotenv/config';

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
// הפורט נקרא ממשתנה הסביבה PORT, ואם הוא חסר - ברירת מחדל 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});