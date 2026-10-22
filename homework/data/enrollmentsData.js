// data/enrollmentsData.js
// שכבת הנתונים של ההרשמות - קוראת וכותבת מקובץ JSON באופן א-סינכרוני

import { readJson, writeJson } from './fileStore.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// נתיב מוחלט לקובץ enrollments.json
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const ENROLLMENTS_PATH = path.join(currentDir, 'enrollments.json');

// מחזיר את המזהה הבא: המקסימום הקיים ועוד אחד
// (ולא length + 1, כדי שמחיקה לא תגרום להתנגשות מזהים)
function nextId(enrollments) {
    if (enrollments.length === 0) return 1;
    return Math.max(...enrollments.map(e => e.id)) + 1;
}

// 1. שליפת כל ההרשמות
export async function findAllEnrollments() {
    return readJson(ENROLLMENTS_PATH);
}

// 2. שליפת ההרשמות של תלמיד מסוים
export async function findEnrollmentsByStudentId(studentId) {
    const enrollments = await readJson(ENROLLMENTS_PATH);
    return enrollments.filter(e => e.studentId === studentId);
}

// 3. בדיקה אם תלמיד כבר רשום לקורס
export async function findEnrollmentByStudentAndCourse(studentId, courseId) {
    const enrollments = await readJson(ENROLLMENTS_PATH);
    return enrollments.find(e => e.studentId === studentId && e.courseId === courseId);
}

// 4. יצירת הרשמה חדשה
export async function createEnrollment(studentId, courseId) {
    const enrollments = await readJson(ENROLLMENTS_PATH);

    const newEnrollment = {
        id: nextId(enrollments),
        studentId,
        courseId,
        enrolledAt: new Date().toISOString().split('T')[0]
    };

    enrollments.push(newEnrollment);
    await writeJson(ENROLLMENTS_PATH, enrollments);

    return newEnrollment;
}

// 5. שליפת הרשמה בודדת לפי ID
export async function findEnrollmentById(id) {
    const enrollments = await readJson(ENROLLMENTS_PATH);
    return enrollments.find(e => e.id === id);
}

// 6. עדכון הרשמה קיימת
export async function updateEnrollment(id, updatedData) {
    const enrollments = await readJson(ENROLLMENTS_PATH);

    const index = enrollments.findIndex(e => e.id === id);
    if (index === -1) return null;

    enrollments[index] = { ...enrollments[index], ...updatedData };
    await writeJson(ENROLLMENTS_PATH, enrollments);

    return enrollments[index];
}

// 7. מחיקת הרשמה
export async function deleteEnrollment(id) {
    const enrollments = await readJson(ENROLLMENTS_PATH);

    const index = enrollments.findIndex(e => e.id === id);
    if (index === -1) return false;

    enrollments.splice(index, 1);
    await writeJson(ENROLLMENTS_PATH, enrollments);

    return true;
}
