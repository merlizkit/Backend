export default class CustomError {
    static createError ({name= "Error", cause, message, model, path, code=1}) {
        const error = new Error (message, {cause});
        error.name = name;
        error.model = model;
        error.path = path;
        error.code = code;
        throw error;
    }
}