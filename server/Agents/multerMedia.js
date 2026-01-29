import multer from 'multer';
import path from 'path';
import fs from 'fs';

// tmp uploadDir before processing 
const baseDir = path.join(process.cwd(), 'data', 'media');
if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
}

// storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, baseDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + path.extname(file.originalname));
    },
});

// file filter 
const fileFilter = (req, file, cb) => {
    console.log("Uploading file mimetype:", file.mimetype, "type field:", req.body.type);

    const allowed = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'audio/mpeg',
        'audio/mp3',
        'audio/wav',
        'audio/ogg',
        'video/mp4',
        'video/webm',
    ];

    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported media type'), false);
    }
};

// limits
const limits = {
    fileSize: 100 * 1024 * 1024, 
};

const uploadMedia = multer({
    storage,
    fileFilter,
    limits,
});

export default uploadMedia;
