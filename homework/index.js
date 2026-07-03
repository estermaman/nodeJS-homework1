import http from 'http';
import chalk from 'chalk';
const curses=[{name:'music',description:'learn to play in music',id:455},
{name:'gym',description:'learn atletic and hiphop',id:465},
{name:'bake',description:'learn to cook and bake food',id:475},

];

const port =3000;
const server=http.createServer((req,res)=>{
    if (req.url === '/favicon.ico') { 
       
        res.end(); 
       
        return; 
    }
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    const cursesText=JSON.stringify(curses,null,2);
    
console.log(chalk.green.bold('\n--- משתמש נכנס לשרת! מציג קורסים בלוגים: ---'));
curses.forEach(c => {
    console.log(chalk.blue (`[ID:${c.id}]`)+
        chalk.yellow (`[name:${c.name}]`)+
        chalk.green (`[description:${c.description}]`)
    );});
    res.end(cursesText);
});
server.listen(port, () => {
    console.log(chalk.magenta(`השרת שלך פועל בהצלחה בכתובת: http://localhost:${port}`));
});
