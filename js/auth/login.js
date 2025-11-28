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
  let isLoggedIn = !!localStorage.getItem("jwt");
  if (isLoggedIn) {
    this.nav("profile");
    return;
  }

  let loginContainer = document.createElement("section");
  let loginIcon = document.createElement("img");
  let loginForm = document.createElement("form");

  // Input containers
  let userContainer = document.createElement("div");
  let passContainer = document.createElement("div");

  // Labels
  let userLabel = document.createElement("label");
  let passLabel = document.createElement("label");

  // Inputs
  let loginUser = document.createElement("input");
  let loginPass = document.createElement("input");
  let submitBtn = document.createElement("input");

  // Classes
  loginIcon.classList.add("loginLogo");
  loginContainer.classList.add("loginContainer");
  loginForm.classList.add("loginForm");
  userContainer.classList.add("inputContainer");
  passContainer.classList.add("inputContainer");
  loginUser.classList.add("loginUser");
  loginPass.classList.add("loginPass");

  // Icon
  loginIcon.setAttribute("src", "../../media/icon.png");

  // Labels
  userLabel.innerText = "Username or Email";
  passLabel.innerText = "Password";

  userLabel.setAttribute("for", "usernameInput");
  passLabel.setAttribute("for", "passwordInput");

  // Inputs
  loginUser.id = "usernameInput";
  loginPass.id = "passwordInput";

  loginUser.type = "text";
  loginPass.type = "password";

  loginUser.name = "username";
  loginPass.name = "password";

  loginUser.placeholder = "username or email";
  loginPass.placeholder = "************";

  loginUser.setAttribute("autocomplete", "username");
  loginPass.setAttribute("autocomplete", "current-password");

  // Submit button
  submitBtn.type = "submit";
  submitBtn.value = "Login";

  // Build structure
  userContainer.append(userLabel, loginUser);
  passContainer.append(passLabel, loginPass);

  loginForm.append(
    loginIcon,
    userContainer,
    passContainer,
    submitBtn
  );

  loginContainer.appendChild(loginForm);
  this.root.appendChild(loginContainer);

  this.bindEvents(loginForm);
};


}
