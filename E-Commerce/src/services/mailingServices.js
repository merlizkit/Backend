import { createTransport } from 'nodemailer';
import config from '../config/config.js';

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
    return `<h1>Hola ${first_name}, hace click <a href='http://localhost:8080/api/users/new-pass'>AQUI</a> para reestablecer la contraseña`;
};
export const sendMail = async (user, service, token = null) => {
    try {
        const { first_name, email } = user;
        let msg = '';

        service == 'register'
        ? msg = createMsgRegister(first_name)
        : service == 'resetPass'
        ? msg = createMsgReset(first_name)
        : msg = ''

        let subj = '';
        subj = 
        service == 'register'
        ? 'Bienvenido/a'
        : service == 'resetPass'
        ? 'Restablecer la contraseña'
        : ''

        const gmailOptions = {
            from: config.EMAIL,
            to: email,
            subject: subj,
            html: msg
        }

        const resposne = await transporter.sendMail(gmailOptions);
        if(token != null) return token;
        req.logger.info('Email enviado');

    } catch (error) {
        req.logger.error(error.message);
    }
}