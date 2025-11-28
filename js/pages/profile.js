import Query from "../api/queries.js";
import GraphBuilder from "../tools/graphBuilder.js";
import Header from "../components/header.js";

export default class Profile {
  constructor(token, navigate) {
    this.jwt = token;
    this.nav = navigate;
    this.buildGraph = new GraphBuilder(800, 300);
    this.Query = new Query();
    this.header = new Header(navigate);
  }

  render = async (root) => {
    let auditData = await this.Query.get("audit", "Module");
    let xpData = await this.Query.get("xp", "Module");
    let profileData = await this.Query.get("profile","Module")
    console.log("profile", profileData)
    console.log("Audit:", auditData);
    console.log("XP:", xpData.projects);

    root.innerHTML = "";

    this.header.render(root);
    const xpBox = document.createElement("div");
    xpBox.innerHTML = `<h2>XP Per Project</h2>`;
    xpBox.classList.add("xpBox");
    let SVGcomponent = this.buildGraph.coolLineGraph(xpData.projects);
    xpBox.appendChild(SVGcomponent);
    
    const auditBox = document.createElement("div");


    auditBox.innerHTML = `
    <h2>Audit Summary</h2>
  `;
  auditBox.classList.add("audit-graph")
  let daughnutGraph = this.buildGraph.createRadialChart([auditData.totalPassed,auditData.totalFailed,auditData.bonusUp])
    let firstRow = document.createElement("div")
    firstRow.classList.add("firstRow")
    auditBox.appendChild(daughnutGraph)
    firstRow.append(xpBox,auditBox)
    root.appendChild(firstRow);


  };
}
