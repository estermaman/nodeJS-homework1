import express from 'express';
import chalk from 'chalk';

const router = express.Router();

const students = [
    { id: 1, name: 'Rachel', major: 'Computer Science' },
    { id: 2, name: 'Sarah', major: 'Software Development' },
    { id: 3, name: 'Esther', major: 'Data Science' }
];

router.get('/', (req, res) => {
    console.log(chalk.blue.bold('\n============================================='));
    console.log(chalk.blue.bold('      👥 בקשה הגיעה לראוטר התלמידים המעודכן     '));
    console.log(chalk.blue.bold('\n============================================='));
    
    students.forEach(s => {
        console.log('\n' + chalk.gray('-----------------------------------------'));
        console.log(`${chalk.blue('👤 תלמיד:')} ${chalk.white(s.name)}`);
        console.log(`${chalk.cyan('🆔 מזהה:')} ${chalk.white(s.id)}`);
        console.log(`${chalk.gray('🎓 מסלול:')} ${chalk.white(s.major)}`);
        console.log(chalk.gray('-----------------------------------------'));
    });

    res.json(students);
});
router.get('/:id', (req, res) => {
    // 1. שליפת המזהה מהכתובת והמרתו למספר
    const studentId = parseInt(req.params.id);
    
    // 2. חיפוש התלמיד במערך הקיים
    const student = students.find(s => s.id === studentId);

    // 3. אם התלמיד לא נמצא - מחזירים שגיאה 404
    if (!student) {
        console.log(chalk.red(`\n❌ תלמיד עם מזהה ${studentId} לא נמצא!`));
        return res.status(404).json({ message: "התלמיד המבוקש לא נמצא" });
    }

    console.log(chalk.blue(`\n🔍 נמצא תלמיד: ${student.name}`));
    
    // 4. החזרת פרטי התלמיד שנמצא
    res.json(student);
});
router.post('/', (req, res) => {
    // 1. בדיקה שגוף הבקשה מכיל את השדות החיוניים (שם ומסלול לימודים)
    if (!req.body.name || !req.body.major) {
        console.log(chalk.red('\n❌ ניסיון ליצירת תלמיד נכשל: חסרים פרטי חובה!'));
        return res.status(400).json({ message: "חובה להזין שם ומסלול לימודים עבור התלמיד" });
    }

    // 2. יצירת מזהה (ID) ייחודי וחדש עבור התלמיד
    // אנחנו לוקחים את ה-ID של התלמיד האחרון במערך ומוסיפים לו 1
    const lastStudent = students[students.length - 1];
    const newId = lastStudent ? lastStudent.id + 1 : 1;

    // 3. יצירת אובייקט התלמיד החדש
    const newStudent = {
        id: newId,
        name: req.body.name,
        major: req.body.major
    };

    // 4. הוספת התלמיד החדש למערך הקיים
    students.push(newStudent);

    console.log(chalk.blue(`\n✅ תלמיד חדש נוסף בהצלחה: ${newStudent.name} (ID: ${newStudent.id})`));
    
    // 5. החזרת תשובה עם סטטוס 201 (נוצר בהצלחה)
    res.status(201).json(newStudent);
});
router.put('/:id', (req, res) => {
    // 1. שליפת ה-ID מהכתובת והמרתו למספר
    const studentId = parseInt(req.params.id);
    
    // 2. חיפוש התלמיד המתאים במערך
    const student = students.find(s => s.id === studentId);

    // 3. אם התלמיד לא נמצא - מחזירים שגיאה 404 ומפסיקים
    if (!student) {
        console.log(chalk.red(`\n❌ ניסיון עדכון נכשל: תלמיד ${studentId} לא קיים!`));
        return res.status(404).json({ message: "התלמיד המבוקש לעדכון לא נמצא" });
    }

    // 4. בדיקה ששלחו לפחות שדה אחד לעדכון (שם או מסלול לימודים)
    if (!req.body.name && !req.body.major) {
        console.log(chalk.red('\n❌ ניסיון עדכון נכשל: לא נשלחו נתונים לעדכון!'));
        return res.status(400).json({ message: "חובה להזין שם או מסלול לימודים לעדכון" });
    }

    // 5. עדכון השדות במידה והם נשלחו ב-body
    if (req.body.name) {
        student.name = req.body.name;
    }
    if (req.body.major) {
        student.major = req.body.major;
    }

    console.log(chalk.blue(`\n✏️  תלמיד מספר ${studentId} עודכן בהצלחה`));
    
    // 6. החזרת האובייקט המעודכן ללקוח
    res.json(student);
});
router.delete('/:id', (req, res) => {
    // 1. שליפת ה-ID מהכתובת והמרתו למספר
    const studentId = parseInt(req.params.id);
    
    // 2. מציאת המיקום (האינדקס) של התלמיד בתוך המערך
    const studentIndex = students.findIndex(s => s.id === studentId);

    // 3. אם התלמיד לא קיים במערך
    if (studentIndex === -1) {
        console.log(chalk.red(`\n❌ ניסיון מחיקה נכשל: תלמיד ${studentId} לא נמצא!`));
        return res.status(404).json({ message: "התלמיד המבוקש למחיקה לא נמצא" });
    }

    // 4. מחיקת התלמיד מתוך המערך באמצעות splice
    students.splice(studentIndex, 1);

    console.log(chalk.red(`\n🗑️  תלמיד מספר ${studentId} נמחק בהצלחה`));
    
    // 5. החזרת הודעת אישור ללקוח
    res.json({ message: "התלמיד נמחק בהצלחה מהמערכת" });
});
export default router;