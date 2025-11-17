import Login from "./js/auth/login.js"
import Router from "./js/router/router.js"


class App{
    constructor(root){
        this.root = document.getElementById(root)
        this.Router = new Router(this.root)
        this.login = new Login(this.root,this.Router.navigate)
        this.Router.navigate("login")
    }
};
let app = new App("app")
