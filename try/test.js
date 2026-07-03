const http = require('http');

const curses = [
    { name: 'music', description: 'learn to play in music', id: 455 },
    { name: 'gym', description: 'learn atletic and hiphop', id: 465 },
    { name: 'bake', description: 'learn to cook and bake food', id: 475 }
];

const port = 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    const cursesText = JSON.stringify(curses, null, 2);

    console.log('\n--- משתמש נכנס לשרת! מציג קורסים בלוגים: ---');
    
    curses.forEach(c => {
        console.log(`[ID:${c.id}] [name:${c.name}] [description:${c.description}]`);
    });

    res.end(cursesText);
});

server.listen(port, () => {
    console.log(`=== השרת פועל! כנסי עכשיו בדפדפן ל: http://localhost:${port} ===`);
});