export default class Services {
    constructor(dao) {
        this.dao = dao;
    };
    
    async getAll () {
        try {
            const items = await this.dao.getAll();
            return items;
        } catch (error) {
            throw new Error(error.stack);
        }
    };

    async getById (id) {
        try {
            const item = await this.dao.getById(id);
            if(!item) return false;
            else return item;
        } catch (error) {
            throw new Error(error.stack);
        }
    }

    async create (obj) {
        try {
            const newItem = await this.dao.create(obj);
            if(!newItem) return false;
            else return newItem;
        } catch (error) {
            throw new Error(error.stack);
        }
    }

    async update (id,obj) {
        try {
            const item = await this.dao.getById(id);
            if(!item) return false;
            else return await this.dao.update(id, obj);
        } catch (error) {
            throw new Error(error.stack);
        }
    }

    async delete (id) {
        try {
            const item = await this.dao.getById(id);
            if(!item) return false
            else return await this.dao.delete(id);
        } catch (error) {
            throw new Error(error.stack);
        }
    }
}


