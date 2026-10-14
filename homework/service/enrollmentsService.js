import * as enrollmentsData from '../data/enrollmentsData.js';
import * as studentsData from '../data/studentsData.js';
import * as coursesData from '../data/coursesData.js';

// 1. קבלת כל ההרשמות במערכת
export function getAllEnrollments() {
    return enrollmentsData.findAllEnrollments();
}

// 2. ביצוע הרשמה של תלמיד לקורס (עם כל הבדיקות העסקיות)
export function enrollStudentToCourse(studentId, courseId) {
    // א. בדיקה שהתלמיד קיים בשכבת הנתונים של התלמידים
    const student = studentsData.findStudentById(studentId);
    if (!student) {
        throw new Error(`תלמיד עם מזהה ${studentId} לא נמצא במערכת`);
    }

    // ב. בדיקה שהקורס קיים בשכבת הנתונים של הקורסים
    const course = coursesData.findCourseById(courseId);
    if (!course) {
        throw new Error(`קורס עם מזהה ${courseId} לא נמצא במערכת`);
    }

    // ג. בדיקה מול שכבת הנתונים של ההרשמות שהתלמיד לא נרשם כבר לקורס הזה
    const existingEnrollment = enrollmentsData.findEnrollmentByStudentAndCourse(studentId, courseId);
    if (existingEnrollment) {
        throw new Error('התלמיד כבר רשום לקורס זה');
    }

    // ד. אם הכל תקין – מבצעים את ההרשמה
    return enrollmentsData.createEnrollment(studentId, courseId);
}

// 3. שליפת כל הקורסים שרשום אליהם תלמיד מסוים
export function getCoursesForStudent(studentId) {
    const student = studentsData.findStudentById(studentId);
    if (!student) {
        throw new Error(`תלמיד עם מזהה ${studentId} לא נמצא במערכת`);
    }

    return enrollmentsData.findEnrollmentsByStudentId(studentId);
}

// 4. שליפת הרשמה בודדת לפי ID (עם בדיקת קיום)
export function getEnrollmentById(id) {
    const enrollment = enrollmentsData.findEnrollmentById(id);
    if (!enrollment) {
        const error = new Error(`הרשמה עם מזהה ${id} לא נמצאה`);
        error.status = 404;
        throw error;
    }
    return enrollment;
}

// 5. עדכון הרשמה קיימת
export function updateEnrollment(id, enrollmentData) {
    // אם ההרשמה לא קיימת – getEnrollmentById כבר זורק שגיאה עם סטטוס 404
    getEnrollmentById(id);

    // מעדכנים רק את studentId ו-courseId, אם נשלחו
    const allowedData = {};
    if (enrollmentData.studentId !== undefined) {
        allowedData.studentId = Number(enrollmentData.studentId);
    }
    if (enrollmentData.courseId !== undefined) {
        allowedData.courseId = Number(enrollmentData.courseId);
    }

    // אם עודכנו מזהים – בודקים שהם מצביעים על רשומות קיימות
    if (allowedData.studentId !== undefined && !studentsData.findStudentById(allowedData.studentId)) {
        const error = new Error(`תלמיד עם מזהה ${allowedData.studentId} לא נמצא במערכת`);
        error.status = 400;
        throw error;
    }
    if (allowedData.courseId !== undefined && !coursesData.findCourseById(allowedData.courseId)) {
        const error = new Error(`קורס עם מזהה ${allowedData.courseId} לא נמצא במערכת`);
        error.status = 400;
        throw error;
    }

    return enrollmentsData.updateEnrollment(id, allowedData);
}

// 6. מחיקת הרשמה
export function deleteEnrollment(id) {
    // אם ההרשמה לא קיימת – getEnrollmentById כבר זורק שגיאה עם סטטוס 404
    getEnrollmentById(id);

    enrollmentsData.deleteEnrollment(id);
}