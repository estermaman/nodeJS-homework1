// data/fileStore.js
// עוזרי קריאה וכתיבה לקבצי JSON, באופן א-סינכרוני דרך fs.promises

import { readFile, writeFile } from 'node:fs/promises';

// קריאה של קובץ JSON והחזרת תוכן מפוענח (אובייקט או מערך)
export async function readJson(filePath) {
    // readFile מחזיר פרומיס ל-Buffer, ולכן מחכים עם await
    // עם 'utf8' מקבלים טקסט ולא Buffer
    const text = await readFile(filePath, 'utf8');
    return JSON.parse(text);
}

// כתיבה של אובייקט או מערך לקובץ JSON
export async function writeJson(filePath, data) {
    // null, 2 = הזחה של 2 רווחים כדי שהקובץ יהיה קריא
    const text = JSON.stringify(data, null, 2);
    await writeFile(filePath, text, 'utf8');
}
