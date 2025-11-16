export default class Logout {
  constructor(navigate) {
    this.nav = navigate;
  }
  run = (e) => {
    e.preventDefault();
    localStorage.removeItem("jwt");
    this.nav("login");
  };
  bindEvents = (root) => {
    root.addEventListener("click", (e) => {
      this.run(e);
    });
  };
  render =(root) => {
    let logoutContainer = document.createElement("div");
    logoutContainer.classList.add("logoutContainer");

    let button = document.createElement("button");
    button.innerText = "Logout";
    this.bindEvents(button);
    logoutContainer.appendChild(button);
    root.appendChild(logoutContainer);
  }
}
