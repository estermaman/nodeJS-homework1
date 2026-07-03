const http = require('http');
const PORT = 3000;
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('הידד! השרת הראשון שלי ב-Node.js עובד בהצלחה! 🚀');
});
server.listen(PORT, () => {
    console.log(`השרת פועל כעת בכתובת: http://localhost:${PORT}`);
});