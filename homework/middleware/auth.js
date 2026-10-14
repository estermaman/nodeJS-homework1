// middleware/auth.js

// מפתח האימות.
// הערה: בפרויקט אמיתי יש לשמור סוד זה בקובץ .env (משתנה סביבה),
// ולא לכתוב אותו ישירות בקוד המקור.
const AUTH_KEY = 'demo-key-123';

// מידלוור לבדיקת הרשאה לפי header בשם auth-key
export function authMiddleware(req, res, next) {
    // לוג בכל קריאה - כדי לוודא שהמידלוור אכן רץ
    console.log(`נקראה בקשה: ${req.method} ${req.originalUrl}`);

    // קריאת ה-header בשם auth-key
    const authKey = req.get('auth-key');

    // אם אין header או שהערך שגוי - מחזירים 401 ולא ממשיכים
    if (!authKey || authKey !== AUTH_KEY) {
        return res.status(401).json({ error: 'לא מורשה - חסר או שגוי auth-key' });
    }

    // המפתח תקין - ממשיכים לתחנה הבאה
    next();
}
