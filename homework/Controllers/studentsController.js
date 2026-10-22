import * as studentService from '../service/studentsService.js';

// שליפת כל התלמידים
export function getAllStudents(req, res) {
    studentService.getAllStudents()
        .then(students => {
            res.json(students);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
}

// שליפת תלמיד לפי ID
export function getStudentById(req, res) {
    const id = Number(req.params.id);

    studentService.getStudentById(id)
        .then(student => {
            res.json(student);
        })
        .catch(error => {
            // 404 אם התלמיד לא נמצא, אחרת 500
            res.status(error.status || 500).json({ error: error.message });
        });
}

// יצירת תלמיד חדש
export function createStudent(req, res) {
    studentService.createNewStudent(req.body)
        .then(newStudent => {
            res.status(201).json(newStudent);
        })
        .catch(error => {
            // 400 אם הנתונים שגויים, אחרת 500
            res.status(error.status || 500).json({ error: error.message });
        });
}

// חישוב ממוצע ציונים לתלמיד
export function getStudentAverage(req, res) {
    const id = Number(req.params.id);

    studentService.getStudentAverage(id)
        .then(average => {
            res.json({ studentId: id, average: average });
        })
        .catch(error => {
            // 404 אם התלמיד לא נמצא, אחרת 500
            res.status(error.status || 500).json({ error: error.message });
        });
}

// עדכון תלמיד קיים
export function updateStudent(req, res) {
    const id = Number(req.params.id);

    studentService.updateStudent(id, req.body)
        .then(updatedStudent => {
            res.json(updatedStudent);
        })
        .catch(error => {
            // 404 אם התלמיד לא נמצא, 400 אם הנתונים שגויים, אחרת 500
            res.status(error.status || 500).json({ error: error.message });
        });
}

// מחיקת תלמיד
export function deleteStudent(req, res) {
    const id = Number(req.params.id);

    studentService.deleteStudent(id)
        .then(() => {
            res.sendStatus(204);
        })
        .catch(error => {
            // 404 אם התלמיד לא נמצא, אחרת 500
            res.status(error.status || 500).json({ error: error.message });
        });
}
