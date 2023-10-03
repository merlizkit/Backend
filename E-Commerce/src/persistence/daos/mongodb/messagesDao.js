import { MessageModel } from "./models/messageModel.js";

export default class MessageDaoMongoDB {
    async createMsg(obj){
        try {
            const response = await MessageModel.create(obj);
            return response;
        } catch (error) {
            req.logger.error(error.message);
        }
    }

    async getAll(){
        try {
            const response = await MessageModel.find();
            return response;
        } catch (error) {
          req.logger.error(error.message);  
        }
    }

    async getById(msgId) {
        try {
            const response = await MessageModel.findById(msgId);
            return response;
        }
        catch (error){
            req.logger.error(error.message);
        }
    }

    async updateMsg(msgId, message){
        try {
            const response = await MessageModel.findByIdAndUpdate( msgId, message, {new: true});
            return response;
        }
        catch (error){
            req.logger.error(error.message);
        }
    }

    async deleteMsg(msgId){
        try {
            const response = await MessageModel.findByIdAndDelete(msgId);
            return response;
        }
        catch (error){
            req.logger.error(error.message);
        }
    }

    async deleteMsgs(){
        try {
            const response = await MessageModel.deleteMany({});
            return response;
        }
        catch (error){
            req.logger.error(error.message);
        }
    }
}

