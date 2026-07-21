   const students = [
    { id: 101, name: "תמר", grades: [90, 95, 100] },
    { id: 102, name: "יוסי", grades: [85, 88, 92] }
];
export function findAllStudents() {
    return students;
}
export function findStudentById(id) {
    return students.find(s => s.id === id);
}
export function createStudent(studentData) {
    const newStudent = {
        id: students.length + 1,
        ...studentData
    };
    students.push(newStudent);
    return newStudent;
}
export function updateStudent(id, updatedData) {
    const index = students.findIndex(s => s.id === id);
    if (index === -1) return null;

    students[index] = { ...students[index], ...updatedData };
    return students[index];
}
export function deleteStudent(id) {
    const index = students.findIndex(s => s.id === id);
    if (index === -1) return false;

    students.splice(index, 1);
    return true;
}