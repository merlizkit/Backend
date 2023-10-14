export default class MySQLDao {
    constructor(model) {
      this.model = model;
    }
  
    async getAll() {
      try {
        const response = await this.model.findAll();
        return response;
      } catch (error) {
        req.logger.error(error.message);
      }
    }
  
    async getById(id) {
      try {
        const response = await this.model.findOne({
            where: {
                id: id
            }
        });
        return response;
      } catch (error) {
        req.logger.error(error.message);
      }
    }
  
    async create(obj) {
      try {
        const response = await this.model.create(obj);
        return response;
      } catch (error) {
        req.logger.error(error.message);
      }
    }
  
    async update(id, obj) {
      try {
        await this.model.update(obj, {
            where: {
                id: id
            }
        });
        return obj;
      } catch (error) {
        req.logger.error(error.message);
      }
    }
  
    async delete(id) {
      try {
        const response = await this.model.destroy({
            where: {
                id: id
            }
        });
        return response;
      } catch (error) {
        req.logger.error(error.message);
      }
    }
  }
  