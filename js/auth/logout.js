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
  render = (root) => {
    let logoutContainer = document.createElement("div");
    logoutContainer.classList.add("logoutContainer");

    const logoutIcon = document.createElement("div");
    logoutIcon.classList.add("logoutIcon");
    const logoutImg = document.createElement("img");
    logoutImg.src = "../../media/logout.svg";
    logoutImg.alt = "logout";
    logoutIcon.appendChild(logoutImg);
    this.bindEvents(logoutIcon);
    logoutContainer.appendChild(logoutIcon);
    root.appendChild(logoutContainer);
  };
}
