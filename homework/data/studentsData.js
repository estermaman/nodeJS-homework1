// data/studentsData.js
// שכבת הנתונים של התלמידים - קוראת וכותבת מקובץ JSON באופן א-סינכרוני

import { readJson, writeJson } from './fileStore.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// נתיב מוחלט לקובץ students.json, כדי שהקריאה תעבוד מכל תיקייה שהתהליך רץ ממנה
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const STUDENTS_PATH = path.join(currentDir, 'students.json');

// מחזיר את המזהה הבא: המקסימום הקיים ועוד אחד
// (ולא length + 1, כדי שמחיקה לא תגרום להתנגשות מזהים)
function nextId(students) {
    if (students.length === 0) return 1;
    return Math.max(...students.map(s => s.id)) + 1;
}

// 1. שליפת כל התלמידים
export async function findAllStudents() {
    return readJson(STUDENTS_PATH);
}

// 2. שליפת תלמיד בודד לפי ID
export async function findStudentById(id) {
    const students = await readJson(STUDENTS_PATH);
    return students.find(s => s.id === id);
}

// 3. יצירת תלמיד חדש
export async function createStudent(studentData) {
    const students = await readJson(STUDENTS_PATH);

    const newStudent = {
        id: nextId(students),
        ...studentData
    };

    students.push(newStudent);
    await writeJson(STUDENTS_PATH, students);

    return newStudent;
}

// 4. עדכון תלמיד קיים
export async function updateStudent(id, updatedData) {
    const students = await readJson(STUDENTS_PATH);

    const index = students.findIndex(s => s.id === id);
    if (index === -1) return null;

    students[index] = { ...students[index], ...updatedData };
    await writeJson(STUDENTS_PATH, students);

    return students[index];
}

// 5. מחיקת תלמיד
export async function deleteStudent(id) {
    const students = await readJson(STUDENTS_PATH);

    const index = students.findIndex(s => s.id === id);
    if (index === -1) return false;

    students.splice(index, 1);
    await writeJson(STUDENTS_PATH, students);

    return true;
}
