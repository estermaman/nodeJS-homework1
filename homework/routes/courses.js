import express from 'express';
import chalk from 'chalk';

const router = express.Router();

const courses = [
    { name: 'music', description: 'learn to play in music', id: 455 },
    { name: 'gym', description: 'learn athletics and sports', id: 465 },
    { name: 'bake', description: 'learn to cook and bake food', id: 475 }
];

router.get('/', (req, res) => {
    console.log(chalk.yellow.bold('\n============================================='));
    console.log(chalk.yellow.bold('      📚 בקשה הגיעה לראוטר הקורסים המעודכן     '));
    console.log(chalk.yellow.bold('============================================='));
    
    courses.forEach(c => {
        console.log('\n' + chalk.gray('-----------------------------------------'));
        console.log(`${chalk.cyan('📌 קורס:')} ${chalk.white(c.name)}`);
        console.log(`${chalk.green('🆔 מזהה:')} ${chalk.white(c.id)}`);
        console.log(`${chalk.magenta('📝 תיאור:')} ${chalk.gray(c.description)}`);
        console.log(chalk.gray('-----------------------------------------'));
    });

    res.json(courses);
});
router.get('/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const course = courses.find(c => c.id === courseId);

    if (!course) {
        console.log(chalk.red(`\n❌ קורס עם מזהה ${courseId} לא נמצא!`));
        return res.status(404).json({ message: "הקורס המבוקש לא נמצא" });
    }

    console.log(chalk.cyan(`\n🔍 נמצא קורס: ${course.name}`));
    res.json(course);
});
router.post('/', (req, res) => {
    // 1. בדיקה שגוף הבקשה מכיל את השדות החיוניים (שם ותיאור)
    if (!req.body.name || !req.body.description) {
        console.log(chalk.red('\n❌ ניסיון ליצירת קורס נכשל: חסרים פרטי חובה!'));
        return res.status(400).json({ message: "חובה להזין שם ותיאור עבור הקורס" });
    }

    // 2. יצירת מזהה (ID) ייחודי וחדש עבור הקורס
    // אנחנו לוקחים את ה-ID של הקורס האחרון במערך ומוסיפים לו 10 (כדי לשמור על קפיצות של 10 כמו בדוגמה שלך)
    const lastCourse = courses[courses.length - 1];
    const newId = lastCourse ? lastCourse.id + 10 : 455;

    // 3. יצירת אובייקט הקורס החדש
    const newCourse = {
        name: req.body.name,
        description: req.body.description,
        id: newId
    };

    // 4. הוספת הקורס החדש למערך הקיים
    courses.push(newCourse);

    console.log(chalk.green(`\n✅ קורס חדש נוצר בהצלחה: ${newCourse.name} (ID: ${newCourse.id})`));
    
    // 5. החזרת תשובה עם סטטוס 210 (נוצר בהצלחה) יחד עם האובייקט החדש
    res.status(201).json(newCourse);
});
router.put('/:id', (req, res) => {
    // 1. שליפת ה-ID מהכתובת והמרתו למספר
    const courseId = parseInt(req.params.id);
    
    // 2. חיפוש הקורס המתאים במערך
    const course = courses.find(c => c.id === courseId);

    // 3. אם הקורס לא נמצא - מחזירים שגיאה 404 ומפסיקים
    if (!course) {
        console.log(chalk.red(`\n❌ ניסיון עדכון נכשל: קורס ${courseId} לא קיים!`));
        return res.status(404).json({ message: "הקורס המבוקש לעדכון לא נמצא" });
    }

    // 4. בדיקה ששלחו לפחות שדה אחד לעדכון
    if (!req.body.name && !req.body.description) {
        console.log(chalk.red('\n❌ ניסיון עדכון נכשל: לא נשלחו נתונים לעדכון!'));
        return res.status(400).json({ message: "חובה להזין שם או תיאור לעדכון" });
    }

    // 5. עדכון השדות במידה והם נשלחו ב-body
    if (req.body.name) {
        course.name = req.body.name;
    }
    if (req.body.description) {
        course.description = req.body.description;
    }

    console.log(chalk.yellow(`\n✏️  קורס מספר ${courseId} עודכן בהצלחה`));
    
    // 6. החזרת האובייקט המעודכן ללקוח
    res.json(course);
});
router.delete('/:id', (req, res) => {
    // 1. שליפת ה-ID מהכתובת והמרתו למספר
    const courseId = parseInt(req.params.id);
    
    // 2. מציאת המיקום (האינדקס) של הקורס בתוך המערך
    const courseIndex = courses.findIndex(c => c.id === courseId);

    // 3. אם הקורס לא קיים במערך (הפונקציה מחזירה 1-)
    if (courseIndex === -1) {
        console.log(chalk.red(`\n❌ ניסיון מחיקה נכשל: קורס ${courseId} לא נמצא!`));
        return res.status(404).json({ message: "הקורס המבוקש למחיקה לא נמצא" });
    }

    // 4. מחיקת הקורס מתוך המערך באמצעות splice
    courses.splice(courseIndex, 1);

    console.log(chalk.red(`\n🗑️  קורס מספר ${courseId} נמחק בהצלחה`));
    
    // 5. החזרת הודעת אישור ללקוח
    res.json({ message: "הקורס נמחק בהצלחה מהמערכת" });
});

export default router;