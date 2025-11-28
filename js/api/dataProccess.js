export default class DataFormatter {
  constructor() {}

  async format(data, type) {
    switch (type) {
      case "profile":
        return this.formatProfile(data);
      case "xp":
        return this.formatXPPerProject(data);

      case "audit":
        return this.formatAuditRatio(data);

      case "projects":
        return this.formatProjects(data);

      case "completedProjects":
        return this.formatCompletedProjects(data);

      default:
        return data;
    }
  }
  formatProfile = (data) => {
    return {
      firstName: data?.data?.profile?.firstName ?? null,
      lastName: data?.data?.profile?.lastName ?? null,
      username: data?.data?.profile?.login ?? null,
      avatar: data?.data?.profile?.avatar ?? null,
      email: data?.data?.profile?.email ?? null,
    };
  }
  formatGroupPerProject = (data) => {
    if (!data?.data?.groups || !data.data.groups.length) return { projects: [] };

    const user = data.data.groups[0] ?? {};

    const projects = (user.groups ?? []).map((g) => {
      const group = g.group ?? {};
      return {
        projectName: group.project?.name ?? null,
        members:
          (group.members ?? []).map((m) => ({
            login: m.member?.login ?? m.user?.login ?? null,
            avatarUrl:
              m.member?.avatar ?? m.member?.avatarUrl ?? m.user?.avatarUrl ?? null,
          })) ?? [],
      };
    });

    return { projects };
  }
  formatCompletedProjects = (data) => {
    return {
      completedProjects: data?.completedProjects?.map((p) => ({
        projectName: p.project?.name ?? null,
        xpAmount: p.xp ?? 0,
        members: p.members?.map((m) => ({
          login: m.user?.login ?? null,
          avatarUrl: m.user?.avatarUrl ?? null,
        })) ?? [],
      })) ?? [],
    };
  }
  formatXPPerProject = (data) => {
    if (!data?.data?.xpPerProject?.length) return { projects: [] };

    const user = data.data.xpPerProject[0] ?? {};

    return {
      projects: (user.projects ?? []).map((t) => ({
        projectName: t.project?.name ?? null,
        xpAmount: t.xp ?? 0,
      })),
    };
  };

  formatAuditRatio = (data) => {
    console.log("THIS IS HOW DATA ENTERS RATIO FORMATER", data);

    if (!data?.data?.auditData || !data.data.auditData.length)
      return { auditRatio: 0, totalPassed: 0, totalFailed: 0, bonusUp: 0 };

    const stats = data.data.auditData[0] ?? {};

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
