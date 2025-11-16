import Api from "./sendQuery.js";

export default class Query {
  constructor() {
    this.GraphQL = new Api();
  }
  get = async (type, event) => {
    switch (type) {
      case "xp":
        return await this.GraphQL.getGraphData(this.XPPerProject(event));
      case "auditTotal":
        return await this.GraphQL.getGraphData(this.AuditRatioTotal());
      case "projectUp":
        return await this.GraphQL.getGraphData(this.ProjectsPassed(event));
      case "projectDown":
        return await this.GraphQL.getGraphData(this.ProjectsFailed(event));
    }
  };
  Query = (event) => {
    return `{
    succeeded: result_aggregate(
    where: {grade: {_gte: 1}, event: {object: {name: {_eq: "${event}"}}}}
    ) {
    aggregate {
      count
    }
    }
    succeededProjects: result(
    where: {grade: {_gte: 1}, event: {object: {name: {_eq: "${event}"}}}}
    ) {
    object {
        name
        }
    }
    failed: result_aggregate(
    where: {grade: {_lt: 1}, event: {object: {name: {_eq: "${event}"}}}}
    ) {
    aggregate {
        count
    }
    }
    failedProjects: result(
        where: {grade: {_lt: 1}, event: {object: {name: {_eq: "${event}"}}}}
    ) {
    object {
        name
    }
    }
    xpPerProject: user {
        projects: transactions(
            where: {type: {_eq: "xp"}, originEvent: {object: {name: {_eq: "${event}"}}}}
        ) {
        project: object {
            name
        }
            xp: amount
        }
    }
    auditData: user {
        auditRatio
        totalUp
        totalDown
        totalUpBonus
    }
    }`;
  };
}
