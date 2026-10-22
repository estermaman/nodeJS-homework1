import * as enrollmentsData from '../data/enrollmentsData.js';
import * as studentsData from '../data/studentsData.js';
import * as coursesData from '../data/coursesData.js';

// 1. קבלת כל ההרשמות במערכת
export async function getAllEnrollments() {
    return enrollmentsData.findAllEnrollments();
}

// 2. ביצוע הרשמה של תלמיד לקורס (עם כל הבדיקות העסקיות)
export async function enrollStudentToCourse(studentId, courseId) {
    // שלוש הבדיקות בלתי תלויות זו בזו, ולכן מריצים אותן במקביל עם Promise.all
    const [student, course, existingEnrollment] = await Promise.all([
        studentsData.findStudentById(studentId),
        coursesData.findCourseById(courseId),
        enrollmentsData.findEnrollmentByStudentAndCourse(studentId, courseId)
    ]);

    // א. בדיקה שהתלמיד קיים בשכבת הנתונים של התלמידים
    if (!student) {
        const error = new Error(`תלמיד עם מזהה ${studentId} לא נמצא במערכת`);
        error.status = 404;
        throw error;
    }

    // ב. בדיקה שהקורס קיים בשכבת הנתונים של הקורסים
    if (!course) {
        const error = new Error(`קורס עם מזהה ${courseId} לא נמצא במערכת`);
        error.status = 404;
        throw error;
    }

    // ג. בדיקה שהתלמיד לא נרשם כבר לקורס הזה
    if (existingEnrollment) {
        const error = new Error('התלמיד כבר רשום לקורס זה');
        error.status = 400;
        throw error;
    }

    // ד. אם הכל תקין – מבצעים את ההרשמה
    return enrollmentsData.createEnrollment(studentId, courseId);
}

// 3. שליפת כל הקורסים שרשום אליהם תלמיד מסוים
export async function getCoursesForStudent(studentId) {
    const student = await studentsData.findStudentById(studentId);
    if (!student) {
        const error = new Error(`תלמיד עם מזהה ${studentId} לא נמצא במערכת`);
        error.status = 404;
        throw error;
    }

    return enrollmentsData.findEnrollmentsByStudentId(studentId);
}

// 4. שליפת הרשמה בודדת לפי ID (עם בדיקת קיום)
export async function getEnrollmentById(id) {
    const enrollment = await enrollmentsData.findEnrollmentById(id);
    if (!enrollment) {
        const error = new Error(`הרשמה עם מזהה ${id} לא נמצאה`);
        error.status = 404;
        throw error;
    }
    return enrollment;
}

// 5. עדכון הרשמה קיימת
export async function updateEnrollment(id, enrollmentData) {
    // אם ההרשמה לא קיימת – getEnrollmentById כבר זורק שגיאה עם סטטוס 404
    await getEnrollmentById(id);

    // מעדכנים רק את studentId ו-courseId, אם נשלחו
    const allowedData = {};
    if (enrollmentData.studentId !== undefined) {
        allowedData.studentId = Number(enrollmentData.studentId);
    }
    if (enrollmentData.courseId !== undefined) {
        allowedData.courseId = Number(enrollmentData.courseId);
    }

    // אם עודכנו מזהים – בודקים במקביל שהם מצביעים על רשומות קיימות
    const [student, course] = await Promise.all([
        allowedData.studentId !== undefined
            ? studentsData.findStudentById(allowedData.studentId)
            : null,
        allowedData.courseId !== undefined
            ? coursesData.findCourseById(allowedData.courseId)
            : null
    ]);

    if (allowedData.studentId !== undefined && !student) {
        const error = new Error(`תלמיד עם מזהה ${allowedData.studentId} לא נמצא במערכת`);
        error.status = 400;
        throw error;
    }
    if (allowedData.courseId !== undefined && !course) {
        const error = new Error(`קורס עם מזהה ${allowedData.courseId} לא נמצא במערכת`);
        error.status = 400;
        throw error;
    }

    return enrollmentsData.updateEnrollment(id, allowedData);
}

// 6. מחיקת הרשמה
export async function deleteEnrollment(id) {
    // אם ההרשמה לא קיימת – getEnrollmentById כבר זורק שגיאה עם סטטוס 404
    await getEnrollmentById(id);

    await enrollmentsData.deleteEnrollment(id);
}
