import express from 'express';
import chalk from 'chalk';

const router = express.Router();

const courses = [
    { name: 'music', description: 'learn to play in music', id: 455 },
    { name: 'gym', description: 'learn athletics and sports', id: 465 },
    { name: 'bake', description: 'learn to cook and bake food', id: 475 }
];

router.get('/', (req, res) => {
    console.log(chalk.yellow.bold('\n============================================='));
    console.log(chalk.yellow.bold('      📚 בקשה הגיעה לראוטר הקורסים המעודכן     '));
    console.log(chalk.yellow.bold('============================================='));
    
    courses.forEach(c => {
        console.log('\n' + chalk.gray('-----------------------------------------'));
        console.log(`${chalk.cyan('📌 קורס:')} ${chalk.white(c.name)}`);
        console.log(`${chalk.green('🆔 מזהה:')} ${chalk.white(c.id)}`);
        console.log(`${chalk.magenta('📝 תיאור:')} ${chalk.gray(c.description)}`);
        console.log(chalk.gray('-----------------------------------------'));
    });

    res.json(courses);
});

export default router;