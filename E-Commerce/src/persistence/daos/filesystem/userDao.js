import FSDao from "./fsDao.js";
const path = "./src/daos/filesystem/users.json";

export default class UserDaoFS extends FSDao {
    constructor() {
        super(path);
    }
};