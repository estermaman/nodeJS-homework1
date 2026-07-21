const courses = [
    { id: 501, title: "Node.js & Express", hours: 40 },
    { id: 502, title: "React Fundamentals", hours: 50 }
];
// 1. שליפת כל הקורסים
export function findAllCourses() {
    return courses;
}

// 2. שליפת קורס בודד לפי ID
export function findCourseById(id) {
    return courses.find(c => c.id === id);
}

// 3. הוספת קורס חדש
export function createCourse(courseData) {
    const newCourse = {
        id: courses.length + 101, // דוגמה למזהה
        ...courseData
    };
    courses.push(newCourse);
    return newCourse;
}

// 4. עדכון קורס
export function updateCourse(id, updatedData) {
    const index = courses.findIndex(c => c.id === id);
    if (index === -1) return null;

    courses[index] = { ...courses[index], ...updatedData };
    return courses[index];
}

// 5. מחיקת קורס
export function deleteCourse(id) {
    const index = courses.findIndex(c => c.id === id);
    if (index === -1) return false;

    courses.splice(index, 1);
    return true;
}