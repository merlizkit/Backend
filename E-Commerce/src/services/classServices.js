export default class Services {
    constructor(dao) {
        this.dao = dao;
    };
    
    getAll = async () => {
        try {
            const items = await this.dao.getAll();
            return items;
        } catch (error) {
            throw new Error(error.stack);
        }
    };

    getById = async (id) => {
        try {
            const item = await this.dao.getById(id);
            if(!item) return false;
            else return item;
        } catch (error) {
            throw new Error(error.stack);
        }
    }

    create = async (obj) => {
        try {
            const newItem = await this.dao.create(obj);
            if(!newItem) return false;
            else return newItem;
        } catch (error) {
            throw new Error(error.stack);
        }
    }

    update = async (id,obj) => {
        try {
            const item = await this.dao.getById(id);
            if(!item) return false;
            else return await this.dao.update(id, obj);
        } catch (error) {
            throw new Error(error.stack);
        }
    }

    delete = async (id) => {
        try {
            const item = await this.dao.getById(id);
            if(!item) return false
            else return await this.dao.delete(id);
        } catch (error) {
            throw new Error(error.stack);
        }
    }
}


