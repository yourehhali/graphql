import Api from "./sendQuery.js";
import DataFormatter from "./dataProccess.js";

export default class Query {
  constructor() {
    this.GraphQL = new Api();
    this.formatData = new DataFormatter();
  }
  get = async (type, event) => {
    return await this.formatData.format(
      await this.GraphQL.getGraphData(this.Query(event)),
      type
    );
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
