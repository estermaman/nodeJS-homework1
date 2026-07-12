import express from 'express';
import chalk from 'chalk';

const router = express.Router();

const students = [
    { id: 1, name: 'Rachel', major: 'Computer Science' },
    { id: 2, name: 'Sarah', major: 'Software Development' },
    { id: 3, name: 'Esther', major: 'Data Science' }
];

router.get('/', (req, res) => {
    console.log(chalk.blue.bold('\n============================================='));
    console.log(chalk.blue.bold('      👥 בקשה הגיעה לראוטר התלמידים המעודכן     '));
    console.log(chalk.blue.bold('\n============================================='));
    
    students.forEach(s => {
        console.log('\n' + chalk.gray('-----------------------------------------'));
        console.log(`${chalk.blue('👤 תלמיד:')} ${chalk.white(s.name)}`);
        console.log(`${chalk.cyan('🆔 מזהה:')} ${chalk.white(s.id)}`);
        console.log(`${chalk.gray('🎓 מסלול:')} ${chalk.white(s.major)}`);
        console.log(chalk.gray('-----------------------------------------'));
    });

    res.json(students);
});

export default router;