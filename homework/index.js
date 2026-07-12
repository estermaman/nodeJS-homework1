import express from 'express';
import chalk from 'chalk';

// חובה להוסיף סיומת .js בסוף הנתיב של קבצים מקומיים!
import coursesRouter from './routes/courses.js';
import studentsRouter from './routes/students.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// נתיב הבית הראשי - http://localhost:3000
app.get('/', (req, res) => {
    console.log(chalk.magenta('\n--- 🏠 בקשה הגיעה לנתיב הבית הראשי! ---'));
    res.json({
        status: "success",
        message: "השרת פעיל ועובד כראוי",
        description: "מערכת ניהול קורסים ותלמידים בגרסה המודרנית ביותר"
    });
});

app.use('/courses', coursesRouter);
app.use('/students', studentsRouter);

app.listen(PORT, () => {
    console.log(chalk.green.bold(`\n השרת נדלק בהצלחה ומקשיב בפורט ${PORT}! 🚀`));
});