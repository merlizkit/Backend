export default class UserResDTO {
    constructor(user) {
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.email = user.email
        this.age = user.age
        this.role = user.role
        //this.cartId = user.cartId.toString()
        this.last_connection = user.last_connection
        this._id = user._id
    }
}