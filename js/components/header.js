
import Logout from "../auth/logout.js";
export default class Header {
  constructor(navigate) {

    this.logout = new Logout(navigate);
  }

  render = (root) => {
    const header = document.createElement("header");

    const headerContainer = document.createElement("div");
    headerContainer.classList.add("headerContainer");

    const logo = document.createElement("div");
    logo.classList.add("logo");
    const logoImg = document.createElement("img");
    logoImg.src = "../../media/logo.png";
    logoImg.alt = "logo";
    logo.appendChild(logoImg);

    const headerWidget = document.createElement("div");
    headerWidget.classList.add("headerWidget");

    

    const headerAvatar = document.createElement("div");
    headerAvatar.classList.add("headerAvatar");
    const avatarImg = document.createElement("img");
    avatarImg.src = "../../media/avatar.png";
    avatarImg.alt = "avatar";
    headerAvatar.appendChild(avatarImg);
    //HERE I SHOULD RENDER THE LOGOUT COMPONENT
    this.logout.render(headerWidget)
    headerWidget.appendChild(headerAvatar);

    headerContainer.appendChild(logo);
    headerContainer.appendChild(headerWidget);

    header.appendChild(headerContainer);

    if (root) {
      root.appendChild(header);
    }
    return header;
  };
}