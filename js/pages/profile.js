import Logout from "../auth/logout.js";
import Query from "../api/queries.js";
import GraphBuilder from "../tools/graphBuilder.js";

export default class Profile {
  constructor(token, navigate) {
    this.jwt = token;
    this.nav = navigate;
    this.buildGraph = new GraphBuilder(400, 300);
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
    let SVGcomponent = this.buildGraph.barChart(xpData.projects);
    xpBox.appendChild(SVGcomponent);

    xpBox.innerHTML += xpData.projects
  .map(p => `<h1>${p.projectName}</h1><p>${p.xpAmount}</p>`)
  .join("");
    console.log("this is xp data",xpData)
    

    root.appendChild(xpBox);
    root.appendChild(auditBox);

    this.logout.render(root);
  };
}
