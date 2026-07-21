import * as studentService from '../services/studentsService.js';

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
        res.status(404).json({ error: error.message });
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
        res.status(404).json({ error: error.message });
    }
}