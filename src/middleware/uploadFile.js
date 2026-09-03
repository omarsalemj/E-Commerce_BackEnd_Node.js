import multer from "multer";
import AppError from "../utils/AppError.js";


let options = (folderName)=>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`);
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + '-' + file.originalname);
        }
    });

    function fileFilter(req, file, cb) {
        // Accept images only
        if (!file.mimetype.startsWith('image/')) {
            return cb(new AppError('Only image files are allowed!', 400), false);
        }
        cb(null, true);
    }

    return multer({ storage, fileFilter });
}


export const uploadSingleFile = (fieldName, folderName) => options(folderName).single(fieldName);

export const uploadMixFiles = (arrOfFildes, folderName) => options(folderName).fields(arrOfFildes);