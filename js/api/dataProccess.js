export default class DataFormatter {
  constructor() {}

  format(type, data) {
    switch (type) {
      case "xp":
        return this.formatXPPerProject(data);

      case "auditTotal":
        return this.formatAuditRatioTotal(data);

      case "projectUp":
        return this.formatProjectsPassed(data);

      case "projectDown":
        return this.formatProjectsFailed(data);

      default:
        return data;
    }
  }

  formatXPPerProject = (data) => {
    if (!data?.user?.transactions) return { transactions: [] };

    return {
      transactions: data.user.transactions.map((t) => ({
        projectName: t.object?.name ?? null,
        originName: t.originEvent?.object?.name ?? null,
        eventName: t.event?.object?.name ?? null,
        xpAmount: t.amount ?? 0,
      })),
    };
  };

  formatAuditRatioTotal = (data) => {
    if (!data?.user) return { auditRatio: 0, totalPassed: 0, totalFailed: 0, bonusUp: 0 };

    return {
      auditRatio: data.user.auditRatio ?? 0,
      totalPassed: data.user.totalUp ?? 0,
      totalFailed: data.user.totalDown ?? 0,
      bonusUp: data.user.totalUpBonus ?? 0,
    };
  };

  formatProjectsPassed = (data) => {
    return {
      totalPassed: data?.result_aggregate?.aggregate?.count ?? 0,
    };
  };

  formatProjectsFailed = (data) => {
    return {
      totalFailed: data?.result_aggregate?.aggregate?.count ?? 0,
    };
  };
}
