import Logout from "../auth/logout.js";
import Query from "../api/queries.js";

export default class Profile {
  constructor(token, navigate) {
    this.jwt = token;
    this.nav = navigate;
    this.logout = new Logout(navigate);
    this.Query = new Query();
  }

  render = async (root) => {
    let auditData = await this.Query.get("audit", "Module");
    let xpData = await this.Query.get("xp", "Module");

    console.log("Audit:", auditData);
    console.log("XP:", xpData.projects);

    root.innerHTML = "";

    const auditBox = document.createElement("div");
    auditBox.style.marginBottom = "20px";

    auditBox.innerHTML = `
    <h2>Audit Summary</h2>
    <p>Total Audits: ${auditData.auditRatio}</p>
  `;

    const xpBox = document.createElement("div");
    xpBox.innerHTML = `<h2>XP Per Project</h2>`;

    xpBox.innerHTML = xpData.projects
  .map(p => `<h1>${p.projectName}</h1><p>${p.xpAmount}</p>`)
  .join("");
    console.log("this is xp data",xpData)
    

    root.appendChild(auditBox);
    root.appendChild(xpBox);

    this.logout.render(root);
  };
}
