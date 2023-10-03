export default class MongoDao {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        try {
            const response = await this.model.find();
            return response
        } catch (error) {
            req.logger.error(error.message);
        }
    }

    async getById(id) {
        try {
          const response = await this.model.findById(id);
          return response;
        } catch (error) {
          req.logger.error(error.message);
        }
    }
    
    async create(obj) {
        try {
            const response = await this.model.create(obj);
            console.log(obj);
            return response;
        } catch (error) {
            req.logger.error(error.message);
        }
    }

    async update(id, obj) {
        try {
            await this.model.updateOne({ _id: id }, obj);
            return obj;
        } catch (error) {
            req.logger.error(error.message);
        }
    }
    
    async delete(id) {
        try {
            const response = await this.model.findByIdAndDelete(id);
            return response;
        } catch (error) {
            req.logger.error(error.message);
        }
    }
}