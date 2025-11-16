import Login from "../auth/login.js";
import Profile from "../profile/profile.js";

export default class Router {
  constructor(root) {
    this.root = root;
  }

  navigate = (page) => {
    this.root.innerHTML = "";

    switch (page) {
      case "login": {
        const login = new Login(this.root, this.navigate);
        login.render();
        break;
      }

      case "profile": {
        const profile = new Profile(localStorage.getItem("jwt"),this.navigate);
        profile.render(this.root);
        break;
      }

      default:
        this.root.innerHTML = "<h1>404</h1>";
        break;
    }
  }
}
