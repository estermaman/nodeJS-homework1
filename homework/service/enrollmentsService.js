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