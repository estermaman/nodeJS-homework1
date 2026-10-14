// services/courseService.js
import * as coursesData from '../data/coursesData.js';

// 1. קבלת כל הקורסים
export function getAllCourses() {
    return coursesData.findAllCourses();
}

// 2. קבלת קורס לפי ID
export function getCourseById(id) {
    const course = coursesData.findCourseById(id);
    if (!course) {
        const error = new Error(`קורס עם מזהה ${id} לא נמצא`);
        error.status = 404;
        throw error;
    }
    return course;
}

// 3. יצירת קורס חדש עם בדיקת תקינות
export function createNewCourse(courseData) {
    if (!courseData.title || courseData.title.trim() === '') {
        throw new Error('חובה לספק שם לקורס');
    }

    if (!courseData.hours || courseData.hours <= 0) {
        throw new Error('מספר שעות הקורס חייב להיות גדול מ-0');
    }

    return coursesData.createCourse(courseData);
}

// 4. עדכון קורס קיים
export function updateCourse(id, courseData) {
    // אם הקורס לא קיים – getCourseById כבר זורק שגיאה עם סטטוס 404
    getCourseById(id);

    return coursesData.updateCourse(id, courseData);
}

// 5. מחיקת קורס
export function deleteCourse(id) {
    // אם הקורס לא קיים – getCourseById כבר זורק שגיאה עם סטטוס 404
    getCourseById(id);

    coursesData.deleteCourse(id);
}