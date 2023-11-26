export default class MongoDao {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        try {
            const response = await this.model.find();
            return response
        } catch (error) {
            throw new Error(error.stack);
        }
    }

    async getById(id) {
        try {
          const response = await this.model.findById(id);
          return response;
        } catch (error) {
            throw new Error(error.stack);
        }
    }

    async find(obj) {
        try {
            const response = await this.model.find(obj).lean();
            return response
        } catch (error) {
            throw new Error(error.stack);
        }
    }
        
    async create(obj) {
        try {
            const response = await this.model.create(obj);
            return response;
        } catch (error) {
            throw new Error(error.stack);
        }
    }

    async update(id, obj) {
        try {
            return await this.model.updateOne({ _id: id }, obj);
        } catch (error) {
            throw new Error(error.stack);
        }
    }
    
    async delete(id) {
        try {
            const response = await this.model.findByIdAndDelete(id);
            return response;
        } catch (error) {
            throw new Error(error.stack);
        }
    }

    async deleteMany(obj) {
        try {
            const response = await this.model.deleteMany(obj);
            return response;
        } catch (error) {
            throw new Error(error.stack);
        }
    }
}