// services/courseService.js
import * as coursesData from '../data/coursesData.js';

// 1. קבלת כל הקורסים
export async function getAllCourses() {
    return coursesData.findAllCourses();
}

// 2. קבלת קורס לפי ID
export async function getCourseById(id) {
    const course = await coursesData.findCourseById(id);
    if (!course) {
        const error = new Error(`קורס עם מזהה ${id} לא נמצא`);
        error.status = 404;
        throw error;
    }
    return course;
}

// 3. יצירת קורס חדש עם בדיקת תקינות
export async function createNewCourse(courseData) {
    if (!courseData.title || courseData.title.trim() === '') {
        const error = new Error('חובה לספק שם לקורס');
        error.status = 400;
        throw error;
    }

    if (!courseData.hours || courseData.hours <= 0) {
        const error = new Error('מספר שעות הקורס חייב להיות גדול מ-0');
        error.status = 400;
        throw error;
    }

    return coursesData.createCourse(courseData);
}

// 4. עדכון קורס קיים
export async function updateCourse(id, courseData) {
    // אם הקורס לא קיים – getCourseById כבר זורק שגיאה עם סטטוס 404
    await getCourseById(id);

    return coursesData.updateCourse(id, courseData);
}

// 5. מחיקת קורס
export async function deleteCourse(id) {
    // אם הקורס לא קיים – getCourseById כבר זורק שגיאה עם סטטוס 404
    await getCourseById(id);

    await coursesData.deleteCourse(id);
}
