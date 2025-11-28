import Router from "./js/router/router.js"


class App{
    constructor(root){
        this.root = document.getElementById(root)
        this.Router = new Router(this.root)
        this.Router.navigate("login")
    }
};
let app = new App("app")
