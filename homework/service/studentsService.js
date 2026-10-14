// services/studentService.js
import * as studentsData from '../data/studentsData.js';

// 1. קבלת כל התלמידים
export function getAllStudents() {
    return studentsData.findAllStudents();
}

// 2. קבלת תלמיד לפי ID עם טיפול במצב שבו הוא לא נמצא
export function getStudentById(id) {
    const student = studentsData.findStudentById(id);
    if (!student) {
        const error = new Error(`תלמיד עם מזהה ${id} לא נמצא`);
        error.status = 404;
        throw error;
    }
    return student;
}

// 3. יצירת תלמיד חדש עם בדיקת תקינות נ
// תונים
export function createNewStudent(studentData) {
    if (!studentData.name || studentData.name.trim() === '') {
        throw new Error('חובה לספק שם תלמיד');
    }

    // הגדרת ערך ברירת מחדל לציונים אם לא נשלחו
    const newStudent = {
        name: studentData.name,
        grades: studentData.grades || []
    };

    return studentsData.createStudent(newStudent);
}

// 4. חישוב ממוצע ציונים של תלמיד (לוגיקה עסקית)
export function getStudentAverage(id) {
    const student = getStudentById(id); // משתמש בפונקציה שכבר בודקת קיום
    
    if (student.grades.length === 0) {
        return 0;
    }

    const total = student.grades.reduce((sum, g) => sum + g, 0);
    return total / student.grades.length;
}

// 5. עדכון תלמיד קיים
export function updateStudent(id, studentData) {
    // אם התלמיד לא קיים – getStudentById כבר זורק שגיאה עם סטטוס 404
    getStudentById(id);

    // מעדכנים רק שדות מותרים, כדי שלא יוזרקו שדות כמו id
    const allowedData = {};
    if (studentData.name !== undefined) {
        if (studentData.name.trim() === '') {
            const error = new Error('חובה לספק שם תלמיד');
            error.status = 400;
            throw error;
        }
        allowedData.name = studentData.name;
    }
    if (studentData.grades !== undefined) {
        allowedData.grades = studentData.grades;
    }

    return studentsData.updateStudent(id, allowedData);
}

// 6. מחיקת תלמיד
export function deleteStudent(id) {
    // אם התלמיד לא קיים – getStudentById כבר זורק שגיאה עם סטטוס 404
    getStudentById(id);

    studentsData.deleteStudent(id);
}