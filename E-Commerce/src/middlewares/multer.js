import multer from 'multer';
import { __dirname } from '../utils.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = '/images/';
        switch (file.fieldname) {
            case 'profiles': 
                folder += 'profiles';
                break;
            case 'thumbnails':
                folder += '/public/images/products';
                break;
            case 'identification':
                folder += 'documents';
                break;
            case 'accountCert':
                folder += 'documents';
                break;
            case 'addressCert':
                folder += 'documents';
                break;
        }
        cb(null, __dirname + folder )
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.png');
    }
});

export const uploader = multer({ storage: storage })