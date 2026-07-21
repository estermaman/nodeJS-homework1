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
        throw new Error(`קורס עם מזהה ${id} לא נמצא`);
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