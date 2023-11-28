import { createTransport } from 'nodemailer';
import config from '../config/config.js';
import { logger2 } from '../utils/logger.js';

const transporter = createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: config.EMAIL,
        pass: config.PASSWORD
    }
});

const createMsgRegister = (first_name) => {
    return `<h1>Hola ${first_name}, Bienvenido</h1>`;
};
const createMsgReset = (first_name) => {
    return `<h1>Hola ${first_name}, hace click <a href='${config.URL}:${config.PORT}/api/users/new-pass'>AQUI</a> para reestablecer la contraseña</h1>`;
};
const createMsgDelete = (first_name) => {
    return `<h1>Hola ${first_name}, te informamos que tu usuario fue borrado por no ser utilizado</h1>`;
};
const createMsgProdDel = (first_name) => {
    return `<h1>Hola ${first_name}, te informamos que un producto tuyo fue borrado</h1>`;
};
export const sendMail = async (user, service, token = null) => {
    try {
        const { first_name, email } = user;
        let msg = '';

        service == 'register'
        ? msg = createMsgRegister(first_name)
        : service == 'resetPass'
        ? msg = createMsgReset(first_name)
        : service == 'userDeleted'
        ? msg = createMsgDelete(first_name)
        : service == 'prodDeleted'
        ? msg = createMsgProdDel(first_name)
        : msg = ''

        let subj = '';
        subj = 
        service == 'register'
        ? 'Bienvenido/a'
        : service == 'resetPass'
        ? 'Restablecer la contraseña'
        : service == 'userDeleted'
        ? 'Usuario eliminado'
        : service == 'prodDeleted'
        ? 'Producto eliminado'
        : ''

        const gmailOptions = {
            from: config.EMAIL,
            to: email,
            subject: subj,
            html: msg
        }

        const response = await transporter.sendMail(gmailOptions);
        if(token != null) return token;
        logger2.info('Email enviado');

    } catch (error) {
        throw new Error(error.stack);
    }
}