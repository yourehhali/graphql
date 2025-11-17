export default class DataFormatter {
  constructor() {}

  async format(data, type) {
    switch (type) {
      case "xp":
        return this.formatXPPerProject(data);

      case "audit":
        return this.formatAuditRatio(data);

      case "projects":
        return this.formatProjects(data);

      default:
        return data;
    }
  }

  formatXPPerProject = (data) => {
    if (!data?.data?.xpPerProject?.length) return { projects: [] };

    const user = data.data.xpPerProject[0];

    return {
      projects: user.projects.map((t) => ({
        projectName: t.project?.name ?? null,
        xpAmount: t.xp ?? 0,
      })),
    };
  };

  formatAuditRatio = (data) => {
    console.log("THIS IS HOW DATA ENTERS RATIO FORMATER",data)
    if (!data.data.auditData)
      return { auditRatio: 0, totalPassed: 0, totalFailed: 0, bonusUp: 0 };

    const stats = data.data.auditData[0];
    console.log(stats)

    return {
      auditRatio: stats.auditRatio ?? 0,
      totalPassed: stats.totalUp ?? 0,
      totalFailed: stats.totalDown ?? 0,
      bonusUp: stats.totalUpBonus ?? 0,
    };
  };

  formatProjects = (data) => {
    return {
      succeeded: data?.succeeded?.aggregate?.count ?? 0,
      failed: data?.failed?.aggregate?.count ?? 0,
    };
  };
}
