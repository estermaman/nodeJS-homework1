const enrollments = [
    { id: 1, studentId: 101, courseId: 501, enrolledAt: '2026-01-15' },
    { id: 2, studentId: 102, courseId: 502, enrolledAt: '2026-02-15' }

];
export function findAllEnrollments() {
    return enrollments;
}
export function findEnrollmentByStudentAndCourse(studentId, courseId) {
    return enrollments.find(e => e.studentId === studentId && e.courseId === courseId);
}

export function createEnrollment(studentId, courseId) {
    const newEnrollment = {
        id: enrollments.length + 1,
        studentId,
        courseId,
        enrolledAt: new Date().toISOString().split('T')[0]
    };
    enrollments.push(newEnrollment);
    return newEnrollment;
}