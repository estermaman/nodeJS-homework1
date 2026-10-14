import * as studentService from '../service/studentsService.js';

// שליפת כל התלמידים
export function getAllStudents(req, res) {
    try {
        const students = studentService.getAllStudents();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// שליפת תלמיד לפי ID
export function getStudentById(req, res) {
    try {
        const id = Number(req.params.id);
        const student = studentService.getStudentById(id);
        res.json(student);
    } catch (error) {
        // 404 אם התלמיד לא נמצא, אחרת 500
        res.status(error.status || 500).json({ error: error.message });
    }
}

// יצירת תלמיד חדש
export function createStudent(req, res) {
    try {
        const newStudent = studentService.createNewStudent(req.body);
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// חישוב ממוצע ציונים לתלמיד
export function getStudentAverage(req, res) {
    try {
        const id = Number(req.params.id);
        const average = studentService.getStudentAverage(id);
        res.json({ studentId: id, average: average });
    } catch (error) {
        // 404 אם התלמיד לא נמצא, אחרת 500
        res.status(error.status || 500).json({ error: error.message });
    }
}

// עדכון תלמיד קיים
export function updateStudent(req, res) {
    try {
        const id = Number(req.params.id);
        const updatedStudent = studentService.updateStudent(id, req.body);
        res.json(updatedStudent);
    } catch (error) {
        // 404 אם התלמיד לא נמצא, 400 אם הנתונים שגויים, אחרת 500
        res.status(error.status || 500).json({ error: error.message });
    }
}

// מחיקת תלמיד
export function deleteStudent(req, res) {
    try {
        const id = Number(req.params.id);
        studentService.deleteStudent(id);
        res.sendStatus(204);
    } catch (error) {
        // 404 אם התלמיד לא נמצא, אחרת 500
        res.status(error.status || 500).json({ error: error.message });
    }
}