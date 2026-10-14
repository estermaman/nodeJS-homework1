// middleware/auth.js

// מפתח האימות - נקרא ממשתנה הסביבה AUTH_KEY שבקובץ .env,
// כדי שהסוד לא ייכתב ישירות בקוד המקור ולא ייכנס לגיט.
const AUTH_KEY = process.env.AUTH_KEY;

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
