export default class Login {
  constructor(parent, navigate) {
    this.root = parent;
    this.nav = navigate;
  }

  bindEvents = (form) => {
    form.addEventListener("submit", this.handleSubmit);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value.trim();
    const password = e.target.password.value;

    const token = btoa(`${username}:${password}`);

    const res = await fetch("https://learn.zone01oujda.ma/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + token,
      },
    });

    const jwt = await res.json();
    let parts = jwt.split(".")
    let payload = JSON.parse(atob(parts[1]))
    console.log(payload)

    if (jwt) {
      localStorage.setItem("jwt", jwt);
      this.nav("profile");
    }
  };

  render = () => {
    this.root.innerHTML = "";
    let isLoggedIn = !!localStorage.getItem("jwt");
    if (isLoggedIn) {
      this.nav("profile");
      return;
    }

    let loginContainer = document.createElement("section");
    let loginForm = document.createElement("form");
    let loginUser = document.createElement("input");
    let loginPass = document.createElement("input");
    let submitBtn = document.createElement("button");

    loginContainer.classList.add("loginContainer");
    loginForm.classList.add("loginForm");
    loginUser.classList.add("loginUser");
    loginPass.classList.add("loginPass");

    loginUser.type = "text";
    loginPass.type = "password";

    loginUser.name = "username";
    loginPass.name = "password";

    submitBtn.type = "submit";
    submitBtn.textContent = "Login";

    loginUser.setAttribute("autocomplete", "uscurrent-password");

    loginPass.setAttribute("autocomplete", "current-password");

    loginForm.append(loginUser, loginPass, submitBtn);
    loginContainer.appendChild(loginForm);
    this.root.appendChild(loginContainer);

    this.bindEvents(loginForm);
  };
}
