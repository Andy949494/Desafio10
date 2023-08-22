export default class usersDTO{
    constructor (user){
        this._id = user._id;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.age = user.age;
        this.cart = user.cart;
        this.role = user.role;
    }
}