// data/coursesData.js
// שכבת הנתונים של הקורסים - קוראת וכותבת מקובץ JSON באופן א-סינכרוני

import { readJson, writeJson } from './fileStore.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// נתיב מוחלט לקובץ courses.json
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const COURSES_PATH = path.join(currentDir, 'courses.json');

// מחזיר את המזהה הבא: המקסימום הקיים ועוד אחד
function nextId(courses) {
    if (courses.length === 0) return 1;
    return Math.max(...courses.map(c => c.id)) + 1;
}

// 1. שליפת כל הקורסים
export async function findAllCourses() {
    return readJson(COURSES_PATH);
}

// 2. שליפת קורס בודד לפי ID
export async function findCourseById(id) {
    const courses = await readJson(COURSES_PATH);
    return courses.find(c => c.id === id);
}

// 3. הוספת קורס חדש
export async function createCourse(courseData) {
    const courses = await readJson(COURSES_PATH);

    const newCourse = {
        id: nextId(courses),
        ...courseData
    };

    courses.push(newCourse);
    await writeJson(COURSES_PATH, courses);

    return newCourse;
}

// 4. עדכון קורס
export async function updateCourse(id, updatedData) {
    const courses = await readJson(COURSES_PATH);

    const index = courses.findIndex(c => c.id === id);
    if (index === -1) return null;

    courses[index] = { ...courses[index], ...updatedData };
    await writeJson(COURSES_PATH, courses);

    return courses[index];
}

// 5. מחיקת קורס
export async function deleteCourse(id) {
    const courses = await readJson(COURSES_PATH);

    const index = courses.findIndex(c => c.id === id);
    if (index === -1) return false;

    courses.splice(index, 1);
    await writeJson(COURSES_PATH, courses);

    return true;
}
