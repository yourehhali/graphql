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
    // Fetch both queries
    let auditData = await this.Query.get("auditTotal", "Module");
    let xpData = await this.Query.get("xp", "Module");

    console.log("Audit:", auditData);
    console.log("XP:", xpData);

    // Clear the root
    root.innerHTML = "";

    // ---- Audit Result Display ----
    const auditBox = document.createElement("div");
    auditBox.style.marginBottom = "20px";

    auditBox.innerHTML = `
    <h2>Audit Summary</h2>
    <p>Total Audits: ${auditData.audit_aggregate.aggregate.count}</p>
  `;

    // ---- XP Result Display ----
    const xpBox = document.createElement("div");
    xpBox.innerHTML = `<h2>XP Per Project</h2>`;

    xpData.user.transactions.forEach((t) => {
      const item = document.createElement("p");
      item.textContent = `${t.object.name}: ${t.amount}`;
      xpBox.appendChild(item);
    });

    // Add everything to page
    root.appendChild(auditBox);
    root.appendChild(xpBox);

    // Logout button
    this.logout.render(root);
  };
}
