import { createResponse } from '../utils.js'

export default class Controllers {
    constructor(service) {
        this.service = service;
    };

    async getAll (req, res, next) {
        try {
            const items = this.service.getAll();
            createResponse(res, 200, items);
        } catch (error) {
            req.logger.error(error.message);
        }
    }

    async getById (req, res, next) {
        try {
            const { id } = req.params;
            const item = this.service.getById(id);
            if(!item)
                createResponse(res, 400, {
                    method: "Service",
                    error: "Item not found"
                });
            else createResponse(res, 200, item);
        } catch (error) {
            req.logger.error(error.message);
        }
    }
    
    async create (req, res, next) {
        try {
            const newItem = await this.service.create(req.body);
            if(!newItem)
                createResponse(res, 400, {
                    method: "Service",
                    error: "Validation error"
                });
            else createResponse(res, 200, items);
        } catch (error) {
            req.logger.error(error.message);
        }
    }

    async update (req, res, next) {
        try {
            const { id } = req.params;
            const item = this.service.getById(id);
            if(!item)
                createResponse(res, 400, {
                    method: "Service",
                    error: "Item not found"
                });
            else {
                const itemUpd = await this.service.update(id, req.body);
                createResponse(res, 200, itemUpd);}
        } catch (error) {
        req.logger.error(error.message);
        }
    };

    async delete (req, res, next) {
        try {
            const { id } = req.params;
            const item = this.service.getById(id);
            if(!item)
                createResponse(res, 400, {
                    method: "Service",
                    error: "Item not found"
                });
            else {
                const itemDel = await this.service.delete(id);
                createResponse(res, 200, itemDel);}
        } catch (error) {
        req.logger.error(error.message);
        }
    };
};