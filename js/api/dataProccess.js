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
    console.log("data from formatter", data);
    console.log(data.user.xpPerProject)
    if (!data?.user?.xpPerProject) return [];

    return {
      projects: data.user.xpPerProject.projects.map((t) => ({
        projectName: t.project?.name ?? null,
        xpAmount: t.xp ?? 0,
      })),
    };
  };

  formatAuditRatio = (data) => {
    if (!data?.user)
      return { auditRatio: 0, totalPassed: 0, totalFailed: 0, bonusUp: 0 };

    return {
      auditRatio: data.user.auditData.auditRatio ?? 0,
      totalPassed: data.user.auditData.totalUp ?? 0,
      totalFailed: data.user.auditData.totalDown ?? 0,
      bonusUp: data.user.auditData.totalUpBonus ?? 0,
    };
  };

  formatProjects = (data) => {
    return {
      succeeded: data?.succeeded?.aggregate?.count ?? 0,
      failed: data?.failed?.aggregate?.count ?? 0,
    };
  };
}
